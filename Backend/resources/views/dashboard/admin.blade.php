@extends('layouts.app', ['title' => 'Dashboard admin | Sport Connect'])

@section('content')
    <p class="eyebrow">Dashboard / administration</p>
    <div style="display:flex; justify-content:space-between; gap:16px; align-items:end; margin-bottom:24px; flex-wrap:wrap;">
        <div><h1 style="font-size:clamp(38px, 6vw, 64px);">Piloter les<br>clubs sportifs.</h1><p class="muted">Créez un club et vérifiez immédiatement la réponse de l’API.</p></div>
        <div class="stat panel"><span class="muted">Endpoint actif</span><strong>POST</strong><span class="muted">/api/clubs</span></div>
    </div>
    <div class="grid-wide">
        <section class="panel"><div class="panel-head"><h2>Nouveau club</h2><span class="badge">POST /api/clubs</span></div><form class="panel-body" id="club-form"><div class="fields"><div class="field"><label>Nom du club *</label><input name="nom" required placeholder="Club Atlas"></div><div class="field"><label>Ville *</label><input name="ville" required placeholder="Casablanca"></div><div class="field full"><label>Description *</label><textarea name="description" required placeholder="Présentez le club..."></textarea></div></div><div class="actions"><button class="button primary" type="submit">Créer le club</button></div></form></section>
        <section class="panel response"><div class="panel-head"><h2>Réponse API</h2><span class="badge" data-response-code>—</span></div><pre data-response-body>La réponse JSON apparaîtra ici.</pre></section>
    </div>
@endsection

@push('scripts')
<script>
    document.getElementById('club-form').addEventListener('submit', (event) => { event.preventDefault(); callApi('/api/clubs', { method: 'POST', body: JSON.stringify(objectFromForm(event.target)) }); });
</script>
@endpush
