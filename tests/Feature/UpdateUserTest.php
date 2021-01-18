<?php

namespace Tests\Feature;

use App\Models\User;
use Tests\TestCase;

class UpdateUserTest extends TestCase
{
    public function testEmailDuplicated()
    {
        User::factory()->create([
            'name' => 'Marcos',
            'email' => 'marcam54@gmail.com',
            'password' => '123123123',
        ]);

        $created = User::factory()->create([
            'name' => 'Marcos',
            'email' => 'marcam542@gmail.com',
            'password' => '123123123',
        ]);

        $response = $this->put("api/user/$created->uuid}", [
            'email' => 'marcam54@gmail.com',
        ]);

        $response->assertJsonPath('errors.email.0', 'The email has already been taken.');
    }

    public function testPasswordMinCharacters()
    {
        $data = [
            'name' => 'Marcos',
            'email' => 'marcam54@gmail.com',
            'password' => '111',
            'password_confirmation' => '111',
        ];

        $response = $this->post('api/user', $data);

        $response->assertJsonPath('errors.password.0', 'The password must be at least 6 characters.');
    }

    public function testUpdateUser()
    {
        $created = User::factory()->create([
            'name' => 'Marcos',
            'email' => 'marcam542@gmail.com',
            'password' => '123123123',
        ]);

        $response = $this->put("api/user/{$created->uuid}", [
            'name' => 'Fábio Marcos',
            'email' => '54marcaum@gmail.com',
            'password' => '321321321',
            'password_confirmation' => '321321321',
        ]);

        $response->assertStatus(200);
    }
}
