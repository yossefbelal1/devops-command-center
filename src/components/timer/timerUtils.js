export const STUDY_CATEGORIES = [
  { value: 'video', label: 'فيديو / قراءة (Video)' },
  { value: 'lab', label: 'لاب عملي (Lab)' },
  { value: 'coding', label: 'برمجة (Coding)' },
  { value: 'troubleshooting', label: 'تشخيص أعطال (Troubleshooting)' },
  { value: 'quiz', label: 'كويز / اختبار (Quiz)' },
  { value: 'review', label: 'مراجعة (Review)' },
  { value: 'project', label: 'مشروع (Project)' }
];

export const STUDY_DIFFICULTIES = [
  { value: 'beginner', label: 'مبتدئ (Beginner)' },
  { value: 'intermediate', label: 'متوسط (Intermediate)' },
  { value: 'advanced', label: 'متقدم (Advanced)' }
];

const CATEGORY_MAP = {
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

const DIFFICULTY_MAP = {
  beginner: 'beginner',
  easy: 'beginner',
  intermediate: 'intermediate',
  medium: 'intermediate',
  advanced: 'advanced',
  hard: 'advanced'
};

export function normalizeCategory(raw) {
  if (!raw) return 'lab';
  const key = String(raw).trim().toLowerCase();
  return CATEGORY_MAP[key] || 'lab';
}

export function normalizeDifficulty(raw) {
  if (!raw) return 'intermediate';
  const key = String(raw).trim().toLowerCase();
  return DIFFICULTY_MAP[key] || 'intermediate';
}

export function toEpochMs(value) {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Date.parse(value);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return null;
}

/**
 * Computes activeSeconds and pausedSeconds strictly separately.
 * Paused intervals never inflate activeSeconds.
 */
export function getTimerDurations(activeTimer, nowMs = Date.now()) {
  if (!activeTimer) {
    return { activeSeconds: 0, pausedSeconds: 0, isRunning: false, isPaused: false };
  }

  const isRunning = Boolean(
    activeTimer.isRunning !== undefined
      ? activeTimer.isRunning
      : activeTimer.status === 'running'
  );

  const baseActiveMs = Math.max(0, Number(activeTimer.accumulatedActiveMs || 0));
  const basePausedMs = Math.max(0, Number(activeTimer.accumulatedPausedMs || 0));

  if (isRunning) {
    const runningSince =
      toEpochMs(activeTimer.lastResumedAt) ??
      toEpochMs(activeTimer.resumedAt) ??
      toEpochMs(activeTimer.startedAt) ??
      nowMs;
    const currentRunMs = Math.max(0, nowMs - runningSince);
    return {
      activeSeconds: Math.floor((baseActiveMs + currentRunMs) / 1000),
      pausedSeconds: Math.floor(basePausedMs / 1000),
      isRunning: true,
      isPaused: false
    };
  }

  const pausedSince = toEpochMs(activeTimer.pausedAt) ?? nowMs;
  const currentPauseMs = Math.max(0, nowMs - pausedSince);
  return {
    activeSeconds: Math.floor(baseActiveMs / 1000),
    pausedSeconds: Math.floor((basePausedMs + currentPauseMs) / 1000),
    isRunning: false,
    isPaused: true
  };
}

export function formatDuration(totalSeconds) {
  const safe = Math.max(0, Math.floor(Number(totalSeconds) || 0));
  const hrs = Math.floor(safe / 3600);
  const mins = Math.floor((safe % 3600) / 60);
  const secs = safe % 60;
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${mm}:${ss}`;
  }
  return `${mm}:${ss}`;
}
