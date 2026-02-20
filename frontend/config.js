// config.js
const CONFIG = {
    // Make sure there is NO trailing slash at the end of the URL!
    API_BASE_URL: "https://bizforge-g73l.onrender.com", 
    DEFAULT_LANGUAGE: "en",
    MAX_RETRIES: 3
};

// Prevent modifications to the config object
Object.freeze(CONFIG);