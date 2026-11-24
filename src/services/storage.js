// ==============================================================================
// INDEXEDDB STORAGE ENGINE, LEGACY MIGRATION, TWO-LEVEL PROGRESS & BACKUP/RESTORE
// ==============================================================================

export const DB_NAME = 'devops_command_center_db';
export const DB_VERSION = 1;

export const STORES = {
  TASK_PROGRESS: 'taskProgress',
  STUDY_SESSIONS: 'studySessions',
  QUIZ_ATTEMPTS: 'quizAttempts',
  HIVEBOX_CHECKS: 'hiveboxChecks',
  SETTINGS: 'settings',
  AUDIT_LOG: 'auditLog'
};

export const ALL_STORE_NAMES = Object.values(STORES);

export const LEGACY_LOCALSTORAGE_KEYS = [
  'devops_command_center_v6_youssef',
  'devops_command_center_v5_react',
  'devops_command_center_fallback'
];

export const SUMMARY_LOCALSTORAGE_KEY = 'devops_command_center_summary';
export const FALLBACK_LOCALSTORAGE_KEY = 'devops_command_center_fallback';

export const EXECUTION_STATUSES = ['not_started', 'in_progress', 'completed'];
export const MASTERY_STATUSES = ['unverified', 'practiced', 'mastered'];
export const REVIEW_INTERVAL_DAYS = 30;
export const SCHEMA_VERSION = 2;

export const DEFAULT_APP_STATE = {
  schemaVersion: SCHEMA_VERSION,
  migratedFrom: null,
  migratedAt: null,
  updatedAt: null,
  targetWeeklyHours: 7.5,
  weeklyStudyHours: 7.5,
  subtasks: {},
  topicStatus: {},
  topicProgress: {},
  topicNotes: {},
  taskTelemetry: {},
  hivebox: {},
  hiveboxColumns: {},
  audit: {},
  quizzes: {},
  studySessions: [],
  forecastModel: {
    buckets: {},
    multipliers: {},
    totalObservations: 0
  },
  activeTimer: null,
  auditLog: []
};

function isPlainObject(val) {
  return Boolean(val) && typeof val === 'object' && !Array.isArray(val);
}

function cloneData(val) {
  if (val === undefined || val === null) return val;
  if (typeof structuredClone === 'function') {
    return structuredClone(val);
  }
  return JSON.parse(JSON.stringify(val));
}

function nowIso() {
  return new Date().toISOString();
}

function createId(prefix = 'id') {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// ==============================================================================
// TWO-LEVEL PROGRESS & 30-DAY REVIEW HELPERS
// ==============================================================================

/**
 * Normalizes legacy ('pending' | 'in_progress' | 'done') and v2 execution statuses.
 */
export function normalizeExecutionStatus(status) {
  if (status === 'completed' || status === 'done') return 'completed';
  if (status === 'in_progress') return 'in_progress';
  return 'not_started';
}

/**
 * Converts v2 executionStatus back to legacy topicStatus for backward-compatible UI.
 */
export function toLegacyTopicStatus(executionStatus) {
  const norm = normalizeExecutionStatus(executionStatus);
  if (norm === 'completed') return 'done';
  if (norm === 'in_progress') return 'in_progress';
  return 'pending';
}

/**
 * Normalizes masteryStatus to ('unverified' | 'practiced' | 'mastered').
 */
export function normalizeMasteryStatus(status) {
  if (status === 'mastered') return 'mastered';
  if (status === 'practiced') return 'practiced';
  return 'unverified';
}

/**
 * Creates a normalized taskProgress record for a topic.
 */
export function createTaskProgressRecord(topicId, overrides = {}) {
  const executionStatus = normalizeExecutionStatus(
    overrides.executionStatus ?? overrides.status
  );
  const masteryStatus = normalizeMasteryStatus(overrides.masteryStatus);
  const confNum = Number(overrides.confidence);
  const confidence =
    overrides.confidence !== null &&
    overrides.confidence !== undefined &&
    Number.isFinite(confNum) &&
    confNum >= 1 &&
    confNum <= 5
      ? Math.round(confNum)
      : null;

  return {
    id: topicId,
    recordType: 'topic',
    topicId,
    executionStatus,
    masteryStatus,
    confidence,
    completedAt: overrides.completedAt || null,
    lastReviewedAt: overrides.lastReviewedAt || null,
    note: typeof overrides.note === 'string' ? overrides.note : '',
    telemetry: isPlainObject(overrides.telemetry) ? { ...overrides.telemetry } : null,
    updatedAt: overrides.updatedAt || nowIso()
  };
}

/**
 * Updates a taskProgress record cleanly, maintaining completedAt and lastReviewedAt timestamps.
 */
export function updateTaskProgress(existingRecord, patch = {}, now = new Date()) {
  const timestamp = (now instanceof Date ? now : new Date(now)).toISOString();
  const base = existingRecord
    ? createTaskProgressRecord(existingRecord.topicId || existingRecord.id, existingRecord)
    : createTaskProgressRecord(patch.topicId || patch.id || 'unknown');

  const nextExecution =
    patch.executionStatus !== undefined || patch.status !== undefined
      ? normalizeExecutionStatus(patch.executionStatus ?? patch.status)
      : base.executionStatus;

  const nextMastery =
    patch.masteryStatus !== undefined
      ? normalizeMasteryStatus(patch.masteryStatus)
      : base.masteryStatus;

  let completedAt = patch.completedAt !== undefined ? patch.completedAt : base.completedAt;
  if (nextExecution === 'completed' && !completedAt) {
    completedAt = timestamp;
  } else if (nextExecution === 'not_started' && patch.completedAt === undefined) {
    completedAt = null;
  }

  let lastReviewedAt =
    patch.lastReviewedAt !== undefined ? patch.lastReviewedAt : base.lastReviewedAt;
  if (patch.markReviewed || (patch.masteryStatus !== undefined && nextMastery !== 'unverified')) {
    lastReviewedAt = timestamp;
  }

  return {
    ...base,
    ...patch,
    id: base.topicId,
    recordType: 'topic',
    topicId: base.topicId,
    executionStatus: nextExecution,
    masteryStatus: nextMastery,
    completedAt,
    lastReviewedAt,
    updatedAt: timestamp
  };
}

/**
 * Computes full days elapsed since a topic's last review (or completion date).
 */
export function getDaysSinceReview(record, referenceNow = new Date()) {
  if (!record) return null;
  const anchor = record.lastReviewedAt || record.completedAt;
  if (!anchor) return null;
  const anchorMs = new Date(anchor).getTime();
  const nowMs =
    referenceNow instanceof Date ? referenceNow.getTime() : new Date(referenceNow).getTime();
  if (Number.isNaN(anchorMs) || Number.isNaN(nowMs)) return null;
  return Math.max(0, Math.floor((nowMs - anchorMs) / (1000 * 60 * 60 * 24)));
}

/**
 * Returns true if a completed/practiced/mastered topic has not been reviewed in >= 30 days.
 */
export function needsReview(
  record,
  referenceNow = new Date(),
  thresholdDays = REVIEW_INTERVAL_DAYS
) {
  if (!record) return false;
  const exec = normalizeExecutionStatus(record.executionStatus ?? record.status);
  const mastery = normalizeMasteryStatus(record.masteryStatus);
  if (exec !== 'completed' && mastery === 'unverified') return false;

  const anchor = record.lastReviewedAt || record.completedAt;
  if (!anchor) return exec === 'completed' || mastery !== 'unverified';

  const anchorMs = new Date(anchor).getTime();
  const nowMs =
    referenceNow instanceof Date ? referenceNow.getTime() : new Date(referenceNow).getTime();
  if (Number.isNaN(anchorMs) || Number.isNaN(nowMs)) return false;

  const elapsedDays = (nowMs - anchorMs) / (1000 * 60 * 60 * 24);
  return elapsedDays >= thresholdDays;
}

/**
 * Filters a topicProgress map/array and returns all topic records due for 30-day review.
 */
export function getTopicsNeedingReview(
  topicProgressMap = {},
  referenceNow = new Date(),
  thresholdDays = REVIEW_INTERVAL_DAYS
) {
  const entries = Array.isArray(topicProgressMap)
    ? topicProgressMap
    : Object.values(topicProgressMap || {});
  return entries.filter((rec) => needsReview(rec, referenceNow, thresholdDays));
}

// ==============================================================================
// INDEXEDDB PRIMITIVES
// ==============================================================================

function createObjectStores(db) {
  if (!db.objectStoreNames.contains(STORES.TASK_PROGRESS)) {
    db.createObjectStore(STORES.TASK_PROGRESS, { keyPath: 'id' });
  }
  if (!db.objectStoreNames.contains(STORES.STUDY_SESSIONS)) {
    db.createObjectStore(STORES.STUDY_SESSIONS, { keyPath: 'id' });
  }
  if (!db.objectStoreNames.contains(STORES.QUIZ_ATTEMPTS)) {
    db.createObjectStore(STORES.QUIZ_ATTEMPTS, { keyPath: 'id' });
  }
  if (!db.objectStoreNames.contains(STORES.HIVEBOX_CHECKS)) {
    db.createObjectStore(STORES.HIVEBOX_CHECKS, { keyPath: 'id' });
  }
  if (!db.objectStoreNames.contains(STORES.SETTINGS)) {
    db.createObjectStore(STORES.SETTINGS, { keyPath: 'key' });
  }
  if (!db.objectStoreNames.contains(STORES.AUDIT_LOG)) {
    db.createObjectStore(STORES.AUDIT_LOG, { keyPath: 'id' });
  }
}

function rawOpenDb(version = DB_VERSION) {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is unavailable'));
      return;
    }
    const request = indexedDB.open(DB_NAME, version);
    request.onupgradeneeded = (event) => {
      createObjectStores(event.target.result);
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error || new Error('Failed to open IndexedDB'));
  });
}

