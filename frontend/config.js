// config.js
const CONFIG = {
    // Switch this to your production URL when deploying the backend
    // e.g., "https://bizforge-backend.onrender.com"
    API_BASE_URL: "http://localhost:8000",
    
    // Feature flags or other global frontend settings can go here
    DEFAULT_LANGUAGE: "en",
    MAX_RETRIES: 3
};

// Prevent modifications to the config object
Object.freeze(CONFIG);