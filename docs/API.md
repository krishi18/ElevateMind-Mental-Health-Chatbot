# ElevateMind API Documentation

This document details the API endpoints for the ElevateMind application. All endpoints use JSON for data exchange and are prefixed with `/api/v1`.  Authentication is required for all endpoints except `/signup`, `/verify-email`, `/login`, `/forgot-password`, and `/reset-password/:token`.  Authentication is handled using JSON Web Tokens (JWTs).  Include the `Authorization: Bearer <token>` header in all authenticated requests.


## I. Authentication Endpoints

These endpoints handle user registration, login, password management, and Google authentication.

* **POST /api/v1/auth/signup:**  Registers a new user.
    * **Request Body:**
        * `email` (string, required): User's email address.
        * `password` (string, required): User's password.
        * `name` (string, optional): User's name.
    * **Response (201 Created):**  A success message and possibly a verification link.
    * **Response (400 Bad Request):**  Error details if the input is invalid or the email already exists.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/verify-email:** Verifies a user's email address using a verification code.
    * **Request Body:**
        * `email` (string, required): User's email address.
        * `verificationCode` (string, required): The verification code sent to the user's email.
    * **Response (200 OK):**  Success message.
    * **Response (400 Bad Request):** Incorrect verification code or invalid email.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/login:** Authenticates a user's credentials.
    * **Request Body:**
        * `email` (string, required): User's email address.
        * `password` (string, required): User's password.
    * **Response (200 OK):**  User's data and a JWT (JSON Web Token).
    * **Response (401 Unauthorized):** Incorrect credentials.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/forgot-password:** Initiates the password reset process. Sends a password reset link to the user's email.
    * **Request Body:**
        * `email` (string, required): User's email address.
    * **Response (200 OK):** Success message indicating that a password reset email has been sent.
    * **Response (404 Not Found):** User not found.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/reset-password/:token:** Resets the user's password using a token.
    * **Request Body:**
        * `password` (string, required): The new password.
    * **Response (200 OK):** Success message.
    * **Response (400 Bad Request):** Invalid token or password format.
    * **Response (404 Not Found):** Invalid or expired token.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/logout:** Logs out the current user.  Invalidates the JWT.
    * **Response (200 OK):** Success message.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/auth/google:** Handles Google OAuth2 login/signup.  Requires a valid Google OAuth2 access token.
    * **Request Body:**
        * `googleToken` (string, required): The Google OAuth2 access token.
    * **Response (200 OK):** User data and a JWT.
    * **Response (400 Bad Request):** Invalid Google token.
    * **Response (500 Internal Server Error):** Generic server error.


## II. User Profile Endpoints

These endpoints manage user profile information.  Authentication is required for all endpoints in this section.


* **GET /api/v1/profile:** Retrieves the authenticated user's profile.
    * **Response (200 OK):** User profile data.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **PUT /api/v1/user/profile:** Updates the authenticated user's profile.
    * **Request Body:**  May include `name`, `bio`, etc.  (Specify acceptable fields)
    * **Response (200 OK):** Updated user profile data.
    * **Response (400 Bad Request):** Invalid input data.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **POST /api/v1/user/profile/image:** Uploads a profile image for the authenticated user.  Requires a multipart/form-data request with a `profileImage` field.
    * **Response (200 OK):** URL of the uploaded image.
    * **Response (400 Bad Request):** Invalid image format or size.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **PUT /api/v1/user/profile/password:** Changes the authenticated user's password.
    * **Request Body:**
        * `currentPassword` (string, required): The user's current password.
        * `newPassword` (string, required): The new password.
    * **Response (200 OK):** Success message.
    * **Response (400 Bad Request):** Incorrect current password or invalid new password format.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **DELETE /api/v1/user/profile:** Deletes the authenticated user's profile.
    * **Response (200 OK):** Success message.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.



## III. Check-in Endpoints

These endpoints manage daily check-in entries. Authentication is required for all endpoints in this section.

* **POST /api/v1/check-in:** Creates a new check-in entry.
    * **Request Body:**
        * `moodRating` (number, 1-10, required): User's mood rating.
        * `stressLevel` (number or string, required): User's stress level.
        * `journalEntry` (string, optional): User's journal entry.
    * **Response (201 Created):**  The created check-in entry.
    * **Response (400 Bad Request):** Invalid input data.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **GET /api/v1/check-in:** Retrieves all check-in entries for the authenticated user.  Supports pagination (add query parameters for pagination if implemented).
    * **Response (200 OK):** Array of check-in entries.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (500 Internal Server Error):** Generic server error.

* **DELETE /api/v1/check-in/:id:** Deletes a specific check-in entry.
    * **Response (200 OK):** Success message.
    * **Response (401 Unauthorized):** User is not authenticated.
    * **Response (404 Not Found):** Check-in entry not found.
    * **Response (500 Internal Server Error):** Generic server error.
