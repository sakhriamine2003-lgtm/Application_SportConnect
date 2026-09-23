import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  BriefcaseBusiness,
  CalendarDays,
  ClipboardList,
  Dumbbell,
  LayoutDashboard,
  Trophy,
  UserRound
} from "lucide-react";
import api from "../axios/axios";


export default function DashboardSportif() {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOffres = async () => {
      try {
        const token = localStorage.getItem("sport_connect_token");
        const response = await api.get("/offres", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOffres(response.data);
      } catch (error) {
        console.error("Erreur :", error);
      } finally {
        setLoading(false);
      }
    };
    getOffres();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };


  
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 lg:flex">
      {/* Sidebar */}
      <aside className="flex w-full shrink-0 flex-col bg-slate-950 px-4 py-5 text-slate-300 lg:min-h-screen lg:w-64">
        <div className="mb-10 flex items-center gap-3 px-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lime-400 font-black text-slate-950">SC</div>
          <div>
            <p className="text-sm font-bold text-white">Sport Connect</p>
            <p className="text-xs text-slate-500">Espace sportif</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600">Mon espace</p>
          <button onClick={() => navigate("/dashboardSportif")} className="flex w-full items-center gap-3 rounded-xl bg-lime-400 px-3 py-3 text-sm font-semibold text-slate-950">
            <LayoutDashboard size={16} /> Dashboard
          </button>
          <button onClick={() => navigate("/dashboardSportif/profil")} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white">
            <UserRound size={16} /> Profil
          </button>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"><Trophy size={16} /> Résultats</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"><Dumbbell size={16} /> Sports</a>
          <a href="#" className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-slate-400 hover:bg-slate-900 hover:text-white"><Activity size={16} /> Activités</a>
        </nav>

        <div className="mt-8 border-t border-white/10 pt-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-lime-400 font-black text-slate-950">A</div>
            <div>
              <p className="font-semibold text-white">Amine</p>
              <p className="text-sm text-slate-500">Sportif</p>
            </div>
          </div>
          <button onClick={logout} className="mt-4 w-full rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-400 hover:bg-red-950/40 hover:text-red-300">
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 px-4 py-6 sm:px-8 lg:px-10 lg:py-9">
        <header className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-lime-600">Espace sportif</p>
            <h1 className="text-3xl font-black text-slate-950 sm:text-4xl">Bonjour Amine</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">A</div>
            <span className="font-semibold text-slate-800">Amine</span>
          </div>
        </header>

        <div className="space-y-6">
          {/* Section Cartes rapides */}
          <section className="grid gap-5 md:grid-cols-2">
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-lime-700"><UserRound size={22} /></div>
              <div>
                <h2 className="text-lg font-bold">Profil sportif</h2>
                <p className="text-sm text-slate-500">Consulter votre profil</p>
              </div>
              <button onClick={() => navigate("/dashboardSportif/profil")} className="ml-auto rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white hover:bg-lime-500 hover:text-slate-950">Voir</button>
            </div>
            <div className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700"><Trophy size={22} /></div>
              <div>
                <h2 className="text-lg font-bold">Résultats</h2>
                <p className="text-sm text-slate-500">Consulter vos résultats</p>
              </div>
              <button className="ml-auto rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white hover:bg-lime-500 hover:text-slate-950">Voir</button>
            </div>
          </section>

          {/* Section Offres */}
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="flex items-center gap-2 text-sm font-semibold uppercase text-lime-600"><BriefcaseBusiness size={15} /> Recrutement</p>
                <h2 className="mt-1 text-xl font-semibold text-slate-950">Offres récentes</h2>
              </div>
              <button onClick={() => navigate("/dashboardSportif/offres")} className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white hover:bg-lime-400 hover:text-slate-950">Voir tout</button>
            </div>

            {loading ? (
              <p className="mt-5 text-sm text-slate-500">Chargement des offres...</p>
            ) : offres.length === 0 ? (
              <p className="mt-5 text-sm text-slate-500">Aucune offre disponible pour le moment.</p>
            ) : (
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                {offres.slice(0, 3).map((offre) => (
                  <article key={offre.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                    <p className="text-xs font-bold uppercase text-lime-600">{offre.sport}</p>
                    <h3 className="mt-2 text-base font-bold text-slate-900">{offre.title}</h3>
                    <p className="mt-1 flex items-center gap-2 text-xs text-slate-500"><CalendarDays size={13} /> {offre.date}</p>
                    <p className="mt-2 line-clamp-2 text-sm text-slate-600">{offre.description}</p>
                  </article>
                ))}
              </div>
            )}
          </section>

          {/* Section Candidatures */}
          <section className="flex flex-col justify-between gap-4 rounded-2xl border border-lime-200 bg-lime-50 p-5 sm:flex-row sm:items-center">
            <div>
              <p className="flex items-center gap-2 text-xs font-bold uppercase text-lime-700"><ClipboardList size={14} /> Candidatures</p>
              <h2 className="mt-1 text-xl font-black">Réponses des administrateurs</h2>
            </div>
            <button onClick={() => navigate('/dashboardSportif/candidatures')} className="rounded-lg bg-slate-950 px-4 py-3 text-sm font-bold text-white hover:bg-lime-500 hover:text-slate-950">Voir mes réponses</button>
          </section>
        </div>
      </main>
    </div>
  );
}