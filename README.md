# Task Management System

## Installation

1. Install dependencies:
   ```bash
   npm install

2. Create a .env file in the root directory and configure your environment variables::
   ```bash
   DB_NAME=your_db_name
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_HOST=your_db_host
   SECRET_KEY=your_secret_key

## Database Setup

1. Run migrations to create tables:
   ```bash
   npx sequelize-cli db:migrate

2. Seed the database with initial data:
   ```bash
   npm run seed

## Running the Server
  ``npm run dev``

## API Endpoints

```bash
#Register a new user

Endpoint: POST "/api/auth/register"
Body:   
   {
      "username": "string",
      "password": "string"
   }

#Login a user

Endpoint: POST "/api/auth/login"
Body: 
   {
      "username": "string",
      "password": "string"
   }

#Create a new task

Endpoint: POST "/api/tasks"
Headers:
   {
     "Authorization": "Bearer <token>"
   }
Body: 
  {
     "title": "string",
     "description": "string",
     "status": "pending" | "in-progress" | "completed"
   }

#Get all tasks

Endpoint: GET "/api/tasks"
Headers:
   {
     "Authorization": "Bearer <token>"
   }

#Update a task

Endpoint: PUT "/api/tasks/:taskId"
Headers:
   {
     "Authorization": "Bearer <token>"
   }
Body: 
   {
     "title": "string",
     "description": "string",
     "status": "pending" | "in-progress" | "completed"
   }

#Delete a task
Endpoint: DELETE "/api/tasks/:taskId"
Headers:
   {
     "Authorization": "Bearer <token>"
   }