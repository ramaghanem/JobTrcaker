<?php

namespace Database\Seeders;

use App\Models\Job;
use App\Models\JobApplication;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
       Job::factory(10)->create();

        // // ننشئ طلبات التقديم بعد الوظائف
        // foreach ($jobs as $job) {
        //     $job->applications()->createMany(JobApplication::factory(5)->make()->toArray());
        // }
    }
}
