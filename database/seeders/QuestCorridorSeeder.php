<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class QuestCorridorSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
//         \App\Models\QuestCorridor::factory(5)->create();

         \App\Models\QuestCorridor::factory()->create([
             'level' => 'LV1',
             'amount' => 100,
             'percentage' => 0.10,
             'return' => '30In',
         ]);
    }
}
