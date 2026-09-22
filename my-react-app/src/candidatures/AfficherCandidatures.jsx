import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock3, ThumbsDown, ThumbsUp, UserRound, XCircle } from 'lucide-react';
import api from '../axios/axios';
import { getInitials } from '../utils/initials';

const statusConfig = {
  pending: { label: 'En attente', className: 'bg-amber-100 text-amber-800', Icon: Clock3 },
  accepted: { label: 'Acceptée', className: 'bg-lime-100 text-lime-800', Icon: CheckCircle2 },
  rejected: { label: 'Refusée', className: 'bg-red-100 text-red-700', Icon: XCircle },
};

export default function AfficherCandidatures() {
  const navigate = useNavigate();
  const [candidatures, setCandidatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchCandidatures = async () => {
    try {
      setError('');
      const token = localStorage.getItem('sport_connect_token');
      const response = await api.get('/candidatures', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCandidatures(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible de charger les candidatures.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCandidatures(); }, []);

  const respond = async (id, status) => {
    try {
      setUpdatingId(id);
      const token = localStorage.getItem('sport_connect_token');
      await api.patch(`/candidatures/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await fetchCandidatures();
    } catch (err) {
      setError(err.response?.data?.message || 'Impossible d’envoyer la réponse.');
    } finally {
      setUpdatingId(null);
    }
  };

  const pendingCount = candidatures.filter(({ status }) => status === 'pending').length;

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
      <section className="mx-auto max-w-5xl overflow-hidden rounded-2xl bg-white shadow-xl shadow-slate-200/70">
        <header className="bg-slate-950 px-6 py-8 text-white md:px-10">
          <button type="button" onClick={() => navigate('/dashboardAdmin')} className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-lime-300">
            <ArrowLeft size={18} /> Retour au dashboard
          </button>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Administration</p>
              <h1 className="mt-2 text-3xl font-black">Candidatures des sportifs</h1>
              <p className="mt-2 text-sm text-slate-300">Consultez les profils et répondez aux candidatures reçues.</p>
            </div>
            <span className="rounded-full bg-amber-400 px-4 py-2 text-sm font-black text-slate-950">{pendingCount} en attente</span>
          </div>
        </header>

        <div className="p-6 md:p-10">
          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-slate-500">Chargement des candidatures...</div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
          ) : candidatures.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 text-center text-slate-500">Aucune candidature reçue pour le moment.</div>
          ) : (
            <div className="space-y-4">
              {candidatures.map((candidature) => {
                const portfolio = candidature.user?.portfolio || {};
                const config = statusConfig[candidature.status] || statusConfig.pending;
                const StatusIcon = config.Icon;
                const athleteName = `${portfolio.prenom || ''} ${portfolio.nom || ''}`.trim() || candidature.user?.name || 'Sportif';

                return (
                  <article key={candidature.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                      <div aria-label={`Initiales de ${athleteName}`} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white bg-lime-400 text-lg font-black text-slate-950 shadow-sm">{getInitials(portfolio.prenom || candidature.user?.name, portfolio.nom)}</div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-bold uppercase tracking-wider text-lime-600">{candidature.offre_recrutement?.title || 'Offre de recrutement'}</p>
                        <h2 className="mt-1 text-lg font-black text-slate-950">{athleteName}</h2>
                        <p className="mt-1 text-sm text-slate-500">{portfolio.sport || 'Sport non précisé'}{portfolio.position ? ` · ${portfolio.position}` : ''}{portfolio.ville ? ` · ${portfolio.ville}` : ''}</p>
                        <p className="mt-1 text-xs text-slate-400">{candidature.user?.email || 'Email non renseigné'}</p>
                      </div>
                      <span className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold ${config.className}`}><StatusIcon size={14} /> {config.label}</span>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                      <button type="button" onClick={() => navigate(`/dashboardAdmin/sportifs/${candidature.user?.id}/portfolio`)} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-lime-300 hover:bg-lime-50"><UserRound size={16} /> Voir le profil</button>
                    </div>

                    {candidature.status === 'pending' && (
                      <div className="mt-5 flex flex-wrap gap-3 border-t border-slate-200 pt-4">
                        <button type="button" disabled={updatingId === candidature.id} onClick={() => respond(candidature.id, 'accepted')} className="inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-lime-300 disabled:cursor-wait disabled:opacity-60"><ThumbsUp size={16} /> Accepter</button>
                        <button type="button" disabled={updatingId === candidature.id} onClick={() => respond(candidature.id, 'rejected')} className="inline-flex items-center gap-2 rounded-lg bg-red-100 px-4 py-2.5 text-sm font-bold text-red-700 transition hover:bg-red-200 disabled:cursor-wait disabled:opacity-60"><ThumbsDown size={16} /> Refuser</button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
