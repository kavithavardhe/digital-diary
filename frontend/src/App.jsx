import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import DiaryList from './pages/DiaryList';
import DiaryForm from './pages/DiaryForm';
import DiaryDetail from './pages/DiaryDetail';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/entries"
            element={
              <ProtectedRoute>
                <DiaryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entries/new"
            element={
              <ProtectedRoute>
                <DiaryForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entries/:id"
            element={
              <ProtectedRoute>
                <DiaryDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/entries/:id/edit"
            element={
              <ProtectedRoute>
                <DiaryForm />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/entries" replace />} />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
