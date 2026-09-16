import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./login/login.jsx";
import Register from "./Register/regester.jsx";
import DashboardSportif from "./DashboardSportif/DashboardSportif.jsx";
import AffichageProfil from "./profil/AffichageProfil.jsx";
import AfficherPortfolio from "./DashboardSportif/GestionPortfolio/AfficherPortfolio.jsx";
import CreeProfil from "./DashboardSportif/GestionPortfolio/CreePortfolio.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardSportif" element={<DashboardSportif />} />
        <Route path="/dashboardSportif/profil" element={<AffichageProfil />} />
        <Route path="/dashboardSportif/portfolio" element={<AfficherPortfolio />} />
        <Route path="/dashboardSportif/Ajouterportfolio" element={<CreeProfil />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;