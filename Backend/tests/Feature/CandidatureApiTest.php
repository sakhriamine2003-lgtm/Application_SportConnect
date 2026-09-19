<?php

use App\Models\OffreRecrutement;
use App\Models\User;

function candidatureOfferData(): array
{
    return [
        'title' => 'Gardien de but',
        'date' => '2026-10-01',
        'description' => 'Recherche un gardien pour la prochaine saison.',
    ];
}

function candidaturePortfolioData(): array
{
    return [
        'nom' => 'Martin',
        'prenom' => 'Alex',
        'age' => 24,
        'sport' => 'Football',
        'niveau' => 'Professionnel',
        'position' => 'Gardien',
        'equipe' => 'Club test',
        'ville' => 'Rabat',
        'taille' => 185,
        'poids' => 80,
        'experience' => 'Six ans de pratique.',
        'palmares' => 'Champion régional.',
    ];
}

test('sportifs can apply to an offer with their portfolio and admins can respond', function () {
    $admin = User::factory()->create(['role_user' => 'admin']);
    $sportif = User::factory()->create(['role_user' => 'sportif']);
    $sportif->portfolio()->create(candidaturePortfolioData());

    $offre = OffreRecrutement::create(candidatureOfferData() + ['user_id' => $admin->id]);

    $applicationResponse = $this->actingAs($sportif)
        ->postJson('/api/offres/'.$offre->id.'/candidatures')
        ->assertStatus(201)
        ->assertJsonPath('data.status', 'pending');

    $candidatureId = $applicationResponse->json('data.id');

    $this->actingAs($admin)
        ->getJson('/api/candidatures')
        ->assertStatus(200)
        ->assertJsonPath('0.user.portfolio.sport', 'Football');

    $this->actingAs($admin)
        ->patchJson('/api/candidatures/'.$candidatureId, ['status' => 'accepted'])
        ->assertStatus(200)
        ->assertJsonPath('data.status', 'accepted');
});

test('sportifs cannot apply twice or apply without a portfolio', function () {
    $admin = User::factory()->create(['role_user' => 'admin']);
    $sportif = User::factory()->create(['role_user' => 'sportif']);
    $offre = OffreRecrutement::create(candidatureOfferData() + ['user_id' => $admin->id]);

    $this->actingAs($sportif)
        ->postJson('/api/offres/'.$offre->id.'/candidatures')
        ->assertStatus(422);

    $sportif->portfolio()->create(candidaturePortfolioData());

    $this->actingAs($sportif)
        ->postJson('/api/offres/'.$offre->id.'/candidatures')
        ->assertStatus(201);

    $this->actingAs($sportif)
        ->postJson('/api/offres/'.$offre->id.'/candidatures')
        ->assertStatus(409);
});
