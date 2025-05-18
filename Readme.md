# Instalace

## Zapnout php server
php artisan serve

## Zapnout react
pnpm run dev

## Zapnout docker - PostgreSql
docker compose up

## Naplnění databáze ze seedu
php artisan db:seed

## Kontrola rout
php artisan route:list

# Obsluha
GET http://localhost:8000/api/ping

GET http://localhost:8000/api/products

GET http://localhost:8000/api/products/1

POST http://localhost:8000/api/products

PUT http://localhost:8000/api/products/1

DELETE http://localhost:8000/api/products/1