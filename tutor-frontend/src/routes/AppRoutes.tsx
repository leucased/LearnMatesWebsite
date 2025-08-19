import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TutorsPage from '../pages/TutorsPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import AdminLoginPage from '../pages/AdminLoginPage';
import AdminDashboard from '../pages/admin/AdminDashboard';
import AdminStudents from '../pages/admin/AdminStudents';
import StudentProfile from '../pages/student/profile/StudentProfile';
import TutorProfile from '../pages/tutor/profile/TutorProfile';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tutors" element={<TutorsPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login/admin" element={<AdminLoginPage />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/students" element={<AdminStudents />} />
      
      {/* Profile Routes */}
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/tutor/profile" element={<TutorProfile />} />
    </Routes>
  );
};

export default AppRoutes;