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
            "id": 1,
            "name": "John Doe",
            "email": "john.doe@example.com",
            "is_admin": false,
            "email_verified_at": null,
            "is_verified": false,
            "created_at": "2026-02-10T01:00:00.000000Z",
            "updated_at": "2026-02-10T01:00:00.000000Z"
        },
        "message": "Registration successful. Please check your email for the OTP."
    }
    ```

### 2. Verify OTP

*   **Endpoint:** `POST /verify-otp` (or `POST /verify-email`)
*   **Headers:**
    *   `Accept: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "email": "john.doe@example.com",
        "otp": "123456"
    }
    ```

*   **Successful Response (200 OK):**

    ```json
    {
        "message": "Email verified successfully."
    }
    ```

### 2.1. Resend OTP

*   **Endpoint:** `POST /verify-email/resend`
*   **Headers:**
    *   `Accept: application/json`
*   **Body (raw, JSON):**

    ```json
    {
        "email": "john.doe@example.com"
    }
    ```

*   **Successful Response (200 OK):**

    ```json
    {
        "message": "A new OTP has been sent to your email address."
    }
    ```

### 3. Login

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
            "is_admin": false,
            "email_verified_at": "2026-02-10T01:05:00.000000Z",
            "is_verified": true,
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

The backend system is configured to send email notifications to users and administrators for various actions. These email templates are fully customizable by administrators through the admin dashboard.

### 1. Email Triggers

The following actions currently trigger email notifications:

*   **User Registration**: An OTP code is sent to the user's email for verification.
*   **Email Verification**: A welcome email is sent after successful OTP verification.
*   **User Login**: A notification email is sent upon every successful login.
*   **Password Reset**: A dynamic reset link is sent when a user forgets their password.
*   **New Match**: Both users receive an email when a match is created between them.
*   **User Profile Update**: Sent when a user's details are updated.
*   **User Account Deletion**: Sent just before an account is deleted.
*   **Profile Completion Reminder**: An automated daily system that reminds users with incomplete profiles to finish them.

### 2. Available Dynamic Placeholders

When editing templates in the Admin Dashboard, you can use the following placeholders. They will be automatically replaced with real data:

| Template Name | Description | Available Placeholders |
| :--- | :--- | :--- |
| `otp_verification` | Verification code email | `{{ otp }}`, `{{ user_name }}`, `{{ app_name }}` |
| `user_welcome` | After email verification | `{{ login_link }}`, `{{ user_name }}`, `{{ app_name }}` |
| `user_login` | Security alert for login | `{{ login_time }}`, `{{ user_name }}`, `{{ app_name }}` |
| `forgot_password` | Reset password link | `{{ reset_link }}`, `{{ user_name }}`, `{{ app_name }}` |
| `user_match` | New match notification | `{{ matched_user_name }}`, `{{ match_link }}`, `{{ user_name }}`, `{{ app_name }}` |
| `complete_profile_reminder` | Daily automated reminder | `{{ profile_link }}`, `{{ user_name }}`, `{{ app_name }}` |
| `user_updated` | Profile update alert | `{{ user_profile_link }}`, `{{ user_name }}`, `{{ app_name }}` |
| `user_deleted` | Farewell/Deletion alert | `{{ user_name }}`, `{{ app_name }}` |

> [!NOTE]
> `{{ app_name }}` and `{{ year }}` are available in **all** templates regardless of the trigger.

---

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

## Admin Endpoints

All admin endpoints require the user to have `is_admin: true` and a valid Bearer token.

### Email Templates

*   **`GET /admin/email-templates`**: List all dynamic email templates.
*   **`GET /admin/email-templates/{id}`**: Get details of a specific template.
*   **`POST /admin/email-templates`**: Create a new email template.
*   **`PUT /admin/email-templates/{id}`**: Update an existing template (subject/body/type).
*   **`DELETE /admin/email-templates/{id}`**: Delete a template.