# Support Ticket Management API

This project is a role-based Support Ticket Management system built with NestJS and TypeORM, using Microsoft SQL Server (MSSQL). 

## 🚀 Accomplishments So Far

### 1. Database & Entities Setup
Configured TypeORM to map directly to our MSSQL database, establishing the core relationships across tables:
- **Role**: Defines `MANAGER`, `SUPPORT`, and `USER` access levels.
- **User**: Connects users to their assigned roles, hiding hashed passwords from standard queries.
- **Ticket, TicketComment, TicketStatusLog**: Established but awaiting full CRUD implementation.

### 2. Role-Based Access Control (RBAC)
Implemented a robust Role-Based Access Control system to protect API routes:
- **Custom Decorator (`@Role`)**: Allows attaching specific role requirements to any controller method (e.g., `@Role(RoleType.MANAGER)`).
- **Role Guard (`RoleGuard`)**: Intercepts requests, reads the JWT payload, and throws a `403 Forbidden` Exception if the user lacks the required role.

### 3. JWT Authentication Verification
Configured a secure login and session management system:
- **Passport-JWT Strategy**: Automatically validates Bearer tokens attached to API requests and injects the decoded payload into the `req.user` object for downstream use.
- **Login Endpoint (`POST /auth/login`)**: Built `AuthController` and `AuthService` logic to:
  - Verify email existence.
  - Utilize `bcrypt` to securely compare provided passwords against stored database hashes.
  - Issue JWT access tokens containing the user's ID, Email, and Role.

### 4. Secure User Management 
Secured the user creation pipeline:
- **Creation Endpoint (`POST /users`)**: Designed to exclusively allow `MANAGER` accounts to create new users.
- **Data Validation (DTOs)**: Integrated `class-validator` and `class-transformer` to automatically reject malformed requests (e.g., invalid emails or short passwords) before they hit the controller.
- **Password Protection**: Implemented automated `bcrypt` hashing within the `UserService` before any user is serialized and saved to the database, ensuring raw passwords are never exposed or stored.

## 🛠 Next Steps
- Implement full CRUD operations for `Ticket` management.
- Ensure Managers, Support, and Users see the correct filtered datasets when calling `GET /tickets`.
- Add functionality for Ticket Comments and Status Logs.
