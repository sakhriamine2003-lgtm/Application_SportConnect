import React from "react";

export default function DashboardSportif({ onProfile }) {
  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col p-5">

        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 px-2">
          <div className="w-10 h-10 bg-gray-900 rounded-xl flex items-center justify-center text-white">
            🏆
          </div>

          <h1 className="text-xl font-bold text-gray-900">
            Sportif
          </h1>
        </div>

        {/* Menu */}
        <nav className="space-y-2">

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       bg-gray-900 text-white font-medium"
          >
            <span>🏠</span>
            Dashboard
          </a>

          <button
            type="button"
            onClick={onProfile}
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       text-gray-600 hover:bg-gray-100 transition w-full text-left"
          >
            <span>👤</span>
            Profil
          </button>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       text-gray-600 hover:bg-gray-100 transition"
          >
            <span>🏆</span>
            Résultats
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       text-gray-600 hover:bg-gray-100 transition"
          >
            <span>⚽</span>
            Sports
          </a>

          <a
            href="#"
            className="flex items-center gap-3 px-4 py-3 rounded-xl
                       text-gray-600 hover:bg-gray-100 transition"
          >
            <span>📅</span>
            Activités
          </a>

        </nav>

        {/* Profile bottom */}
        <div className="mt-auto border-t border-gray-200 pt-5 flex items-center gap-3">

          <div className="w-10 h-10 rounded-full bg-gray-900
                          text-white flex items-center justify-center font-bold">
            A
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Amine
            </p>

            <p className="text-sm text-gray-500">
              Sportif
            </p>
          </div>

        </div>

      </aside>


      {/* MAIN */}
      <main className="flex-1 p-8">

        {/* HEADER */}
        <header className="flex items-center justify-between mb-8">

          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Bonjour Amine 👋
            </h1>

            <p className="text-gray-500 mt-1">
              Bienvenue sur votre dashboard sportif
            </p>
          </div>

          <div className="flex items-center gap-5">

            <button
              className="w-11 h-11 bg-white rounded-xl
                         shadow-sm hover:bg-gray-50"
            >
              🔔
            </button>

            <div className="flex items-center gap-3">

              <div className="w-10 h-10 rounded-full bg-gray-900
                              text-white flex items-center justify-center font-bold">
                A
              </div>

              <span className="font-semibold">
                Amine
              </span>

            </div>

          </div>

        </header>


        {/* PROFIL + RESULTATS */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

          {/* Profil */}
          <div className="bg-white rounded-2xl p-6 shadow-sm
                          flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-gray-100
                            flex items-center justify-center text-2xl">
              👤
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Profil
              </h2>

              <p className="text-gray-500 text-sm">
                Consulter votre profil sportif
              </p>
            </div>

            <button
              type="button"
              onClick={onProfile}
              className="ml-auto bg-gray-900 text-white
                         px-4 py-2 rounded-lg text-sm
                         hover:bg-gray-700"
            >
              Voir
            </button>

          </div>


          {/* Résultats */}
          <div className="bg-white rounded-2xl p-6 shadow-sm
                          flex items-center gap-4">

            <div className="w-14 h-14 rounded-xl bg-gray-100
                            flex items-center justify-center text-2xl">
              🏆
            </div>

            <div>
              <h2 className="font-bold text-lg">
                Résultats
              </h2>

              <p className="text-gray-500 text-sm">
                Consulter vos résultats
              </p>
            </div>

            <button
              className="ml-auto bg-gray-900 text-white
                         px-4 py-2 rounded-lg text-sm
                         hover:bg-gray-700"
            >
              Voir
            </button>

          </div>

        </section>


        {/* OFFRES */}
        <section
          className="bg-white rounded-2xl p-8 shadow-sm
                     flex flex-col md:flex-row
                     items-center justify-between mb-6"
        >

          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Offres disponibles
            </h2>

            <p className="text-gray-500 mt-2 max-w-xl">
              Découvrez les offres sportives disponibles
              et choisissez celles qui vous intéressent.
            </p>

            <button
              className="mt-5 bg-gray-900 text-white
                         px-5 py-3 rounded-xl
                         hover:bg-gray-700 transition"
            >
              Consulter les offres
            </button>
          </div>

          <div className="text-8xl mt-6 md:mt-0">
            🏃‍♂️
          </div>

        </section>


        {/* SPONSOR */}
        <section
          className="bg-gray-900 text-white rounded-2xl
                     p-7 flex flex-col md:flex-row
                     items-center justify-between"
        >

          <div>

            <span className="text-xs tracking-widest text-gray-400">
              SPONSOR
            </span>

            <h2 className="text-2xl font-bold mt-2">
              Votre partenaire sportif
            </h2>

            <p className="text-gray-400 mt-2">
              Découvrez les offres et avantages proposés
              par nos partenaires.
            </p>

          </div>

          <button
            className="mt-5 md:mt-0 bg-white text-gray-900
                       px-5 py-3 rounded-xl font-medium
                       hover:bg-gray-200 transition"
          >
            Découvrir
          </button>

        </section>

      </main>

    </div>
  );
}