function readLegacyAppStateStore(db) {
  return new Promise((resolve) => {
    if (!db.objectStoreNames.contains('app_state')) {
      resolve(null);
      return;
    }
    try {
      const tx = db.transaction('app_state', 'readonly');
      const req = tx.objectStore('app_state').get('user_progress_v1');
      req.onsuccess = () => resolve(req.result || null);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
}

function deleteDatabase() {
  return new Promise((resolve, reject) => {
    const req = indexedDB.deleteDatabase(DB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error || new Error('Failed to recreate IndexedDB'));
    req.onblocked = () => resolve();
  });
}

let legacySingleStoreSnapshot = null;

async function openDatabase() {
  const db = await rawOpenDb(DB_VERSION);
  const hasAllStores = ALL_STORE_NAMES.every((name) => db.objectStoreNames.contains(name));
  if (hasAllStores) return db;

  // Handle transition from an earlier single-store v1 DB without losing data
  legacySingleStoreSnapshot = await readLegacyAppStateStore(db);
  db.close();
  await deleteDatabase();
  const upgradedDb = await rawOpenDb(DB_VERSION);
  return upgradedDb;
}

function idbGetAll(db, storeName) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const req = tx.objectStore(storeName).getAll();
    req.onsuccess = () => resolve(req.result || []);
    req.onerror = () => reject(req.error);
  });
}

function idbPutRecord(db, storeName, record) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const req = tx.objectStore(storeName).put(record);
    req.onsuccess = () => resolve(record);
    req.onerror = () => reject(req.error);
  });
}

function idbDeleteRecord(db, storeName, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    const req = tx.objectStore(storeName).delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function writeAllStoresTransaction(db, storePayloads, { clearExisting = true } = {}) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(ALL_STORE_NAMES, 'readwrite');
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error || new Error('IndexedDB transaction failed'));
    tx.onabort = () => reject(tx.error || new Error('IndexedDB transaction aborted'));

    for (const storeName of ALL_STORE_NAMES) {
      const store = tx.objectStore(storeName);
      if (clearExisting) {
        store.clear();
      }
      const records = storePayloads[storeName] || [];
      for (const rec of records) {
        store.put(rec);
      }
    }
  });
}

async function readAllStoresRaw(db) {
  const entries = await Promise.all(
    ALL_STORE_NAMES.map(async (storeName) => [storeName, await idbGetAll(db, storeName)])
  );
  return Object.fromEntries(entries);
}

// ==============================================================================
// STATE <-> STRUCTURED STORES SERIALIZATION
// ==============================================================================

