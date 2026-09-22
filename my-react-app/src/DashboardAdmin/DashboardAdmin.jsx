import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BriefcaseBusiness, Dumbbell, Shield, UserRound, Users } from 'lucide-react';
import AdminSidebar from '../components/admin/AdminSidebar';
import api from '../axios/axios';
import { getInitials } from '../utils/initials';

export default function DashboardAdmin() {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [sportifs, setSportifs] = useState([]);
  const [loadingSportifs, setLoadingSportifs] = useState(true);
  const [sportifSportFilter, setSportifSportFilter] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('sport_connect_token');
      await api.post('/logout', {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } finally {
      localStorage.removeItem('sport_connect_token');
      localStorage.removeItem('sport_connect_user_role');
      navigate('/');
    }
  };

  const handleNavigation = (item) => {
    setActiveItem(item);
    const paths = {
      Dashboard: '/dashboardAdmin',
      Offres: '/dashboardAdmin/offres',
      Clubs: '/dashboardAdmin/clubs',
      Candidatures: '/dashboardAdmin/candidatures',
    };
    if (paths[item]) navigate(paths[item]);
  };

  useEffect(() => {
    const fetchSportifs = async () => {
      try {
        const token = localStorage.getItem('sport_connect_token');
        const response = await api.get('/admin/sportifs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setSportifs(response.data || []);
      } catch (error) {
        console.error('Erreur chargement sportifs:', error);
      } finally {
        setLoadingSportifs(false);
      }
    };

    fetchSportifs();
  }, []);

  const sportifSports = useMemo(
    () => [...new Set(sportifs.map((sportif) => sportif.portfolio?.sport).filter(Boolean))],
    [sportifs]
  );

  const displayedSportifs = sportifSportFilter
    ? sportifs.filter((sportif) => sportif.portfolio?.sport === sportifSportFilter)
    : sportifs;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 lg:flex">
      <AdminSidebar activeItem={activeItem} onNavigate={handleNavigation} onLogout={handleLogout} />

      <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-9">
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-lime-600">Mardi 16 septembre 2026</p>
            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Bonjour, Admin</h1>
            <p className="mt-2 text-sm text-slate-500">Voici ce qui se passe sur votre plateforme aujourd’hui.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-lime-300 hover:bg-lime-50" type="button">
              Nouvelle offre
            </button>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-950 font-bold text-white">A</div>
              <span className="font-semibold text-slate-800">Admin</span>
            </div>
          </div>
        </header>

        <div className="space-y-6">
        <section className="relative overflow-hidden rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-200/70 sm:p-8">
          <img src="https://images.unsplash.com/photo-1518600506278-4e8ef466b810?auto=format&fit=crop&w=1400&q=85" alt="Terrain de football éclairé" className="absolute inset-0 h-full w-full object-cover opacity-35" />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-slate-950/20" />
          <div className="relative max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-lime-300">Pilotage sportif</p>
            <h2 className="mt-2 text-2xl font-black sm:text-3xl">Toute votre activité, au même endroit.</h2>
            <p className="mt-2 text-sm leading-6 text-slate-300">Suivez les clubs, les sportifs et les opportunités de recrutement de votre plateforme.</p>
            <button type="button" onClick={() => navigate('/dashboardAdmin/candidatures')} className="mt-5 inline-flex items-center gap-2 rounded-lg bg-lime-400 px-4 py-2.5 text-sm font-black text-slate-950 transition hover:bg-lime-300">Voir les candidatures</button>
          </div>
        </section>

        {activeItem !== 'Dashboard' && activeItem !== 'Déconnexion' && (
          <div className="rounded-2xl border border-lime-200 bg-lime-50 px-5 py-4 text-sm text-lime-800">
            Section <strong>{activeItem}</strong> sélectionnée. Les données de cette vue seront bientôt disponibles.
          </div>
        )}

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-600"><Users size={15} /> Recrutement</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Candidatures des sportifs</h2>
              <p className="mt-2 text-sm text-slate-500">Consultez les demandes reçues et acceptez ou refusez chaque candidature.</p>
            </div>
            <button type="button" onClick={() => navigate('/dashboardAdmin/candidatures')} className="rounded-lg bg-slate-950 px-5 py-3 text-sm font-bold text-white transition hover:bg-lime-400 hover:text-slate-950">Voir les candidatures</button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-600"><Shield size={15} /> Gestion des clubs</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Club</h2>
            </div>
            <div className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-700">12 clubs actifs</div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate('/dashboardAdmin/clubs/ajouter')}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-lime-300 hover:bg-lime-50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-xs font-black text-lime-700">NEW</div>
              <p className="text-lg font-semibold text-slate-900">Créer un club</p>
              <p className="mt-2 text-sm text-slate-500">Ajouter un nouveau club et ses informations principales.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lime-700 group-hover:text-lime-800">Créer club</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/dashboardAdmin/clubs')}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-lime-300 hover:bg-lime-50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-xs font-black text-white">CLUB</div>
              <p className="text-lg font-semibold text-slate-900">Afficher les clubs</p>
              <p className="mt-2 text-sm text-slate-500">Consulter la liste des clubs, leurs détails et leur statut.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-slate-950 group-hover:text-lime-700">Afficher club</span>
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-600"><BriefcaseBusiness size={15} /> Gestion des offres</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Offres de recrutement</h2>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <button
              type="button"
              onClick={() => navigate('/dashboardAdmin/offres')}
              className="group rounded-2xl border border-slate-200 bg-slate-50 p-5 text-left transition hover:border-lime-300 hover:bg-lime-50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-lime-100 text-xs font-black text-lime-700">OFFRE</div>
              <p className="text-lg font-semibold text-slate-900">Gérer les offres</p>
              <p className="mt-2 text-sm text-slate-500">Créer, modifier ou supprimer des offres de recrutement.</p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-lime-700 group-hover:text-lime-800">Gérer</span>
            </button>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-lime-600"><UserRound size={15} /> Sportifs disponibles</p>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">Liste des sportifs</h2>
            </div>
            <span className="rounded-full bg-lime-50 px-3 py-1 text-xs font-semibold text-lime-700">{sportifs.length} inscrit(s)</span>
          </div>

          {sportifSports.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500"><Dumbbell size={14} className="text-lime-600" /> Filtrer par sport :</p>
              <button
                type="button"
                onClick={() => setSportifSportFilter('')}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sportifSportFilter === '' ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Tous
              </button>
              {sportifSports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => setSportifSportFilter(sport)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition ${sportifSportFilter === sport ? 'bg-lime-400 text-slate-950' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                >
                  {sport}
                </button>
              ))}
            </div>
          )}

          {loadingSportifs ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Chargement des sportifs...</div>
          ) : sportifs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Aucun sportif inscrit pour le moment.</div>
          ) : displayedSportifs.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-500">Aucun sportif pour le sport "{sportifSportFilter}".</div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {displayedSportifs.map((sportif) => {
                const portfolio = sportif.portfolio || {};
                return (
                  <article key={sportif.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:-translate-y-1 hover:border-lime-300 hover:bg-white hover:shadow-lg">
                    <div className="flex items-center gap-4">
                      <div aria-label={`Initiales de ${sportif.name}`} className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-2 border-white bg-lime-400 text-lg font-black text-slate-950 shadow-sm">{getInitials(portfolio.prenom || sportif.name, portfolio.nom)}</div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900">{sportif.name}</h3>
                        <p className="text-sm text-slate-500">{portfolio.sport || 'Sport non précisé'}</p>
                        <p className="mt-1 truncate text-xs text-slate-400">{sportif.email || 'Email non renseigné'}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-600">
                      <p className="flex items-center gap-2 rounded-lg bg-white p-2"><span className="w-5 shrink-0 text-center text-xs font-black text-lime-600">AG</span><span><strong className="block text-slate-400">Âge</strong>{portfolio.age ? `${portfolio.age} ans` : '—'}</span></p>
                      <p className="flex items-center gap-2 rounded-lg bg-white p-2"><span className="w-5 shrink-0 text-center text-xs font-black text-lime-600">PO</span><span><strong className="block text-slate-400">Position</strong>{portfolio.position || '—'}</span></p>
                      <p className="flex items-center gap-2 rounded-lg bg-white p-2"><span className="w-5 shrink-0 text-center text-xs font-black text-lime-600">NI</span><span><strong className="block text-slate-400">Niveau</strong>{portfolio.niveau || '—'}</span></p>
                      <p className="flex items-center gap-2 rounded-lg bg-white p-2"><span className="w-5 shrink-0 text-center text-xs font-black text-lime-600">VI</span><span><strong className="block text-slate-400">Ville</strong>{portfolio.ville || '—'}</span></p>
                    </div>

                    <button
                      type="button"
                      onClick={() => navigate(`/dashboardAdmin/sportifs/${sportif.id}/portfolio`)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-lime-400 hover:text-slate-950"
                    >
                      <UserRound size={15} /> Voir le profil
                    </button>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        </div>

      </main>
    </div>
  );
}
