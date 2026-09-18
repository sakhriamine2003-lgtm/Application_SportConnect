
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../axios/axios";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    role_user: "",
    password: "",
    password_confirmation: ""
  });

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);


  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
	e.preventDefault();
    setError("");

    if (form.password !== form.password_confirmation) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      await api.post("/register", form);
      alert("Compte créé avec succès !");
      navigate("/");

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Impossible de créer le compte."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo / Titre */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-2 rounded-2xl bg-blue-600 shadow-lg shadow-blue-600/30 mb-4">
            <span className="text-2xl font-bold text-white">SportConnect</span>
          </div>

          <h1 className="text-3xl font-bold text-white">
            Créer un compte
          </h1>

          <p className="text-slate-400 mt-2">
            Rejoignez la communauté SportConnect
          </p>
        </div>

        {/* Card */}
        <section className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Nom complet
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jean Dupont"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Adresse email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="nom@exemple.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* ROLE */}
            <div>
              <label
                htmlFor="role_user"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Rôle
              </label>

              <select
                id="role_user"
                name="role_user"
                value={form.role_user}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="" disabled>Sélectionnez votre rôle</option>
                <option value="sportif">Sportif</option>
                <option value="club">Club</option>
                <option value="sponsor">Sponsor</option>
              </select>
            </div>

            {/* PASSWORD */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Mot de passe
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="block text-sm font-medium text-slate-200 mb-2"
              >
                Confirmer le mot de passe
              </label>

              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="••••••••"
                value={form.password_confirmation}
                onChange={handleChange}
                minLength={8}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
              >
                {error}
              </div>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 hover:shadow-blue-500/30 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>

          {/* Conditions */}
          <p className="text-center text-xs text-slate-500 mt-6 leading-relaxed">
            En vous inscrivant, vous acceptez nos{" "}
            <span className="text-slate-400 hover:text-white cursor-pointer">
              conditions d'utilisation
            </span>.
          </p>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full rounded-xl border border-blue-500 py-3 font-semibold text-blue-400 transition hover:bg-blue-500/10"
          >
            J'ai déjà un compte
          </button>

        </section>
      </div>
    </main>
  );
}

export default Register;