function normalizeStudySession(session = {}) {
  const estimatedMinutes = Number(session.estimatedMinutes) || 0;
  const actualActiveMinutes =
    session.actualActiveMinutes !== undefined
      ? Number(session.actualActiveMinutes) || 0
      : session.hours
      ? Math.round(Number(session.hours) * 60)
      : 0;
  const pausedMinutes = Number(session.pausedMinutes) || 0;
  const hours =
    session.hours !== undefined
      ? Number(session.hours)
      : Number((actualActiveMinutes / 60).toFixed(2));

  return {
    id: session.id || createId('sess'),
    topicId: session.topicId || null,
    topicTitle: session.topicTitle || session.topic || 'Study Session',
    topic: session.topic || session.topicTitle || 'Study Session',
    date: session.date || (session.completedAt ? session.completedAt.split('T')[0] : nowIso().split('T')[0]),
    startedAt: session.startedAt || null,
    completedAt: session.completedAt || (session.date ? `${session.date}T12:00:00.000Z` : nowIso()),
    estimatedMinutes,
    actualActiveMinutes,
    pausedMinutes,
    hours,
    category: session.category || 'lab',
    difficulty: session.difficulty || 'intermediate',
    attempts: Number(session.attempts) || 1,
    confidence: session.confidence !== undefined ? Number(session.confidence) : 3,
    interrupted: Boolean(session.interrupted),
    note: session.note ?? session.notes ?? '',
    notes: session.notes ?? session.note ?? '',
    evidenceUrl: session.evidenceUrl || session.evidence || '',
    updatedAt: session.updatedAt || nowIso()
  };
}

export function normalizeAppState(rawData = {}) {
  const data = isPlainObject(rawData) ? rawData : {};
  const targetWeeklyHours = Number(data.targetWeeklyHours ?? data.weeklyStudyHours) || 7.5;

  const subtasks = isPlainObject(data.subtasks) ? { ...data.subtasks } : {};
  const topicNotes = isPlainObject(data.topicNotes) ? { ...data.topicNotes } : {};
  const taskTelemetry = isPlainObject(data.taskTelemetry) ? cloneData(data.taskTelemetry) : {};

  // Build unified topicProgress + legacy topicStatus
  const topicProgress = {};
  const topicStatus = {};

  const allTopicIds = new Set([
    ...Object.keys(isPlainObject(data.topicProgress) ? data.topicProgress : {}),
    ...Object.keys(isPlainObject(data.topicStatus) ? data.topicStatus : {}),
    ...Object.keys(topicNotes),
    ...Object.keys(taskTelemetry)
  ]);

  for (const topicId of allTopicIds) {
    const rawProg = isPlainObject(data.topicProgress?.[topicId]) ? data.topicProgress[topicId] : {};
    const legacyStatus = data.topicStatus?.[topicId];
    const record = createTaskProgressRecord(topicId, {
      ...rawProg,
      executionStatus: rawProg.executionStatus ?? legacyStatus,
      note: rawProg.note ?? topicNotes[topicId] ?? '',
      telemetry: rawProg.telemetry ?? taskTelemetry[topicId] ?? null
    });
    topicProgress[topicId] = record;
    topicStatus[topicId] = toLegacyTopicStatus(record.executionStatus);
    if (record.note) topicNotes[topicId] = record.note;
    if (record.telemetry) taskTelemetry[topicId] = record.telemetry;
  }

  const hivebox = isPlainObject(data.hivebox) ? { ...data.hivebox } : {};
  const hiveboxColumns = isPlainObject(data.hiveboxColumns) ? { ...data.hiveboxColumns } : {};
  const audit = isPlainObject(data.audit) ? { ...data.audit } : {};

  const quizzes = {};
  if (isPlainObject(data.quizzes)) {
    for (const [quizId, questions] of Object.entries(data.quizzes)) {
      if (!isPlainObject(questions)) continue;
      quizzes[quizId] = {};
      for (const [qId, qData] of Object.entries(questions)) {
        if (!isPlainObject(qData)) continue;
        quizzes[quizId][qId] = {
          selected: qData.selected ?? null,
          solved: Boolean(qData.solved),
          revealed: Boolean(qData.revealed),
          attempts: Number(qData.attempts) || (qData.solved || qData.revealed ? 1 : 0),
          confidence: qData.confidence ?? null,
          timeSpentSec: Number(qData.timeSpentSec) || 0,
          attemptedAt: qData.attemptedAt || null
        };
      }
    }
  }

  const studySessions = Array.isArray(data.studySessions)
    ? data.studySessions.map(normalizeStudySession).sort((a, b) => {
        const ta = new Date(a.completedAt || a.date || 0).getTime();
        const tb = new Date(b.completedAt || b.date || 0).getTime();
        return tb - ta;
      })
    : [];

  const forecastModel = {
    buckets: cloneData(data.forecastModel?.buckets || data.forecastModel?.multipliers || {}),
    multipliers: cloneData(data.forecastModel?.multipliers || data.forecastModel?.buckets || {}),
    totalObservations: Number(data.forecastModel?.totalObservations) || 0
  };

  return {
    schemaVersion: SCHEMA_VERSION,
    migratedFrom: data.migratedFrom || null,
    migratedAt: data.migratedAt || null,
    updatedAt: data.updatedAt || null,
    targetWeeklyHours,
    weeklyStudyHours: targetWeeklyHours,
    subtasks,
    topicStatus,
    topicProgress,
    topicNotes,
    taskTelemetry,
    hivebox,
    hiveboxColumns,
    audit,
    quizzes,
    studySessions,
    forecastModel,
    activeTimer: isPlainObject(data.activeTimer) ? cloneData(data.activeTimer) : null,
    auditLog: Array.isArray(data.auditLog) ? cloneData(data.auditLog).slice(0, 250) : []
  };
}

