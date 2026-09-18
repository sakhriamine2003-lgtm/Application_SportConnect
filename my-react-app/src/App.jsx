import React from 'react';
import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom';

import Login from './login/login';
import Register from './Register/regester';
import DashboardSportif from './DashboardSportif/DashboardSportif';
import DashboardAdmin from './DashboardAdmin/DashboardAdmin';
import AffichageProfil from './profil/AffichageProfil';
import AfficherPortfolio from './DashboardSportif/GestionPortfolio/AfficherPortfolio';
import CreeProfil from './DashboardSportif/GestionPortfolio/CreePortfolio';
import AfficherClub from './club/AfficherClub';
import CreerClub from './club/CreerClub';
import AfficherOffres from './offres/AfficherOffres';
import CreerOffre from './offres/CreerOffre';

function RoleRoute({ allowedRole, children }) {
  const role = String(localStorage.getItem('sport_connect_user_role') || '').trim().toLowerCase();

  if (role !== allowedRole) {
    return <Navigate to={role === 'admin' ? '/dashboardAdmin' : '/'} replace />;
  }

  return children;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardAdmin" element={<DashboardAdmin />} />
        <Route path="/dashboardAdmin/clubs" element={<AfficherClub />} />
        <Route path="/dashboardAdmin/clubs/ajouter" element={<CreerClub />} />
        <Route path="/dashboardAdmin/offres" element={<AfficherOffres isAdmin />} />
        <Route path="/dashboardSportif" element={<RoleRoute allowedRole="sportif"><DashboardSportif /></RoleRoute>} />
        <Route path="/dashboardSportif/profil" element={<RoleRoute allowedRole="sportif"><AffichageProfil /></RoleRoute>} />
        <Route path="/dashboardSportif/portfolio" element={<RoleRoute allowedRole="sportif"><AfficherPortfolio /></RoleRoute>} />
        <Route path="/dashboardSportif/Ajouterportfolio" element={<RoleRoute allowedRole="sportif"><CreeProfil /></RoleRoute>} />
        <Route path="/dashboardSportif/offres" element={<RoleRoute allowedRole="sportif"><AfficherOffres /></RoleRoute>} />
        <Route path="/dashboardSportif/offres/ajouter" element={<RoleRoute allowedRole="sportif"><CreerOffre /></RoleRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;