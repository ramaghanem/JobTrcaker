<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\JobApplication;

use Illuminate\Database\Seeder;

class JobApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

       Job::all()->each(function ($job) {
            JobApplication::factory(5)->create([

            ]);
        });
    }
}

