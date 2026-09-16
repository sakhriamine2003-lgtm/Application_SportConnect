
import { useEffect, useState } from "react";
import api from "../../axios/axios";

export default function AfficherPortfolio({ onBack }) {

  const [portfolio, setportfolio] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    // 1. Récupérer le token
    const token = localStorage.getItem("sport_connect_token");

    // 2. Vérifier le token
    if (!token) {
      setError("Vous devez vous connecter.");
      return;
    }

    // 3. Appeler Laravel
    api.get("/AfficherPortfolio", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    // 4. Si Laravel répond
    .then((response) => {
      setportfolio(response.data);
    })

    // 5. Si erreur
    .catch((error) => {
      setError("Impossible de charger le profil.");
      console.log(error);
    });

  }, []);


  // Afficher l'erreur
  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-4">
        <section className="w-full max-w-md rounded-2xl border border-red-400/20 bg-slate-900 p-8 text-center shadow-xl">
          <p className="text-sm font-semibold uppercase tracking-widest text-red-400">Profil indisponible</p>
          <p className="mt-3 text-slate-300">{error}</p>
          <button onClick={onBack} className="mt-6 rounded-lg bg-white px-5 py-3 font-semibold text-slate-900 hover:bg-slate-200">
            ← Retour
          </button>
        </section>
      </main>
    );
  }


  
  if (!portfolio) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-slate-300">
        Chargement du profil...
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 py-8 text-white md:px-8">

      <button
        onClick={onBack}
        className="mb-8 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white"
      >
        ← Retour aux profils
      </button>

      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-8 md:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            {portfolio.photo ? (
              <img src={portfolio.photo} alt="Photo du sportif" className="h-24 w-24 rounded-2xl object-cover ring-4 ring-white/20" />
            ) : (
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white/15 text-4xl">◉</div>
            )}
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-blue-100">Profil sportif</p>
              <h1 className="mt-1 text-3xl font-bold">{portfolio.prenom} {portfolio.nom}</h1>
              <p className="mt-1 text-blue-100">{portfolio.sport} · {portfolio.niveau}</p>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 md:grid-cols-2 md:p-10">
          <section>
            <h2 className="mb-4 text-sm font-bold uppercase tracking-widest text-cyan-300">Informations</h2>
            <div className="space-y-3 text-sm">
              <p><strong className="text-slate-400">Age :</strong> {portfolio.age} ans</p>
              <p><strong className="text-slate-400">Position :</strong> {portfolio.position}</p>
              <p><strong className="text-slate-400">Equipe :</strong> {portfolio.equipe || "Non renseignée"}</p>
              <p><strong className="text-slate-400">Ville :</strong> {portfolio.ville}</p>
              <p><strong className="text-slate-400">Taille :</strong> {portfolio.taille} cm</p>
              <p><strong className="text-slate-400">Poids :</strong> {portfolio.poids} kg</p>
            </div>
          </section>

          <section className="space-y-5">
            <div>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-300">Experience</h2>
              <p className="leading-7 text-slate-300">{portfolio.experience}</p>
            </div>
            <div>
              <h2 className="mb-2 text-sm font-bold uppercase tracking-widest text-cyan-300">Palmares</h2>
              <p className="leading-7 text-slate-300">{portfolio.palmares}</p>
            </div>
          </section>
        </div>

      </div>

    </main>
  );
}

