import React, { useState } from 'react';
import Login from './login/login.jsx';
import Register from './Register/regester.jsx';

function App() {
  const [showRegister, setShowRegister] = useState(false);

  return (
    showRegister ? (
      <Register onLogin={() => setShowRegister(false)} />
    ) : (
      <Login onRegister={() => setShowRegister(true)} />
    )
  );
}

export default App;