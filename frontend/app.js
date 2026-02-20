// frontend/app.js

// ==========================================
// UI & NAVIGATION LOGIC
// ==========================================

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    html.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
});

// Tab Navigation
const tabLinks = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active states
        tabLinks.forEach(l => l.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active state to clicked tab
        link.classList.add('active');
        const targetId = link.getAttribute('data-target');
        document.getElementById(targetId).classList.add('active');
    });
});

// Utilities: Toast & Clipboard
function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = "show";
    setTimeout(() => { toast.className = toast.className.replace("show", ""); }, 3000);
}

function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        showToast("📋 Copied to clipboard!");
    }).catch(err => {
        showToast("❌ Failed to copy.");
        console.error(err);
    });
}


// ==========================================
// API LOGIC: MASTER TEXT GENERATOR (21 Tools)
// ==========================================
async function generateContent(endpoint, tabId) {
    const loaderId = `${tabId.replace('tab', 't')}-loader`;
    const outputId = `${tabId.replace('tab', 't')}-output`;
    
    const loader = document.getElementById(loaderId);
    const outputBox = document.getElementById(outputId);
    
    if (!loader || !outputBox) {
        console.error(`Missing elements for ${tabId}`);
        return;
    }

    loader.style.display = "block";
    outputBox.innerText = "Directing the AI... Please wait 🎬";

    // Build the payload dynamically based on the active tab
    let payload = {};
    
    try {
        if (tabId === 'tab1') {
            payload = {
                industry: document.getElementById('t1-industry').value || "General",
                keywords: document.getElementById('t1-keywords').value || "Creative",
                tone: document.getElementById('t1-tone').value || "Modern"
            };
        } else if (tabId === 'tab3') {
            payload = {
                brand_description: document.getElementById('t3-desc').value || "A new brand",
                content_type: document.getElementById('t3-type').value || "Ad Copy",
                tone: document.getElementById('t3-tone').value || "Professional"
            };
        } else if (tabId === 'tab4') {
            payload = {
                industry: document.getElementById('t4-industry').value || "General Business",
                brand_tone: document.getElementById('t4-tone').value || "Modern"
            };
        } else if (tabId === 'tab5') {
            payload = {
                review_text: document.getElementById('t5-review').value || "Good service.",
                brand_tone_reference: document.getElementById('t5-tone').value || "Professional"
            };
        } else if (tabId === 'tab7') {
            payload = {
                brand_name: document.getElementById('t7-name').value || "MyBrand",
                industry: document.getElementById('t7-industry').value || "Business",
                core_value: document.getElementById('t7-value').value || "Quality",
                tone: document.getElementById('t7-tone').value || "Catchy"
            };
        } else if (tabId === 'tab8') {
            payload = {
                founder_name: document.getElementById('t8-founder').value || "The Founders",
                business_type: document.getElementById('t8-type').value || "Company",
                mission: document.getElementById('t8-mission').value || "To provide excellent service.",
                target_audience: document.getElementById('t8-audience').value || "Everyone",
                year_founded: document.getElementById('t8-year').value || "Recently"
            };
        } else if (tabId === 'tab9') {
            payload = {
                brand_description: document.getElementById('t9-desc').value || "A cool brand",
                platform: document.getElementById('t9-platform').value || "Social Media",
                topic: document.getElementById('t9-topic').value || "Updates",
                tone: document.getElementById('t9-tone').value || "Engaging"
            };
        } else if (tabId === 'tab10') {
            payload = {
                email_type: document.getElementById('t10-type').value || "Newsletter",
                brand_name: document.getElementById('t10-name').value || "MyBrand",
                key_message: document.getElementById('t10-message').value || "Check out our new stuff",
                tone: document.getElementById('t10-tone').value || "Friendly"
            };
        } else if (tabId === 'tab11') {
            payload = {
                product_name: document.getElementById('t11-name').value || "Awesome Product",
                key_features: document.getElementById('t11-features').value || "High quality",
                target_customer: document.getElementById('t11-customer').value || "Everyone",
                tone: document.getElementById('t11-tone').value || "Persuasive"
            };
        } else if (tabId === 'tab12') {
            payload = {
                industry: document.getElementById('t12-industry').value || "Business",
                core_values: document.getElementById('t12-values').value || "Integrity, Innovation",
                target_audience: document.getElementById('t12-audience').value || "Consumers",
                impact_goal: document.getElementById('t12-goal').value || "Change the world"
            };
        } else if (tabId === 'tab13') {
            payload = {
                product_type: document.getElementById('t13-type').value || "Product",
                industry: document.getElementById('t13-industry').value || "Retail",
                price_range: document.getElementById('t13-price').value || "Mid-range",
                geography: document.getElementById('t13-geo').value || "Global"
            };
        } else if (tabId === 'tab14') {
            payload = {
                product_service: document.getElementById('t14-product').value || "Service",
                usp: document.getElementById('t14-usp').value || "We are the best",
                target_audience: document.getElementById('t14-audience').value || "Everyone",
                platform: document.getElementById('t14-platform').value || "Google Ads"
            };
        } else if (tabId === 'tab15') {
            payload = {
                brand_niche: document.getElementById('t15-niche').value || "Niche",
                post_topic: document.getElementById('t15-topic').value || "Topic",
                platform: document.getElementById('t15-platform').value || "Instagram",
                tone: document.getElementById('t15-tone').value || "Trending"
            };
        } else if (tabId === 'tab16') {
            payload = {
                announcement_type: document.getElementById('t16-type').value || "Launch",
                brand_name: document.getElementById('t16-name').value || "MyBrand",
                key_details: document.getElementById('t16-details').value || "We launched something new.",
                founder_quote: document.getElementById('t16-quote').value || "This is a big step."
            };
        } else if (tabId === 'tab17') {
            payload = {
                page_topic: document.getElementById('t17-topic').value || "Home",
                target_keyword: document.getElementById('t17-keyword').value || "Best service",
                brand_name: document.getElementById('t17-name').value || "MyBrand",
                tone: document.getElementById('t17-tone').value || "SEO Optimized"
            };
        } else if (tabId === 'tab18') {
            payload = {
                business_type: document.getElementById('t18-type').value || "Business",
                product_description: document.getElementById('t18-desc').value || "A product",
                target_audience: document.getElementById('t18-audience').value || "Buyers"
            };
        } else if (tabId === 'tab19') {
            payload = {
                business_name: document.getElementById('t19-name').value || "Startup",
                problem_solved: document.getElementById('t19-problem').value || "A problem",
                solution: document.getElementById('t19-solution').value || "Our solution",
                target_market: document.getElementById('t19-market').value || "The market",
                revenue_model: document.getElementById('t19-revenue').value || "SaaS",
                traction: document.getElementById('t19-traction').value || ""
            };
        } else if (tabId === 'tab20') {
            payload = {
                document_text: document.getElementById('t20-doc').value || "Please paste text to summarize."
            };
        } else if (tabId === 'tab22') {
            const rawContent = document.getElementById('t22-content').value || "";
            // Split by blank lines to form the array of strings expected by backend
            const pieces = rawContent.split(/\n\s*\n/).filter(p => p.trim() !== "");
            payload = {
                content_pieces: pieces.length > 0 ? pieces : ["Piece 1", "Piece 2"]
            };
        } else if (tabId === 'tab23') {
            payload = {
                name: document.getElementById('t23-name').value || "John Doe",
                role: document.getElementById('t23-role').value || "CEO",
                brand_name: document.getElementById('t23-brand').value || "MyBrand",
                contact_info: document.getElementById('t23-contact').value || "hello@example.com",
                tagline_preference: document.getElementById('t23-tagline').value || "Minimal"
            };
        } else if (tabId === 'tab24') {
            payload = {
                brand_name: document.getElementById('t24-name').value || "MyBrand"
            };
        }

        // Call Backend
        const response = await fetch(`${CONFIG.API_BASE_URL}/${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("API request failed");
        
        const data = await response.json();
        outputBox.innerText = data.result;
        showToast("🎬 Cut! Generation complete.");

    } catch (error) {
        outputBox.innerText = `Error generating content: ${error.message}\nMake sure your backend is running and API keys are set!`;
        showToast("❌ Generation failed.");
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}


// ==========================================
// API LOGIC: SPECIFIC TOOLS (Tab 2, 6, 21)
// ==========================================

// Tab 2: SDXL Logo Generator
async function generateLogo() {
    const loader = document.getElementById('t2-loader');
    const imageOutput = document.getElementById('t2-image-output');
    const promptOutput = document.getElementById('t2-prompt-output');
    const downloadBtn = document.getElementById('t2-download-btn');

    loader.style.display = "block";
    imageOutput.style.display = "none";
    downloadBtn.style.display = "none";
    promptOutput.innerText = "Crafting prompt and rendering pixels... 🎨";

    const payload = {
        brand_name: document.getElementById('t2-name').value || "MyBrand",
        industry: document.getElementById('t2-industry').value || "Business",
        keywords: document.getElementById('t2-keywords').value || "Minimal",
        style_preference: document.getElementById('t2-style').value || "Minimalist Vector"
    };

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/generate-logo`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error("API request failed");

        const data = await response.json();
        
        imageOutput.src = `${CONFIG.API_BASE_URL}${data.image_url}`;
        imageOutput.style.display = "inline-block";
        promptOutput.innerText = `Prompt Used:\n${data.prompt_used}`;
        downloadBtn.href = `${CONFIG.API_BASE_URL}${data.image_url}`;
        downloadBtn.style.display = "inline-block";
        
        showToast("🎨 Masterpiece rendered!");
    } catch (error) {
        promptOutput.innerText = "Error generating logo. Ensure HuggingFace API key is valid.";
        showToast("❌ Image generation failed.");
        console.error(error);
    } finally {
        loader.style.display = "none";
    }
}

// Tab 6: IBM Granite Chatbot
let chatHistory = [];

async function sendMessage() {
    const inputField = document.getElementById('chat-input');
    const historyBox = document.getElementById('chat-history');
    const loader = document.getElementById('t6-loader');
    
    const message = inputField.value.trim();
    if (!message) return;

    // Add User Message
    historyBox.innerHTML += `<div style="margin-bottom: 1rem; color: var(--text-secondary);"><strong>👤 You:</strong> ${message}</div>`;
    inputField.value = '';
    historyBox.scrollTop = historyBox.scrollHeight;
    loader.style.display = "block";

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message, history: chatHistory })
        });

        if (!response.ok) throw new Error("Chat request failed");
        
        const data = await response.json();
        
        // Add AI Message
        historyBox.innerHTML += `<div style="margin-bottom: 1rem;"><strong>🤖 BizForge AI:</strong> ${data.response}</div>`;
        
        chatHistory.push({ role: "user", content: message });
        chatHistory.push({ role: "assistant", content: data.response });

    } catch (error) {
        historyBox.innerHTML += `<div style="margin-bottom: 1rem; color: #ff4757;"><strong>⚠️ Error:</strong> Could not reach AI. Is the model running locally?</div>`;
        console.error(error);
    } finally {
        loader.style.display = "none";
        historyBox.scrollTop = historyBox.scrollHeight;
    }
}

// Enable "Enter" key for Chatbot
const chatInputElem = document.getElementById('chat-input');
if(chatInputElem) {
    chatInputElem.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
    });
}

// Tab 21: Voice Input Transcription (Web Speech API)
const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('recording-status');
const transcriptBox = document.getElementById('t21-output');

if (micBtn) {
    let recognition;
    let isRecording = false;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onstart = function() {
            isRecording = true;
            micBtn.style.animation = "pulse 1s infinite";
            statusText.innerText = "Recording... Click to stop.";
            transcriptBox.innerText = "";
        };

        recognition.onresult = function(event) {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript) {
                transcriptBox.innerText += finalTranscript + " ";
            }
        };

        recognition.onerror = function(event) {
            statusText.innerText = "Error recognizing speech.";
            console.error(event.error);
            isRecording = false;
            micBtn.style.animation = "none";
        };

        recognition.onend = function() {
            isRecording = false;
            micBtn.style.animation = "none";
            statusText.innerText = "Click to start browser dictation";
            showToast("🎬 Voice capture complete!");
        };

        micBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        statusText.innerText = "Web Speech API not supported in this browser.";
        micBtn.style.opacity = "0.5";
        micBtn.style.cursor = "not-allowed";
    }
}