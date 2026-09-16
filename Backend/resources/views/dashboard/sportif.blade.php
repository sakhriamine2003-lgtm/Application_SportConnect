@extends('layouts.app', ['title' => 'Dashboard sportif | Sport Connect'])

@section('content')
    <p class="eyebrow">Dashboard / sportif</p>
    <div style="display:flex; justify-content:space-between; gap:16px; align-items:end; margin-bottom:24px; flex-wrap:wrap;">
        <div><h1 style="font-size:clamp(38px, 6vw, 64px);">Votre profil<br>sur le terrain.</h1><p class="muted">Consultez le profil et le portfolio de l’utilisateur authentifié.</p></div>
        <button class="button primary" id="load-profile" type="button">Charger mon profil</button>
    </div>
    <div class="grid-wide">
        <section class="panel response"><div class="panel-head"><h2>Profil utilisateur</h2><span class="badge" data-response-code>—</span></div><pre data-response-body>Appuyez sur « Charger mon profil ».</pre></section>
        <section class="panel response"><div class="panel-head"><h2>Mon portfolio</h2><span class="badge">GET</span></div><pre id="portfolio-response">Appuyez sur « Charger mon portfolio ».</pre><div class="panel-body"><button class="button primary" id="load-portfolio" type="button">Charger mon portfolio</button></div></section>
    </div>
    <section class="panel" style="margin-top:18px;"><div class="panel-head"><h2>Créer mon portfolio</h2><span class="badge">POST /api/portfolio</span></div><form class="panel-body" id="portfolio-form"><div class="fields">
        <div class="field"><label>Nom *</label><input name="nom" required></div><div class="field"><label>Prénom *</label><input name="prenom" required></div>
        <div class="field"><label>Âge *</label><input name="age" type="number" min="1" max="120" required></div><div class="field"><label>Sport *</label><input name="sport" required></div>
        <div class="field"><label>Niveau *</label><input name="niveau" required></div><div class="field"><label>Position *</label><input name="position" required></div>
        <div class="field"><label>Équipe</label><input name="equipe"></div><div class="field"><label>Ville *</label><input name="ville" required></div>
        <div class="field"><label>Taille *</label><input name="taille" type="number" step="0.01" required></div><div class="field"><label>Poids *</label><input name="poids" type="number" step="0.01" required></div>
        <div class="field full"><label>Expérience *</label><textarea name="experience" required></textarea></div><div class="field full"><label>Palmarès *</label><textarea name="palmares" required></textarea></div><div class="field full"><label>Photo</label><input name="photo"></div>
    </div><div class="actions"><button class="button primary" type="submit">Envoyer le portfolio</button></div></form></section>
@endsection

@push('scripts')
<script>
    document.getElementById('load-profile').addEventListener('click', () => callApi('/api/profil'));
    document.getElementById('load-portfolio').addEventListener('click', async () => { const result = await callApi('/api/AfficherPortfolio'); if (result) document.getElementById('portfolio-response').textContent = JSON.stringify(result.data, null, 2); });
    document.getElementById('portfolio-form').addEventListener('submit', (event) => { event.preventDefault(); callApi('/api/portfolio', { method: 'POST', body: JSON.stringify(objectFromForm(event.target)) }); });
</script>
@endpush
