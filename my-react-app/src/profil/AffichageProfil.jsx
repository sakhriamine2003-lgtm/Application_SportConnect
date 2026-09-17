import { useNavigate } from "react-router-dom";
import { ArrowLeft, CircleUserRound, Plus, Trophy } from "lucide-react";

function AffichageProfil() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <div className="relative min-h-[280px] overflow-hidden bg-slate-950 px-6 py-10 text-white md:px-10">
          <img src="https://images.unsplash.com/photo-1517466787929-bc90951d0974?auto=format&fit=crop&w=1400&q=85" alt="Joueurs de football sur un terrain" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
          <div className="relative"><p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Sport Connect</p><h1 className="mt-3 text-3xl font-black md:text-4xl">Votre espace sportif</h1><p className="mt-2 max-w-xl text-slate-300">Gérez votre identité sportive et présentez votre parcours aux clubs.</p></div>
        </div>
        <div className="p-6 md:p-10">
        <button
          type="button"
          onClick={() => navigate("/dashboardSportif")}
          className="mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
        >
          <ArrowLeft size={18} /> Retour au tableau de bord
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            onClick={() => navigate("/dashboardSportif/portfolio")}
            className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 text-left transition hover:-translate-y-1 hover:border-lime-300 hover:bg-lime-50"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lime-700"><CircleUserRound size={23} /></span>
            <h2 className="mt-5 text-xl font-bold text-slate-950">Voir mon profil</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Consultez vos informations, votre sport et votre parcours.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-lime-700 group-hover:text-lime-800">
              Ouvrir le profil
            </span>
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboardSportif/Ajouterportfolio")}
            className="group rounded-2xl border border-slate-200 bg-white p-6 text-left text-slate-900 transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white"><Plus size={23} /></span>
            <h2 className="mt-5 text-xl font-bold">Créer un profil</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ajoutez vos informations pour être visible par les clubs.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 group-hover:text-lime-700">
              Commencer la création <Trophy size={16} />
            </span>
          </button>
        </div>
        </div>
      </section>
    </main>
  );
}

export default AffichageProfil;
