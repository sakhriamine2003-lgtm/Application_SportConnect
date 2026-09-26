import React, { useState, useEffect } from "react";
import axios from "axios";

const formInitial = {
  nom: "",
  ville: "",
  sport: "",
  description: ""
};

 function test() {

  const [form, setForm] = useState(formInitial);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const response = await axios.get("/afficherClub");

      setForm(response.data);
      setError("");

    } catch (error) {
      setError("Impossible de récupérer les clubs maintenant");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((form) => ({
      ...form,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <form onSubmit={handleSubmit}>

      <input
        name="nom"
        value={form.nom}
        onChange={handleChange}
        placeholder="Nom"
      />

      <input
        name="ville"
        value={form.ville}
        onChange={handleChange}
        placeholder="Ville"
      />

      <input
        name="sport"
        value={form.sport}
        onChange={handleChange}
        placeholder="Sport"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
      />

      <button type="submit">
        Envoyer
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p>{error}</p>}

    </form>
  );
}

export default Club;