// ==============================================================================
// ADAPTIVE LEARNING FORECAST ENGINE
// Pure weighted moving average estimator separated by (category, difficulty)
// ==============================================================================

export const TASK_CATEGORIES = [
  'Video / Reading',
  'Hands-on Lab',
  'Coding',
  'Troubleshooting',
  'Quiz',
  'Review',
  'Project Delivery'
];

export const TASK_DIFFICULTIES = ['Easy', 'Medium', 'Hard'];

export const DEFAULT_CATEGORY_BASELINES = {
  'Video / Reading': 1.0,
  'Hands-on Lab': 1.15,
  'Coding': 1.1,
  'Troubleshooting': 1.25,
  'Quiz': 1.0,
  'Review': 0.9,
  'Project Delivery': 1.2
};

function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val));
}

export function getBucketKey(category, difficulty) {
  const cat = TASK_CATEGORIES.includes(category) ? category : 'Hands-on Lab';
  const diff = TASK_DIFFICULTIES.includes(difficulty) ? difficulty : 'Medium';
  return `${cat}::${diff}`;
}

/**
 * Updates the forecast model using a completed study session or task telemetry.
 * Strictly isolates learning by (category, difficulty) using Weighted Moving Average:
 *   ratio = actualActiveMinutes / estimatedMinutes
 *   newMultiplier = 0.7 * oldMultiplier + 0.3 * ratio
 */
export function recordSessionObservation(forecastModel, observation) {
  const {
    category = 'Hands-on Lab',
    difficulty = 'Medium',
    estimatedMinutes,
    actualActiveMinutes,
    interrupted = false
  } = observation;

  // Guard against invalid durations or heavily corrupted interrupted anomalies
  if (!estimatedMinutes || estimatedMinutes <= 0 || !actualActiveMinutes || actualActiveMinutes <= 0) {
    return forecastModel;
  }

  const key = getBucketKey(category, difficulty);
  const existingBuckets = forecastModel?.multipliers || {};
  const baseline = DEFAULT_CATEGORY_BASELINES[category] || 1.0;
  const currentBucket = existingBuckets[key] || { value: baseline, n: 0, history: [] };

  // Dampen outlier single sessions & interrupted sessions so one abnormal day never skews everything
  const rawRatio = actualActiveMinutes / estimatedMinutes;
  const clampedRatio = clamp(rawRatio, 0.45, 2.3);
  const effectiveRatio = interrupted
    ? currentBucket.value * 0.85 + clampedRatio * 0.15
    : clampedRatio;

  const newMultiplier = Number((0.7 * currentBucket.value + 0.3 * effectiveRatio).toFixed(4));
  const nextHistory = [
    ...currentBucket.history.slice(-19),
    {
      ratio: Number(rawRatio.toFixed(2)),
      multiplier: newMultiplier,
      interrupted,
      recordedAt: new Date().toISOString()
    }
  ];

  return {
    multipliers: {
      ...existingBuckets,
      [key]: {
        value: newMultiplier,
        n: currentBucket.n + 1,
        history: nextHistory
      }
    },
    totalObservations: (forecastModel?.totalObservations || 0) + 1
  };
}

/**
 * Rebuilds the entire forecast model deterministically from studySessions array
 * (used when sessions are edited or deleted so multipliers stay accurate).
 */
export function rebuildForecastModelFromSessions(sessions = []) {
  let model = { multipliers: {}, totalObservations: 0 };
  const chronological = [...sessions].reverse();
  for (const sess of chronological) {
    if (sess.estimatedMinutes && sess.actualActiveMinutes) {
      model = recordSessionObservation(model, sess);
    }
  }
  return model;
}

/**
 * Returns the effective multiplier for a specific (category, difficulty) bucket,
 * blending conservatively toward baseline when observations n < 3.
 */
export function getEffectiveBucketMultiplier(forecastModel, category, difficulty) {
  const key = getBucketKey(category, difficulty);
  const bucket = forecastModel?.multipliers?.[key];
  const baseline = DEFAULT_CATEGORY_BASELINES[category] || 1.0;

  if (!bucket || bucket.n === 0) {
    return { multiplier: baseline, n: 0, confidence: 'Low', rawMultiplier: baseline };
  }

  // Require minimum observations before trusting fully
  if (bucket.n < 3) {
    const weight = bucket.n / 3;
    const blended = baseline * (1 - weight) + bucket.value * weight;
    return { multiplier: blended, n: bucket.n, confidence: 'Low', rawMultiplier: bucket.value };
  }

  const confidence = bucket.n >= 8 ? 'High' : 'Medium';
  return {
    multiplier: bucket.value,
    n: bucket.n,
    confidence,
    rawMultiplier: bucket.value
  };
}

/**
 * Computes comprehensive adaptive ETA & range metrics for the entire roadmap or a single module.
 */
