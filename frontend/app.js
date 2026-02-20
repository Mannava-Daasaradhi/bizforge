// frontend/app.js

// ============================================================
// SAFETY GUARDS — All DOM queries are null-checked
// FIX: Original code crashed silently when elements from one
//      page were queried while on the other page.
// ============================================================

// ── Theme Toggle ─────────────────────────────────────────────
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const html = document.documentElement;
        html.setAttribute('data-theme', html.getAttribute('data-theme') === 'light' ? 'dark' : 'light');
    });
}

// ── Tab Navigation ───────────────────────────────────────────
const tabLinks    = document.querySelectorAll('.tab-link');
const tabContents = document.querySelectorAll('.tab-content');

tabLinks.forEach(link => {
    link.addEventListener('click', () => {
        tabLinks.forEach(l    => l.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        link.classList.add('active');
        const target = document.getElementById(link.getAttribute('data-target'));
        if (target) target.classList.add('active');
    });
});

// Handle #hash in URL to open a specific tab on page load
// e.g. branding.html#tab7 opens Tab 7 directly
window.addEventListener('DOMContentLoaded', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        const targetLink    = document.querySelector(`.tab-link[data-target="${hash}"]`);
        const targetContent = document.getElementById(hash);
        if (targetLink && targetContent) {
            tabLinks.forEach(l    => l.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            targetLink.classList.add('active');
            targetContent.classList.add('active');
        }
    }
});

// ── Toast Notification ───────────────────────────────────────
function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.className = 'show';
    setTimeout(() => { toast.className = toast.className.replace('show', '').trim(); }, 3000);
}

// ── Copy to Clipboard ────────────────────────────────────────
function copyText(elementId) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const text = el.innerText;
    navigator.clipboard.writeText(text)
        .then(() => showToast('📋 Copied to clipboard!'))
        .catch(() => showToast('❌ Failed to copy.'));
}


