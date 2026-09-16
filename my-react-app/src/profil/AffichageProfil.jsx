function AffichageProfil({ onView, onCreate, onBack }) {
  return (
    <main className="min-h-screen bg-slate-950 px-4 py-10 text-white">
      <section className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-slate-900 shadow-2xl">
        <div className="border-b border-white/10 bg-gradient-to-r from-blue-700 to-cyan-600 px-6 py-10 md:px-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-100">
            SportConnect
          </p>
          <h1 className="mt-3 text-3xl font-bold md:text-4xl">Votre espace sportif</h1>
          <p className="mt-2 max-w-xl text-blue-100">
            Gérez votre identité sportive et présentez votre parcours aux clubs.
          </p>
        </div>

        <div className="p-6 md:p-10">
        <button
          type="button"
          onClick={onBack}
          className="mb-8 rounded-lg border border-white/15 px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
        >
          ← Retour au tableau de bord
        </button>

        <div className="grid gap-5 md:grid-cols-2">
          <button
            type="button"
            onClick={onView}
            className="group rounded-2xl border border-white/10 bg-slate-800 p-6 text-left transition hover:-translate-y-1 hover:border-cyan-400/60 hover:bg-slate-700"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/15 text-2xl text-cyan-300">
              ◉
            </span>
            <h2 className="mt-5 text-xl font-bold">Voir mon profil</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">
              Consultez vos informations, votre sport et votre parcours.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-cyan-300 group-hover:text-cyan-200">
              Ouvrir le profil →
            </span>
          </button>

          <button
            type="button"
            onClick={onCreate}
            className="group rounded-2xl border border-white/10 bg-white p-6 text-left text-slate-900 transition hover:-translate-y-1 hover:shadow-xl"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-2xl text-blue-700">
              +
            </span>
            <h2 className="mt-5 text-xl font-bold">Créer un profil</h2>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              Ajoutez vos informations pour être visible par les clubs.
            </p>
            <span className="mt-5 inline-block text-sm font-semibold text-blue-700 group-hover:text-blue-800">
              Commencer la création →
            </span>
          </button>
        </div>
        </div>
      </section>
    </main>
  );
}

export default AffichageProfil;
