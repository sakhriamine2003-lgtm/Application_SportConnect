import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../axios/axios';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post('/login', { email, password });
      const user = response.data?.user;
      const role = String(user?.role_user || user?.role || '').trim().toLowerCase();

      if (response.data?.token) {
        localStorage.setItem('sport_connect_token', response.data.token);
      }

      if (role !== 'sportif') {
        setError('Ce compte n’a pas accès au dashboard sportif.');
        return;
      }

      navigate('/dashboardSportif');
    } catch (err) {
      setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
    } finally {
      setLoading(false);
    }
  };

return (
  <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
    <div className="w-full max-w-md">

      {/* Logo / Titre */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center p-2  rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-4">
          <span className="text-2xl font-bold text-white ">SportConnect</span>
        </div>

        <h1 className="text-3xl font-bold text-white">
          Bienvenue
        </h1>

        <p className="text-slate-400 mt-2">
          Connectez-vous à votre compte
        </p>
      </div>

      {/* Card */}
      <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-200 mb-2"
            >
              Adresse email
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="nom@exemple.com"
              required
              autoComplete="email"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-200"
              >
                Mot de passe
              </label>

              <button
                type="button"
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Mot de passe oublié ?
              </button>
            </div>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          {/* Error */}
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
            >
              {error}
            </div>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Connexion en cours..." : "Se connecter"}
          </button>
        </form>

        {/* Conditions */}
        <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
          En vous connectant, vous acceptez nos{" "}
          <span className="text-slate-400 hover:text-white cursor-pointer">
            conditions d'utilisation
          </span>.
        </p>

        <button
          type="button"
          onClick={() => navigate('/register')}
          className="mt-4 w-full rounded-xl border border-blue-500 py-3 font-semibold text-blue-400 transition hover:bg-blue-500/10"
        >
          Créer un compte
        </button>
      </section>

      {/* Footer */}
      <p className="text-center text-sm text-slate-500 mt-6">
        © 2026 — Tous droits réservés
      </p>
    </div>
  </main>
);
}
export default Login;

