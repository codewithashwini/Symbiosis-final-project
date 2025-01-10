export interface User {
    id?: number;
    name: string;
    email: string;
    password?: string; // Password might not be needed when fetching the user profile
    role?: string; // If you have different user roles (admin, customer, etc.)
  }
  