import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  CalendarDays,
  Crosshair,
  Dumbbell,
  Image,
  MapPin,
  Ruler,
  Trophy,
  TrendingUp,
  UserRound,
  Users,
  Weight,
} from "lucide-react";
import api from "../../axios/axios";

const INITIAL_FORM = {
  nom: "", prenom: "", age: "", sport: "", niveau: "",
  position: "", equipe: "", ville: "", taille: "", poids: "",
  experience: "", palmares: "", photo: ""
};

function CreeProfil() {
  const navigate = useNavigate();
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("sport_connect_token");
      await api.post("/portfolio", form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setForm(INITIAL_FORM);
      alert("Profil créé avec succès !");
    } catch (err) {
      setError("Erreur lors de la création du profil.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-6 text-slate-900 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
      <button
        type="button"
        onClick={() => navigate("/dashboardSportif/profil")}
        className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-600 transition hover:bg-white hover:text-slate-950"
      >
        <ArrowLeft size={18} />
        Retour au profil
      </button>

      <div className="grid overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70 lg:grid-cols-[0.8fr_1.2fr]">
        <aside className="relative min-h-[280px] overflow-hidden bg-slate-950 p-8 text-white lg:min-h-full">
          <img src="https://images.unsplash.com/photo-1538805060514-97d9cc17730c?auto=format&fit=crop&w=1000&q=85" alt="Sportif en plein entraînement" className="absolute inset-0 h-full w-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/65 to-slate-900/20" />
          <div className="relative flex h-full min-h-[250px] flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-lime-400 p-2 text-slate-950"><Dumbbell size={20} /></div>
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Sport Connect</span>
            </div>
            <div className="max-w-sm">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-lime-300">Votre identité sportive</p>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl">Construisez un profil qui vous ressemble.</h1>
              <p className="mt-4 text-sm leading-6 text-slate-300">Présentez votre parcours, vos performances et votre ambition à la communauté sportive.</p>
            </div>
          </div>
        </aside>

        <main className="p-5 sm:p-8 lg:p-10">
          <div className="mb-8">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-lime-600">Portfolio sportif</p>
            <h2 className="text-2xl font-black tracking-tight text-slate-950 sm:text-3xl">Créer votre profil</h2>
            <p className="mt-2 text-sm text-slate-500">Les champs marqués d’un astérisque sont obligatoires.</p>
          </div>

      {error && <p className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm font-medium text-red-700">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <section><h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Identité</h3><div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Nom <span className="text-lime-600">*</span></span><div className="relative"><UserRound className="absolute left-3 top-3 text-slate-400" size={18} /><input name="nom" placeholder="Votre nom" value={form.nom} onChange={handleChange} required className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Prénom <span className="text-lime-600">*</span></span><div className="relative"><UserRound className="absolute left-3 top-3 text-slate-400" size={18} /><input name="prenom" placeholder="Votre prénom" value={form.prenom} onChange={handleChange} required className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
        </div></section>

        <section><h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Profil athlétique</h3><div className="grid gap-4 sm:grid-cols-2">
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Âge</span><div className="relative"><CalendarDays className="absolute left-3 top-3 text-slate-400" size={18} /><input name="age" type="number" placeholder="Ex. 24" value={form.age} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Sport <span className="text-lime-600">*</span></span><div className="relative"><Dumbbell className="absolute left-3 top-3 text-slate-400" size={18} /><input name="sport" placeholder="Ex. Football" value={form.sport} onChange={handleChange} required className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Niveau</span><div className="relative"><TrendingUp className="absolute left-3 top-3 text-slate-400" size={18} /><input name="niveau" placeholder="Ex. Professionnel" value={form.niveau} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Position</span><div className="relative"><Crosshair className="absolute left-3 top-3 text-slate-400" size={18} /><input name="position" placeholder="Ex. Milieu" value={form.position} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Équipe</span><div className="relative"><Users className="absolute left-3 top-3 text-slate-400" size={18} /><input name="equipe" placeholder="Votre équipe" value={form.equipe} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Ville</span><div className="relative"><MapPin className="absolute left-3 top-3 text-slate-400" size={18} /><input name="ville" placeholder="Votre ville" value={form.ville} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Taille <span className="text-slate-400">(cm)</span></span><div className="relative"><Ruler className="absolute left-3 top-3 text-slate-400" size={18} /><input name="taille" type="number" placeholder="Ex. 180" value={form.taille} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Poids <span className="text-slate-400">(kg)</span></span><div className="relative"><Weight className="absolute left-3 top-3 text-slate-400" size={18} /><input name="poids" type="number" placeholder="Ex. 75" value={form.poids} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
        </div></section>

        <section className="space-y-4"><h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Votre parcours</h3>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Photo de profil</span><div className="relative"><Image className="absolute left-3 top-3 text-slate-400" size={18} /><input name="photo" placeholder="URL de votre photo" value={form.photo} onChange={handleChange} className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Expérience</span><div className="relative"><BriefcaseBusiness className="absolute left-3 top-3 text-slate-400" size={18} /><textarea name="experience" placeholder="Décrivez votre expérience sportive" value={form.experience} onChange={handleChange} className="min-h-24 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" rows="3" /></div></label>
          <label className="block"><span className="mb-2 block text-sm font-semibold text-slate-700">Palmarès</span><div className="relative"><Trophy className="absolute left-3 top-3 text-slate-400" size={18} /><textarea name="palmares" placeholder="Ajoutez vos principales réussites" value={form.palmares} onChange={handleChange} className="min-h-24 w-full resize-y rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100" rows="3" /></div></label>
        </section>

        <button type="submit" disabled={loading} className="inline-flex w-full items-center justify-center rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-lime-500 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-50">
          {loading ? "Création en cours..." : "Créer mon profil"}
        </button>
      </form>
        </main>
      </div>
      </div>
    </div>
  );
}

export default CreeProfil;