function stateToStorePayloads(state) {
  const normalized = normalizeAppState(state);
  const timestamp = normalized.updatedAt || nowIso();

  const taskProgressRecords = [];
  for (const [topicId, rec] of Object.entries(normalized.topicProgress)) {
    taskProgressRecords.push({
      ...rec,
      id: topicId,
      recordType: 'topic',
      topicId
    });
  }
  for (const [subtaskId, done] of Object.entries(normalized.subtasks)) {
    taskProgressRecords.push({
      id: `subtask::${subtaskId}`,
      recordType: 'subtask',
      subtaskId,
      done: Boolean(done),
      updatedAt: timestamp
    });
  }

  const studySessionRecords = normalized.studySessions.map((s) => ({ ...s }));

  const quizAttemptRecords = [];
  for (const [quizId, questions] of Object.entries(normalized.quizzes)) {
    for (const [questionId, qData] of Object.entries(questions)) {
      quizAttemptRecords.push({
        id: `${quizId}::${questionId}`,
        quizId,
        questionId,
        ...qData
      });
    }
  }

  const hiveboxCheckRecords = [];
  for (const [checkId, done] of Object.entries(normalized.hivebox)) {
    hiveboxCheckRecords.push({
      id: `hivebox::${checkId}`,
      checkId,
      checkType: 'hivebox',
      done: Boolean(done),
      updatedAt: timestamp
    });
  }
  for (const [auditId, done] of Object.entries(normalized.audit)) {
    hiveboxCheckRecords.push({
      id: `audit::${auditId}`,
      checkId: auditId,
      checkType: 'audit',
      done: Boolean(done),
      updatedAt: timestamp
    });
  }

  const settingsRecords = [
    {
      key: 'preferences',
      schemaVersion: SCHEMA_VERSION,
      migratedFrom: normalized.migratedFrom,
      migratedAt: normalized.migratedAt,
      updatedAt: timestamp,
      targetWeeklyHours: normalized.targetWeeklyHours,
      weeklyStudyHours: normalized.targetWeeklyHours,
      activeTimer: normalized.activeTimer,
      hiveboxColumns: normalized.hiveboxColumns
    },
    {
      key: 'forecastModel',
      value: normalized.forecastModel,
      updatedAt: timestamp
    }
  ];

  const auditLogRecords = (normalized.auditLog || []).map((entry) => ({
    id: entry.id || createId('log'),
    timestamp: entry.timestamp || timestamp,
    action: entry.action || 'event',
    entityType: entry.entityType || 'system',
    entityId: entry.entityId || null,
    details: entry.details || null
  }));

  return {
    [STORES.TASK_PROGRESS]: taskProgressRecords,
    [STORES.STUDY_SESSIONS]: studySessionRecords,
    [STORES.QUIZ_ATTEMPTS]: quizAttemptRecords,
    [STORES.HIVEBOX_CHECKS]: hiveboxCheckRecords,
    [STORES.SETTINGS]: settingsRecords,
    [STORES.AUDIT_LOG]: auditLogRecords
  };
}

