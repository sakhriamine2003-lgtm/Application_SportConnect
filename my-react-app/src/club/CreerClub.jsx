import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Building2, Dumbbell, FileText, MapPin, Plus } from 'lucide-react';
import api from '../axios/axios';
import { SPORTS } from '../utils/sports';

export default function CreerClub() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nom: '', ville: '', sport: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');

    try {
      const token = localStorage.getItem('sport_connect_token');
      const response = await api.post('/clubs', form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessage(response.data?.message || 'Club créé avec succès.');
      setForm({ nom: '', ville: '', sport: '', description: '' });
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création du club.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <div className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white md:px-10">
          <img src="https://images.unsplash.com/photo-1579952363873-27f3b0541f25?auto=format&fit=crop&w=1400&q=85" alt="Match de football" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
          <div className="relative"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-lime-300"><Building2 size={16} /> SportConnect</p><h1 className="mt-3 text-3xl font-black">Créer un club</h1><p className="mt-2 text-slate-300">Renseignez les informations du club pour l'ajouter à la plateforme.</p></div>
        </div>

        <div className="p-6 md:p-10">
          <button
            type="button"
            onClick={() => navigate('/dashboardAdmin')}
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft size={18} /> Retour au dashboard
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Building2 size={16} className="text-lime-600" /> Nom du club</label>
              <input
                type="text"
                name="nom"
                value={form.nom}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                placeholder="Ex : Club Sport Plus"
                required
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><MapPin size={16} className="text-lime-600" /> Ville</label>
              <input
                type="text"
                name="ville"
                value={form.ville}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                placeholder="Ex : Casablanca"
                required
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><Dumbbell size={16} className="text-lime-600" /> Sport</label>
              <select
                name="sport"
                value={form.sport}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                required
              >
                <option value="" disabled>Sélectionnez un sport</option>
                {SPORTS.map((sport) => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><FileText size={16} className="text-lime-600" /> Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                placeholder="Décrivez le club..."
                required
              />
            </div>

            <div className="flex items-center gap-4 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-lime-400 hover:text-slate-950 disabled:opacity-60"
              >
                {loading ? 'Enregistrement...' : <><Plus size={17} /> Enregistrer le club</>}
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboardAdmin/clubs')}
                className="rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Voir les clubs
              </button>
            </div>
          </form>

          {message && (
            <div className="mt-6 rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm text-lime-800">
              {message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
