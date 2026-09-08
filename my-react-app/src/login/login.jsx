// import React, { useState } from 'react';
// import api from '../axios/axios';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
//     setError(null);

//     try {
//       await api.post('/login', { email, password });
//     } catch (err) {
//       setError(err.response?.data?.message || 'Email ou mot de passe incorrect.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main>
//       <div>
//         <section>
//           <div>
//             <form onSubmit={handleSubmit}>
//               <div>
//                 <label htmlFor="email">Adresse email</label>
//                 <input
//                   id="email"
//                   type="email"
//                   value={email}
//                   onChange={(event) => setEmail(event.target.value)}
//                   placeholder="nom@exemple.com"
//                   required
//                   autoComplete="email"
//                 />
//               </div>

//               <div>
//                 <div>
//                   <label htmlFor="password">Mot de passe</label>
//                   <button type="button">Mot de passe oublié ?</button>
//                 </div>
//                 <input
//                   id="password"
//                   type="password"
//                   value={password}
//                   onChange={(event) => setPassword(event.target.value)}
//                   placeholder="............"
//                   required
//                   autoComplete="current-password"
//                 />
//               </div>

//               {error && (
//                 <div role="alert">
//                   {error}
//                 </div>
//               )}

//               <button type="submit" disabled={loading}>
//                 {loading ? 'Connexion en cours...' : 'Se connecter'}
//               </button>
//             </form>
//             <p>En vous connectant, vous acceptez nos conditions d'utilisation.</p>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

// export default Login;