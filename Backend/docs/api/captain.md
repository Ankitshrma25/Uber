# Captain Endpoints

## Register Captain
**POST** `/captain/register`

Registers a new captain with vehicle details.

### Request Body
```json
{
  "fullname": {
    "firstname": "string",
    "lastname": "string"
  },
  "email": "string",
  "password": "string",
  "vehicle": {
    "color": "string",
    "plateNumber": "string",
    "capacity": "number",
    "vehicleType": "auto|car|motorcycle|bike"
  }
}
```

### Validation Rules
- `email`: Must be a valid email address
- `fullname.firstname`: Minimum 3 characters
- `password`: Minimum 6 characters
- `vehicle.color`: Minimum 3 characters
- `vehicle.plateNumber`: Minimum 3 characters
- `vehicle.capacity`: Must be a number
- `vehicle.vehicleType`: Must be one of: auto, car, motorcycle, bike

### Response
**201 Created**
```json
{
  "token": "JWT_TOKEN",
  "captain": {
    "id": "string",
    "fullname": {
      "firstname": "string",
      "lastname": "string"
    },
    "email": "string",
    "vehicle": {
      "color": "string",
      "plateNumber": "string",
      "capacity": "number",
      "vehicleType": "string"
    }
  }
}
```

### Error Responses
- `400 Bad Request`: Validation errors
- `409 Conflict`: Email already exists
- `500 Internal Server Error`: Server error
