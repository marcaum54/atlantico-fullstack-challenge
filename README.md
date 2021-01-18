# Atlântico Fullstack Challenge

## Heroku Application

<a href="http://atlantico-fullstack-challenge.herokuapp.com/" target="_blank">http://atlantico-fullstack-challenge.herokuapp.com/</a>

## Run project With Docker

```
docker-compose up
```

## Requirements (at least)

```
php 7.4
10.4.17-MariaDB

php composer (library manager)
```

## Run project

```
git clone https://github.com/marcaum54/atlantico-fullstack-challenge

cd atlantico-fullstack-challenge

composer install

cp .env.example .env

configure .env with access informations of your DATABASE

DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=atlantico_fullstack_challenge
DB_USERNAME=root
DB_PASSWORD=

** Make sure the database exists **

php artisan migrate --seed

php artisan serve

```

## A little about the project and the technologies used



## A little about the project

I used PHP with the Laravel framework to help me with backend and React activities on the frontend, all components created as Function Components.

To facilitate the use of the sample application, I created a seed with 15 books where each contains 2 copies.


## Changes of scope
- I removed the rent payment amount field, as there was no rule of when to pay or the amount to be paid.

- I added the rule: user cannot keep two copies of the same book rented at the same time.

## Routes

```
+-----------+--------------------------------+
| Method    | URI                            |
+-----------+--------------------------------+
| POST      | api/auth/current-user          |
| POST      | api/auth/login                 |
| POST      | api/auth/logout                |
| POST      | api/auth/register              |
| POST      | api/book                       |
| GET|HEAD  | api/book                       |
| GET|HEAD  | api/book/available/{user_uuid} |
| PUT|PATCH | api/book/{book}                |
| GET|HEAD  | api/book/{book}                |
| DELETE    | api/book/{book}                |
| PUT       | api/deliver                    |
| POST      | api/rent                       |
| POST      | api/user                       |
| GET|HEAD  | api/user                       |
| GET|HEAD  | api/user/my-books/{user_uuid}  |
| GET|HEAD  | api/user/{user}                |
| PUT|PATCH | api/user/{user}                |
| DELETE    | api/user/{user}                |
| GET|HEAD  | {path?}                        |
+-----------+--------------------------------+
```

## React

React is in the following folder: ```resources/js/```
