<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\QuestCorridor>
 */
class QuestCorridorFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'level' => 'LV1',
            'amount' => 100,
            'percentage' => 0.30,
            'return' => '30In', // password
        ];
    }
}
