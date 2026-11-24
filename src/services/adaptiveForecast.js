// ==============================================================================
// ADAPTIVE LEARNING FORECAST ENGINE
// Velocity-based estimator strictly isolated by (category, difficulty)
// ==============================================================================

export const FORECAST_CATEGORIES = [
  'video',
  'lab',
  'coding',
  'troubleshooting',
  'quiz',
  'review',
  'project'
];

export const FORECAST_DIFFICULTIES = ['beginner', 'intermediate', 'advanced'];

export const CATEGORY_LABELS = {
  video: 'فيديو / قراءة',
  lab: 'لاب عملي',
  coding: 'برمجة',
  troubleshooting: 'استكشاف أخطاء',
  quiz: 'اختبار',
  review: 'مراجعة',
  project: 'تسليم مشروع'
};

export const DIFFICULTY_LABELS = {
  beginner: 'مبتدئ',
  intermediate: 'متوسط',
  advanced: 'متقدم'
};

const CATEGORY_ALIASES = {
  video: 'video',
  'video / reading': 'video',
  reading: 'video',
  lab: 'lab',
  'hands-on lab': 'lab',
  coding: 'coding',
  troubleshooting: 'troubleshooting',
  quiz: 'quiz',
  review: 'review',
  project: 'project',
  'project delivery': 'project'
};

const DIFFICULTY_ALIASES = {
  beginner: 'beginner',
  easy: 'beginner',
  intermediate: 'intermediate',
  medium: 'intermediate',
  advanced: 'advanced',
  hard: 'advanced'
};

export const BASELINE_VELOCITY = 1.0;
export const RATIO_MIN = 0.35;
export const RATIO_MAX = 2.5;
export const EMA_WEIGHT = 0.3;
export const MEDIUM_CONFIDENCE_N = 3;
export const HIGH_CONFIDENCE_N = 8;

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function normalizeCategory(category) {
  if (!category || typeof category !== 'string') return 'lab';
  const key = category.trim().toLowerCase();
  return CATEGORY_ALIASES[key] || (FORECAST_CATEGORIES.includes(key) ? key : 'lab');
}

export function normalizeDifficulty(difficulty) {
  if (!difficulty || typeof difficulty !== 'string') return 'intermediate';
  const key = difficulty.trim().toLowerCase();
  return DIFFICULTY_ALIASES[key] || (FORECAST_DIFFICULTIES.includes(key) ? key : 'intermediate');
}

export function getBucketKey(category, difficulty) {
  return `${normalizeCategory(category)}::${normalizeDifficulty(difficulty)}`;
}

/**
 * Normalizes a study session or task completion record with full adaptive metadata.
 */
export function normalizeSessionMetadata(session = {}) {
  const estimatedMinutes = Math.max(0, Number(session.estimatedMinutes) || 0);
  const actualActiveMinutes =
    session.actualActiveMinutes !== undefined
      ? Math.max(0, Number(session.actualActiveMinutes) || 0)
      : session.hours
      ? Math.max(0, Math.round(Number(session.hours) * 60))
      : 0;
  const pausedMinutes = Math.max(0, Number(session.pausedMinutes) || 0);
  const confidenceRaw = Number(session.confidence);
  const confidence =
    Number.isFinite(confidenceRaw) && confidenceRaw >= 1 && confidenceRaw <= 5
      ? Math.round(confidenceRaw)
      : 3;

  return {
    id: session.id || null,
    topicId: session.topicId || null,
    topicTitle: session.topicTitle || session.topic || '',
    estimatedMinutes,
    actualActiveMinutes,
    pausedMinutes,
    category: normalizeCategory(session.category),
    difficulty: normalizeDifficulty(session.difficulty),
    attempts: Math.max(1, Number(session.attempts) || 1),
    confidence,
    completedAt: session.completedAt || (session.date ? `${session.date}T12:00:00.000Z` : new Date().toISOString()),
    interrupted: Boolean(session.interrupted),
    note: session.note ?? session.notes ?? '',
    evidenceUrl: session.evidenceUrl || session.evidence || ''
  };
}

