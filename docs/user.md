# API Specification for User Operations

### Endpoint: POST /api/users

Request Body:

```json
{
  "id": "ijui3h38yr748ryhui4ry84y49823yr",
  "name": "user",
  "email": "user@gmail.com",
  "password": "iwoiwhdodd8uu983yd89yduwdh"
}
```

Response Body Success:

```json
{
  "data": {
    "id": "ijui3h38yr748ryhui4ry84y49823yr",
    "name": "user",
    "email": "user@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "errors": "Validation error"
}
```

### Endpoint: GET /api/users

Response Body Success:

```json
{
  "data": [
    {
      "id": "huggf874yf784fy73uiehd8734y78yg378",
      "name": "user1",
      "email": "user1@gmail.com"
    },
    {
      "id": "iuy786qwe987wer234sdfw3456sdfg987",
      "name": "user2",
      "email": "user2@gmail.com"
    }
  ]
}
```

Response Body Error:

```json
{
  "errors": "Internal Server error"
}
```

## Get User By ID

### Endpoint: GET /api/users/{id}

Response Body Success:

```json
{
  "data": {
    "id": "huggf874yf784fy73uiehd8734y78yg378",
    "name": "user1",
    "email": "user1@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "errors": "User not found"
}
```

## Update User

### Endpoint: PUT /api/users/{id}

Request Body:

```json
{
  "name": "new_user1",
  "email": "new_user1@gmail.com"
}
```

Response Body Success:

```json
{
  "data": {
    "name": "new_user1",
    "email": "new_user1@gmail.com"
  }
}
```

Response Body Error:

```json
{
  "errors": "User not found or validation error"
}
```

## Delete User

### Endpoint: DELETE /api/users/{id}

Response Body Success:

```json
{
  "data": "User deleted successfully"
}
```

Response Body Error:

```json
{
  "errors": "User not found"
}
```
