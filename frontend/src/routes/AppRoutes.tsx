import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import TutorsPage from '../pages/TutorsPage';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/tutors" element={<TutorsPage />} />
    </Routes>
  );
};

export default AppRoutes;
