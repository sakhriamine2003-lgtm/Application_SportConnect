import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Crosshair, Dumbbell, MapPin, Ruler, Trophy, TrendingUp, Users, Weight } from "lucide-react";
import api from "../../axios/axios";
import { getInitials } from "../../utils/initials";

export default function VoirPortfolioSportif() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [portfolio, setPortfolio] = useState(null);
  const [error, setError] = useState("");
 
  
  useEffect(() => {
    const token = localStorage.getItem("sport_connect_token");

    if (!token) {
      setError("Vous devez vous connecter.");
      return;
    }

    api.get(`/admin/sportifs/${id}/portfolio`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) => {
        setPortfolio(response.data);
      })
      .catch((error) => {
        setError(error.response?.data?.message || "Impossible de charger le portfolio.");
      });
  }, [id]);

  if (error) {
    return (
      <div className="min-h-screen bg-slate-100 p-10 text-center">
        <p className="text-red-600">
          {error}
        </p>

        <button
          onClick={() => navigate("/dashboardAdmin")}
          className="mt-4 inline-flex items-center gap-2 rounded-lg bg-slate-950 px-4 py-2 text-sm font-bold text-white"
        >
          <ArrowLeft size={17} /> Retour
        </button>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-slate-100 p-10 text-center text-slate-500">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => navigate("/dashboardAdmin")}
          className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-white hover:text-slate-950"
        >
          <ArrowLeft size={18} /> Retour au dashboard
        </button>

        <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
          <div className="relative overflow-hidden bg-slate-950 p-7 text-white sm:p-9">
            <img src={portfolio.photo || "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?auto=format&fit=crop&w=1200&q=85"} alt="Terrain de football" className="absolute inset-0 h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
            <div className="relative flex items-center gap-5">
              <div aria-label={`Initiales de ${portfolio.prenom} ${portfolio.nom}`} className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border-2 border-lime-400 bg-lime-400 text-2xl font-black text-slate-950">{getInitials(portfolio.prenom, portfolio.nom)}</div>
              <div><p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Portfolio sportif</p><h1 className="mt-2 text-3xl font-black">{portfolio.prenom} {portfolio.nom}</h1><p className="mt-1 flex items-center gap-2 text-sm text-slate-300"><Dumbbell size={16} /> {portfolio.sport}</p></div>
            </div>
          </div>
          <div className="p-6 sm:p-9">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{[[CalendarDays, "Age", `${portfolio.age} ans`], [TrendingUp, "Niveau", portfolio.niveau], [Crosshair, "Position", portfolio.position], [Users, "Equipe", portfolio.equipe || "Non renseignée"], [MapPin, "Ville", portfolio.ville], [Ruler, "Taille", `${portfolio.taille} cm`], [Weight, "Poids", `${portfolio.poids} kg`]].map(([Icon, label, value]) => <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}><Icon size={19} className="mb-3 text-lime-600" /><p className="text-xs font-bold uppercase tracking-wider text-slate-400">{label}</p><p className="mt-1 font-bold text-slate-900">{value || "Non renseigné"}</p></div>)}</div>

            <h2 className="mt-8 flex items-center gap-2 text-xl font-black text-slate-950">
              <BriefcaseBusiness className="text-lime-600" size={21} />
              Expérience
            </h2>

            <p className="mt-2 rounded-xl bg-slate-50 p-4 leading-7 text-slate-600">
              {portfolio.experience || "Non renseignée"}
            </p>

            <h2 className="mt-8 flex items-center gap-2 text-xl font-black text-slate-950">
              <Trophy className="text-lime-600" size={21} />
              Palmarès
            </h2>

            <p className="mt-2 rounded-xl bg-slate-50 p-4 leading-7 text-slate-600">
              {portfolio.palmares || "Non renseigné"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
