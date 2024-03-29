// api routes

export const API_URL = process.env.NODE_ENV === 'development' ? "http://localhost:8000" : process.env.REACT_APP_BACKEND_URL;
export const FRONTEND_URL = process.env.NODE_ENV === 'development' ? "http://localhost:3000" : process.env.REACT_APP_FRONTEND_URL;
export const ADMIN_URL = process.env.NODE_ENV === 'development' ? "http://localhost:5000" : process.env.REACT_APP_ADMIN_URL;

// export const FRONTEND_URL = "https://www.hkisclubs.com";
// export const ADMIN_URL = "https://admin.hkisclubs.com";
// export const API_URL = "https://api.hkisclubs.com";

// export const FRONTEND_URL = "http://localhost:3000";
// export const API_URL = "http://localhost:8000";
// export const ADMIN_URL = "http://localhost:5000";