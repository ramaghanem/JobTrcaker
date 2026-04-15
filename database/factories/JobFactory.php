<?php

namespace Database\Factories;

use App\Models\Company;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Job>
 */
class JobFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->jobTitle(),
            'description' => $this->faker->paragraph(),
            'status' => $this->faker->randomElement(['open', 'closed', 'draft']),
            'company_id' => Company::factory(),
            'location' => $this->faker->city(),
            'salary' => $this->faker->numberBetween(1000, 10000),
            'employment_type' => $this->faker->randomElement(['full-time', 'part-time', 'internship']),


        ];
    }
}
