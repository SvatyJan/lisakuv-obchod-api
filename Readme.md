Tento projekt je strukturovaný jako monorepo, který zahrnuje
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
