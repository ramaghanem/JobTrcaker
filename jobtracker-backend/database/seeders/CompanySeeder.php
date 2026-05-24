<?php

 // Example declare statement

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    public function run(): void
    {
        Company::factory(10)->create();  // Here you can create 10 companies
    }
}
