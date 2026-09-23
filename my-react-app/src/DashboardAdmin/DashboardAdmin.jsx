import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/admin/AdminSidebar';
import api from '../axios/axios';
import { getInitials } from '../utils/initials';

export default function DashboardAdmin() {
  const [sportifs, setSportifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sportFilter, setSportFilter] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    api.get('/admin/sportifs', {
      headers: { Authorization: `Bearer ${localStorage.getItem('sport_connect_token')}` }
    })
      .then(({ data }) => setSportifs(data || []))
      .finally(() => setLoading(false));
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
  };

  const sportsList =
    [
      ...new Set(sportifs.map((s) => s.portfolio?.sport).filter(Boolean))
    ];

  const filteredSportifs = sportFilter ? sportifs.filter((s) => s.portfolio?.sport === sportFilter) : sportifs;


  return (
    <div className="flex min-h-screen bg-slate-100 font-sans text-slate-900">
      <AdminSidebar activeItem="Dashboard" onNavigate={(path) => navigate(path)} onLogout={handleLogout} />

      <main className="flex-1 p-6 space-y-6">
        <header>
          <h1 className="text-3xl font-black">Bonjour, Admin</h1>
          <p className="text-sm text-slate-500">Vue d'ensemble de votre plateforme.</p>
        </header>

        {/* Section Actions Rapides */}
        <div className="grid gap-4 md:grid-cols-3">
          <button onClick={() => navigate('/dashboardAdmin/candidatures')} className="p-4 bg-white rounded-xl border hover:border-lime-400">
            Voir les Candidatures
          </button>
          <button onClick={() => navigate('/dashboardAdmin/clubs')} className="p-4 bg-white rounded-xl border hover:border-lime-400">
            Gérer les Clubs
          </button>
          <button onClick={() => navigate('/dashboardAdmin/offres')} className="p-4 bg-white rounded-xl border hover:border-lime-400">
            Gérer les Offres
          </button>
        </div>

        {/* Section Sportifs */}
        <section className="bg-white p-6 rounded-2xl border">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Sportifs ({filteredSportifs.length})</h2>

            {/* Boutons de filtre */}
            <div className="flex gap-2">
              <button onClick={() => setSportFilter('')} className={`px-3 py-1 text-xs rounded-full ${!sportFilter ? 'bg-slate-950 text-white' : 'bg-slate-100'}`}>Tous</button>
              {sportsList.map((sport) => (
                <button key={sport} onClick={() => setSportFilter(sport)} className={`px-3 py-1 text-xs rounded-full ${sportFilter === sport ? 'bg-lime-400' : 'bg-slate-100'}`}>{sport}</button>
              ))}
            </div>
          </div>

          {/* Grille des cartes */}
          {loading ? (
            <p>Chargement...</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {filteredSportifs.map((s) => (
                <div key={s.id} className="p-4 bg-slate-50 border rounded-xl space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-lime-400 flex items-center justify-center font-bold text-slate-950">
                      {getInitials(s.portfolio?.prenom || s.name, s.portfolio?.nom)}
                    </div>
                    <div>
                      <h3 className="font-bold">{s.name}</h3>
                      <p className="text-xs text-slate-500">{s.portfolio?.sport || 'Non précisé'}</p>
                    </div>
                  </div>
                  <button onClick={() => navigate(`/dashboardAdmin/sportifs/${s.id}/portfolio`)} className="w-full py-2 bg-slate-950 text-white rounded-lg text-xs font-bold hover:bg-lime-400 hover:text-slate-950 transition">
                    Voir le profil
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}