function storePayloadsToState(rawStores) {
  const settingsArr = rawStores[STORES.SETTINGS] || [];
  const prefs = settingsArr.find((r) => r.key === 'preferences') || {};
  const forecastRec = settingsArr.find((r) => r.key === 'forecastModel');

  const subtasks = {};
  const topicProgress = {};
  const topicStatus = {};
  const topicNotes = {};
  const taskTelemetry = {};

  for (const rec of rawStores[STORES.TASK_PROGRESS] || []) {
    if (rec.recordType === 'subtask' || String(rec.id).startsWith('subtask::')) {
      const subId = rec.subtaskId || String(rec.id).replace(/^subtask::/, '');
      subtasks[subId] = Boolean(rec.done);
    } else {
      const topicId = rec.topicId || rec.id;
      const normalizedRec = createTaskProgressRecord(topicId, rec);
      topicProgress[topicId] = normalizedRec;
      topicStatus[topicId] = toLegacyTopicStatus(normalizedRec.executionStatus);
      if (normalizedRec.note) topicNotes[topicId] = normalizedRec.note;
      if (normalizedRec.telemetry) taskTelemetry[topicId] = normalizedRec.telemetry;
    }
  }

  const hivebox = {};
  const audit = {};
  for (const rec of rawStores[STORES.HIVEBOX_CHECKS] || []) {
    if (rec.checkType === 'audit' || String(rec.id).startsWith('audit::')) {
      const auditId = rec.checkId || String(rec.id).replace(/^audit::/, '');
      audit[auditId] = Boolean(rec.done);
    } else {
      const checkId = rec.checkId || String(rec.id).replace(/^hivebox::/, '');
      hivebox[checkId] = Boolean(rec.done);
    }
  }

  const quizzes = {};
  for (const rec of rawStores[STORES.QUIZ_ATTEMPTS] || []) {
    const quizId = rec.quizId;
    const questionId = rec.questionId;
    if (!quizId || !questionId) continue;
    if (!quizzes[quizId]) quizzes[quizId] = {};
    quizzes[quizId][questionId] = {
      selected: rec.selected ?? null,
      solved: Boolean(rec.solved),
      revealed: Boolean(rec.revealed),
      attempts: Number(rec.attempts) || 0,
      confidence: rec.confidence ?? null,
      timeSpentSec: Number(rec.timeSpentSec) || 0,
      attemptedAt: rec.attemptedAt || null
    };
  }

  const studySessions = (rawStores[STORES.STUDY_SESSIONS] || [])
    .map(normalizeStudySession)
    .sort((a, b) => {
      const ta = new Date(a.completedAt || a.date || 0).getTime();
      const tb = new Date(b.completedAt || b.date || 0).getTime();
      return tb - ta;
    });

  const auditLog = [...(rawStores[STORES.AUDIT_LOG] || [])].sort(
    (a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime()
  );

  return normalizeAppState({
    schemaVersion: prefs.schemaVersion || SCHEMA_VERSION,
    migratedFrom: prefs.migratedFrom || null,
    migratedAt: prefs.migratedAt || null,
    updatedAt: prefs.updatedAt || null,
    targetWeeklyHours: prefs.targetWeeklyHours ?? prefs.weeklyStudyHours ?? 7.5,
    weeklyStudyHours: prefs.weeklyStudyHours ?? prefs.targetWeeklyHours ?? 7.5,
    activeTimer: prefs.activeTimer || null,
    forecastModel: forecastRec?.value || DEFAULT_APP_STATE.forecastModel,
    subtasks,
    topicStatus,
    topicProgress,
    topicNotes,
    taskTelemetry,
    hivebox,
    hiveboxColumns: prefs.hiveboxColumns || {},
    audit,
    quizzes,
    studySessions,
    auditLog
  });
}

// ==============================================================================
// LOCALSTORAGE MIRRORING & LEGACY MIGRATION
// ==============================================================================

function readLegacyLocalStorage() {
  for (const key of LEGACY_LOCALSTORAGE_KEYS) {
    try {
      if (typeof localStorage === 'undefined') return null;
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const parsed = JSON.parse(raw);
      if (isPlainObject(parsed)) {
        return { key, data: parsed };
      }
    } catch (err) {
      console.warn(`Failed reading legacy localStorage key ${key}:`, err);
    }
  }
  return null;
}

export function buildSummarySnapshot(state) {
  const s = normalizeAppState(state);
  const topicsCompleted = Object.values(s.topicProgress).filter(
    (t) => t.executionStatus === 'completed'
  ).length;
  const topicsMastered = Object.values(s.topicProgress).filter(
    (t) => t.masteryStatus === 'mastered'
  ).length;
  const subtasksDone = Object.values(s.subtasks).filter(Boolean).length;
  const hiveboxDone = Object.values(s.hivebox).filter(Boolean).length;
  const totalActiveMinutes = s.studySessions.reduce(
    (acc, sess) => acc + (Number(sess.actualActiveMinutes) || 0),
    0
  );

  return {
    schemaVersion: SCHEMA_VERSION,
    updatedAt: s.updatedAt || nowIso(),
    targetWeeklyHours: s.targetWeeklyHours,
    activeTimer: s.activeTimer,
    counts: {
      topicsCompleted,
      topicsMastered,
      subtasksDone,
      studySessions: s.studySessions.length,
      hiveboxDone,
      quizQuestionsTracked: Object.values(s.quizzes).reduce(
        (sum, qMap) => sum + Object.keys(qMap).length,
        0
      )
    },
    totals: {
      totalActiveMinutes,
      totalActiveHours: Number((totalActiveMinutes / 60).toFixed(1))
    }
  };
}

export function mirrorSummaryToLocalStorage(state) {
  if (typeof localStorage === 'undefined') return null;
  const summary = buildSummarySnapshot(state);
  try {
    localStorage.setItem(SUMMARY_LOCALSTORAGE_KEY, JSON.stringify(summary));
  } catch {
    // Ignore storage quota errors
  }
  return summary;
}

export function getMirroredSummary() {
  if (typeof localStorage === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SUMMARY_LOCALSTORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function createAuditEntry(action, entityType, entityId = null, details = null) {
  return {
    id: createId('audit'),
    timestamp: nowIso(),
    action,
    entityType,
    entityId,
    details
  };
}

// ==============================================================================
// SERVER SYNC HELPERS (/api/state)
// ==============================================================================

let lastSyncMeta = {
  status: 'offline',
  lastSyncedAt: null
};

export function getLastSyncMeta() {
  return { ...lastSyncMeta };
}

export function isFreshDefaultState(state) {
  if (!isPlainObject(state)) return true;
  const hasTopicProgress = Object.values(state.topicProgress || {}).some(
    (t) =>
      t.executionStatus !== 'not_started' ||
      t.masteryStatus !== 'unverified' ||
      Boolean(t.note) ||
      t.confidence !== null ||
      Boolean(t.completedAt) ||
      Boolean(t.lastReviewedAt)
  );
  const hasSubtasks = Object.keys(state.subtasks || {}).length > 0;
  const hasSessions = Array.isArray(state.studySessions) && state.studySessions.length > 0;
  const hasQuizzes = Object.values(state.quizzes || {}).some(
    (qMap) => Object.keys(qMap || {}).length > 0
  );
  const hasHivebox = Object.keys(state.hivebox || {}).length > 0;
  const hasHiveboxCols = Object.keys(state.hiveboxColumns || {}).length > 0;
  const hasAuditChecks = Object.keys(state.audit || {}).length > 0;
  const hasActiveTimer = Boolean(state.activeTimer);
  const hasMeaningfulAudit = (state.auditLog || []).some(
    (entry) => entry?.action && entry.action !== 'reset'
  );
  const customWeeklyHours = Number(state.targetWeeklyHours) !== 7.5;

  return !(
    hasTopicProgress ||
    hasSubtasks ||
    hasSessions ||
    hasQuizzes ||
    hasHivebox ||
    hasHiveboxCols ||
    hasAuditChecks ||
    hasActiveTimer ||
    hasMeaningfulAudit ||
    customWeeklyHours ||
    Boolean(state.migratedFrom)
  );
}

/**
 * Fetches persisted state from Python server (`/api/state`) with a 1500ms timeout.
 * Never throws; returns `{ ok: false, offline: true, state: null, updatedAt: null }` when unreachable.
 */
export async function fetchServerState({ timeoutMs = 1500 } = {}) {
  if (typeof fetch !== 'function') {
    return { ok: false, offline: true, state: null, updatedAt: null };
  }

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timerId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetch('/api/state', {
      method: 'GET',
      cache: 'no-store',
      headers: { Accept: 'application/json' },
      signal: controller ? controller.signal : undefined
    });
    if (!res.ok) {
      return { ok: false, offline: true, state: null, updatedAt: null };
    }
    const data = await res.json();
    if (!isPlainObject(data) || data.ok === false) {
      return { ok: false, offline: true, state: null, updatedAt: null };
    }
    const serverState = isPlainObject(data.state) ? normalizeAppState(data.state) : null;
    const updatedAt = data.updatedAt || serverState?.updatedAt || null;
    lastSyncMeta = {
      status: 'synced',
      lastSyncedAt: updatedAt || lastSyncMeta.lastSyncedAt
    };
    return { ok: true, offline: false, state: serverState, updatedAt };
  } catch {
    return { ok: false, offline: true, state: null, updatedAt: null };
  } finally {
    if (timerId) clearTimeout(timerId);
  }
}

/**
 * Pushes application state to `/api/state`.
 * Never throws; returns `{ ok, offline, updatedAt }`.
 */
export async function pushServerState(state, { timeoutMs = 3000 } = {}) {
  if (typeof fetch !== 'function') {
    lastSyncMeta = { ...lastSyncMeta, status: 'offline' };
    return { ok: false, offline: true, updatedAt: null };
  }

  const payloadState = normalizeAppState(state);
  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timerId = controller ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const res = await fetch('/api/state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ state: payloadState }),
      signal: controller ? controller.signal : undefined
    });
    if (!res.ok) {
      lastSyncMeta = { ...lastSyncMeta, status: 'offline' };
      return { ok: false, offline: true, updatedAt: null };
    }
    const data = await res.json();
    if (!isPlainObject(data) || !data.ok) {
      lastSyncMeta = { ...lastSyncMeta, status: 'offline' };
      return { ok: false, offline: true, updatedAt: null };
    }
    const updatedAt = data.updatedAt || payloadState.updatedAt || nowIso();
    lastSyncMeta = { status: 'synced', lastSyncedAt: updatedAt };
    return { ok: true, offline: false, updatedAt };
  } catch {
    lastSyncMeta = { ...lastSyncMeta, status: 'offline' };
    return { ok: false, offline: true, updatedAt: null };
  } finally {
    if (timerId) clearTimeout(timerId);
  }
}

