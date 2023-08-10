<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ActiveMemberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         \App\Models\ActiveMember::factory(10)->create();
         \App\Models\ActiveMember::factory()->create([
             'member_id' => 201121212,
             'member_profit' => 'test@example.com',
             'member_image' => 'assets/active-member/',
         ]);
    }
}
