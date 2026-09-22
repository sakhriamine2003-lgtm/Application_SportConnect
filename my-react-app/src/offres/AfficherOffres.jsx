import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BriefcaseBusiness, CalendarDays, Check, Clock3, Dumbbell, FilePenLine, FileText, Plus, ThumbsDown, ThumbsUp, Trash2 } from 'lucide-react';
import api from '../axios/axios';
import { getInitials } from '../utils/initials';
import { SPORTS } from '../utils/sports';

const emptyForm = {
  title: '',
  sport: '',
  date: '',
  description: '',
};

export default function AfficherOffres({ isAdmin = false }) {
  const navigate = useNavigate();
  const [offres, setOffres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitState, setSubmitState] = useState('');
  const [candidatures, setCandidatures] = useState([]);
  const [applicationState, setApplicationState] = useState('');
  const [sportFilter, setSportFilter] = useState('');

  const fetchOffres = async () => {
    try {
      const token = localStorage.getItem('sport_connect_token');
      const response = await api.get('/offres', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setOffres(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les offres.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCandidatures = async () => {
    try {
      const token = localStorage.getItem('sport_connect_token');
      const response = await api.get(isAdmin ? '/candidatures' : '/mes-candidatures', {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCandidatures(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les candidatures.');
    }
  };

  useEffect(() => {
    fetchOffres();
    fetchCandidatures();
  }, [isAdmin]);

  const handlePostuler = async (offreId) => {
    setApplicationState('');

    try {
      const token = localStorage.getItem('sport_connect_token');
      const response = await api.post(`/offres/${offreId}/candidatures`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplicationState(response.data?.message || 'Candidature envoyée.');
      fetchCandidatures();
    } catch (err) {
      setApplicationState(err.response?.data?.message || 'Impossible d’envoyer votre candidature.');
    }
  };

  const handleStatus = async (candidatureId, status) => {
    try {
      const token = localStorage.getItem('sport_connect_token');
      await api.patch(`/candidatures/${candidatureId}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCandidatures();
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible d’envoyer la réponse.');
    }
  };

  const getApplication = (offreId) => candidatures.find((candidature) => candidature.offre_recrutement_id === offreId);

  const statusLabel = {
    pending: 'En attente',
    accepted: 'Acceptée',
    rejected: 'Refusée',
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitState('');

    try {
      const token = localStorage.getItem('sport_connect_token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editingId) {
        await api.put(`/offres/${editingId}`, form, config);
        setSubmitState('Offre modifiée avec succès.');
      } else {
        await api.post('/offres', form, config);
        setSubmitState('Offre créée avec succès.');
      }

      setForm(emptyForm);
      setEditingId(null);
      fetchOffres();
    } catch (err) {
      setSubmitState(err.response?.data?.message || 'Une erreur est survenue.');
    }
  };

  const handleEdit = (offre) => {
    setEditingId(offre.id);
    setForm({
      title: offre.title,
      sport: offre.sport || '',
      date: offre.date,
      description: offre.description,
    });
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem('sport_connect_token');
      await api.delete(`/offres/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOffres();
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de supprimer cette offre.');
    }
  };

  const sports = useMemo(
    () => [...new Set(offres.map((offre) => offre.sport).filter(Boolean))],
    [offres]
  );

  const displayedOffres = sportFilter ? offres.filter((offre) => offre.sport === sportFilter) : offres;

  const dashboardPath = isAdmin ? '/dashboardAdmin' : '/dashboardSportif';

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <div className="relative overflow-hidden bg-slate-950 px-6 py-8 text-white md:px-10">
          <img src="https://images.unsplash.com/photo-1486286701208-1d58e9338013?auto=format&fit=crop&w=1400&q=85" alt="Joueur de football avec un ballon" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
          <div className="relative"><p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-lime-300"><BriefcaseBusiness size={16} /> SportConnect</p><h1 className="mt-3 text-3xl font-black">{isAdmin ? 'Gestion des offres' : 'Offres disponibles'}</h1><p className="mt-2 text-slate-300">
            {isAdmin ? 'Créez, modifiez et supprimez les offres de recrutement.' : 'Consultez les offres publiées et les opportunités de recrutement.'}
          </p></div>
        </div>

        <div className="p-6 md:p-10">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate(dashboardPath)}
              className="inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-slate-950"
            >
              <ArrowLeft size={18} /> Retour au dashboard
            </button>

            {isAdmin && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white transition hover:bg-lime-400 hover:text-slate-950"
              >
                <Plus size={17} /> Nouvelle offre
              </button>
            )}
          </div>

          {isAdmin && (
            <form onSubmit={handleSubmit} className="mb-8 space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h2 className="flex items-center gap-2 text-xl font-black text-slate-950"><FileText size={21} className="text-lime-600" /> {editingId ? 'Modifier l’offre' : 'Créer une offre'}</h2>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Titre</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Sport</label>
                <select
                  name="sport"
                  value={form.sport}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                  required
                >
                  <option value="" disabled>Sélectionnez un sport</option>
                  {SPORTS.map((sport) => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-lime-500 focus:ring-2 focus:ring-lime-100"
                  required
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button type="submit" className="inline-flex items-center gap-2 rounded-lg bg-slate-950 px-5 py-3 font-bold text-white hover:bg-lime-400 hover:text-slate-950">
                  <Check size={17} /> {editingId ? 'Enregistrer les modifications' : 'Créer l’offre'}
                </button>

                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setForm(emptyForm);
                    }}
                    className="rounded-lg border border-slate-200 px-4 py-3 font-semibold text-slate-600 hover:bg-white"
                  >
                    Annuler
                  </button>
                )}
              </div>

              {submitState && (
                  <div className="rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm text-lime-800">
                  {submitState}
                </div>
              )}
            </form>
          )}

          {sports.length > 0 && (
            <div className="mb-6 flex flex-wrap items-center gap-2">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500"><Dumbbell size={14} className="text-lime-600" /> Filtrer par sport :</p>
              <button
                type="button"
                onClick={() => setSportFilter('')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sportFilter === '' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Tous
              </button>
              {sports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSportFilter(sport)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sportFilter === sport ? 'bg-lime-400 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-500">Chargement des offres...</div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : displayedOffres.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-500">
              {sportFilter ? `Aucune offre pour le sport "${sportFilter}".` : 'Aucune offre disponible pour le moment.'}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {displayedOffres.map((offre) => (
                <article key={offre.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 shadow-sm transition hover:-translate-y-1 hover:border-lime-300 hover:shadow-lg">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-lime-600">
                        Offre {offre.sport && <span className="rounded-full bg-lime-100 px-2 py-0.5 text-[11px] font-bold text-lime-700">{offre.sport}</span>}
                      </p>
                      <h2 className="mt-3 text-2xl font-black text-slate-950">{offre.title}</h2>
                    </div>

                    {isAdmin && (
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(offre)}
                          className="inline-flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-xs font-bold text-slate-700 shadow-sm hover:bg-lime-100"
                        >
                          <FilePenLine size={14} /> Modifier
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(offre.id)}
                          className="inline-flex items-center gap-1 rounded-lg bg-red-600 px-3 py-2 text-xs font-bold text-white hover:bg-red-500"
                        >
                          <Trash2 size={14} /> Supprimer
                        </button>
                      </div>
                    )}
                  </div>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500"><CalendarDays size={15} /> Date : {offre.date}</p>
                  <p className="mt-4 leading-7 text-slate-600">{offre.description}</p>

                  {!isAdmin && (() => {
                    const candidature = getApplication(offre.id);

                    return candidature ? (
                      <div className="mt-5 flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
                        <Clock3 size={17} /> Réponse : {statusLabel[candidature.status] || candidature.status}
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handlePostuler(offre.id)}
                        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-lime-300"
                      >
                        <FileText size={17} /> Postuler avec mon portfolio
                      </button>
                    );
                  })()}

                  {isAdmin && (
                    <div className="mt-5 space-y-3 border-t border-slate-200 pt-4">
                      <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Candidatures</p>
                      {candidatures.filter((candidature) => candidature.offre_recrutement_id === offre.id).length === 0 ? (
                        <p className="text-sm text-slate-500">Aucune candidature.</p>
                      ) : candidatures.filter((candidature) => candidature.offre_recrutement_id === offre.id).map((candidature) => (
                        <div key={candidature.id} className="rounded-xl border border-slate-200 bg-white p-3">
                          <div className="flex items-center gap-3">
                            <div aria-label="Initiales du sportif" className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-lime-400 text-xs font-black text-slate-950">{getInitials(candidature.user?.portfolio?.prenom || candidature.user?.name, candidature.user?.portfolio?.nom)}</div>
                            <div className="min-w-0">
                              <p className="font-bold text-slate-900">{candidature.user?.portfolio?.prenom} {candidature.user?.portfolio?.nom}</p>
                              <p className="text-xs text-slate-500">{candidature.user?.portfolio?.sport || candidature.user?.email}</p>
                            </div>
                            <span className="ml-auto text-xs font-bold text-slate-500">{statusLabel[candidature.status] || candidature.status}</span>
                          </div>
                          {candidature.status === 'pending' && (
                            <div className="mt-3 flex gap-2">
                              <button type="button" onClick={() => handleStatus(candidature.id, 'accepted')} className="inline-flex items-center gap-1 rounded-lg bg-lime-100 px-3 py-2 text-xs font-bold text-lime-800 hover:bg-lime-200"><ThumbsUp size={14} /> Accepter</button>
                              <button type="button" onClick={() => handleStatus(candidature.id, 'rejected')} className="inline-flex items-center gap-1 rounded-lg bg-red-100 px-3 py-2 text-xs font-bold text-red-700 hover:bg-red-200"><ThumbsDown size={14} /> Refuser</button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}

          {applicationState && !isAdmin && (
            <div className="mt-5 rounded-xl border border-lime-200 bg-lime-50 px-4 py-3 text-sm font-semibold text-lime-800">
              {applicationState}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