function toMs(iso) {
  if (!iso) return 0;
  const ms = Date.parse(iso);
  return Number.isNaN(ms) ? 0 : ms;
}

async function persistHydratedToIdb(state) {
  try {
    const db = await openDatabase();
    await writeAllStoresTransaction(db, stateToStorePayloads(state), { clearExisting: true });
    db.close();
  } catch (err) {
    console.warn('Failed to persist server-synced state to IndexedDB:', err);
  }
  mirrorSummaryToLocalStorage(state);
}

// ==============================================================================
// PUBLIC STORAGE API
// ==============================================================================

/**
 * Loads application state from IndexedDB (migrating legacy localStorage keys on first load),
 * then silently reconciles with `/api/state` (adopting newer server state or pushing local state up).
 */
export async function loadAppState() {
  let localState = null;
  let db = null;

  try {
    db = await openDatabase();
    const rawStores = await readAllStoresRaw(db);
    const hasPreferences = (rawStores[STORES.SETTINGS] || []).some(
      (r) => r.key === 'preferences'
    );
    const hasAnyRecords =
      hasPreferences ||
      ALL_STORE_NAMES.some((name) => (rawStores[name] || []).length > 0);

    if (hasAnyRecords) {
      localState = storePayloadsToState(rawStores);
      mirrorSummaryToLocalStorage(localState);
      db.close();
      db = null;
    } else {
      // First load: check legacy single-store snapshot or legacy localStorage keys
      const legacy = legacySingleStoreSnapshot
        ? { key: 'indexeddb_legacy_app_state', data: legacySingleStoreSnapshot }
        : readLegacyLocalStorage();
      legacySingleStoreSnapshot = null;

      if (legacy) {
        const migratedAt = nowIso();
        localState = normalizeAppState({
          ...legacy.data,
          migratedFrom: legacy.key,
          migratedAt,
          updatedAt: migratedAt,
          auditLog: [
            createAuditEntry('migration', 'system', legacy.key, {
              migratedFrom: legacy.key,
              sessionCount: Array.isArray(legacy.data.studySessions)
                ? legacy.data.studySessions.length
                : 0,
              subtaskCount: isPlainObject(legacy.data.subtasks)
                ? Object.keys(legacy.data.subtasks).length
                : 0
            }),
            ...(Array.isArray(legacy.data.auditLog) ? legacy.data.auditLog : [])
          ]
        });
        await writeAllStoresTransaction(db, stateToStorePayloads(localState), {
          clearExisting: true
        });
        mirrorSummaryToLocalStorage(localState);
        db.close();
        db = null;
      } else {
        localState = normalizeAppState({ ...DEFAULT_APP_STATE, updatedAt: null });
        await writeAllStoresTransaction(db, stateToStorePayloads(localState), {
          clearExisting: true
        });
        mirrorSummaryToLocalStorage(localState);
        db.close();
        db = null;
      }
    }
  } catch (err) {
    if (db) {
      try {
        db.close();
      } catch {
        // ignore
      }
    }
    console.warn('IndexedDB unavailable, falling back to localStorage:', err);
    const legacy = readLegacyLocalStorage();
    localState = legacy
      ? normalizeAppState(legacy.data)
      : normalizeAppState({ ...DEFAULT_APP_STATE, updatedAt: null });
    mirrorSummaryToLocalStorage(localState);
  }

  // Silent server state reconciliation (/api/state)
  const serverRes = await fetchServerState({ timeoutMs: 1500 });
  if (serverRes.ok) {
    const localFresh = isFreshDefaultState(localState);
    if (serverRes.state) {
      const serverMs = toMs(serverRes.updatedAt || serverRes.state.updatedAt);
      const localMs = toMs(localState.updatedAt);
      if (localFresh || serverMs > localMs) {
        const adopted = normalizeAppState({
          ...serverRes.state,
          updatedAt: serverRes.updatedAt || serverRes.state.updatedAt || nowIso()
        });
        await persistHydratedToIdb(adopted);
        lastSyncMeta = { status: 'synced', lastSyncedAt: adopted.updatedAt };
        return adopted;
      }
      if (localMs > serverMs && !localFresh) {
        await pushServerState(localState);
      } else {
        lastSyncMeta = {
          status: 'synced',
          lastSyncedAt: serverRes.updatedAt || localState.updatedAt
        };
      }
    } else if (!localFresh) {
      await pushServerState(localState);
    } else {
      lastSyncMeta = { status: 'synced', lastSyncedAt: null };
    }
  } else {
    lastSyncMeta = { status: 'offline', lastSyncedAt: lastSyncMeta.lastSyncedAt };
  }

  return localState;
}

/**
 * Persists full application state across all 6 IndexedDB object stores
 * and mirrors summary state to localStorage.
 */
export async function saveAppState(state) {
  const payload = normalizeAppState({
    ...state,
    updatedAt: nowIso()
  });
  mirrorSummaryToLocalStorage(payload);

  try {
    const db = await openDatabase();
    const storePayloads = stateToStorePayloads(payload);
    await writeAllStoresTransaction(db, storePayloads, { clearExisting: true });
    db.close();
    return payload;
  } catch (err) {
    console.warn('IndexedDB write failed, saving to fallback localStorage:', err);
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(FALLBACK_LOCALSTORAGE_KEY, JSON.stringify(payload));
      }
    } catch {
      // Ignore quota errors
    }
    return payload;
  }
}

/**
 * Appends an audit entry to the auditLog object store.
 */
export async function appendAuditLog(action, entityType, entityId = null, details = null) {
  const entry = createAuditEntry(action, entityType, entityId, details);
  try {
    const db = await openDatabase();
    await idbPutRecord(db, STORES.AUDIT_LOG, entry);
    db.close();
  } catch (err) {
    console.warn('Failed to append auditLog entry:', err);
  }
  return entry;
}

