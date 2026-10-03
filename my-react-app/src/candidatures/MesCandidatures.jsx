import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock3, XCircle } from 'lucide-react';
import api from '../axios/axios';

const statuses = {
  pending: { label: 'En attente de réponse', className: 'bg-amber-100 text-amber-800', Icon: Clock3 },
  accepted: { label: 'Candidature acceptée', className: 'bg-lime-100 text-lime-800', Icon: CheckCircle2 },
  rejected: { label: 'Candidature refusée', className: 'bg-red-100 text-red-700', Icon: XCircle },
};

export default function MesCandidatures() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('sport_connect_token');
        const response = await api.get('/mes-candidatures', { headers: { Authorization: `Bearer ${token}` } });
        setItems(response.data || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Impossible de charger vos réponses.');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8"><section className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70"><header className="bg-slate-950 px-6 py-8 text-white md:px-10"><button type="button" onClick={() => navigate('/dashboardSportif')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-lime-300"><ArrowLeft size={18} /> Retour au dashboard</button><p className="mt-7 text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Espace sportif</p><h1 className="mt-2 text-3xl font-black">Mes candidatures</h1><p className="mt-2 text-sm text-slate-300">Suivez les réponses envoyées par l’administrateur.</p></header><div className="p-6 md:p-10">{loading ? <p className="rounded-xl bg-slate-50 p-5 text-slate-500">Chargement de vos candidatures...</p> : error ? <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</p> : items.length === 0 ? <div className="rounded-xl bg-slate-50 p-6 text-center text-slate-500">Vous n’avez pas encore postulé à une offre.</div> : <div className="space-y-4">{items.map((item) => { const status = statuses[item.status] || statuses.pending; const Icon = status.Icon; return <article key={item.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><p className="text-xs font-bold uppercase tracking-wider text-lime-600">Offre de recrutement</p><div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-xl font-black text-slate-950">{item.offre_recrutement?.title || 'Offre indisponible'}</h2><p className="mt-1 text-sm text-slate-500">{item.offre_recrutement?.description || ''}</p></div><span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-2 text-xs font-bold ${status.className}`}><Icon size={14} /> {status.label}</span></div></article>; })}</div>}</div></section></main>;
}
