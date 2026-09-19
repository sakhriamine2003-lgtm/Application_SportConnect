<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('candidatures', function (Blueprint $table): void {
            $table->foreignId('offre_recrutement_id')
                ->after('id')
                ->constrained('offer_recruitments')
                ->cascadeOnDelete();

            $table->string('status')
                ->default('pending')
                ->after('user_id');

            $table->unique(['offre_recrutement_id', 'user_id']);
        });
    }

    public function down(): void
    {
        Schema::table('candidatures', function (Blueprint $table): void {
            $table->dropUnique(['offre_recrutement_id', 'user_id']);
            $table->dropForeign(['offre_recrutement_id']);
            $table->dropColumn(['offre_recrutement_id', 'status']);
        });
    }
};