// ============================================================
// MASTER TEXT GENERATOR — Handles 21 of the 24 tools
// (Tab 2 = generateLogo, Tab 6 = sendMessage, Tab 21 = mic)
// ============================================================
async function generateContent(endpoint, tabId) {
    const numericId  = tabId.replace('tab', 't');
    const loader     = document.getElementById(`${numericId}-loader`);
    const outputBox  = document.getElementById(`${numericId}-output`);

    if (!loader || !outputBox) {
        console.error(`Missing #${numericId}-loader or #${numericId}-output for ${tabId}`);
        return;
    }

    loader.style.display = 'block';
    outputBox.innerText  = '🎬 Directing the AI... Please wait.';

    let payload = {};

    try {
        switch (tabId) {

            // ── Tab 1: Brand Names ──────────────────────────
            case 'tab1':
                payload = {
                    industry: document.getElementById('t1-industry').value || 'General',
                    keywords: document.getElementById('t1-keywords').value || 'Creative',
                    tone:     document.getElementById('t1-tone').value     || 'Modern'
                };
                break;

            // ── Tab 3: Marketing Content ────────────────────
            case 'tab3':
                payload = {
                    brand_description: document.getElementById('t3-desc').value    || 'A new brand',
                    content_type:      document.getElementById('t3-type').value    || 'Ad Copy',
                    tone:              document.getElementById('t3-tone').value     || 'Professional'
                };
                break;

            // ── Tab 4: Design System ────────────────────────
            case 'tab4':
                payload = {
                    brand_tone: document.getElementById('t4-tone').value     || 'Modern',
                    industry:   document.getElementById('t4-industry').value || 'General Business'
                };
                break;

            // ── Tab 5: Sentiment Analysis ───────────────────
            case 'tab5':
                payload = {
                    review_text:           document.getElementById('t5-review').value || 'Good service.',
                    brand_tone_reference:  document.getElementById('t5-tone').value   || 'Professional'
                };
                break;

            // ── Tab 7: Taglines ─────────────────────────────
            case 'tab7':
                payload = {
                    brand_name:  document.getElementById('t7-name').value     || 'MyBrand',
                    industry:    document.getElementById('t7-industry').value  || 'Business',
                    core_value:  document.getElementById('t7-value').value     || 'Quality',
                    tone:        document.getElementById('t7-tone').value      || 'Catchy'
                };
                break;

            // ── Tab 8: Brand Story ──────────────────────────
            case 'tab8':
                payload = {
                    founder_name:    document.getElementById('t8-founder').value   || '',
                    business_type:   document.getElementById('t8-type').value      || 'Company',
                    mission:         document.getElementById('t8-mission').value   || 'To provide excellent service.',
                    target_audience: document.getElementById('t8-audience').value  || 'Everyone',
                    year_founded:    document.getElementById('t8-year').value      || 'Recently'
                };
                break;

            // ── Tab 9: Social Media Posts ───────────────────
            case 'tab9':
                payload = {
                    brand_description: document.getElementById('t9-desc').value     || 'A cool brand',
                    platform:          document.getElementById('t9-platform').value || 'Instagram',
                    topic:             document.getElementById('t9-topic').value    || 'Updates',
                    tone:              document.getElementById('t9-tone').value     || 'Engaging'
                };
                break;

            // ── Tab 10: Email Templates ─────────────────────
            case 'tab10':
                payload = {
                    email_type:  document.getElementById('t10-type').value    || 'Newsletter',
                    brand_name:  document.getElementById('t10-name').value    || 'MyBrand',
                    key_message: document.getElementById('t10-message').value || 'Check out our new stuff',
                    tone:        document.getElementById('t10-tone').value    || 'Friendly'
                };
                break;

            // ── Tab 11: Product Descriptions ────────────────
            case 'tab11':
                payload = {
                    product_name:    document.getElementById('t11-name').value     || 'Awesome Product',
                    key_features:    document.getElementById('t11-features').value || 'High quality',
                    target_customer: document.getElementById('t11-customer').value || 'Everyone',
                    tone:            document.getElementById('t11-tone').value     || 'Persuasive'
                };
                break;

            // ── Tab 12: Mission & Vision ────────────────────
            case 'tab12':
                payload = {
                    industry:        document.getElementById('t12-industry').value || 'Business',
                    core_values:     document.getElementById('t12-values').value   || 'Integrity, Innovation',
                    target_audience: document.getElementById('t12-audience').value || 'Consumers',
                    impact_goal:     document.getElementById('t12-goal').value     || 'Change the world'
                };
                break;

            // ── Tab 13: Audience Personas ───────────────────
            case 'tab13':
                payload = {
                    product_type: document.getElementById('t13-type').value     || 'Product',
                    industry:     document.getElementById('t13-industry').value  || 'Retail',
                    price_range:  document.getElementById('t13-price').value     || 'Mid-range',
                    geography:    document.getElementById('t13-geo').value       || 'Global'
                };
                break;

            // ── Tab 14: Ad Copy ─────────────────────────────
            case 'tab14':
                payload = {
                    product_service: document.getElementById('t14-product').value  || 'Service',
                    usp:             document.getElementById('t14-usp').value      || 'We are the best',
                    target_audience: document.getElementById('t14-audience').value || 'Everyone',
                    platform:        document.getElementById('t14-platform').value || 'Google Ads'
                };
                break;

            // ── Tab 15: Hashtags ────────────────────────────
            case 'tab15':
                payload = {
                    brand_niche: document.getElementById('t15-niche').value    || 'Niche',
                    post_topic:  document.getElementById('t15-topic').value    || 'Topic',
                    platform:    document.getElementById('t15-platform').value || 'Instagram',
                    tone:        document.getElementById('t15-tone').value     || 'Trending'
                };
                break;

            // ── Tab 16: Press Release ───────────────────────
            case 'tab16':
                payload = {
                    announcement_type: document.getElementById('t16-type').value    || 'Product Launch',
                    brand_name:        document.getElementById('t16-name').value    || 'MyBrand',
                    key_details:       document.getElementById('t16-details').value || 'We launched something new.',
                    founder_quote:     document.getElementById('t16-quote').value   || 'This is a big step.'
                };
                break;

            // ── Tab 17: SEO Metadata ────────────────────────
            case 'tab17':
                payload = {
                    page_topic:      document.getElementById('t17-topic').value   || 'Home',
                    target_keyword:  document.getElementById('t17-keyword').value || 'Best service',
                    brand_name:      document.getElementById('t17-name').value    || 'MyBrand',
                    tone:            document.getElementById('t17-tone').value    || 'Professional'
                };
                break;

            // ── Tab 18: FAQ Generator ───────────────────────
            case 'tab18':
                payload = {
                    business_type:        document.getElementById('t18-type').value     || 'Business',
                    product_description:  document.getElementById('t18-desc').value     || 'A product',
                    target_audience:      document.getElementById('t18-audience').value || 'Buyers'
                };
                break;

            // ── Tab 19: Brand Pitch ─────────────────────────
            case 'tab19':
                payload = {
                    business_name:  document.getElementById('t19-name').value     || 'Startup',
                    problem_solved: document.getElementById('t19-problem').value  || 'A problem',
                    solution:       document.getElementById('t19-solution').value || 'Our solution',
                    target_market:  document.getElementById('t19-market').value   || 'The market',
                    revenue_model:  document.getElementById('t19-revenue').value  || 'SaaS',
                    traction:       document.getElementById('t19-traction').value || ''
                };
                break;

            // ── Tab 20: Text Summarizer ─────────────────────
            case 'tab20':
                payload = {
                    document_text: document.getElementById('t20-doc').value || 'Please paste text to summarize.'
                };
                break;

            // ── Tab 22: Consistency Checker ─────────────────
            case 'tab22': {
                const rawContent = document.getElementById('t22-content').value || '';
                const pieces = rawContent.split(/\n\s*\n/).filter(p => p.trim() !== '');
                payload = {
                    content_pieces: pieces.length > 0 ? pieces : ['Piece 1', 'Piece 2']
                };
                break;
            }

            // ── Tab 23: Business Cards ──────────────────────
            case 'tab23':
                payload = {
                    name:               document.getElementById('t23-name').value    || 'John Doe',
                    role:               document.getElementById('t23-role').value    || 'CEO',
                    brand_name:         document.getElementById('t23-brand').value   || 'MyBrand',
                    contact_info:       document.getElementById('t23-contact').value || 'hello@example.com',
                    tagline_preference: document.getElementById('t23-tagline').value || 'Minimal'
                };
                break;

            // ── Tab 24: Domain Availability ─────────────────
            case 'tab24':
                payload = {
                    brand_name: document.getElementById('t24-name').value || 'MyBrand'
                };
                break;

            default:
                outputBox.innerText = `⚠️ No payload builder found for ${tabId}.`;
                loader.style.display = 'none';
                return;
        }

        // ── API Call ──────────────────────────────────────
        const response = await fetch(`${CONFIG.API_BASE_URL}/${endpoint}`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });

        if (!response.ok) {
            const err = await response.json().catch(() => ({}));
            throw new Error(err.detail || `HTTP ${response.status}`);
        }

        const data = await response.json();
        outputBox.innerText = data.result;
        showToast('🎬 Cut! Generation complete.');

    } catch (error) {
        outputBox.innerText = `⚠️ Error: ${error.message}\n\nMake sure your backend is running:\nuvicorn main:app --reload`;
        showToast('❌ Generation failed.');
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
}


