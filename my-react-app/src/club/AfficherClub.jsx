import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Shield } from 'lucide-react';
import api from '../axios/axios';

export default function AfficherClub() {
  const navigate = useNavigate();
  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClub = async () => {
      try {
        const token = localStorage.getItem('sport_connect_token');
        const response = await api.get('/clubs', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setClub(response.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Aucun club trouvé.');
      } finally {
        setLoading(false);
      }
    };

    fetchClub();
  }, []);

  if (loading) {
    return <div className="min-h-screen bg-slate-100 p-10 text-slate-500">Chargement du club...</div>;
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <div className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white md:px-10">
          <img src="https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=85" alt="Terrain de football" className="absolute inset-0 h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/20" />
          <div className="relative"><p className="text-sm font-bold uppercase tracking-[0.2em] text-lime-300">Sport Connect</p><h1 className="mt-3 text-3xl font-black">Mon club</h1><p className="mt-2 text-slate-300">Consultez les informations du club associé à votre compte.</p></div>
        </div>

        <div className="p-6 md:p-10">
          <button
            type="button"
            onClick={() => navigate('/dashboardAdmin')}
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft size={18} /> Retour au dashboard
          </button>

          {!club && !error ? (
            <p className="text-slate-300">Aucun club disponible.</p>
          ) : null}

          {error && (
            <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {club && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-lime-100 text-lime-700"><Shield size={27} /></div>

              <h2 className="text-2xl font-black text-slate-950">{club.nom}</h2>
              <p className="mt-2 text-sm uppercase tracking-[0.12em] text-lime-700">Club</p>

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-400"><MapPin size={15} /> Ville</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{club.ville}</p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Description</p>
                  <p className="mt-2 text-lg font-semibold text-slate-900">{club.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  
  );
}
