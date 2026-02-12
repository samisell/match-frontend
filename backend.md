# HeartCraft Backend Architecture

This document outlines the backend architecture and data flow for the HeartCraft application. The application uses a decoupled architecture with a Next.js frontend and a Laravel PHP backend serving as a RESTful API. The backend also includes an integrated admin dashboard for managing users and matches.

## Core Technologies

*   **Frontend**: Next.js (React)
*   **Backend API**: Laravel (PHP)
*   **Database**: MySQL / PostgreSQL
*   **Authentication**: Laravel Sanctum (API Tokens)
*   **Admin Dashboard**: FilamentPHP (or custom Laravel Admin)

## Data Models (Relational Database)

Below is the proposed structure for the relational database tables.

1.  **`users`**
    *   **Description**: Stores the primary profile and information for each registered user.
    *   **Columns**:
        *   `id` (Primary Key)
        *   `name` (string)
        *   `email` (string, unique)
        *   `password` (string, hashed)
        *   `age` (integer)
        *   `location` (string)
        *   `occupation` (string)
        *   `education` (string)
        *   `quote` (text)
        *   `profile_summary` (text)
        *   `interests` (json/text)
        *   `created_at` (timestamp)
        *   `updated_at` (timestamp)

2.  **`user_photos`**
    *   **Description**: Stores user-uploaded gallery photos.
    *   **Columns**:
        *   `id` (Primary Key)
        *   `user_id` (Foreign Key -> users.id)
        *   `image_url` (string)
        *   `caption` (string, nullable)
        *   `is_primary` (boolean, default: false)
        *   `created_at` (timestamp)
        *   `updated_at` (timestamp)

3.  **`user_preferences`**
    *   **Description**: Stores what a user is looking for in a match.
    *   **Columns**:
        *   `id` (Primary Key)
        *   `user_id` (Foreign Key -> users.id, unique)
        *   `age_min` (integer)
        *   `age_max` (integer)
        *   `location_radius_km` (integer)
        *   `desired_interests` (json/text)
        *   `created_at` (timestamp)
        *   `updated_at` (timestamp)

4.  **`matches`**
    *   **Description**: Stores the curated matches between users.
    *   **Columns**:
        *   `id` (Primary Key)
        *   `user_id` (Foreign Key -> users.id)
        *   `matched_user_id` (Foreign Key -> users.id)
        *   `status` (enum: 'proposed', 'accepted', 'declined')
        *   `matchmaker_note` (text)
        *   `matched_at` (timestamp)
        *   `created_at` (timestamp)
        *   `updated_at` (timestamp)

5.  **`messages`**
    *   **Description**: Stores messages sent from the HeartCraft team (matchmakers) to the user.
    *   **Columns**:
        *   `id` (Primary Key)
        *   `user_id` (Foreign Key -> users.id)
        *   `title` (string)
        *   `content` (text)
        *   `is_read` (boolean)
        *   `sent_at` (timestamp)
        *   `created_at` (timestamp)
        *   `updated_at` (timestamp)

## API Endpoints

The Laravel backend exposes the following RESTful endpoints for the Next.js frontend.

---

### Authentication

*   **POST /api/register**
    *   **Action**: Create a new user account.
    *   **Input**: `{ name, email, password, ...profileFields }`
    *   **Output**: `{ token, user }`

*   **POST /api/login**
    *   **Action**: Authenticate an existing user.
    *   **Input**: `{ email, password }`
    *   **Output**: `{ token, user }`

*   **POST /api/logout**
    *   **Action**: Invalidate the current user's token.
    *   **Headers**: `Authorization: Bearer {token}`

*   **POST /api/forgot-password**
    *   **Action**: Request a password reset link.
    *   **Input**: `{ email }`
    *   **Output**: `{ message }`

*   **POST /api/reset-password**
    *   **Action**: Reset the user's password with a valid token.
    *   **Input**: `{ token, email, password, password_confirmation }`
    *   **Output**: `{ message }`

---

### User Profile & Data

*   **GET /api/user**
    *   **Action**: Fetch the profile data for the authenticated user.
    *   **Headers**: `Authorization: Bearer {token}`

*   **PUT /api/user/profile**
    *   **Action**: Update the authenticated user's core profile information.
    *   **Headers**: `Authorization: Bearer {token}`
    *   **Input**: `{ name, age, location, occupation, ... }`

#### Photo Gallery

*   **GET /api/user/photos**
    *   **Action**: Get all photos for the authenticated user.
    *   **Headers**: `Authorization: Bearer {token}`

*   **POST /api/user/photos**
    *   **Action**: Upload a new photo. Request should be `multipart/form-data`.
    *   **Headers**: `Authorization: Bearer {token}`
    *   **Input**: `photo` (file), `caption` (string, optional)

*   **POST /api/user/photos/{photoId}/set-primary**
    *   **Action**: Set a specific photo as the primary profile picture.
    *   **Headers**: `Authorization: Bearer {token}`

*   **DELETE /api/user/photos/{photoId}**
    *   **Action**: Delete a user's photo.
    *   **Headers**: `Authorization: Bearer {token}`

#### Matching Preferences ("Looking For")

*   **GET /api/user/preferences**
    *   **Action**: Get the authenticated user's matching preferences.
    *   **Headers**: `Authorization: Bearer {token}`

*   **PUT /api/user/preferences**
    *   **Action**: Create or update the user's matching preferences.
    *   **Headers**: `Authorization: Bearer {token}`
    *   **Input**: `{ age_min, age_max, location_radius_km, desired_interests }`

---

### Matching & Messaging

*   **GET /api/matches**
    *   **Action**: Fetch the list of curated matches for the authenticated user.
    *   **Headers**: `Authorization: Bearer {token}`

*   **PUT /api/matches/{matchId}/status**
    *   **Action**: Update the status of a match (e.g., accept or decline).
    *   **Headers**: `Authorization: Bearer {token}`
    *   **Input**: `{ status: 'accepted' | 'declined' }`

*   **GET /api/messages**
    *   **Action**: Fetch all messages for the authenticated user.
    *   **Headers**: `Authorization: Bearer {token}`

*   **PUT /api/messages/{messageId}/read**
    *   **Action**: Mark a message as read.
    *   **Headers**: `Authorization: Bearer {token}`

---

### AI-Powered Features (Backend Integration)

*   **POST /api/ai/analyze-profile**
    *   **Action**: Provide AI-driven suggestions to improve a user's profile.
    *   **Implementation**: Laravel controller calls an AI service (e.g., OpenAI API) to analyze the profile.
    *   **Headers**: `Authorization: Bearer {token}`
    *   **Input**: `{ profile_details, criteria }`
    *   **Output**: `{ suggested_improvements }`

## Admin Dashboard

The Laravel application includes an admin dashboard (e.g., using FilamentPHP) accessible at `/admin`.

*   **Features**:
    *   User Management: View, edit, and delete users.
    *   Matchmaking: Create and manage matches between users.
    *   Messaging: Send messages to users.
    *   System Settings: Configure application settings.