// ============================================================
// TAB 2 — SDXL Logo Generator
// ============================================================
async function generateLogo() {
    const loader       = document.getElementById('t2-loader');
    const imageOutput  = document.getElementById('t2-image-output');
    const promptOutput = document.getElementById('t2-prompt-output');
    const downloadBtn  = document.getElementById('t2-download-btn');

    if (!loader) return;

    loader.style.display      = 'block';
    imageOutput.style.display = 'none';
    downloadBtn.style.display = 'none';
    promptOutput.innerText    = '🎨 Crafting prompt and rendering pixels...';

    const payload = {
        brand_name:       document.getElementById('t2-name').value      || 'MyBrand',
        industry:         document.getElementById('t2-industry').value   || 'Business',
        keywords:         document.getElementById('t2-keywords').value   || 'Minimal',
        style_preference: document.getElementById('t2-style').value      || 'Minimalist Vector'
    };

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/generate-logo`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify(payload)
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        imageOutput.src           = `${CONFIG.API_BASE_URL}${data.image_url}`;
        imageOutput.style.display = 'block';
        promptOutput.innerText    = `Prompt Used:\n${data.prompt_used}`;
        downloadBtn.href          = `${CONFIG.API_BASE_URL}${data.image_url}`;
        downloadBtn.style.display = 'inline-block';

        showToast('🎨 Masterpiece rendered!');

    } catch (error) {
        promptOutput.innerText = `❌ Error: ${error.message}\nEnsure HuggingFace API key is valid and SDXL model is available.`;
        showToast('❌ Image generation failed.');
        console.error(error);
    } finally {
        loader.style.display = 'none';
    }
}


// ============================================================
// TAB 6 — AI Branding Chatbot (multi-turn)
// ============================================================
let chatHistory = [];

async function sendMessage() {
    const inputField  = document.getElementById('chat-input');
    const historyBox  = document.getElementById('chat-history');
    const loader      = document.getElementById('t6-loader');

    if (!inputField || !historyBox) return;

    const message = inputField.value.trim();
    if (!message) return;

    // Show user message
    historyBox.innerHTML += `
        <div style="margin-bottom:1rem; text-align:right;">
            <span style="background:var(--bg-secondary); padding:0.5rem 1rem; border-radius:12px 12px 0 12px; display:inline-block; max-width:80%;">
                <strong>👤 You:</strong> ${message}
            </span>
        </div>`;
    inputField.value = '';
    historyBox.scrollTop = historyBox.scrollHeight;
    if (loader) loader.style.display = 'block';

    try {
        const response = await fetch(`${CONFIG.API_BASE_URL}/api/chat`, {
            method:  'POST',
            headers: { 'Content-Type': 'application/json' },
            body:    JSON.stringify({ message, history: chatHistory })
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}`);

        const data = await response.json();

        historyBox.innerHTML += `
            <div style="margin-bottom:1rem;">
                <span style="background:var(--card-bg); padding:0.5rem 1rem; border-radius:12px 12px 12px 0; display:inline-block; max-width:80%; border:1px solid var(--card-border);">
                    <strong>🤖 BizForge AI:</strong> ${data.response}
                </span>
            </div>`;

        chatHistory.push({ role: 'user',      content: message });
        chatHistory.push({ role: 'assistant', content: data.response });

    } catch (error) {
        historyBox.innerHTML += `<div style="margin-bottom:1rem; color:#ff4757;"><strong>⚠️ Error:</strong> Could not reach AI. Is the backend running?</div>`;
        console.error(error);
    } finally {
        if (loader) loader.style.display = 'none';
        historyBox.scrollTop = historyBox.scrollHeight;
    }
}

