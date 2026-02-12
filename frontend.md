# Frontend Development Guide for HeartCraft API

This document provides instructions for frontend developers on how to connect and communicate with the HeartCraft backend API.

## Base URL

The base URL for all API endpoints is:

```
http://127.0.0.1:8000/api
```

## Authentication

The API uses token-based authentication (Laravel Sanctum). To access protected routes, you must include an `Authorization` header with the value `Bearer {token}` in your requests.

### 1. Register a new user

*   **Endpoint:** `POST /register`
*   **Headers:**
    *   `Accept: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }
    ```

*   **Postman Example:**

    ```
    curl --location 'http://127.0.0.1:8000/api/register' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --data-raw '{
        "name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "password_confirmation": "password123"
    }'
    ```

*   **Successful Response (200 OK):**

    ```json
    {
        "access_token": "1|xxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "token_type": "Bearer",
        "user": {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "updated_at": "2026-02-10T01:00:00.000000Z",
            "created_at": "2026-02-10T01:00:00.000000Z",
            "id": 1
        }
    }
    ```

### 2. Login

*   **Endpoint:** `POST /login`
*   **Headers:**
    *   `Accept: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "email": "john.doe@example.com",
        "password": "password123"
    }
    ```

*   **Postman Example:**

    ```
    curl --location 'http://127.0.0.1:8000/api/login' \
    --header 'Content-Type: application/json' \
    --header 'Accept: application/json' \
    --data-raw '{
        "email": "john.doe@example.com",
        "password": "password123"
    }'
    ```

*   **Successful Response (200 OK):**

    ```json
    {
        "access_token": "2|yyyyyyyyyyyyyyyyyyyyyyyyyyyy",
        "token_type": "Bearer",
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            // ... other user fields
        }
    }
    ```

### 3. Logout

*   **Endpoint:** `POST /logout`
*   **Headers:**
    *   `Accept: application/json`
    *   `Authorization: Bearer {token}`

*   **Postman Example:**

    ```
    curl --location 'http://127.0.0.1:8000/api/logout' \
    --header 'Accept: application/json' \
    --header 'Authorization: Bearer 2|yyyyyyyyyyyyyyyyyyyyyyyyyyyy'
    ```

*   **Successful Response (200 OK):**

    ```json
    {
        "message": "Logged out successfully"
    }
    ```

## Email Notification System

The backend system is configured to send email notifications to users and administrators for various actions. Frontend developers should be aware that the following actions will trigger an email:

*   **User Registration**: A welcome email is sent to the newly registered user.
*   **User Profile Update**: An email notification is sent to the user whose profile has been updated.
*   **User Account Deletion**: An email notification is sent to the user whose account has been deleted.

These email templates are fully customizable by administrators through the admin dashboard. The templates support dynamic placeholders (e.g., `{{ user_name }}`, `{{ app_name }}`, `{{ login_link }}`, `{{ user_profile_link }}`) which are automatically replaced with relevant data at the time of sending.

## API Resources

All the following routes are protected and require the `Authorization: Bearer {token}` header.

### Users

*   **`GET /users`**: Get a list of all users.
*   **`GET /users/{id}`**: Get a specific user by ID.
*   **`PUT /users/{id}`**: Update a user's profile.
    *   **Body (raw, JSON):**
        ```json
        {
            "name": "Johnathan Doe",
            "age": 30,
            "location": "New York, NY",
            "interests": ["hiking", "reading"]
        }
        ```
*   **`DELETE /users/{id}`**: Delete a user.

### User Photos

*   **`GET /photos`**: Get a list of all photos.
*   **`POST /photos`**: Upload a new photo.
    *   **Body (form-data):**
        *   `user_id`: `1`
        *   `photo`: (file)
        *   `caption`: `A beautiful sunset.`
        *   `is_primary`: `true`
*   **`GET /photos/{id}`**: Get a specific photo.
*   **`POST /photos/{id}`**: Update a photo's details. **Note:** Use POST with `_method: 'PUT'`.
    *   **Body (form-data):**
        *   `_method`: `PUT`
        *   `caption`: `An updated caption.`
*   **`DELETE /photos/{id}`**: Delete a photo.

### User Preferences

*   **`GET /preferences`**: Get all user preferences.
*   **`POST /preferences`**: Create new preferences for a user.
    *   **Body (raw, JSON):**
        ```json
        {
            "user_id": 1,
            "age_min": 25,
            "age_max": 35,
            "location_radius_km": 50,
            "desired_interests": ["music", "travel"]
        }
        ```
*   **`GET /preferences/{id}`**: Get a specific user's preferences.
*   **`PUT /preferences/{id}`**: Update a user's preferences.
*   **`DELETE /preferences/{id}`**: Delete a user's preferences.

### User Matches

*   **`GET /matches`**: Get all matches.
*   **`POST /matches`**: Create a new match.
*   **`GET /matches/{id}`**: Get a specific match.
*   **`PUT /matches/{id}`**: Update a match's status (`proposed`, `accepted`, `declined`).
*   **`DELETE /matches/{id}`**: Delete a match.

### Messages

*   **`GET /messages`**: Get all messages.
*   **`POST /messages`**: Create a new message.
*   **`GET /messages/{id}`**: Get a specific message.
*   **`PUT /messages/{id}`**: Update a message (e.g., mark as read).
*   **`DELETE /messages/{id}`**: Delete a message.