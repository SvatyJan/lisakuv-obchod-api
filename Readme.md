Tento projekt je strukturovaný jako monorepo, které zahrnuje
Backend napsaný v PHP pomocí frameworku Laravel a poskytuje REST API.
Frontend je postavený na Reactu.
Databáze je PostgreSQL, která běží v rámci Docker infrastruktury.

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

# OpenApi
Frontend: http://localhost:5173/

OpenApi: http://localhost:8000/docs

Backend: http://localhost:8000/

# Příklady provolání API v Postman
GET http://localhost:8000/api/products

GET http://localhost:8000/api/products?name=jablko

GET http://localhost:8000/api/products?min_stock=100

GET http://localhost:8000/api/products?max_stock=50

GET http://localhost:8000/api/products?min_stock=10&max_stock=200

GET http://localhost:8000/api/products?name=oříšek&min_stock=50&max_stock=300

GET http://localhost:8000/api/products/1

POST http://localhost:8000/api/products
{ "name": "Šiška", "price": 12.5, "stock": 300}

PUT http://localhost:8000/api/products/1
{
  "price": 6.0,
  "stock": 150
}

DELETE http://localhost:8000/api/products/7