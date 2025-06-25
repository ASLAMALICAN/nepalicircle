import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginUI from './pages/LoginUI';
import RegisterUI from './pages/RegisterUI';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import ResetPassword from './pages/Reset-Password';
import VerifyEmailPage from './pages/VerifyEmailPage';
import VerifyResultPage from './pages/VerifyResultPage'; // NEW: for success/error messages

// Service Pages
import AirportPage from './pages/services/AirportPage';
import HousingPage from './pages/services/HousingPage';
import SinBankPage from './pages/services/SinBankPage';
import StudentPage from './pages/services/StudentPage';
import JobPage from './pages/services/JobPage';
import CommunityPage from './pages/services/CommunityPage';
import LanguagePage from './pages/services/LanguagePage';
import DirectoryPage from './pages/services/DirectoryPage';
import LegalPage from './pages/services/LegalPage';
import NewCanada from './pages/services/NewCanada';

function App() {
  return (
    <Router>
      <Routes>

        {/* ✅ Protected Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🌐 Public Routes */}
        <Route path="/login-ui" element={<LoginUI />} />
        <Route path="/register-ui" element={<RegisterUI />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* 📧 Email Verification Routes */}
        <Route path="/verify-email/:token" element={<VerifyEmailPage />} />
       

        {/* 📌 Services */}
        <Route path="/services/airport" element={<AirportPage />} />
        <Route path="/services/housing" element={<HousingPage />} />
        <Route path="/services/sin-bank" element={<SinBankPage />} />
        <Route path="/services/student" element={<StudentPage />} />
        <Route path="/services/jobs" element={<JobPage />} />
        <Route path="/services/community" element={<CommunityPage />} />
        <Route path="/services/language" element={<LanguagePage />} />
        <Route path="/services/directory" element={<DirectoryPage />} />
        <Route path="/services/legal" element={<LegalPage />} />
        <Route path="/services/new-to-canada" element={<NewCanada />} />
        
      </Routes>
    </Router>
  );
}

export default App;
