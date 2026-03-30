<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Department;
use Illuminate\Support\Str;

class DepartmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $departments = [
            ['name' => 'Electronics', 'active' => true],
            ['name' => 'Fashion', 'active' => true],
            ['name' => 'Home & Garden', 'active' => true],
            ['name' => 'Books', 'active' => true],
            ['name' => 'Sports & Outdoors', 'active' => true],
            ['name' => 'Toys & Games', 'active' => true],
            ['name' => 'Health & Beauty', 'active' => true],
            ['name' => 'Automotive', 'active' => true],
            ['name' => 'Movies & Music', 'active' => true],
            ['name' => 'Computers', 'active' => true],
        ];

        foreach ($departments as $department) {
            Department::create([
                'name' => $department['name'],
                'slug' => Str::slug($department['name']),
                'active' => $department['active'],
            ]);
        }
    }
}
