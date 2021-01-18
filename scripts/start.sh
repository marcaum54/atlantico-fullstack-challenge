#!/bin/bash

set -eu

echo "Checking DB connection ..."

i=0
until [ $i -ge 60 ]
do
  nc -z mysql 3306 && break

  i=$(( i + 1 ))

  echo "$i: Waiting for DB 1 second ..."
  sleep 1
done

composer install

php artisan key:generate

php artisan migrate --seed

php artisan serve --host 0.0.0.0