// Enter key support for chatbot
const chatInputElem = document.getElementById('chat-input');
if (chatInputElem) {   // FIX: null check — was crashing on index.html
    chatInputElem.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendMessage();
        }
    });
}


// ============================================================
// TAB 21 — Voice Input Transcription (Web Speech API)
// ============================================================
const micBtn      = document.getElementById('mic-btn');
const statusText  = document.getElementById('recording-status');
const transcriptBox = document.getElementById('t21-output');

if (micBtn) {   // FIX: null check — was crashing on index.html
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous    = true;
        recognition.interimResults = true;
        let isRecording = false;

        recognition.onstart = () => {
            isRecording = true;
            micBtn.style.animation = 'pulse 1s infinite';
            if (statusText) statusText.innerText = '🔴 Recording... Click mic to stop.';
            if (transcriptBox) transcriptBox.innerText = '';
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            if (finalTranscript && transcriptBox) {
                transcriptBox.innerText += finalTranscript + ' ';
            }
        };

        recognition.onerror = (event) => {
            if (statusText) statusText.innerText = `Speech error: ${event.error}`;
            isRecording = false;
            micBtn.style.animation = 'none';
        };

        recognition.onend = () => {
            isRecording = false;
            micBtn.style.animation = 'none';
            if (statusText) statusText.innerText = 'Click mic to start recording';
            showToast('🎬 Voice capture complete!');
        };

        micBtn.addEventListener('click', () => {
            isRecording ? recognition.stop() : recognition.start();
        });

    } else {
        if (statusText) statusText.innerText = '⚠️ Web Speech API not supported in this browser. Try Chrome.';
        micBtn.style.opacity = '0.5';
        micBtn.style.cursor  = 'not-allowed';
    }
}
