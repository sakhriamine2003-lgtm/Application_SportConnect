import React from 'react';

const menuItems = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Offres', icon: 'offers' },
  { label: 'Sportifs', icon: 'athletes' },
  { label: 'Candidatures', icon: 'applications' },
  { label: 'Statistiques', icon: 'stats' },
];

function MenuIcon({ name }) {
  const paths = {
    dashboard: 'M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z',
    offers: 'M5 7h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Zm4-3h6l2 3H7l2-3Z',
    athletes: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z',
    applications: 'M6 3h9l3 3v15H6V3Zm9 0v4h4M9 12h6M9 16h4',
    stats: 'M5 19V9m7 10V5m7 14v-7',
  };

  return (
    <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.8">
      <path d={paths[name]} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function AdminSidebar({ activeItem, onNavigate }) {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-slate-950 px-4 py-5 text-slate-300 lg:min-h-screen lg:w-64">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-black text-slate-950">SC</div>
        <div>
          <p className="text-sm font-semibold tracking-wide text-white">Sport Connect</p>
          <p className="text-xs text-slate-500">Administration</p>
        </div>
      </div>

      <nav aria-label="Navigation principale" className="flex-1">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-[0.18em] text-slate-600">Espace admin</p>
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.label;
            return (
              <button
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
                  isActive ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30' : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                }`}
                key={item.label}
                onClick={() => onNavigate(item.label)}
                type="button"
              >
                <MenuIcon name={item.icon} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <button
        className="mt-8 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-950/40 hover:text-red-300"
        onClick={() => onNavigate('Déconnexion')}
        type="button"
      >
        <span aria-hidden="true" className="text-lg leading-none">↪</span>
        <span>Déconnexion</span>
      </button>
    </aside>
  );
}