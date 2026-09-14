<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sport Connect | API Tester</title>
    <style>
        :root {
            --ink: #12211c;
            --muted: #66736d;
            --line: #dfe8e2;
            --paper: #f7faf5;
            --panel: #ffffff;
            --green: #175c43;
            --lime: #c8ef75;
            --orange: #ee7548;
            --shadow: 0 20px 55px rgba(23, 92, 67, .10);
        }

        * { box-sizing: border-box; }
        body {
            margin: 0;
            color: var(--ink);
            background: radial-gradient(circle at 85% 5%, #e6f5c8 0, transparent 27%), var(--paper);
            font-family: Georgia, 'Times New Roman', serif;
        }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; }
        .shell { width: min(1180px, calc(100% - 36px)); margin: 0 auto; padding: 32px 0 58px; }
        .masthead { display: flex; align-items: end; justify-content: space-between; gap: 24px; margin-bottom: 28px; }
        .eyebrow { margin: 0 0 10px; color: var(--orange); font: 700 12px/1.2 Arial, sans-serif; letter-spacing: .16em; text-transform: uppercase; }
        h1 { max-width: 650px; margin: 0; font-size: clamp(36px, 6vw, 72px); line-height: .94; letter-spacing: -.045em; }
        .intro { max-width: 320px; margin: 0; color: var(--muted); font: 15px/1.55 Arial, sans-serif; }
        .status { display: flex; align-items: center; gap: 9px; margin: 0 0 22px; padding: 13px 16px; border: 1px solid var(--line); border-radius: 8px; background: rgba(255,255,255,.7); font: 13px Arial, sans-serif; }
        .status-dot { width: 9px; height: 9px; border-radius: 50%; background: #aebbb3; }
        .status.ready .status-dot { background: #4cae68; }
        .status.error .status-dot { background: var(--orange); }
        .layout { display: grid; grid-template-columns: minmax(0, 1.4fr) minmax(300px, .8fr); gap: 20px; align-items: start; }
        .panel { border: 1px solid var(--line); border-radius: 12px; background: var(--panel); box-shadow: var(--shadow); }
        .panel-header { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 20px 22px; border-bottom: 1px solid var(--line); }
        .panel-header h2 { margin: 0; font-size: 22px; letter-spacing: -.02em; }
        .method { padding: 5px 8px; border-radius: 4px; background: #eaf6d2; color: var(--green); font: 700 11px Arial, sans-serif; }
        form, .actions { padding: 20px 22px; }
        .field-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .field { display: grid; gap: 7px; }
        .field.full { grid-column: 1 / -1; }
        label { font: 700 12px Arial, sans-serif; color: #405149; }
        input, textarea { width: 100%; border: 1px solid var(--line); border-radius: 6px; padding: 11px 12px; color: var(--ink); background: #fbfdfb; outline: 0; font: 15px/1.3 Arial, sans-serif; }
        textarea { min-height: 88px; resize: vertical; }
        input:focus, textarea:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(23,92,67,.10); }
        .primary, .secondary { border: 0; border-radius: 6px; padding: 11px 15px; font: 700 13px Arial, sans-serif; }
        .primary { background: var(--green); color: white; }
        .primary:hover { background: #0f4834; }
        .secondary { background: #eef4ee; color: var(--green); }
        .actions { display: flex; flex-wrap: wrap; gap: 10px; }
        .token-box { padding: 18px 22px; border-bottom: 1px solid var(--line); }
        .token-box p, .hint { margin: 7px 0 0; color: var(--muted); font: 12px/1.45 Arial, sans-serif; }
        .token-value { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding: 10px; border-radius: 5px; background: #f1f5f1; color: #405149; font: 12px monospace; }
        .response { position: sticky; top: 18px; min-height: 260px; }
        pre { overflow: auto; min-height: 210px; max-height: 520px; margin: 0; padding: 20px 22px; background: #14241d; color: #d9f7bd; font: 12px/1.6 Consolas, monospace; white-space: pre-wrap; word-break: break-word; }
        .endpoint-list { display: grid; gap: 10px; padding: 20px 22px; }
        .endpoint { display: flex; justify-content: space-between; gap: 10px; padding-bottom: 10px; border-bottom: 1px solid #edf2ed; font: 13px Arial, sans-serif; }
        .endpoint:last-child { border-bottom: 0; padding-bottom: 0; }
        .endpoint code { color: var(--green); }
        @media (max-width: 820px) { .masthead, .layout { grid-template-columns: 1fr; display: grid; } .intro { max-width: 560px; } .response { position: static; } }
        @media (max-width: 520px) { .shell { width: min(100% - 24px, 1180px); padding-top: 22px; } .field-grid { grid-template-columns: 1fr; } .field.full { grid-column: auto; } h1 { font-size: 48px; } }
    </style>
</head>
<body>
    <main class="shell">
        <header class="masthead">
            <div>
                <p class="eyebrow">Sport Connect / développement</p>
                <h1>Tester les API, sans quitter le terrain.</h1>
            </div>
            <p class="intro">Une console Blade légère pour authentifier un utilisateur et inspecter les réponses de l'API Laravel.</p>
        </header>

        <div id="status" class="status"><span class="status-dot"></span><span>Prêt. Connectez-vous pour appeler les endpoints protégés.</span></div>

        <div class="layout">
            <section>
                <article class="panel" style="margin-bottom: 20px;">
                    <div class="panel-header"><h2>Authentification</h2><span class="method">POST /api/login</span></div>
                    <form id="login-form">
                        <div class="field-grid">
                            <div class="field"><label for="email">Email</label><input id="email" name="email" type="email" required placeholder="athlete@example.com"></div>
                            <div class="field"><label for="password">Mot de passe</label><input id="password" name="password" type="password" required placeholder="••••••••"></div>
                        </div>
                        <div class="actions"><button class="primary" type="submit">Obtenir un token</button><button class="secondary" id="logout" type="button">Effacer le token</button></div>
                    </form>
                    <div class="token-box"><div class="token-value" id="token-value">Aucun token enregistré</div><p>Le token est conservé uniquement dans le navigateur pour les tests de cette page.</p></div>
                </article>

                <article class="panel" style="margin-bottom: 20px;">
                    <div class="panel-header"><h2>Endpoints protégés</h2><span class="method">Bearer token</span></div>
                    <div class="actions"><button class="primary api-get" data-endpoint="/api/profil" type="button">GET profil</button><button class="primary api-get" data-endpoint="/api/AfficherPortfolio" type="button">GET portfolio</button></div>
                </article>

                <article class="panel" style="margin-bottom: 20px;">
                    <div class="panel-header"><h2>Créer un portfolio</h2><span class="method">POST /api/portfolio</span></div>
                    <form id="portfolio-form">
                        <div class="field-grid">
                            <div class="field"><label for="portfolio-nom">Nom *</label><input id="portfolio-nom" name="nom" required></div>
                            <div class="field"><label for="portfolio-prenom">Prénom *</label><input id="portfolio-prenom" name="prenom" required></div>
                            <div class="field"><label for="portfolio-age">Âge *</label><input id="portfolio-age" name="age" type="number" min="1" max="120" required></div>
                            <div class="field"><label for="portfolio-sport">Sport *</label><input id="portfolio-sport" name="sport" required></div>
                            <div class="field"><label for="portfolio-niveau">Niveau *</label><input id="portfolio-niveau" name="niveau" required></div>
                            <div class="field"><label for="portfolio-position">Position *</label><input id="portfolio-position" name="position" required></div>
                            <div class="field"><label for="portfolio-equipe">Équipe</label><input id="portfolio-equipe" name="equipe"></div>
                            <div class="field"><label for="portfolio-ville">Ville *</label><input id="portfolio-ville" name="ville" required></div>
                            <div class="field"><label for="portfolio-taille">Taille *</label><input id="portfolio-taille" name="taille" type="number" step="0.01" required></div>
                            <div class="field"><label for="portfolio-poids">Poids *</label><input id="portfolio-poids" name="poids" type="number" step="0.01" required></div>
                            <div class="field full"><label for="portfolio-experience">Expérience *</label><textarea id="portfolio-experience" name="experience" required></textarea></div>
                            <div class="field full"><label for="portfolio-palmares">Palmarès *</label><textarea id="portfolio-palmares" name="palmares" required></textarea></div>
                            <div class="field full"><label for="portfolio-photo">Photo (URL ou texte)</label><input id="portfolio-photo" name="photo"></div>
                        </div>
                        <div class="actions"><button class="primary" type="submit">Envoyer le portfolio</button></div>
                    </form>
                </article>

                <article class="panel">
                    <div class="panel-header"><h2>Créer un club</h2><span class="method">POST /api/clubs</span></div>
                    <form id="club-form">
                        <div class="field-grid">
                            <div class="field"><label for="club-nom">Nom *</label><input id="club-nom" name="nom" required></div>
                            <div class="field"><label for="club-ville">Ville *</label><input id="club-ville" name="ville" required></div>
                            <div class="field full"><label for="club-description">Description *</label><textarea id="club-description" name="description" required></textarea></div>
                        </div>
                        <div class="actions"><button class="primary" type="submit">Créer le club</button></div>
                    </form>
                </article>
            </section>

            <aside>
                <section class="panel response">
                    <div class="panel-header"><h2>Réponse</h2><span id="response-code" class="method">—</span></div>
                    <pre id="response-body">Les réponses JSON apparaîtront ici.</pre>
                </section>
                <section class="panel" style="margin-top: 20px;">
                    <div class="panel-header"><h2>Routes disponibles</h2></div>
                    <div class="endpoint-list">
                        <div class="endpoint"><code>POST</code><span>/api/login</span></div>
                        <div class="endpoint"><code>GET</code><span>/api/profil</span></div>
                        <div class="endpoint"><code>GET</code><span>/api/AfficherPortfolio</span></div>
                        <div class="endpoint"><code>POST</code><span>/api/portfolio</span></div>
                        <div class="endpoint"><code>POST</code><span>/api/clubs</span></div>
                    </div>
                </section>
            </aside>
        </div>
    </main>

    <script>
        const tokenKey = 'sport_connect_api_token';
        const tokenValue = document.getElementById('token-value');
        const responseBody = document.getElementById('response-body');
        const responseCode = document.getElementById('response-code');
        const status = document.getElementById('status');

        function getToken() { return localStorage.getItem(tokenKey) || ''; }
        function refreshToken() { tokenValue.textContent = getToken() || 'Aucun token enregistré'; }
        function formData(form) { return Object.fromEntries(new FormData(form).entries()); }
        function showResult(code, data) {
            responseCode.textContent = code;
            responseBody.textContent = JSON.stringify(data, null, 2);
            status.className = code >= 200 && code < 300 ? 'status ready' : 'status error';
            status.querySelector('span:last-child').textContent = `Réponse HTTP ${code}.`;
        }

        async function callApi(endpoint, options = {}) {
            const headers = { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) };
            if (getToken()) headers.Authorization = `Bearer ${getToken()}`;
            try {
                const response = await fetch(endpoint, { ...options, headers });
                const data = await response.json().catch(() => ({ message: 'Réponse non JSON' }));
                showResult(response.status, data);
            } catch (error) {
                showResult('ERR', { message: error.message });
            }
        }

        document.getElementById('login-form').addEventListener('submit', (event) => {
            event.preventDefault();
            callApi('/api/login', { method: 'POST', body: JSON.stringify(formData(event.target)) }).then(async () => {
                try {
                    const response = await fetch('/api/login', { method: 'POST', headers: { Accept: 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(formData(event.target)) });
                    const data = await response.json();
                    if (response.ok && data.token) { localStorage.setItem(tokenKey, data.token); refreshToken(); }
                } catch (_) { /* The visible request above already reports the failure. */ }
            });
        });

        document.getElementById('logout').addEventListener('click', () => { localStorage.removeItem(tokenKey); refreshToken(); });
        document.querySelectorAll('.api-get').forEach((button) => button.addEventListener('click', () => callApi(button.dataset.endpoint)));
        document.getElementById('portfolio-form').addEventListener('submit', (event) => { event.preventDefault(); callApi('/api/portfolio', { method: 'POST', body: JSON.stringify(formData(event.target)) }); });
        document.getElementById('club-form').addEventListener('submit', (event) => { event.preventDefault(); callApi('/api/clubs', { method: 'POST', body: JSON.stringify(formData(event.target)) }); });
        refreshToken();
    </script>
</body>
</html>
