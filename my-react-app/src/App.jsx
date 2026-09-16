import { useState } from "react";

import Login from "./login/login.jsx";
import Register from "./Register/regester.jsx";
import DashboardSportif from "./DashboardSportif/DashboardSportif.jsx";
import AfficherPortfolio from "./DashboardSportif/GestionPortfolio/AfficherPortfolio.jsx";
import AffichageProfil from "./profil/AffichageProfil.jsx";
import CreeProfil from "./DashboardSportif/GestionPortfolio/CreePortfolio.jsx";

function App() {

  const [page, setPage] = useState("login");

  if (page === "login") {
    return (
      <Login
        onRegister={() => setPage("register")}
        onSportifLogin={() => setPage("dashboard")}
      />
    );
  }

  if (page === "register") {
    return (
      <Register
        onLogin={() => setPage("login")}
      />
    );
  }

  if (page === "dashboard") {
    return (
      <DashboardSportif
        onProfile={() => setPage("profile")}
      />
    );
  }

  if (page === "profile") {
    return (
      <AffichageProfil
        onView={() => setPage("view")}
        onCreate={() => setPage("create")}
        onBack={() => setPage("dashboard")}
      />
    );
  }

  if (page === "view") {
    return (
      <AfficherPortfolio
        onBack={() => setPage("profile")}
      />
    );
  }

  if (page === "create") {
    return (
      <CreeProfil
        onCreated={() => setPage("view")}
      />
    );
  }

}

export default App;

