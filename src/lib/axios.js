import axios from "axios";

// 1. PUBLIC INSTANCE (Auth, Landing Page data)
export const axiosPublic = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. SECURE INSTANCE (Dashboards, Payments)
export const axiosSecure = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // IMPORTANT: Ensures Cookies are sent with requests
});

// 3. INTERCEPTOR (The "Smart" part)
axiosSecure.interceptors.response.use(
  (response) => response, // Return response if success
  async (error) => {
    const status = error.response ? error.response.status : null;

    // If user is unauthorized, we might want to redirect or show a specific toast
    if (status === 401 || status === 403) {
      console.error("Unauthorized access detected.");
      // Optional: Force signout or redirect to login here
      // window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);
