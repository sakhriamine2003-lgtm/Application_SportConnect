@extends('layouts.app', ['title' => 'Connexion | Sport Connect'])

@section('content')
    <div class="grid-wide">
        <section>
            <p class="eyebrow">Espace de test API</p>
            <h1>Bienvenue dans<br>Sport Connect.</h1>
            <p class="muted" style="max-width: 470px; margin-top: 22px;">Connectez-vous avec l’API Laravel, puis choisissez le dashboard correspondant à votre scénario de test.</p>
        </section>
        <section class="panel">
            <div class="panel-head"><h2>Connexion</h2><span class="badge">POST /api/login</span></div>
            <form class="panel-body" id="login-form">
                <div class="field"><label for="email">Adresse email</label><input id="email" name="email" type="email" required placeholder="athlete@example.com"></div>
                <div class="field" style="margin-top: 14px;"><label for="password">Mot de passe</label><input id="password" name="password" type="password" required placeholder="Votre mot de passe"></div>
                <div class="actions"><button class="button primary" type="submit">Se connecter</button></div>
                <div class="status" data-status style="margin-top: 18px;">Le token sera enregistré dans ce navigateur.</div>
            </form>
        </section>
    </div>
@endsection

@push('scripts')
<script>
    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();
        const result = await callApi('/api/login', { method: 'POST', body: JSON.stringify(objectFromForm(event.target)) });
        if (result?.response.ok && result.data.token) { localStorage.setItem(API_TOKEN_KEY, result.data.token); window.location.href = '{{ route('dashboard.sportif') }}'; }
    });
</script>
@endpush
