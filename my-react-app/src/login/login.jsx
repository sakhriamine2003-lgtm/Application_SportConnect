import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, KeyRound, Mail } from 'lucide-react';
import api from '../axios/axios';

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((currentData) => ({ ...currentData, [name]: value }));
  };

  const handleSubmit = async (event) => {
  event.preventDefault();

  setLoading(true);
  setError('');

  try {
    const response = await api.post('/login', formData);

    // console.log('LOGIN RESPONSE:', response.data);

    const token = response.data.token;
    const user = response.data.user;

    // console.log('USER:', user);
    // console.log('ROLE:', user.role_user);

    localStorage.setItem('sport_connect_token', token);
    localStorage.setItem('sport_connect_user_role', user.role_user);

    if (user.role_user === 'Admin') {
      navigate('/dashboardAdmin');
    } else if (user.role_user === 'Sportif') {
      navigate('/dashboardSportif');
    } else {
      setError('Role utilisateur inconnu.');
    }

  } catch (error) {
    console.log('LOGIN ERROR:', error);
    console.log('SERVER ERROR:', error.response?.data);

    setError(
      error.response?.data?.message || 
      'Email ou mot de passe incorrect.'
    );

  } finally {
    setLoading(false);
  }
};

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        <header className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-950 text-lime-400">
            <Dumbbell size={26} />
          </div>
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-lime-600">Sport Connect</p>
          <h1 className="text-3xl font-black text-slate-950">Connexion</h1>
          <p className="mt-2 text-sm text-slate-500">Accédez à votre espace sportif</p>
        </header>

        <div className="rounded-2xl bg-white p-8 shadow-xl shadow-slate-200/70">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <Mail size={16} className="text-lime-600" /> Adresse email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="nom@exemple.com"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-semibold text-slate-700">
                <KeyRound size={16} className="text-lime-600" /> Mot de passe
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none placeholder:text-slate-400 focus:border-lime-500 focus:bg-white focus:ring-2 focus:ring-lime-100"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-slate-950 py-3 font-bold text-white transition hover:bg-lime-400 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={() => navigate('/register')}
              className="text-sm font-semibold text-slate-500 transition hover:text-lime-600"
            >
              Créer un compte
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
