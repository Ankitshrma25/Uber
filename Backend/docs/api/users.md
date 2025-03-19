# User Endpoints

## Get User Profile
**GET** `/users/profile`

Retrieves the profile information of the currently authenticated user.

### Authentication
- Requires a valid JWT token in the Authorization header

### Response
```json
{
  "id": "string",
  "email": "string",
  "name": "string",
  "phone": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

### Error Responses
- `401 Unauthorized`: Invalid or missing authentication token
- `404 Not Found`: User profile not found

## Logout
**POST** `/users/logout`

Logs out the current user by invalidating their authentication token.

### Authentication
- Requires a valid JWT token in the Authorization header

### Response
```json
{
  "message": "Successfully logged out"
}
```

### Error Responses
- `401 Unauthorized`: Invalid or missing authentication token
```
