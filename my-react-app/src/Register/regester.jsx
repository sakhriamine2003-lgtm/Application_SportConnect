
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dumbbell, KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
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

        "Impossible de créer le compte."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-10">
      <div className="w-full max-w-md">

        {/* Logo / Titre */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lime-400">
            <Dumbbell size={26} />
          </div>

          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-600">Sport Connect</p>

          <h1 className="text-3xl font-black text-slate-950">
            Créer un compte
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Rejoignez la communauté SportConnect
          </p>
        </div>

        {/* Card */}
        <section className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70">

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* NAME */}
            <div>
              <label
                htmlFor="name"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <UserRound size={16} className="text-lime-600" /> Nom complet
              </label>

              <input
                id="name"
                name="name"
                type="text"
                placeholder="Jean Dupont"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <Mail size={16} className="text-lime-600" /> Adresse email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="nom@exemple.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            {/* ROLE */}
            <div>
              <label
                htmlFor="role_user"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <ShieldCheck size={16} className="text-lime-600" /> Rôle
              </label>

              <select
                id="role_user"
                name="role_user"
                value={form.role_user}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
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
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <KeyRound size={16} className="text-lime-600" /> Mot de passe
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            {/* CONFIRM PASSWORD */}
            <div>
              <label
                htmlFor="password_confirmation"
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"
              >
                <KeyRound size={16} className="text-lime-600" /> Confirmer le mot de passe
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
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
              >
                {error}
              </div>
            )}

            {/* REGISTER BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 py-3.5 font-bold text-white transition hover:bg-lime-400 hover:text-slate-950 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Création..." : "S'inscrire"}
            </button>
          </form>

          {/* Conditions */}
          <p className="mt-6 text-center text-xs leading-relaxed text-slate-400">
            En vous inscrivant, vous acceptez nos{" "}
            <span className="cursor-pointer text-slate-500 hover:text-slate-950">
              conditions d'utilisation
            </span>.
          </p>

          {/* LOGIN BUTTON */}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="mt-4 w-full rounded-xl border border-slate-200 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
          >
            J'ai déjà un compte
          </button>

        </section>
      </div>
    </main>
  );
}

export default Register;

