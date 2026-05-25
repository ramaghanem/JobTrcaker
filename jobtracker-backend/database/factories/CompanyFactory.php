<?php

namespace Database\Factories;

use App\Models\Company;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Company>
 */
class CompanyFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'description'=>$this->faker->paragraph(),
            'user_id'=>User::factory(),

            'website'=>$this->faker->url(),
            'phone'=>$this->faker->phoneNumber(),
            'address'=>$this->faker->address(),
             'logo' => $this->faker->imageUrl(200, 200, 'business'),
        ];
    }
}
