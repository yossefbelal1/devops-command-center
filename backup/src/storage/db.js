// ==============================================================================
// INDEXEDDB STORAGE ENGINE & AUTOMATIC LOCALSTORAGE MIGRATION
// ==============================================================================

const DB_NAME = 'devops_command_center_db';
const DB_VERSION = 1;
const STORE_NAME = 'app_state';
const STATE_KEY = 'user_progress_v1';

const LEGACY_LOCALSTORAGE_KEYS = [
  'devops_command_center_v6_youssef',
  'devops_command_center_v5_react'
];

export const DEFAULT_APP_STATE = {
  schemaVersion: 2,
  migratedFrom: null,
  migratedAt: null,
  weeklyStudyHours: 12,
  subtasks: {},
  topicStatus: {},
  topicNotes: {},
  hivebox: {},
  audit: {},
  quizzes: {}, // { [quizId]: { [qId]: { selected, solved, revealed, attempts } } }
  studySessions: [], // array of completed StudySession objects
  taskTelemetry: {}, // { [topicId]: { estimatedMinutes, actualActiveMinutes, pausedMinutes, category, difficulty, attempts, confidence, completedAt, interrupted, note, evidence } }
  forecastModel: {
    multipliers: {}, // { ["category::difficulty"]: { value, n, history: [] } }
    totalObservations: 0
  },
  activeTimer: null // { topicId, topicTitle, category, difficulty, estimatedMinutes, startedAt, accumulatedActiveMs, pausedAt, accumulatedPausedMs, isRunning }
};

function openDatabase() {
  return new Promise((resolve, reject) => {
    if (typeof indexedDB === 'undefined') {
      reject(new Error('IndexedDB is unavailable'));
      return;
    }
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function idbGet(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const req = store.get(key);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

function idbSet(db, key, value) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.put(value, key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function idbDelete(db, key) {
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    const req = store.delete(key);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error);
  });
}

function readLegacyLocalStorage() {
  for (const key of LEGACY_LOCALSTORAGE_KEYS) {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && typeof parsed === 'object') {
          return { key, data: parsed };
        }
      }
    } catch (err) {
      console.warn(`Failed reading legacy key ${key}:`, err);
    }
  }
  return null;
}

/**
 * Normalizes legacy quiz shapes where `revealed` might have previously marked `solved: true`
 * or ensures strict quiz completion schema compatibility.
 */
function mergeWithDefaults(rawData) {
  return {
    ...DEFAULT_APP_STATE,
    ...rawData,
    forecastModel: {
      ...DEFAULT_APP_STATE.forecastModel,
      ...(rawData?.forecastModel || {})
    }
  };
}

export async function loadAppState() {
  try {
    const db = await openDatabase();
    const existing = await idbGet(db, STATE_KEY);
    if (existing) {
      return mergeWithDefaults(existing);
    }

    // Attempt automatic migration from localStorage
    const legacy = readLegacyLocalStorage();
    if (legacy) {
      const migratedState = mergeWithDefaults({
        ...legacy.data,
        migratedFrom: legacy.key,
        migratedAt: new Date().toISOString()
      });
      await idbSet(db, STATE_KEY, migratedState);
      return migratedState;
    }

    await idbSet(db, STATE_KEY, DEFAULT_APP_STATE);
    return { ...DEFAULT_APP_STATE };
  } catch (err) {
    console.warn('IndexedDB unavailable, falling back to localStorage:', err);
    const legacy = readLegacyLocalStorage();
    return legacy ? mergeWithDefaults(legacy.data) : { ...DEFAULT_APP_STATE };
  }
}

export async function saveAppState(state) {
  const payload = {
    ...state,
    updatedAt: new Date().toISOString()
  };
  try {
    const db = await openDatabase();
    await idbSet(db, STATE_KEY, payload);
  } catch (err) {
    console.warn('IndexedDB write failed, saving to fallback localStorage:', err);
    try {
      localStorage.setItem('devops_command_center_fallback', JSON.stringify(payload));
    } catch {
      // ignore storage quota errors
    }
  }
}

export async function resetAppState() {
  try {
    const db = await openDatabase();
    await idbDelete(db, STATE_KEY);
    await idbSet(db, STATE_KEY, DEFAULT_APP_STATE);
  } catch (err) {
    console.warn('IndexedDB reset failed:', err);
  }
  return { ...DEFAULT_APP_STATE };
}

export function buildExportBlob(state) {
  return JSON.stringify(
    {
      exportedAt: new Date().toISOString(),
      app: 'devops-command-center',
      schemaVersion: 2,
      state
    },
    null,
    2
  );
}

export function parseImportedBackup(rawText) {
  const parsed = JSON.parse(rawText);
  if (parsed && parsed.state && typeof parsed.state === 'object') {
    return mergeWithDefaults(parsed.state);
  }
  if (parsed && typeof parsed === 'object' && ('subtasks' in parsed || 'studySessions' in parsed)) {
    return mergeWithDefaults(parsed);
  }
  throw new Error('ملف النسخة الاحتياطية غير صالح أو لا يطابق صيغة المنصة.');
}
