<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $title ?? 'Sport Connect' }}</title>
    <style>
        :root { --ink: #12211c; --muted: #66736d; --line: #dfe8e2; --paper: #f7faf5; --panel: #fff; --green: #175c43; --lime: #c8ef75; --orange: #ee7548; }
        * { box-sizing: border-box; }
        body { margin: 0; color: var(--ink); background: radial-gradient(circle at 88% 4%, #e6f5c8 0, transparent 28%), var(--paper); font-family: Georgia, 'Times New Roman', serif; }
        button, input, textarea { font: inherit; }
        button { cursor: pointer; }
        a { color: inherit; }
        .shell { width: min(1160px, calc(100% - 32px)); margin: auto; padding: 28px 0 56px; }
        .topbar { display: flex; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 42px; }
        .brand { color: var(--green); font: 800 14px Arial, sans-serif; letter-spacing: .12em; text-decoration: none; text-transform: uppercase; }
        .nav { display: flex; gap: 8px; flex-wrap: wrap; }
        .nav a, .button { border: 0; border-radius: 6px; padding: 10px 13px; background: #eaf2e8; color: var(--green); font: 700 12px Arial, sans-serif; text-decoration: none; }
        .button.primary { background: var(--green); color: #fff; }
        .button.danger { background: #fff0e9; color: #b64b27; }
        .eyebrow { margin: 0 0 10px; color: var(--orange); font: 700 11px Arial, sans-serif; letter-spacing: .16em; text-transform: uppercase; }
        h1 { margin: 0; font-size: clamp(40px, 7vw, 78px); line-height: .94; letter-spacing: -.045em; }
        h2 { margin: 0; font-size: 24px; letter-spacing: -.02em; }
        .muted { color: var(--muted); font: 14px/1.55 Arial, sans-serif; }
        .grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 18px; }
        .grid-wide { display: grid; grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr); gap: 18px; align-items: start; }
        .panel { border: 1px solid var(--line); border-radius: 10px; background: var(--panel); box-shadow: 0 18px 45px rgba(23, 92, 67, .08); }
        .panel-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; padding: 19px 21px; border-bottom: 1px solid var(--line); }
        .panel-body { padding: 21px; }
        .badge { padding: 5px 8px; border-radius: 4px; background: #eaf6d2; color: var(--green); font: 700 10px Arial, sans-serif; }
        .fields { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
        .field { display: grid; gap: 7px; }
        .field.full { grid-column: 1 / -1; }
        label { color: #405149; font: 700 12px Arial, sans-serif; }
        input, textarea { width: 100%; border: 1px solid var(--line); border-radius: 6px; padding: 11px 12px; outline: 0; background: #fbfdfb; color: var(--ink); font: 14px Arial, sans-serif; }
        textarea { min-height: 86px; resize: vertical; }
        input:focus, textarea:focus { border-color: var(--green); box-shadow: 0 0 0 3px rgba(23,92,67,.1); }
        .actions { display: flex; flex-wrap: wrap; gap: 9px; margin-top: 18px; }
        .response { overflow: hidden; }
        pre { overflow: auto; min-height: 190px; max-height: 480px; margin: 0; padding: 18px 21px; background: #14241d; color: #d9f7bd; font: 12px/1.6 Consolas, monospace; white-space: pre-wrap; word-break: break-word; }
        .status { margin: 0 0 18px; padding: 12px 14px; border: 1px solid var(--line); border-radius: 6px; background: #fff; color: var(--muted); font: 12px Arial, sans-serif; }
        .status.error { color: #b64b27; border-color: #f2c3ae; }
        .stat { padding: 20px; }
        .stat strong { display: block; margin-top: 8px; color: var(--green); font-size: 34px; }
        @media (max-width: 760px) { .topbar, .grid-wide { display: grid; grid-template-columns: 1fr; } .nav { justify-content: flex-start; } .fields, .grid { grid-template-columns: 1fr; } .field.full { grid-column: auto; } }
    </style>
</head>
<body>
    <main class="shell">
        <header class="topbar">
            <a class="brand" href="{{ route('login') }}">Sport Connect</a>
            <nav class="nav">
                <a href="{{ route('dashboard.sportif') }}">Dashboard sportif</a>
                <a href="{{ route('dashboard.admin') }}">Dashboard admin</a>
                <button class="button danger" id="clear-token" type="button">Effacer le token</button>
            </nav>
        </header>
        @yield('content')
    </main>
    <script>
        window.API_TOKEN_KEY = 'sport_connect_api_token';
        window.getApiToken = () => localStorage.getItem(window.API_TOKEN_KEY) || '';
        window.showApiResult = (code, data) => {
            const codeElement = document.querySelector('[data-response-code]');
            const bodyElement = document.querySelector('[data-response-body]');
            const statusElement = document.querySelector('[data-status]');
            if (codeElement) codeElement.textContent = code;
            if (bodyElement) bodyElement.textContent = JSON.stringify(data, null, 2);
            if (statusElement) { statusElement.textContent = `Réponse HTTP ${code}.`; statusElement.classList.toggle('error', code < 200 || code >= 300); }
        };
        window.callApi = async (endpoint, options = {}) => {
            const headers = { Accept: 'application/json', ...(options.body ? { 'Content-Type': 'application/json' } : {}) };
            if (window.getApiToken()) headers.Authorization = `Bearer ${window.getApiToken()}`;
            try { const response = await fetch(endpoint, { ...options, headers }); const data = await response.json().catch(() => ({ message: 'Réponse non JSON' })); window.showApiResult(response.status, data); return { response, data }; }
            catch (error) { window.showApiResult('ERR', { message: error.message }); return null; }
        };
        window.objectFromForm = (form) => Object.fromEntries(new FormData(form).entries());
        document.getElementById('clear-token')?.addEventListener('click', () => { localStorage.removeItem(window.API_TOKEN_KEY); window.location.href = '{{ route('login') }}'; });
    </script>
    @stack('scripts')
</body>
</html>
