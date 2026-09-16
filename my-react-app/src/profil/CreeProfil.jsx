// import { useState } from "react";
// import api from "../axios/axios";

// const INITIAL_FORM = {
//   nom: "", prenom: "", age: "", sport: "", niveau: "",
//   position: "", equipe: "", ville: "", taille: "", poids: "",
//   experience: "", palmares: "", photo: ""
// };

// function CreeProfil() {
//   const [form, setForm] = useState(INITIAL_FORM);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("sport_connect_token");
//       await api.post("/portfolio", form, {
//         headers: { Authorization: `Bearer ${token}` }
//       });
//       setForm(INITIAL_FORM);
//       alert("Profil créé avec succès !");
//     } catch (err) {
//       setError("Erreur lors de la création du profil.");
//     } finally {
//       setLoading(false);
//     }
//   };

  
//   return (
//     <div className="max-w-2xl mx-auto my-6 p-6 bg-white shadow rounded-lg">
//       <h2 className="text-xl font-bold mb-4 text-center">Créer un Profil Sportif</h2>

//       {error && <p className="mb-4 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="grid grid-cols-2 gap-3">
//           <input name="nom" placeholder="Nom *" value={form.nom} onChange={handleChange} required className="p-2 border rounded" />
//           <input name="prenom" placeholder="Prénom *" value={form.prenom} onChange={handleChange} required className="p-2 border rounded" />
//           <input name="age" type="number" placeholder="Âge" value={form.age} onChange={handleChange} className="p-2 border rounded" />
//           <input name="sport" placeholder="Sport *" value={form.sport} onChange={handleChange} required className="p-2 border rounded" />
//           <input name="niveau" placeholder="Niveau" value={form.niveau} onChange={handleChange} className="p-2 border rounded" />
//           <input name="position" placeholder="Position" value={form.position} onChange={handleChange} className="p-2 border rounded" />
//           <input name="equipe" placeholder="Équipe" value={form.equipe} onChange={handleChange} className="p-2 border rounded" />
//           <input name="ville" placeholder="Ville" value={form.ville} onChange={handleChange} className="p-2 border rounded" />
//           <input name="taille" type="number" placeholder="Taille (cm)" value={form.taille} onChange={handleChange} className="p-2 border rounded" />
//           <input name="poids" type="number" placeholder="Poids (kg)" value={form.poids} onChange={handleChange} className="p-2 border rounded" />
//         </div>

//         <input name="photo" placeholder="URL Photo" value={form.photo} onChange={handleChange} className="w-full p-2 border rounded" />
//         <textarea name="experience" placeholder="Expérience" value={form.experience} onChange={handleChange} className="w-full p-2 border rounded" rows="2" />
//         <textarea name="palmares" placeholder="Palmarès" value={form.palmares} onChange={handleChange} className="w-full p-2 border rounded" rows="2" />

//         <button type="submit" disabled={loading} className="w-full py-2 bg-blue-600 text-white rounded font-medium disabled:opacity-50">
//           {loading ? "Chargement..." : "Créer le Profil"}
//         </button>
//       </form>
//     </div>
//   );
// }

// export default CreeProfil;