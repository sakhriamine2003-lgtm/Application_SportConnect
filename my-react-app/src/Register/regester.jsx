
import { useState } from 'react';
import api from '../axios/axios';

function Register({ onLogin }) {
	const [form, setForm] = useState({
		name: '',
		email: '',
        role_user: '',
		password: '',
		password_confirmation: '',
	});
	const [message, setMessage] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const handleChange = (event) => {
		setForm({ ...form, [event.target.name]: event.target.value });
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setMessage('');
		setError('');

		if (form.password !== form.password_confirmation) {
			setError('Les mots de passe ne correspondent pas.');
			return;
		}

		setLoading(true);
        

		try {
			await api.post('/register', form);
			setMessage('Compte créé avec succès.');
			setForm({ name: '', email: '', password: '', password_confirmation: '' });
            return onLogin(); 
		} catch (err) {
			setError(err.response?.data?.message || 'Impossible de créer le compte.');
		} finally {
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
			<section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
				<h1 className="text-3xl font-bold text-slate-900">Créer un compte</h1>
				<p className="mt-2 text-slate-600">Rejoignez SportConnect</p>

				<form onSubmit={handleSubmit} className="mt-6 space-y-4">
					<input
						name="name"
						type="text"
						placeholder="Nom complet"
						value={form.name}
						onChange={handleChange}
						required
						className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
					/>
					<input
						name="email"
						type="email"
						placeholder="Adresse email"
						value={form.email}
						onChange={handleChange}
						required
						className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
					/>
                    <input
						name="role_user"
						type="text"
						placeholder="Rôle de l'utilisateur"
						value={form.role_user}
						onChange={handleChange}
						required
						className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
					/>
					
					<input
						name="password"
						type="password"
						placeholder="Mot de passe (8 caractères minimum)"
						value={form.password}
						onChange={handleChange}
						minLength={8}
						required
						className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
					/>
					<input
						name="password_confirmation"
						type="password"
						placeholder="Confirmer le mot de passe"
						value={form.password_confirmation}
						onChange={handleChange}
						minLength={8}
						required
						className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-600"
					/>

					{error && <p className="text-sm text-red-600">{error}</p>}
					{message && <p className="text-sm text-green-600">{message}</p>}

					<button
						type="submit"
						disabled={loading}
						className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
					>
						{loading ? 'Création...' : "S'inscrire"}
					</button>

					<button
						type="button"
						onClick={onLogin}
						className="w-full rounded-lg border border-slate-300 py-3 font-semibold text-slate-700 hover:bg-slate-50"
					>
						J'ai déjà un compte
					</button>
				</form>
			</section>
		</main>
	);
}

export default Register;