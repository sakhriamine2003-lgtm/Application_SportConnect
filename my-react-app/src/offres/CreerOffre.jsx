import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CalendarDays, ClipboardList, Dumbbell, FileText, Plus } from 'lucide-react';
import api from '../axios/axios';
import { SPORTS } from '../utils/sports';

const initialForm = {
  title: '',
  sport: '',
  date: '',
  description: '',
};

export default function CreerOffre() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
      const response = await api.post('/offres', form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setMessage(response.data?.message || 'Offre créée avec succès.');
      setForm(initialForm);
    } catch (err) {
      setError(err.response?.data?.message || 'Erreur lors de la création de l’offre.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <div className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white md:px-10">
          <img src="https://images.unsplash.com/photo-1556056504-5c7696c4c28d?auto=format&fit=crop&w=1400&q=85" alt="Ballon de football sur un terrain" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
          <div className="relative"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-lime-300"><ClipboardList size={16} /> SportConnect</p><h1 className="mt-3 text-3xl font-black">Créer une offre</h1><p className="mt-2 text-slate-300">Publiez une opportunité de recrutement pour les sportifs.</p></div>
        </div>

        <div className="p-6 md:p-10">
          <button
            type="button"
            onClick={() => navigate('/dashboardSportif')}
            className="mb-6 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
          >
            <ArrowLeft size={18} /> Retour au dashboard
          </button>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><ClipboardList size={16} className="text-lime-600" /> Titre</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                placeholder="Ex : Coach de football"
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
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><CalendarDays size={16} className="text-lime-600" /> Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                required
              />
            </div>

            <div>
              <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700"><FileText size={16} className="text-lime-600" /> Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
                placeholder="Décrivez l’offre, les missions et le profil recherché..."
                required
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-lime-400 hover:text-slate-950 disabled:opacity-60"
              >
                {loading ? 'Enregistrement...' : <><Plus size={17} /> Enregistrer l’offre</>}
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboardSportif/offres')}
                className="rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-slate-950"
              >
                Voir les offres
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
