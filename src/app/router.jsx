import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const DashboardPage = lazy(() =>
  import('../pages/DashboardPage').then((m) => ({ default: m.DashboardPage }))
);
const RoadmapPage = lazy(() =>
  import('../pages/RoadmapPage').then((m) => ({ default: m.RoadmapPage }))
);
const HiveBoxPage = lazy(() =>
  import('../pages/HiveBoxPage').then((m) => ({ default: m.HiveBoxPage }))
);
const PlaybookPage = lazy(() =>
  import('../pages/PlaybookPage').then((m) => ({ default: m.PlaybookPage }))
);
const QuizPage = lazy(() =>
  import('../pages/QuizPage').then((m) => ({ default: m.QuizPage }))
);
const AnalyticsPage = lazy(() =>
  import('../pages/AnalyticsPage').then((m) => ({ default: m.AnalyticsPage }))
);
const CareerPage = lazy(() =>
  import('../pages/CareerPage').then((m) => ({ default: m.CareerPage }))
);
const ResourcesPage = lazy(() =>
  import('../pages/ResourcesPage').then((m) => ({ default: m.ResourcesPage }))
);

function RouteFallback() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="glass-v5 rounded-3xl p-8 animate-pulse space-y-3">
        <div className="h-4 w-40 bg-slate-200 rounded" />
        <div className="h-7 w-72 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

export function AppRoutes({
  appState,
  metrics,
  forecast,
  allTopics,
  topicsDueForReview,
  actions
}) {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route
          path="/"
          element={
            <DashboardPage
              appState={appState}
              metrics={metrics}
              forecast={forecast}
              allTopics={allTopics}
              topicsDueForReview={topicsDueForReview}
              actions={actions}
            />
          }
        />
        <Route
          path="/roadmap"
          element={
            <RoadmapPage
              appState={appState}
              metrics={metrics}
              actions={actions}
            />
          }
        />
        <Route
          path="/hivebox"
          element={
            <HiveBoxPage
              appState={appState}
              metrics={metrics}
              actions={actions}
            />
          }
        />
        <Route path="/playbook" element={<PlaybookPage />} />
        <Route
          path="/quiz"
          element={<QuizPage appState={appState} actions={actions} />}
        />
        <Route
          path="/analytics"
          element={
            <AnalyticsPage
              appState={appState}
              metrics={metrics}
              forecast={forecast}
              allTopics={allTopics}
              actions={actions}
            />
          }
        />
        <Route
          path="/career"
          element={<CareerPage appState={appState} />}
        />
        <Route
          path="/resources"
          element={
            <ResourcesPage
              appState={appState}
              metrics={metrics}
              actions={actions}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
