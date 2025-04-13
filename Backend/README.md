# API Documentation

## POST /users/register

### Description
Registers a new user. Accepts user details and returns an authentication token along with the user data.

### Request Body
- **fullname**: Object containing:
  - **firstname** (string, required, minimum 3 characters)
  - **lastname** (string, optional, minimum 3 characters)
- **email**: String, required, valid email format.
- **password**: String, required, minimum 6 characters.

Example:
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```

### Responses

- **201 Created**
  - The user is created successfully.
  - Response body includes an authentication token and the user data.
  
- **400 Bad Request**
  - Validation failed due to missing or invalid fields.
  - Response body includes the validation errors.

- **500 Internal Server Error**
  - An error occurred on the server during user registration.

## GET /users

### Description
Retrieves a list of users.

Example Request:
```bash
curl -X GET http://yourapi.example.com/users
```

### Responses

- **200 OK**
  - Response body includes an array of user objects.
  
Example Response:
```json
[
  {
    "id": "user_id_1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com"
  },
  {
    "id": "user_id_2",
    "fullname": {
      "firstname": "Jane",
      "lastname": "Doe"
    },
    "email": "jane.doe@example.com"
  }
]
```

## POST /users/login

### Description
Authenticates a user and returns an authentication token along with user details.

### Request Body
- **email**: String, required, valid email format.
- **password**: String, required, minimum 6 characters.

Example:
```json
{
  "email": "john.doe@example.com",
  "password": "secretpassword"
}
```

### Responses

- **200 OK**
  - Authentication is successful.
  - Response body includes an authentication token and the user data.

- **400 Bad Request**
  - Validation error due to missing or invalid fields.

- **401 Unauthorized**
  - Invalid email or credentials.

- **500 Internal Server Error**
  - An error occurred on the server during login.

## GET /users/logout

### Description
Logs out the currently authenticated user by invalidating their token and clearing session cookies.

### Authentication
Requires a valid authentication token either in:
- Authorization header (Bearer token)
- Cookie named 'token'

Example Request:
```bash
curl -X GET http://yourapi.example.com/users/logout \
  -H "Authorization: Bearer your_token_here"
```

### Responses

- **200 OK**
  - User successfully logged out
  - Response body includes success message
  
Example Response:
```json
{
  "message": "User logged out successfully"
}
```

- **401 Unauthorized**
  - Invalid or missing authentication token

- **500 Internal Server Error**
  - An error occurred on the server during logout

## POST /captains/register

### Description
Registers a new captain. Accepts captain details and returns an authentication token along with the captain data.

### Request Body
```json
{
  "fullname": {
    "firstname": "John", // string, required, minimum 3 characters
    "lastname": "Doe" // string, optional, minimum 3 characters
  },
  "email": "john.doe@example.com", // string, required, valid email format
  "password": "secretpassword", // string, required, minimum 6 characters
  "vehicle": {
    "color": "red", // string, required, minimum 3 characters
    "plateNumber": "ABC123", // string, required, minimum 3 characters
    "capacity": 4, // number, required
    "vehicleType": "car" // string, required, one of 'auto', 'car', 'motorcycle', 'bike'
  }
}
```

### Responses

- **201 Created**
  - The captain is created successfully.
  - Response body includes an authentication token and the captain data.
  
Example Response:
```json
{
  "token": "auth_token_here",
  "captain": {
    "id": "captain_id_1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **400 Bad Request**
  - Validation failed due to missing or invalid fields.
  - Response body includes the validation errors.

Example Response:
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **409 Conflict**
  - Captain already exists.
  - Response body includes a conflict message.

Example Response:
```json
{
  "message": "Captain already exists"
}
```

- **500 Internal Server Error**
  - An error occurred on the server during captain registration.

Example Response:
```json
{
  "message": "Internal server error"
}
```

## POST /captains/login

### Description
Authenticates a captain and returns an authentication token along with captain details.

### Request Body
```json
{
  "email": "john.doe@example.com", // string, required, valid email format
  "password": "secretpassword" // string, required, minimum 6 characters
}
```

### Responses

- **200 OK**
  - Authentication is successful.
  - Response body includes an authentication token and the captain data.

Example Response:
```json
{
  "token": "auth_token_here",
  "captain": {
    "id": "captain_id_1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **400 Bad Request**
  - Validation error due to missing or invalid fields.

Example Response:
```json
{
  "errors": [
    {
      "msg": "Invalid email address",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- **401 Unauthorized**
  - Invalid email or password.

Example Response:
```json
{
  "message": "Invalid email or password"
}
```

- **500 Internal Server Error**
  - An error occurred on the server during login.

Example Response:
```json
{
  "message": "Internal server error"
}
```

## GET /captains/profile

### Description
Retrieves the profile of the currently authenticated captain.

### Authentication
Requires a valid authentication token either in:
- Authorization header (Bearer token)
- Cookie named 'token'

Example Request:
```bash
curl -X GET http://yourapi.example.com/captains/profile \
  -H "Authorization: Bearer your_token_here"
```

### Responses

- **200 OK**
  - Response body includes the captain data.

Example Response:
```json
{
  "captain": {
    "id": "captain_id_1",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "vehicle": {
      "color": "red",
      "plateNumber": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }
}
```

- **401 Unauthorized**
  - Invalid or missing authentication token.

Example Response:
```json
{
  "message": "Unauthorized"
}
```

- **500 Internal Server Error**
  - An error occurred on the server during profile retrieval.

Example Response:
```json
{
  "message": "Internal server error"
}
```

## GET /captains/logout


### Description
Logs out the currently authenticated captain by invalidating their token and clearing session cookies.

### Authentication
Requires a valid authentication token either in:
- Authorization header (Bearer token)
- Cookie named 'token'

Example Request:
```bash
curl -X GET http://yourapi.example.com/captains/logout \
  -H "Authorization: Bearer your_token_here"
```

### Responses

- **200 OK**
  - Captain successfully logged out.
  - Response body includes success message.

Example Response:
```json
{
  "message": "Logout successful"
}
```

- **401 Unauthorized**
  - Invalid or missing authentication token.

Example Response:
```json
{
  "message": "Unauthorized"
}
```

- **500 Internal Server Error**
  - An error occurred on the server during logout.

Example Response:
```json
{
  "message": "Internal server error"
}
```

## GET /rides/get-fare

### Description
Calculates the estimated fare for a ride based on pickup and destination locations.

### Authentication
- Requires a valid JWT token in the Authorization header
- Uses `authMiddleware.authUser`

### Query Parameters
```json
{
  "pickup": "string", // minimum 3 characters
  "destination": "string" // minimum 3 characters
}
```

### Response
```json
{
  "auto": 150, // fare in INR for auto
  "car": 250,  // fare in INR for car
  "motorcycle": 100 // fare in INR for motorcycle
}
```

This documentation:
1. Describes the endpoint purpose
2. Lists authentication requirements
3. Shows query parameter format
4. Details validation rules
5. Provides response format for success/error cases
6. Includes example request/response

Let me know if you'd like me to modify or expand any part of this documentation.
