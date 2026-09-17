import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
        <Route path="/dashboardSportif" element={<DashboardSportif />} />
        <Route path="/dashboardSportif/profil" element={<AffichageProfil />} />
        <Route path="/dashboardSportif/portfolio" element={<AfficherPortfolio />} />
        <Route path="/dashboardSportif/Ajouterportfolio" element={<CreeProfil />} />
        <Route path="/dashboardSportif/offres" element={<AfficherOffres />} />
        <Route path="/dashboardSportif/offres/ajouter" element={<CreerOffre />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;