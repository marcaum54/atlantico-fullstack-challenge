<?php

namespace Database\Seeders;

use App\Models\Book;
use App\Models\User;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\App;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Book::factory(15)->create();

        if (!App::environment(['production'])) {
            User::factory()->create([
                'name' => 'Marcos Fábio',
                'email' => 'marcaum54@gmail.com',
                'password' => '123123123',
            ]);

            User::factory()->create([
                'name' => 'Kaline Maria',
                'email' => 'kaline53@gmail.com',
                'password' => '123123123',
            ]);

            User::factory()->create([
                'name' => 'Vitoria Maria',
                'email' => 'vitoria52@gmail.com',
                'password' => '123123123',
            ]);
        }
    }
}
