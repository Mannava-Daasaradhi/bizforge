// config.js
const CONFIG = {
    // Make sure there is NO trailing slash at the end of the URL!
    API_BASE_URL: "https://bizforge-backend-xyz.onrender.com", 
    DEFAULT_LANGUAGE: "en",
    MAX_RETRIES: 3
};

// Prevent modifications to the config object
Object.freeze(CONFIG);