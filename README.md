# Real-time Project Manager Platform

This is a real-time project manager platform built with Node.js, Express, and Socket.io. The backend is deployed on Render and uses MongoDB for the database. This documentation will guide you through the setup, structure, and usage of the project.

## Table of Contents

1. [Installation](#installation)
2. [Configuration](#configuration)
3. [Usage](#usage)
4. [API Endpoints](#api-endpoints)
5. [Socket.IO Events](#socketio-events)
6. [Middleware](#middleware)
7. [Database Connection](#database-connection)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
   
## Install dependencies:
```bash
npm install
```

## Configuration
Create a .env file in the root directory and add your environment variables:

```bash
PORT=your_port_number
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Usage
Start the server:

```bash
npm start
```
The server will start listening on the port specified in your .env file.

## API Endpoints

Health Check
```bash
GET /
```
Returns a message indicating the server is running.

Auth Routes
```bash
POST /api/auth
```
Verifies a token.

User Routes
```bash
POST /api/users/register
```
Registers a new user.

Request body:
```bash
{
  "firstname": "string",
  "email": "string",
  "password": "string"
}
```

```bash
POST /api/users/login
```
Authenticates a user.

Request body:
```bash
{
  "email": "string",
  "password": "string"
}
```

```bash
GET /api/users/user
```
Retrieves the authenticated user's information.
Requires authentication.

Project Routes
```bash
POST /api/projects
```
Creates a new project.
Requires authentication.
```bash
GET /api/projects
```
Retrieves all projects.
Requires authentication.

```bash
POST /api/projects/:projectId/users
```
Adds a user to a project.
Requires authentication and admin role.

```bash
DELETE /api/projects/:projectId/users
```
Removes a user from a project.
Requires authentication and admin role.


Chat Routes
```bash
GET /api/projects/:projectId/chats
```
Retrieves all chats for a project.
Requires authentication and admin role.

```bash
POST /api/projects/:projectId/chats
```
Sends a chat message.
Requires authentication and admin role.


Task Routes
```bash
GET /api/projects/:projectId/tasks
```
Retrieves all tasks for a project.
Requires authentication.

```bash
POST /api/projects/:projectId/tasks
```
Adds a new task.
Requires authentication.

```bash
PUT /api/tasks/:taskId
```
Updates a task.
Requires authentication and admin role.

```bash
DELETE /api/tasks/:taskId
```
Deletes a task.
Requires authentication and admin role.

```bash
PUT /api/tasks/:taskId/column
```
Updates the column of a task.
Requires authentication and admin role.

```bash
PUT /api/tasks/:taskId/assign
```
Assigns a user to a task.
Requires authentication and admin role.


## Socket.IO Events
```connection```
Emitted when a user connects to the Socket.IO server.


## Middleware
#### Authentication Middleware
```protect```
Protects routes by requiring a valid JWT token.

#### Role-based Access Control Middleware
```admin```
Restricts access to admin-only routes.
