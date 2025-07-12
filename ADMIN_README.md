# Admin Dashboard Instructions

This document provides instructions for setting up and using the admin dashboard for your landing page.

## Setup

1. **Backend API Setup**:
   - Ensure your backend API is running and accessible.
   - For demonstration purposes, the dashboard currently uses mock data.

2. **Environment Variables**:
   - Create a `.env.local` file with the following variable:
     ```
     JWT_SECRET=your_jwt_secret_key
     ```

3. **Default Admin Credentials**:
   - For demonstration, use the following credentials:
     - Username: `admin`
     - Password: `admin123`
   - In a production environment, update these credentials in the API routes.

## Using the Admin Dashboard

1. **Login**:
   - Access the admin dashboard at `/admin/login`
   - Enter your username and password created during setup.

2. **Dashboard Features**:
   - View the total number of registered users
   - See when the latest user registered
   - Browse all registered users with their details

3. **Security**:
   - The admin dashboard is protected by authentication
   - Sessions expire after 24 hours of inactivity

## API Endpoints

- `GET /api/users` - Retrieve all registered users (admin only)
- `POST /api/users` - Register a new user
- `POST /api/auth/login` - Admin authentication
- `POST /api/auth/register` - Create an admin user (use with caution)

## Technical Information

- Built with Next.js App Router
- Uses external backend API for data (currently mocked for demonstration)
- JWT-based authentication for admin access
- Responsive design using Tailwind CSS
