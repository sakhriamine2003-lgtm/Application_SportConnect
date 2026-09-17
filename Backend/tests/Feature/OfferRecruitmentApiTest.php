<?php

use App\Models\OffreRecrutement;
use App\Models\User;

test('admin users can create and list recruitment offers', function () {
    $admin = User::factory()->create(['role_user' => 'admin']);

    $this->actingAs($admin)
        ->postJson('/api/offres', [
            'title' => 'Coach de football',
            'date' => '2026-09-20',
            'description' => 'Recherche un coach expérimenté pour encadrer l’équipe U18.',
        ])
        ->assertStatus(201)
        ->assertJsonPath('data.title', 'Coach de football');

    $this->actingAs($admin)
        ->getJson('/api/offres')
        ->assertStatus(200)
        ->assertJsonFragment([
            'title' => 'Coach de football',
        ]);
});

test('sportif users can view offers but cannot create them', function () {
    $sportif = User::factory()->create(['role_user' => 'sportif']);

    $this->actingAs($sportif)
        ->getJson('/api/offres')
        ->assertStatus(200);

    $this->actingAs($sportif)
        ->postJson('/api/offres', [
            'title' => 'Offre interdite',
            'date' => '2026-09-30',
            'description' => 'Cette création ne doit pas être autorisée.',
        ])
        ->assertStatus(403);
});

test('admin users are accepted even when the role value is formatted differently', function () {
    $admin = User::factory()->create(['role_user' => ' Admin ']);

    $this->actingAs($admin)
        ->postJson('/api/offres', [
            'title' => 'Offre admin',
            'date' => '2026-10-01',
            'description' => 'Un admin avec rôle formaté différemment doit être accepté.',
        ])
        ->assertStatus(201);
});

test('admin users can update and delete recruitment offers', function () {
    $admin = User::factory()->create(['role_user' => 'admin']);
    $offre = OffreRecrutement::create([
        'title' => 'Ancien titre',
        'date' => '2026-09-10',
        'description' => 'Description initiale',
        'user_id' => $admin->id,
    ]);

    $this->actingAs($admin)
        ->putJson('/api/offres/' . $offre->id, [
            'title' => 'Nouveau titre',
            'date' => '2026-09-25',
            'description' => 'Description mise à jour',
        ])
        ->assertStatus(200)
        ->assertJsonPath('data.title', 'Nouveau titre');

    $this->actingAs($admin)
        ->deleteJson('/api/offres/' . $offre->id)
        ->assertStatus(200)
        ->assertJsonPath('message', 'Offre supprimée avec succès.');

    $this->assertDatabaseMissing('offer_recruitments', [
        'id' => $offre->id,
    ]);
});

test('admin users can list sportifs with their portfolios', function () {
    $admin = User::factory()->create(['role_user' => 'admin']);
    $sportif = User::factory()->create([
        'role_user' => 'sportif',
        'name' => 'Ali Sportif',
        'email' => 'ali-sportif@example.com',
    ]);

    $sportif->portfolio()->create([
        'nom' => 'Ali',
        'prenom' => 'Ben',
        'age' => 24,
        'sport' => 'Football',
        'niveau' => 'Intermédiaire',
        'position' => 'Attaquant',
        'equipe' => 'Club test',
        'ville' => 'Tunis',
        'taille' => '180',
        'poids' => '75',
        'experience' => '4 ans',
        'palmares' => 'Coupe régionale',
        'photo' => 'https://example.com/photo.jpg',
    ]);

    $this->actingAs($admin)
        ->getJson('/api/admin/sportifs')
        ->assertStatus(200)
        ->assertJsonFragment(['name' => 'Ali Sportif'])
        ->assertJsonFragment(['sport' => 'Football']);
});