export async function getAuditLogs(limit = 100) {
  try {
    const db = await openDatabase();
    const rows = await idbGetAll(db, STORES.AUDIT_LOG);
    db.close();
    return rows
      .sort((a, b) => new Date(b.timestamp || 0).getTime() - new Date(a.timestamp || 0).getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}

/**
 * Granular CRUD helpers for individual object stores.
 */
export async function saveTaskProgress(record) {
  const normalized = createTaskProgressRecord(record.topicId || record.id, record);
  const db = await openDatabase();
  await idbPutRecord(db, STORES.TASK_PROGRESS, normalized);
  db.close();
  return normalized;
}

export async function saveStudySession(session) {
  const normalized = normalizeStudySession(session);
  const db = await openDatabase();
  await idbPutRecord(db, STORES.STUDY_SESSIONS, normalized);
  db.close();
  return normalized;
}

export async function deleteStudySession(sessionId) {
  const db = await openDatabase();
  await idbDeleteRecord(db, STORES.STUDY_SESSIONS, sessionId);
  db.close();
}

export async function saveQuizAttempt(quizId, questionId, result) {
  const record = {
    id: `${quizId}::${questionId}`,
    quizId,
    questionId,
    selected: result.selected ?? null,
    solved: Boolean(result.solved),
    revealed: Boolean(result.revealed),
    attempts: Number(result.attempts) || 1,
    confidence: result.confidence ?? null,
    timeSpentSec: Number(result.timeSpentSec) || 0,
    attemptedAt: result.attemptedAt || nowIso()
  };
  const db = await openDatabase();
  await idbPutRecord(db, STORES.QUIZ_ATTEMPTS, record);
  db.close();
  return record;
}

export async function saveHiveboxCheck(checkId, done, checkType = 'hivebox') {
  const record = {
    id: `${checkType}::${checkId}`,
    checkId,
    checkType,
    done: Boolean(done),
    updatedAt: nowIso()
  };
  const db = await openDatabase();
  await idbPutRecord(db, STORES.HIVEBOX_CHECKS, record);
  db.close();
  return record;
}

export async function saveSetting(key, value) {
  const record = { key, value, updatedAt: nowIso() };
  const db = await openDatabase();
  await idbPutRecord(db, STORES.SETTINGS, record);
  db.close();
  return record;
}

/**
 * Resets IndexedDB stores and localStorage fallback/summary cleanly.
 */
export async function resetAppState() {
  const resetState = normalizeAppState({
    ...DEFAULT_APP_STATE,
    updatedAt: nowIso(),
    auditLog: [createAuditEntry('reset', 'system', 'all_stores', { reason: 'user_reset' })]
  });

  try {
    const db = await openDatabase();
    await writeAllStoresTransaction(db, stateToStorePayloads(resetState), {
      clearExisting: true
    });
    db.close();
  } catch (err) {
    console.warn('IndexedDB reset failed:', err);
  }

  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem(FALLBACK_LOCALSTORAGE_KEY);
      mirrorSummaryToLocalStorage(resetState);
    }
  } catch {
    // ignore
  }

  return resetState;
}

// ==============================================================================
// EXPORT & IMPORT / RESTORE WITH PREVIEW & SAFE ROLLBACK
// ==============================================================================

/**
 * Builds a structured JSON backup payload from current state (or reads IDB if omitted).
 * When called synchronously with a state object, returns { payload, json, filename }.
 */
export function buildExportBackup(state) {
  const normalized = normalizeAppState(state);
  const stores = stateToStorePayloads(normalized);
  const exportedAt = nowIso();

  const payload = {
    app: 'devops-command-center',
    schemaVersion: SCHEMA_VERSION,
    exportedAt,
    stores,
    state: normalized
  };

  return {
    payload,
    json: JSON.stringify(payload, null, 2),
    filename: `youssef_devops_backup_${exportedAt.split('T')[0]}.json`,
    counts: {
      taskProgress: stores[STORES.TASK_PROGRESS].filter((r) => r.recordType === 'topic').length,
      subtasks: stores[STORES.TASK_PROGRESS].filter((r) => r.recordType === 'subtask').length,
      studySessions: stores[STORES.STUDY_SESSIONS].length,
      quizAttempts: stores[STORES.QUIZ_ATTEMPTS].length,
      hiveboxChecks: stores[STORES.HIVEBOX_CHECKS].length,
      settings: stores[STORES.SETTINGS].length,
      auditLog: stores[STORES.AUDIT_LOG].length
    }
  };
}

function validateBackupStructure(parsed) {
  const errors = [];
  const warnings = [];

  if (!isPlainObject(parsed)) {
    return {
      valid: false,
      format: 'unknown',
      errors: ['ملف النسخة الاحتياطية يجب أن يكون كائن JSON صالحاً.'],
      warnings,
      rawState: null
    };
  }

  let format = 'unknown';
  let rawState = null;

  if (isPlainObject(parsed.stores)) {
    format = 'v2-stores';
    for (const requiredStore of ALL_STORE_NAMES) {
      if (parsed.stores[requiredStore] !== undefined && !Array.isArray(parsed.stores[requiredStore])) {
        errors.push(`حقل stores.${requiredStore} يجب أن يكون مصفوفة.`);
      }
    }
    if (errors.length === 0) {
      rawState = isPlainObject(parsed.state)
        ? parsed.state
        : storePayloadsToState(parsed.stores);
    }
  } else if (isPlainObject(parsed.state)) {
    format = 'v2-state';
    rawState = parsed.state;
  } else if (
    'subtasks' in parsed ||
    'studySessions' in parsed ||
    'topicStatus' in parsed ||
    'topicProgress' in parsed ||
    'hivebox' in parsed ||
    'quizzes' in parsed
  ) {
    format = 'legacy-v1';
    rawState = parsed;
    warnings.push('نسخة احتياطية بصيغة قديمة — سيتم ترقيتها تلقائياً عند الاستعادة.');
  } else {
    errors.push('صيغة الملف غير متوافقة مع DevOps Command Center.');
  }

  if (rawState) {
    if (rawState.studySessions !== undefined && !Array.isArray(rawState.studySessions)) {
      errors.push('حقل studySessions غير صالح (يجب أن يكون مصفوفة).');
    }
    for (const dictKey of ['subtasks', 'topicStatus', 'topicProgress', 'hivebox', 'quizzes']) {
      if (rawState[dictKey] !== undefined && !isPlainObject(rawState[dictKey])) {
        errors.push(`حقل ${dictKey} غير صالح (يجب أن يكون كائناً).`);
      }
    }
  }

  return {
    valid: errors.length === 0 && rawState !== null,
    format,
    errors,
    warnings,
    rawState
  };
}

