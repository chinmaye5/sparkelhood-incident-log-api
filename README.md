# AI Safety Incident Log API

A RESTful API service to log and manage AI safety incidents.

## Tech Stack

- **Language**: JavaScript (Node.js)
- **Framework**: Express.js
- **Database**: MongoDB
- **ODM**: Mongoose
- **Validation**: Joi

## Project Structure

```
incident-log-api/
├── config/                     # Configuration files
│   └── db.js                   # MongoDB configuration
├── controllers/                # Route handlers
│   └── incidentController.js   # Incident-related controllers
├── models/                     # Database models
│   └── Incident.js             # Incident model
├── routes/                     # API routes
│   └── incidentRoutes.js       # Incident-related routes
├── middleware/                 # Custom middleware
│   └── errorHandler.js         # Error handling middleware
├── utils/                      # Utility functions
│   └── validation.js           # Input validation utilities
├── db/                         # Database scripts
│   └── seed.js                 # Seed data script
├── app.js                      # Express application setup
├── server.js                   # Server entry point
├── package.json                # Project dependencies
└── README.md                   # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14+ recommended)
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd incident-log-api
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/incident_log_db
   ```

4. Start MongoDB (if using a local instance):
   ```
   mongod
   ```

### Running the Application

1. Seed the database with initial data:
   ```
   npm run seed
   ```

2. Start the server:
   ```
   npm start
   ```
   
   For development with auto-restart:
   ```
   npm run dev
   ```

3. The API will be available at: `http://localhost:3000`

## API Endpoints

### 1. Get All Incidents

- **URL**: `/incidents/getAll`
- **Method**: `GET`
- **Description**: Retrieves all incidents from the database
- **Example**:
  ```bash
  curl -X GET http://localhost:3000/incidents
  ```
- **Response**: 200 OK
  ```json
  [
    {
      "id": "60a1f2b0b08f3c2a6c8d1234",
      "title": "Unauthorized Data Access",
      "description": "AI system accessed restricted data beyond its authorization scope due to a permission fault.",
      "severity": "High",
      "reported_at": "2025-04-01T14:30:00.000Z"
    },
    {
      "id": "60a1f2b0b08f3c2a6c8d5678",
      "title": "Algorithm Bias Detected",
      "description": "Machine learning model showed significant bias in recommendations based on demographic data.",
      "severity": "Medium",
      "reported_at": "2025-03-28T09:15:00.000Z"
    }
  ]
  ```

### 2. Create a New Incident

- **URL**: `/incidents/create`
- **Method**: `POST`
- **Description**: Creates a new incident
- **Request Body**:
  ```json
  {
    "title": "New Incident Title", 
    "description": "Detailed description here.", 
    "severity": "Medium"
  }
  ```
- **Example**:
  ```bash
  curl -X POST http://localhost:3000/incidents \
    -H "Content-Type: application/json" \
    -d '{"title": "New Incident Title", "description": "Detailed description here.", "severity": "Medium"}'
  ```
- **Response**: 201 Created
  ```json
  {
    "id": "60a1f2b0b08f3c2a6c8d9012",
    "title": "New Incident Title",
    "description": "Detailed description here.",
    "severity": "Medium",
    "reported_at": "2025-04-03T12:00:00.000Z"
  }
  ```

### 3. Get a Specific Incident

- **URL**: `/incidents/getById/:id`
- **Method**: `GET`
- **Description**: Retrieves a specific incident by its ID
- **Example**:
  ```bash
  curl -X GET http://localhost:3000/incidents/60a1f2b0b08f3c2a6c8d1234
  ```
- **Response**: 200 OK
  ```json
  {
    "id": "60a1f2b0b08f3c2a6c8d1234",
    "title": "Unauthorized Data Access",
    "description": "AI system accessed restricted data beyond its authorization scope due to a permission fault.",
    "severity": "High",
    "reported_at": "2025-04-01T14:30:00.000Z"
  }
  ```

### 4. Delete an Incident

- **URL**: `/incidents/deleteById/:id`
- **Method**: `DELETE`
- **Description**: Deletes a specific incident by its ID
- **Example**:
  ```bash
  curl -X DELETE http://localhost:3000/incidents/60a1f2b0b08f3c2a6c8d1234
  ```
- **Response**: 204 No Content

