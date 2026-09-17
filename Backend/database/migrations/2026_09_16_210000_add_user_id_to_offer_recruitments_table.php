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
        if (! Schema::hasTable('offer_recruitments')) {
            Schema::create('offer_recruitments', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id')->nullable();
                $table->string('title')->nullable();
                $table->string('date')->nullable();
                $table->string('description')->nullable();
                $table->timestamps();
            });

            return;
        }

        if (! Schema::hasColumn('offer_recruitments', 'user_id')) {
            Schema::table('offer_recruitments', function (Blueprint $table) {
                $table->unsignedBigInteger('user_id')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('offer_recruitments', 'user_id')) {
            Schema::table('offer_recruitments', function (Blueprint $table) {
                $table->dropColumn('user_id');
            });
        }
    }
};