function createEmptyBucket(category, difficulty) {
  const normCat = normalizeCategory(category);
  const normDiff = normalizeDifficulty(difficulty);
  return {
    key: `${normCat}::${normDiff}`,
    category: normCat,
    difficulty: normDiff,
    velocity: BASELINE_VELOCITY,
    n: 0,
    interruptedCount: 0,
    history: []
  };
}

/**
 * Updates the forecast model using a completed study session or task telemetry.
 * Strictly isolates velocity learning by (category, difficulty).
 * Never applies a `video` multiplier to `lab`, `coding`, `troubleshooting`, or `project`.
 * Interrupted sessions are ignored for velocity calculation so partial sessions never skew ETA.
 *
 * For valid sessions:
 *   ratio = clamp(estimatedMinutes / actualActiveMinutes, 0.35, 2.5)
 *   newVelocity = (0.3 * ratio) + (0.7 * oldVelocity)
 */
export function recordSessionObservation(forecastModel, observation) {
  const meta = normalizeSessionMetadata(observation);
  const existingBuckets = forecastModel?.buckets || forecastModel?.multipliers || {};
  const key = getBucketKey(meta.category, meta.difficulty);
  const currentBucket = existingBuckets[key]
    ? {
        ...createEmptyBucket(meta.category, meta.difficulty),
        ...existingBuckets[key],
        velocity:
          existingBuckets[key].velocity ??
          existingBuckets[key].value ??
          BASELINE_VELOCITY
      }
    : createEmptyBucket(meta.category, meta.difficulty);

  // Guard against missing/invalid durations
  if (meta.estimatedMinutes <= 0 || meta.actualActiveMinutes <= 0) {
    return {
      buckets: { ...existingBuckets },
      multipliers: { ...existingBuckets },
      totalObservations: forecastModel?.totalObservations || 0
    };
  }

  // Ignore interrupted sessions in velocity updates (preserve count for diagnostics)
  if (meta.interrupted) {
    const nextBuckets = {
      ...existingBuckets,
      [key]: {
        ...currentBucket,
        interruptedCount: (currentBucket.interruptedCount || 0) + 1
      }
    };
    return {
      buckets: nextBuckets,
      multipliers: nextBuckets,
      totalObservations: forecastModel?.totalObservations || 0
    };
  }

  const rawRatio = meta.estimatedMinutes / meta.actualActiveMinutes;
  const clampedRatio = clamp(rawRatio, RATIO_MIN, RATIO_MAX);
  const newVelocity = Number(
    (EMA_WEIGHT * clampedRatio + (1 - EMA_WEIGHT) * currentBucket.velocity).toFixed(4)
  );

  const nextHistory = [
    ...(currentBucket.history || []).slice(-19),
    {
      ratio: Number(clampedRatio.toFixed(3)),
      rawRatio: Number(rawRatio.toFixed(3)),
      velocity: newVelocity,
      estimatedMinutes: meta.estimatedMinutes,
      actualActiveMinutes: meta.actualActiveMinutes,
      confidence: meta.confidence,
      interrupted: false,
      recordedAt: meta.completedAt
    }
  ];

  const nextBuckets = {
    ...existingBuckets,
    [key]: {
      ...currentBucket,
      velocity: newVelocity,
      n: (currentBucket.n || 0) + 1,
      history: nextHistory
    }
  };

  return {
    buckets: nextBuckets,
    multipliers: nextBuckets,
    totalObservations: (forecastModel?.totalObservations || 0) + 1
  };
}

/**
 * Rebuilds the entire forecast model deterministically from a studySessions list
 * (e.g., after editing, marking interrupted, or deleting a session).
 */
export function rebuildForecastModelFromSessions(sessions = []) {
  let model = { buckets: {}, multipliers: {}, totalObservations: 0 };
  const chronological = [...sessions].sort((a, b) => {
    const ta = new Date(a.completedAt || a.date || 0).getTime();
    const tb = new Date(b.completedAt || b.date || 0).getTime();
    return ta - tb;
  });

  for (const sess of chronological) {
    model = recordSessionObservation(model, sess);
  }
  return model;
}

