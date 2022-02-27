# Todo API

## Requirements:

- NodeJS
- PostgreSQL

## Step 1: Config environment variables:

- `APP_PORT`=5000
- `APP_JWT_SECRET`=123456
- `PG_USERNAME`=postgres
- `PG_PASSWORD`=123
- `PG_HOST`=localhost
- `PG_PORT`=5432
- `PG_DIALECT`=postgres
- `PG_TODO_APP_DB`=todo_app

## Step 2: Create database with the same name as the environment variable: `PG_TODO_APP_DB`

## Step 3: Install dependencies:

```
npm install
```

## Step 4: Run migration:

```
npm run migrate:dev
```

## Step 5: Run app with development mode

```
npm run dev
```
