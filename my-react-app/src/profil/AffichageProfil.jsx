
const defaultProfile = {
    id: 1,
    nom: "Benali",
    prenom: "Amine",
    age: 24,
    sport: "Football",
    niveau: "National",
    position: "Milieu de terrain",
    equipe: "Sport Connect FC",
    ville: "Casablanca",
    taille: 178,
    poids: 72,
    experience: 8,
    palmares: "Champion régional 2025",
    photo: "",
    user_id: 1,
};

function InfoItem({ label, value }) {
    return (
        <div className="rounded-xl bg-gray-50 p-4">
            <dt className="text-sm text-gray-500">{label}</dt>
            <dd className="mt-1 font-semibold text-gray-900">{value || "Non renseigné"}</dd>
        </div>
    );
}

export default function AffichageProfil({ profile = defaultProfile, onBack }) {
    const fullName = `${profile.prenom || ""} ${profile.nom || ""}`.trim() || "Sportif";
    const initials = fullName
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <main className="min-h-screen bg-gray-100 px-4 py-6 sm:px-8">
            <div className="mx-auto max-w-5xl">
                <button
                    type="button"
                    onClick={onBack}
                    className="mb-6 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-white hover:text-gray-900"
                >
                    ← Retour au dashboard
                </button>

                <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
                    <div className="bg-gray-900 px-6 py-8 text-white sm:px-10">
                        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
                            {profile.photo ? (
                                <img
                                    src={profile.photo}
                                    alt={`Portrait de ${fullName}`}
                                    className="h-24 w-24 rounded-2xl object-cover"
                                />
                            ) : (
                                <div className="flex h-24 w-24 items-center justify-center rounded-2xl bg-white text-3xl font-bold text-gray-900">
                                    {initials}
                                </div>
                            )}

                            <div>
                                <p className="text-sm uppercase tracking-widest text-gray-400">Profil sportif</p>
                                <h1 className="mt-1 text-3xl font-bold">{fullName}</h1>
                                <p className="mt-2 text-gray-300">{profile.sport || "Sport non renseigné"} · {profile.niveau || "Niveau non renseigné"}</p>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8 p-6 sm:p-10">
                        <section>
                            <h2 className="text-xl font-bold text-gray-900">Informations personnelles</h2>
                            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                <InfoItem label="Prénom" value={profile.prenom} />
                                <InfoItem label="Nom" value={profile.nom} />
                                <InfoItem label="Âge" value={profile.age ? `${profile.age} ans` : ""} />
                                <InfoItem label="Ville" value={profile.ville} />
                                <InfoItem label="Taille" value={profile.taille ? `${profile.taille} cm` : ""} />
                                <InfoItem label="Poids" value={profile.poids ? `${profile.poids} kg` : ""} />
                            </dl>
                        </section>

                        <section>
                            <h2 className="text-xl font-bold text-gray-900">Parcours sportif</h2>
                            <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <InfoItem label="Sport" value={profile.sport} />
                                <InfoItem label="Position" value={profile.position} />
                                <InfoItem label="Équipe" value={profile.equipe} />
                                <InfoItem label="Expérience" value={profile.experience ? `${profile.experience} ans` : ""} />
                            </dl>
                        </section>

                        <section className="rounded-xl border border-gray-200 p-5">
                            <h2 className="font-bold text-gray-900">Palmarès</h2>
                            <p className="mt-2 text-gray-600">{profile.palmares || "Aucun palmarès renseigné"}</p>
                        </section>
                    </div>
                </section>
            </div>
        </main>
    );
}