/**
 * Computes effective velocity for a specific (category, difficulty) bucket.
 * Strictly independent per bucket; NEVER borrows from `video` or any other bucket.
 * Smoothly blends with baseline 1.0 when N < 3.
 */
export function getEffectiveBucketVelocity(forecastModel, category, difficulty) {
  const normCat = normalizeCategory(category);
  const normDiff = normalizeDifficulty(difficulty);
  const key = `${normCat}::${normDiff}`;
  const buckets = forecastModel?.buckets || forecastModel?.multipliers || {};
  const bucket = buckets[key];

  if (!bucket || !bucket.n) {
    return {
      key,
      category: normCat,
      difficulty: normDiff,
      effectiveVelocity: BASELINE_VELOCITY,
      rawVelocity: BASELINE_VELOCITY,
      n: 0,
      interruptedCount: bucket?.interruptedCount || 0,
      confidence: 'Low',
      history: []
    };
  }

  const rawVelocity = Number(bucket.velocity ?? bucket.value ?? BASELINE_VELOCITY);
  const n = Number(bucket.n) || 0;

  if (n < MEDIUM_CONFIDENCE_N) {
    const weight = n / MEDIUM_CONFIDENCE_N;
    const blended = Number(
      (BASELINE_VELOCITY * (1 - weight) + rawVelocity * weight).toFixed(4)
    );
    return {
      key,
      category: normCat,
      difficulty: normDiff,
      effectiveVelocity: blended,
      rawVelocity,
      n,
      interruptedCount: bucket.interruptedCount || 0,
      confidence: 'Low',
      history: bucket.history || []
    };
  }

  const confidence = n >= HIGH_CONFIDENCE_N ? 'High' : 'Medium';
  return {
    key,
    category: normCat,
    difficulty: normDiff,
    effectiveVelocity: rawVelocity,
    rawVelocity,
    n,
    interruptedCount: bucket.interruptedCount || 0,
    confidence,
    history: bucket.history || []
  };
}

function getConfidenceLevel(observationCount) {
  if (observationCount >= HIGH_CONFIDENCE_N) return 'High';
  if (observationCount >= MEDIUM_CONFIDENCE_N) return 'Medium';
  return 'Low';
}

/**
 * Computes rolling weekly active study hours from studySessions.
 * Uses active minutes (excluding paused time) over the trailing 28-day window,
 * normalized by active weeks covered (1..4 weeks) so week-1 learners aren't deflated.
 */
export function computeRollingWeeklyHours(studySessions = [], referenceNow = new Date()) {
  if (!Array.isArray(studySessions) || studySessions.length === 0) return 0;

  const nowMs =
    referenceNow instanceof Date ? referenceNow.getTime() : new Date(referenceNow).getTime();
  const windowDays = 28;
  const windowStartMs = nowMs - windowDays * 24 * 60 * 60 * 1000;

  let recentActiveMinutes = 0;
  let earliestRecentMs = nowMs;

  for (const rawSess of studySessions) {
    const meta = normalizeSessionMetadata(rawSess);
    if (meta.actualActiveMinutes <= 0) continue;
    const ts = new Date(meta.completedAt).getTime();
    if (Number.isNaN(ts) || ts < windowStartMs || ts > nowMs + 24 * 60 * 60 * 1000) continue;

    recentActiveMinutes += meta.actualActiveMinutes;
    if (ts < earliestRecentMs) earliestRecentMs = ts;
  }

  if (recentActiveMinutes === 0) return 0;
  const daysCovered = Math.max(7, Math.ceil((nowMs - earliestRecentMs) / (1000 * 60 * 60 * 24)));
  const weeksCovered = clamp(daysCovered / 7, 1, 4);
  return Number((recentActiveMinutes / 60 / weeksCovered).toFixed(1));
}

function addHoursToDateIso(hours, weeklyPace, referenceNow = new Date()) {
  const baseDate = referenceNow instanceof Date ? new Date(referenceNow) : new Date(referenceNow);
  const safePace = Math.max(1, Number(weeklyPace) || 12);
  const days = Math.ceil((Math.max(0, hours) / safePace) * 7);
  baseDate.setDate(baseDate.getDate() + days);
  return baseDate.toISOString().split('T')[0];
}

