import React, { useState } from 'react';
import AdminSidebar from '../components/admin/AdminSidebar';
import DashboardStatCard from '../components/admin/DashboardStatCard';

const stats = [
  { label: 'Offres actives', value: '128', change: '+12% ce mois-ci', accent: 'bg-emerald-400' },
  { label: 'Sportifs inscrits', value: '2 480', change: '+8,4% ce mois-ci', accent: 'bg-sky-400' },
  { label: 'Candidatures', value: '346', change: '+18 nouvelles aujourd’hui', accent: 'bg-amber-400' },
  { label: 'Taux de conversion', value: '64,8%', change: '+4,2 points ce mois-ci', accent: 'bg-violet-400' },
];

const applications = [
  { name: 'Sarah Ben Ali', role: 'Coach sportif', status: 'À examiner', color: 'bg-orange-100 text-orange-700' },
  { name: 'Yassine Trabelsi', role: 'Préparateur physique', status: 'Entretien', color: 'bg-sky-100 text-sky-700' },
  { name: 'Meriem Kallel', role: 'Kinésithérapeute', status: 'Nouveau', color: 'bg-emerald-100 text-emerald-700' },
  { name: 'Ahmed Gharbi', role: 'Analyste vidéo', status: 'À examiner', color: 'bg-orange-100 text-orange-700' },
];

export default function DashboardAdmin() {
  const [activeItem, setActiveItem] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-[#f5f7f9] font-sans text-slate-900 lg:flex">
      <AdminSidebar activeItem={activeItem} onNavigate={setActiveItem} />

      <main className="min-w-0 flex-1 px-5 py-6 sm:px-8 lg:px-10 lg:py-9">
        <header className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-sm font-medium text-emerald-600">Mardi 16 septembre 2026</p>
            <h1 className="text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">Bonjour, Admin</h1>
            <p className="mt-2 text-sm text-slate-500">Voici ce qui se passe sur votre plateforme aujourd’hui.</p>
          </div>
          <button className="flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50" type="button">
            <span aria-hidden="true" className="text-lg leading-none">+</span>
            Nouvelle offre
          </button>
        </header>

        {activeItem !== 'Dashboard' && activeItem !== 'Déconnexion' && (
          <div className="mb-6 rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-4 text-sm text-emerald-800">
            Section <strong>{activeItem}</strong> sélectionnée. Les données de cette vue seront bientôt disponibles.
          </div>
        )}

        <section aria-label="Indicateurs principaux" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => <DashboardStatCard key={stat.label} {...stat} />)}
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Activité des candidatures</h2>
                <p className="mt-1 text-sm text-slate-500">Évolution des 6 derniers mois</p>
              </div>
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">+24,6%</span>
            </div>
            <div className="mt-8 flex h-48 items-end gap-3 border-b border-slate-100 px-2 sm:gap-6">
              {[42, 58, 48, 76, 68, 91].map((height, index) => (
                <div className="flex h-full flex-1 flex-col justify-end gap-2" key={index}>
                  <div className="rounded-t-lg bg-emerald-400 transition hover:bg-emerald-500" style={{ height: `${height}%` }} />
                  <span className="translate-y-6 text-center text-xs text-slate-400">{['Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept'][index]}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/60 sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-slate-950">Dernières candidatures</h2>
                <p className="mt-1 text-sm text-slate-500">À traiter cette semaine</p>
              </div>
              <button className="text-xs font-semibold text-emerald-700 hover:text-emerald-800" type="button">Voir tout</button>
            </div>
            <div className="mt-5 divide-y divide-slate-100">
              {applications.map((application) => (
                <div className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={application.name}>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-600">
                    {application.name.split(' ').map((part) => part[0]).join('')}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{application.name}</p>
                    <p className="truncate text-xs text-slate-500">{application.role}</p>
                  </div>
                  <span className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${application.color}`}>{application.status}</span>
                </div>
              ))}
            </div>
          </article>
        </section>
      </main>
    </div>
  );
}