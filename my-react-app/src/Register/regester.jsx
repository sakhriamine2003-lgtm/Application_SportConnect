
import { useState } from "react";
import api from "../axios/axios";

function Register({ onLogin }) {

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
      onLogin();

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
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <section className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold">
          Créer un compte
        </h1>

        <p className="mt-2 text-gray-600">
          Rejoignez SportConnect
        </p>


        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* NAME */}
          <input
            name="name"
            type="text"
            placeholder="Nom complet"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />


          {/* EMAIL */}
          <input
            name="email"
            type="email"
            placeholder="Adresse email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />


          {/* ROLE */}
          <input
            name="role_user"
            type="text"
            placeholder="Rôle de l'utilisateur"
            value={form.role_user}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-3"
          />


          {/* PASSWORD */}
          <input
            name="password"
            type="password"
            placeholder="Mot de passe"
            value={form.password}
            onChange={handleChange}
            minLength={8}
            required
            className="w-full border rounded-lg px-4 py-3"
          />


          {/* CONFIRM PASSWORD */}
          <input
            name="password_confirmation"
            type="password"
            placeholder="Confirmer le mot de passe"
            value={form.password_confirmation}
            onChange={handleChange}
            minLength={8}
            required
            className="w-full border rounded-lg px-4 py-3"
          />


          {/* ERROR */}
          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}


          {/* REGISTER */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg"
          >
            {loading ? "Création..." : "S'inscrire"}
          </button>


          {/* LOGIN */}
          <button
            type="button"
            onClick={onLogin}
            className="w-full border py-3 rounded-lg"
          >
            J'ai déjà un compte
          </button>

        </form>

      </section>

    </main>
  );
}

export default Register;