/**
 * Parses and validates a backup File, JSON string, or parsed object,
 * returning record counts and schema validation details before writing anything.
 */
export async function previewBackupFile(fileOrText) {
  let rawText = '';
  let parsed = null;

  try {
    if (typeof File !== 'undefined' && fileOrText instanceof File) {
      rawText = await fileOrText.text();
      parsed = JSON.parse(rawText);
    } else if (typeof Blob !== 'undefined' && fileOrText instanceof Blob) {
      rawText = await fileOrText.text();
      parsed = JSON.parse(rawText);
    } else if (typeof fileOrText === 'string') {
      rawText = fileOrText;
      parsed = JSON.parse(rawText);
    } else if (isPlainObject(fileOrText)) {
      parsed = fileOrText;
    } else {
      return {
        valid: false,
        format: 'unknown',
        schemaVersion: null,
        exportedAt: null,
        errors: ['لم يتم تمرير ملف أو نص JSON صالح.'],
        warnings: [],
        counts: {
          taskProgress: 0,
          subtasks: 0,
          studySessions: 0,
          quizAttempts: 0,
          hiveboxChecks: 0,
          settings: 0,
          auditLog: 0,
          totalRecords: 0
        },
        normalizedState: null
      };
    }
  } catch (err) {
    return {
      valid: false,
      format: 'unknown',
      schemaVersion: null,
      exportedAt: null,
      errors: [`فشل تحليل ملف JSON: ${err.message}`],
      warnings: [],
      counts: {
        taskProgress: 0,
        subtasks: 0,
        studySessions: 0,
        quizAttempts: 0,
        hiveboxChecks: 0,
        settings: 0,
        auditLog: 0,
        totalRecords: 0
      },
      normalizedState: null
    };
  }

  const validation = validateBackupStructure(parsed);
  if (!validation.valid) {
    return {
      valid: false,
      format: validation.format,
      schemaVersion: parsed?.schemaVersion ?? null,
      exportedAt: parsed?.exportedAt ?? null,
      errors: validation.errors,
      warnings: validation.warnings,
      counts: {
        taskProgress: 0,
        subtasks: 0,
        studySessions: 0,
        quizAttempts: 0,
        hiveboxChecks: 0,
        settings: 0,
        auditLog: 0,
        totalRecords: 0
      },
      normalizedState: null
    };
  }

  const normalizedState = normalizeAppState(validation.rawState);
  const storePayloads = stateToStorePayloads(normalizedState);

  const counts = {
    taskProgress: storePayloads[STORES.TASK_PROGRESS].filter((r) => r.recordType === 'topic').length,
    subtasks: storePayloads[STORES.TASK_PROGRESS].filter((r) => r.recordType === 'subtask').length,
    studySessions: storePayloads[STORES.STUDY_SESSIONS].length,
    quizAttempts: storePayloads[STORES.QUIZ_ATTEMPTS].length,
    hiveboxChecks: storePayloads[STORES.HIVEBOX_CHECKS].length,
    settings: storePayloads[STORES.SETTINGS].length,
    auditLog: storePayloads[STORES.AUDIT_LOG].length
  };
  counts.totalRecords =
    counts.taskProgress +
    counts.subtasks +
    counts.studySessions +
    counts.quizAttempts +
    counts.hiveboxChecks +
    counts.settings +
    counts.auditLog;

  return {
    valid: true,
    format: validation.format,
    schemaVersion: parsed?.schemaVersion ?? normalizedState.schemaVersion,
    exportedAt: parsed?.exportedAt ?? null,
    errors: [],
    warnings: validation.warnings,
    counts,
    normalizedState
  };
}

/**
 * Restores IndexedDB from a backup File, JSON string, or preview result.
 * Captures a pre-restore snapshot and safely rolls back all 6 stores if anything fails.
 */
export async function restoreFromBackup(fileOrText) {
  const preview =
    isPlainObject(fileOrText) && 'valid' in fileOrText && 'normalizedState' in fileOrText
      ? fileOrText
      : await previewBackupFile(fileOrText);

  if (!preview.valid || !preview.normalizedState) {
    return {
      ok: false,
      rolledBack: false,
      errors: preview.errors?.length ? preview.errors : ['بيانات النسخة الاحتياطية غير صالحة.'],
      preview
    };
  }

  let db = null;
  let preRestoreSnapshot = null;

  try {
    db = await openDatabase();
    preRestoreSnapshot = await readAllStoresRaw(db);

    const restoredState = normalizeAppState({
      ...preview.normalizedState,
      updatedAt: nowIso(),
      auditLog: [
        createAuditEntry('backup_restore', 'system', preview.format, {
          counts: preview.counts,
          exportedAt: preview.exportedAt
        }),
        ...(preview.normalizedState.auditLog || [])
      ]
    });

    const nextPayloads = stateToStorePayloads(restoredState);
    await writeAllStoresTransaction(db, nextPayloads, { clearExisting: true });

    // Integrity verification read-back
    const verifyRaw = await readAllStoresRaw(db);
    const verifiedState = storePayloadsToState(verifyRaw);
    mirrorSummaryToLocalStorage(verifiedState);
    db.close();

    return {
      ok: true,
      rolledBack: false,
      state: verifiedState,
      counts: preview.counts,
      preview
    };
  } catch (err) {
    let rolledBack = false;
    if (db && preRestoreSnapshot) {
      try {
        const rollbackLog = createAuditEntry('backup_rollback', 'system', 'restore_failure', {
          error: err.message
        });
        const rollbackPayload = {
          ...preRestoreSnapshot,
          [STORES.AUDIT_LOG]: [rollbackLog, ...(preRestoreSnapshot[STORES.AUDIT_LOG] || [])]
        };
        await writeAllStoresTransaction(db, rollbackPayload, { clearExisting: true });
        const restoredPrev = storePayloadsToState(rollbackPayload);
        mirrorSummaryToLocalStorage(restoredPrev);
        rolledBack = true;
      } catch (rollbackErr) {
        console.error('Rollback failed:', rollbackErr);
      } finally {
        try {
          db.close();
        } catch {
          // ignore
        }
      }
    }

    return {
      ok: false,
      rolledBack,
      errors: [`فشلت الاستعادة وتم التراجع للوضع السابق بأمان: ${err.message}`],
      preview
    };
  }
}
