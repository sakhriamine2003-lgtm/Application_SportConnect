const ITEMS = ['Dashboard', 'Offres', 'Sportifs', 'Clubs', 'Candidatures', 'Statistiques'];

export default function AdminSidebar({ activeItem, onNavigate, onLogout }) {
  return (
    <aside className="flex w-full shrink-0 flex-col bg-slate-950 px-4 py-5 text-slate-300 lg:min-h-screen lg:w-64">
      <div className="mb-10 flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-400 font-black text-slate-950">SC</div>
        <div>
          <p className="text-sm font-semibold text-white">Sport Connect</p>
          <p className="text-xs text-slate-500">Administration</p>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        <p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-600">Espace admin</p>
        {ITEMS.map((label) => (
          <button
            key={label}
            type="button"
            onClick={() => onNavigate(label)}
            className={`flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition ${
              activeItem === label
                ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-950/30'
                : 'text-slate-400 hover:bg-slate-900 hover:text-white'
            }`}
          >
            <span className="w-5 text-center text-xs font-black">{label.slice(0, 2).toUpperCase()}</span>
            <span>{label}</span>
          </button>
        ))}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="mt-8 flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition hover:bg-red-950/40 hover:text-red-300"
      >
        <span className="w-5 text-center text-xs font-black">DX</span>
        <span>Déconnexion</span>
      </button>
    </aside>
  );
}
