# User Management API

Express API for managing users with JSON file storage.

## Features

- Create, read, update, and delete users
- JSON file-based storage
- TypeScript support
- RESTful API endpoints

## Installation

```bash
pnpm install
```

## Development

```bash
pnpm dev
```

The server will start on `http://localhost:3001`

## API Endpoints

### Health Check
- `GET /health` - Check API status

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `POST /api/users` - Create a new user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Example Requests

### Create User
```bash
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com"}'
```

### Get All Users
```bash
curl http://localhost:3001/api/users
```

### Update User
```bash
curl -X PUT http://localhost:3001/api/users/:id \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@example.com"}'
```

### Delete User
```bash
curl -X DELETE http://localhost:3001/api/users/:id
```

