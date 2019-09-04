const DEV_MODE = process.env.NODE_ENV === 'development';
export const DISABLE_CORS = DEV_MODE;
export const BACKEND_BASE_URL = 'http://localhost:5000/api';
// export const BACKEND_BASE_URL = 'https://tempus.requestcatcher.com';
// export const BACKEND_BASE_URL = 'https://api.github.com/users?since=135';
