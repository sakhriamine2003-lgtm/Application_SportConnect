
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import api from '../axios/axios';

function MesCandidatures() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getCandidatures();
  }, []);

  const getCandidatures = async () => {
    try {
      const token = localStorage.getItem('sport_connect_token');

      const response = await api.get('/mes-candidatures', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setItems(response.data);
    } catch (error) {
      setError('Impossible de charger vos candidatures.');
    }

    setLoading(false);
  };

  const getStatus = (status) => {
    if (status === 'accepted') {
      return (
        <span className="flex items-center gap-2 rounded-full bg-lime-100 px-3 py-2 text-xs font-bold text-lime-800">
          <CheckCircle2 size={14} />
          Candidature acceptée
        </span>
      );
    }

    if (status === 'rejected') {
      return (
        <span className="flex items-center gap-2 rounded-full bg-red-100 px-3 py-2 text-xs font-bold text-red-700">
          <XCircle size={14} />
          Candidature refusée
        </span>
      );
    }

    return (
      <span className="flex items-center gap-2 rounded-full bg-amber-100 px-3 py-2 text-xs font-bold text-amber-800">
        <Clock3 size={14} />
        En attente de réponse
      </span>
    );
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="mx-auto max-w-3xl rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <header className="bg-slate-950 p-6 text-white">
          <button
            onClick={() => navigate('/dashboardSportif')}
            className="flex items-center gap-2 text-sm text-slate-300"
          >
            <ArrowLeft size={18} />
            Retour au dashboard
          </button>

          <p className="mt-6 text-xs font-bold text-lime-300">
            ESPACE SPORTIF
          </p>

          <h1 className="mt-2 text-3xl font-black">
            Mes candidatures
          </h1>

          <p className="mt-2 text-sm text-slate-300">
            Suivez les réponses de l'administrateur.
          </p>
        </header>

        {/* Contenu */}
        <div className="p-6">

          {loading && (
            <p>Chargement...</p>
          )}

          {error && (
            <p className="text-red-600">
              {error}
            </p>
          )}

          {!loading && !error && items.length === 0 && (
            <p className="text-slate-500">
              Vous n'avez pas encore postulé à une offre.
            </p>
          )}

          {!loading && !error && items.length > 0 && (
            <div className="space-y-4">

              {items.map((item) => (
                <article
                  key={item.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="text-xs font-bold text-lime-600">
                    OFFRE DE RECRUTEMENT
                  </p>

                  <h2 className="mt-2 text-xl font-bold">
                    {item.offre_recrutement?.title || 'Offre indisponible'}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {item.offre_recrutement?.description}
                  </p>

                  <div className="mt-4">
                    {getStatus(item.status)}
                  </div>
                </article>
              ))}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}

export default MesCandidatures;