export function computeAdaptiveForecast({
  modules,
  progress,
  weeklyStudyHours = 12
}) {
  const forecastModel = progress?.forecastModel || { multipliers: {}, totalObservations: 0 };
  const safeWeeklyHours = Math.max(1, Number(weeklyStudyHours) || 12);

  let baselineRemainingMinutes = 0;
  let expectedRemainingMinutes = 0;
  let completedBaselineMinutes = 0;
  let completedActualMinutes = 0;

  const moduleBreakdown = [];

  modules.forEach((mod) => {
    let modBaselineRem = 0;
    let modExpectedRem = 0;

    mod.topics.forEach((topic) => {
      const estMins = topic.estimatedMinutes || topic.hours * 60;
      const category = topic.category || 'Hands-on Lab';
      const difficulty = topic.difficulty || 'Medium';

      const totalSubs = topic.subtasks.length;
      const doneSubs = topic.subtasks.filter((s) =>
        progress.subtasks?.[s.id] !== undefined ? progress.subtasks[s.id] : s.done
      ).length;
      const explicitStatus = progress.topicStatus?.[topic.id] || topic.defaultStatus;

      const completionRatio =
        explicitStatus === 'done' ? 1 : totalSubs > 0 ? doneSubs / totalSubs : 0;
      const remainingRatio = Math.max(0, 1 - completionRatio);

      const topicTelemetry = progress.taskTelemetry?.[topic.id];
      if (completionRatio > 0) {
        completedBaselineMinutes += estMins * completionRatio;
        completedActualMinutes +=
          topicTelemetry?.actualActiveMinutes || estMins * completionRatio;
      }

      if (remainingRatio > 0) {
        const { multiplier } = getEffectiveBucketMultiplier(forecastModel, category, difficulty);
        const baseRem = estMins * remainingRatio;
        const expRem = baseRem * multiplier;

        baselineRemainingMinutes += baseRem;
        expectedRemainingMinutes += expRem;
        modBaselineRem += baseRem;
        modExpectedRem += expRem;
      }
    });

    moduleBreakdown.push({
      id: mod.id,
      number: mod.number,
      title: mod.title,
      baselineRemainingHours: Number((modBaselineRem / 60).toFixed(1)),
      expectedRemainingHours: Number((modExpectedRem / 60).toFixed(1))
    });
  });

  const n = forecastModel.totalObservations || 0;
  const globalConfidence = n >= 8 ? 'High' : n >= 3 ? 'Medium' : 'Low';

  // Uncertainty band narrows as confidence grows
  const spread = globalConfidence === 'High' ? 0.12 : globalConfidence === 'Medium' ? 0.18 : 0.25;

  const expectedHours = Number((expectedRemainingMinutes / 60).toFixed(1));
  const optimisticHours = Number((expectedHours * (1 - spread)).toFixed(1));
  const conservativeHours = Number((expectedHours * (1 + spread)).toFixed(1));
  const originalPlanRemainingHours = Number((baselineRemainingMinutes / 60).toFixed(1));
  const deltaHours = Number((expectedHours - originalPlanRemainingHours).toFixed(1));

  // Trend analysis from recent observations across buckets
  const allRecent = Object.values(forecastModel.multipliers || {})
    .flatMap((b) => b.history || [])
    .slice(-6);

  let trend = 'Stable';
  if (allRecent.length >= 2) {
    const avgRatio = allRecent.reduce((acc, item) => acc + item.ratio, 0) / allRecent.length;
    if (avgRatio <= 0.92) trend = 'Improving';
    else if (avgRatio >= 1.15) trend = 'Slower than expected';
  }

  // Expected completion date calculation
  const weeksRemaining = expectedHours / safeWeeklyHours;
  const daysRemaining = Math.ceil(weeksRemaining * 7);
  const expectedDate = new Date();
  expectedDate.setDate(expectedDate.getDate() + daysRemaining);

  const originalWeeks = originalPlanRemainingHours / safeWeeklyHours;
  const originalDate = new Date();
  originalDate.setDate(originalDate.getDate() + Math.ceil(originalWeeks * 7));

  return {
    optimisticHours,
    expectedHours,
    conservativeHours,
    originalPlanRemainingHours,
    deltaHours,
    completedBaselineHours: Number((completedBaselineMinutes / 60).toFixed(1)),
    completedActualHours: Number((completedActualMinutes / 60).toFixed(1)),
    weeklyStudyHours: safeWeeklyHours,
    weeksRemaining: Number(weeksRemaining.toFixed(1)),
    expectedCompletionDate: expectedDate.toISOString().split('T')[0],
    originalCompletionDate: originalDate.toISOString().split('T')[0],
    confidence: globalConfidence,
    observationCount: n,
    trend,
    moduleBreakdown,
    bucketMultipliers: forecastModel.multipliers || {}
  };
}
