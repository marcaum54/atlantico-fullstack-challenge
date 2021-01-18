<?php

namespace Tests\Feature;

use Tests\TestCase;

class StoreUserTest extends TestCase
{
    public function testNameRequired()
    {
        $response = $this->post('api/user', []);
        $response->assertJsonPath('errors.name.0', 'The name field is required.');
    }

    public function testEmailRequired()
    {
        $response = $this->post('api/user', []);
        $response->assertJsonPath('errors.email.0', 'The email field is required.');
    }

    public function testEmailDuplicated()
    {
        $data = [
            'name' => 'Marcos',
            'email' => 'marcam54@gmail.com',
            'password' => '123123123',
            'password_confirmation' => '123123123',
        ];

        $this->post('api/user', $data);
        $response = $this->post('api/user', $data);

        $response->assertJsonPath('errors.email.0', 'The email has already been taken.');
    }

    public function testPasswordRequired()
    {
        $response = $this->post('api/user', []);
        $response->assertJsonPath('errors.password.0', 'The password field is required.');
    }

    public function testPasswordConfirmation()
    {
        $data = [
            'name' => 'Marcos',
            'email' => 'marcam54@gmail.com',
            'password' => '123123123',
            'password_confirmation' => '11111111',
        ];

        $response = $this->post('api/user', $data);

        $response->assertJsonPath('errors.password.0', 'The password confirmation does not match.');
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

    public function testCreateUser()
    {
        $response = $this->post('api/user', [
            'name' => 'Marcos',
            'email' => 'marcam54@gmail.com',
            'password' => '123123123',
            'password_confirmation' => '123123123',
        ]);

        $response->assertStatus(201);
    }
}
