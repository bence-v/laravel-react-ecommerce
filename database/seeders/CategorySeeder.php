<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;
use App\Models\Department;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Ensure departments are available
        $electronicsDep = Department::where('name', 'Electronics')->first();
        $fashionDep = Department::where('name', 'Fashion')->first();

        if (!$electronicsDep || !$fashionDep) {
            $this->command->error('Please run the DepartmentSeeder first.');
            return;
        }

        // Level 1 Categories
        $electronicsCat = Category::create([
            'name' => 'Electronics',
            'department_id' => $electronicsDep->id,
            'parent_id' => null,
            'active' => true,
        ]);

        $fashionCat = Category::create([
            'name' => 'Fashion',
            'department_id' => $fashionDep->id,
            'parent_id' => null,
            'active' => true,
        ]);

        // Level 2 Categories
        $computersCat = Category::create([
            'name' => 'Computers',
            'department_id' => $electronicsDep->id,
            'parent_id' => $electronicsCat->id,
            'active' => true,
        ]);

        $smartphonesCat = Category::create([
            'name' => 'Smartphones',
            'department_id' => $electronicsDep->id,
            'parent_id' => $electronicsCat->id,
            'active' => true,
        ]);

        // Level 3 Categories
        Category::create([
            'name' => 'Android',
            'department_id' => $electronicsDep->id,
            'parent_id' => $smartphonesCat->id,
            'active' => true,
        ]);

        Category::create([
            'name' => 'iPhones',
            'department_id' => $electronicsDep->id,
            'parent_id' => $smartphonesCat->id,
            'active' => true,
        ]);

        Category::create([
            'name' => 'Laptops',
            'department_id' => $electronicsDep->id,
            'parent_id' => $computersCat->id,
            'active' => true,
        ]);

        Category::create([
            'name' => 'Desktops',
            'department_id' => $electronicsDep->id,
            'parent_id' => $computersCat->id,
            'active' => true,
        ]);
    }
}
