
import { useState } from "react";

import Login from "./login/login.jsx";
import Register from "./Register/regester.jsx";
import DashboardSportif from "./DashboardSportif/DashboardSportif.jsx";

function App() {
  const [page, setPage] = useState("login");

  if (page === "register") {
    return <Register onLogin={() => setPage("login")} />;
  }

  if (page === "dashboard-sportif") {
    return <DashboardSportif />;
  }

  return (
    <Login
      onRegister={() => setPage("register")}
      onSportifLogin={() => setPage("dashboard-sportif")}
    />
  );
}

export default App;

