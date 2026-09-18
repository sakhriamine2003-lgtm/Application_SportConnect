<?php

use App\Models\User;

function portfolioData(array $overrides = []): array
{
    return array_merge([
        'nom' => 'Dupont',
        'prenom' => 'Alex',
        'age' => 24,
        'sport' => 'Football',
        'niveau' => 'Intermédiaire',
        'position' => 'Attaquant',
        'equipe' => 'Club test',
        'ville' => 'Tunis',
        'taille' => 180,
        'poids' => 75,
        'experience' => 'Quatre ans de pratique.',
        'palmares' => 'Coupe régionale.',
        'photo' => 'https://example.com/photo.jpg',
    ], $overrides);
}

test('creating a portfolio replaces the previous portfolio of the user', function () {
    $sportif = User::factory()->create(['role_user' => 'sportif']);

    $this->actingAs($sportif)
        ->postJson('/api/portfolio', portfolioData())
        ->assertStatus(200)
        ->assertJsonPath('message', 'Portfolio enregistré avec succès.');

    $portfolioId = $sportif->portfolio()->value('id');

    $this->actingAs($sportif)
        ->postJson('/api/portfolio', portfolioData([
            'nom' => 'Martin',
            'sport' => 'Tennis',
        ]))
        ->assertStatus(200)
        ->assertJsonPath('data.nom', 'Martin')
        ->assertJsonPath('data.sport', 'Tennis');

    expect($sportif->portfolio()->count())->toBe(1);
    expect($sportif->portfolio()->value('id'))->toBe($portfolioId);
    $this->assertDatabaseHas('portfolios', [
        'user_id' => $sportif->id,
        'nom' => 'Martin',
        'sport' => 'Tennis',
    ]);
});