const ARABIC_MONTHS = [
  'يناير',
  'فبراير',
  'مارس',
  'أبريل',
  'مايو',
  'يونيو',
  'يوليو',
  'أغسطس',
  'سبتمبر',
  'أكتوبر',
  'نوفمبر',
  'ديسمبر'
];

/**
 * Formats an optimistic..conservative ISO date range into a friendly Arabic month-year range.
 * Example: '2027-02-10'..'2027-03-18' -> 'فبراير – مارس 2027'
 */
export function formatArabicMonthRange(dateMinIso, dateMaxIso) {
  if (!dateMinIso || !dateMaxIso) return '—';
  const dMin = new Date(dateMinIso);
  const dMax = new Date(dateMaxIso);
  if (Number.isNaN(dMin.getTime()) || Number.isNaN(dMax.getTime())) return '—';

  const m1 = ARABIC_MONTHS[dMin.getMonth()];
  const y1 = dMin.getFullYear();
  const m2 = ARABIC_MONTHS[dMax.getMonth()];
  const y2 = dMax.getFullYear();

  if (y1 === y2 && m1 === m2) return `${m1} ${y1}`;
  if (y1 === y2) return `${m1} – ${m2} ${y1}`;
  return `${m1} ${y1} – ${m2} ${y2}`;
}

/**
 * Computes remaining hours & months for HiveBox deliverables.
 */
export function computeHiveboxRemainingForecast({
  phases = [],
  hiveboxState = {},
  weeklyHours = 12,
  now = new Date()
} = {}) {
  const safePace = Math.max(1, Number(weeklyHours) || 12);
  let totalHours = 0;
  let remainingHours = 0;
  let completedHours = 0;

  for (const phase of phases) {
    for (const del of phase.deliverables || []) {
      const est = Number(del.estimatedHours) || 2;
      const isDone =
        hiveboxState?.[del.id] !== undefined ? Boolean(hiveboxState[del.id]) : Boolean(del.done);
      totalHours += est;
      if (isDone) {
        completedHours += est;
      } else {
        remainingHours += est;
      }
    }
  }

  const roundedRemaining = Number(remainingHours.toFixed(1));
  const remainingMonths = Number((roundedRemaining / (safePace * 4.33)).toFixed(1));
  const remainingWeeks = Number((roundedRemaining / safePace).toFixed(1));
  const expectedDate = addHoursToDateIso(roundedRemaining, safePace, now);

  return {
    totalHours: Number(totalHours.toFixed(1)),
    completedHours: Number(completedHours.toFixed(1)),
    remainingHours: roundedRemaining,
    remainingWeeks,
    remainingMonths,
    expectedDate,
    expectedMonthLabel: formatArabicMonthRange(expectedDate, expectedDate)
  };
}

/**
 * Computes comprehensive adaptive forecast metrics across all roadmap modules & topics.
 * Deducts remaining hours at subtask granularity using subtask `estimatedHours` (or equal split).
 *
 * adjustedRemainingHours = sum((remainingBaselineMinutes / 60) / effectiveVelocity)
 */
