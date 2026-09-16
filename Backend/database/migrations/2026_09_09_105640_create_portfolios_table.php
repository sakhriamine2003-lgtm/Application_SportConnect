<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('portfolios', function (Blueprint $table) {
    $table->id();
    $table->string('nom');
    $table->string('prenom');
    $table->integer('age');
    $table->string('sport');
    $table->string('niveau')->nullable();
    $table->string('position')->nullable();
    $table->string('equipe')->nullable();
    $table->string('ville')->nullable();
    $table->decimal('taille', 5, 2)->nullable();
    $table->decimal('poids', 5, 2)->nullable();
    $table->text('experience')->nullable();
    $table->text('palmares')->nullable();
    $table->string('photo')->nullable();
    $table->foreignId('user_id')->unique();
    $table->timestamps();
});
    }

    /**
     * Reverse the migrations.
     */

};