export function computeAdaptiveForecast({
  modules = [],
  progress = {},
  targetWeeklyHours,
  weeklyStudyHours,
  studySessions,
  now = new Date()
} = {}) {
  const sessionsList = Array.isArray(studySessions)
    ? studySessions
    : Array.isArray(progress?.studySessions)
    ? progress.studySessions
    : [];

  // Prefer deterministic model rebuilt from sessions when sessions exist, or provided forecastModel
  const forecastModel =
    sessionsList.length > 0
      ? rebuildForecastModelFromSessions(sessionsList)
      : progress?.forecastModel || { buckets: {}, multipliers: {}, totalObservations: 0 };

  const safeTargetWeeklyHours = Math.max(
    1,
    Number(targetWeeklyHours ?? weeklyStudyHours ?? progress?.targetWeeklyHours ?? progress?.weeklyStudyHours) || 12
  );
  const rollingWeeklyHours = computeRollingWeeklyHours(sessionsList, now);
  const effectiveWeeklyPace = rollingWeeklyHours >= 2 ? rollingWeeklyHours : safeTargetWeeklyHours;

  let baselineRemainingMinutes = 0;
  let adjustedRemainingHours = 0;
  let completedBaselineMinutes = 0;
  let completedActualMinutes = 0;

  const moduleBreakdown = [];
  const usedBucketKeys = new Set();

  for (const mod of modules) {
    let modBaselineRemHours = 0;
    let modAdjustedRemHours = 0;

    for (const topic of mod.topics || []) {
      const estMins = Number(topic.estimatedMinutes) || (Number(topic.hours) || 0) * 60;
      const category = normalizeCategory(topic.category);
      const difficulty = normalizeDifficulty(topic.difficulty);
      usedBucketKeys.add(getBucketKey(category, difficulty));

      const subtasks = topic.subtasks || [];
      const explicitExec =
        progress.topicProgress?.[topic.id]?.executionStatus ??
        progress.topicStatus?.[topic.id] ??
        topic.defaultStatus;
      const isCompleted = explicitExec === 'completed' || explicitExec === 'done';

      let completedTopicMins = 0;
      let remainingTopicMins = 0;

      if (isCompleted) {
        completedTopicMins = estMins;
        remainingTopicMins = 0;
      } else if (subtasks.length > 0) {
        const rawSubMins = subtasks.map((s) =>
          Number(s.estimatedMinutes) > 0
            ? Number(s.estimatedMinutes)
            : Number(s.estimatedHours) > 0
            ? Number(s.estimatedHours) * 60
            : 0
        );
        const hasSubEstimates = rawSubMins.some((m) => m > 0);
        const definedSum = rawSubMins.reduce((a, b) => a + b, 0);
        const undefinedCount = rawSubMins.filter((m) => m === 0).length;
        const fallbackPerUndefined =
          undefinedCount > 0 ? Math.max(0, estMins - definedSum) / undefinedCount : 0;

        const effectiveSubMins = rawSubMins.map((m) =>
          hasSubEstimates ? (m > 0 ? m : fallbackPerUndefined) : estMins / subtasks.length
        );
        const totalEffective = effectiveSubMins.reduce((a, b) => a + b, 0) || estMins;
        const scale = estMins > 0 && totalEffective > 0 ? estMins / totalEffective : 1;

        subtasks.forEach((s, idx) => {
          const subMins = effectiveSubMins[idx] * scale;
          const isSubDone =
            progress.subtasks?.[s.id] !== undefined
              ? Boolean(progress.subtasks[s.id])
              : Boolean(s.done);
          if (isSubDone) {
            completedTopicMins += subMins;
          } else {
            remainingTopicMins += subMins;
          }
        });
      } else {
        remainingTopicMins = estMins;
      }

      const telemetry =
        progress.topicProgress?.[topic.id]?.telemetry || progress.taskTelemetry?.[topic.id];
      if (completedTopicMins > 0) {
        completedBaselineMinutes += completedTopicMins;
        completedActualMinutes +=
          telemetry?.actualActiveMinutes && estMins > 0
            ? telemetry.actualActiveMinutes * (completedTopicMins / estMins)
            : completedTopicMins;
      }

      if (remainingTopicMins > 0) {
        const { effectiveVelocity } = getEffectiveBucketVelocity(
          forecastModel,
          category,
          difficulty
        );
        const topicBaseHours = remainingTopicMins / 60;
        const topicAdjustedHours = topicBaseHours / effectiveVelocity;

        baselineRemainingMinutes += remainingTopicMins;
        adjustedRemainingHours += topicAdjustedHours;
        modBaselineRemHours += topicBaseHours;
        modAdjustedRemHours += topicAdjustedHours;
      }
    }

    const roundedModHours = Number(modAdjustedRemHours.toFixed(1));
    moduleBreakdown.push({
      id: mod.id,
      number: mod.number,
      title: mod.title,
      baselineRemainingHours: Number(modBaselineRemHours.toFixed(1)),
      adaptiveExpectedHours: roundedModHours,
      remainingHours: roundedModHours,
      remainingWeeks: Number((roundedModHours / effectiveWeeklyPace).toFixed(1)),
      remainingMonths: Number((roundedModHours / (effectiveWeeklyPace * 4.33)).toFixed(1))
    });
  }

  const observationCount = Number(forecastModel.totalObservations) || 0;
  const confidence = getConfidenceLevel(observationCount);

  // Uncertainty band tightens as confidence grows from Low -> Medium -> High
  const spread = confidence === 'High' ? 0.1 : confidence === 'Medium' ? 0.16 : 0.24;

  const baselineRemainingHours = Number((baselineRemainingMinutes / 60).toFixed(1));
  const adaptiveExpectedHours = Number(adjustedRemainingHours.toFixed(1));
  const adaptiveMinHours = Number((adaptiveExpectedHours * (1 - spread)).toFixed(1));
  const adaptiveMaxHours = Number((adaptiveExpectedHours * (1 + spread)).toFixed(1));
  const deltaHours = Number((adaptiveExpectedHours - baselineRemainingHours).toFixed(1));

  const remainingMonths = Number(
    (adaptiveExpectedHours / (effectiveWeeklyPace * 4.33)).toFixed(1)
  );
  const remainingMonthsMin = Number(
    (adaptiveMinHours / (effectiveWeeklyPace * 4.33)).toFixed(1)
  );
  const remainingMonthsMax = Number(
    (adaptiveMaxHours / (effectiveWeeklyPace * 4.33)).toFixed(1)
  );

  // Build per-bucket velocities across all observed + roadmap-active buckets
  const allBucketKeys = new Set([
    ...usedBucketKeys,
    ...Object.keys(forecastModel.buckets || forecastModel.multipliers || {})
  ]);
  const bucketVelocities = {};
  for (const key of allBucketKeys) {
    const [cat, diff] = key.split('::');
    bucketVelocities[key] = getEffectiveBucketVelocity(forecastModel, cat, diff);
  }

  // Trend analysis from recent valid session ratios (ratio = est / actual, higher = faster)
  const recentValid = Object.values(bucketVelocities)
    .flatMap((b) => b.history || [])
    .sort((a, b) => new Date(a.recordedAt || 0).getTime() - new Date(b.recordedAt || 0).getTime())
    .slice(-6);

  let trend = 'Stable';
  if (recentValid.length >= 2) {
    const avgRecentRatio =
      recentValid.reduce((sum, item) => sum + (Number(item.ratio) || 1), 0) / recentValid.length;
    if (avgRecentRatio >= 1.08) {
      trend = 'Improving';
    } else if (avgRecentRatio <= 0.9) {
      trend = 'Slower than expected';
    }
  }

  const expectedDateMin = addHoursToDateIso(adaptiveMinHours, effectiveWeeklyPace, now);
  const expectedDateMax = addHoursToDateIso(adaptiveMaxHours, effectiveWeeklyPace, now);
  const expectedDate = addHoursToDateIso(adaptiveExpectedHours, effectiveWeeklyPace, now);
  const baselineDate = addHoursToDateIso(baselineRemainingHours, safeTargetWeeklyHours, now);
  const expectedMonthRangeLabel = formatArabicMonthRange(expectedDateMin, expectedDateMax);

  const interruptedCount = Object.values(bucketVelocities).reduce(
    (sum, b) => sum + (b.interruptedCount || 0),
    0
  );

  return {
    baselineRemainingHours,
    adaptiveMinHours,
    adaptiveMaxHours,
    adaptiveExpectedHours,
    remainingMonths,
    remainingMonthsMin,
    remainingMonthsMax,
    expectedMonthRangeLabel,
    expectedDateMin,
    expectedDateMax,
    expectedDate,
    baselineDate,
    rollingWeeklyHours,
    targetWeeklyHours: safeTargetWeeklyHours,
    effectiveWeeklyHours: effectiveWeeklyPace,
    confidence,
    observationCount,
    interruptedCount,
    trend,
    deltaHours,
    bucketVelocities,
    perBucketVelocities: bucketVelocities,
    moduleBreakdown,
    completedBaselineHours: Number((completedBaselineMinutes / 60).toFixed(1)),
    completedActualHours: Number((completedActualMinutes / 60).toFixed(1))
  };
}
