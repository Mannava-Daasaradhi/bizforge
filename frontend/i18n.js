// frontend/i18n.js

const translations = {
    en: {
        // Navbar
        nav_logo: "BizForge",

        // Hero
        hero_title: "Direct Your Brand's Story.",
        hero_subtext: "A complete, cinematic GenAI branding suite. Go from raw concept to a blockbuster brand identity in minutes.",
        get_started: "Get Started →",

        // Stats Bar
        stat_brands: "📽️ 10,000+ Brands Created",
        stat_tools: "🎞️ 24 AI Tools",
        stat_speed: "⚡ Sub-50ms Response",
        stat_langs: "🌍 5 Languages Supported",

        // How It Works
        how_title: "The Director's Cut: How It Works",
        stage_pre_title: "🎬 Pre-Production",
        stage_pre_desc: "Provide your basic inputs, keywords, and tone. Set the stage for your brand.",
        stage_prod_title: "🎥 Production",
        stage_prod_desc: "Our AI models (Granite, LLaMA, SDXL) roll the cameras and generate your assets.",
        stage_post_title: "🎞️ Post-Production",
        stage_post_desc: "Refine, review, and export your polished, high-fidelity brand materials.",

        // Tools Grid
        tools_title: "The BizForge Studio Tools",

        // Why BizForge
        why_title: "Why Choose BizForge?",
        benefit_cost: "💰 Cost Savings — Replace expensive agencies.",
        benefit_speed: "⚡ Speed — Concept to completion in minutes.",
        benefit_ai: "🧠 AI-Powered — State-of-the-art LLMs & Image models.",
        benefit_noskills: "🚫 No Skills Needed — Guided, zero-code interface.",

        // Footer
        footer_copy: "© 2025 BizForge. All rights reserved.",
        footer_credits: "Powered by IBM Granite | Groq AI | SDXL"
    },
    es: {
        nav_logo: "BizForge",
        hero_title: "Dirige la Historia de tu Marca.",
        hero_subtext: "Una suite completa de branding con GenAI. Pasa de un concepto en bruto a una identidad de marca exitosa en minutos.",
        get_started: "Empezar →",
        stat_brands: "📽️ +10,000 Marcas Creadas",
        stat_tools: "🎞️ 24 Herramientas de IA",
        stat_speed: "⚡ Respuesta Sub-50ms",
        stat_langs: "🌍 5 Idiomas Soportados",
        how_title: "El Director's Cut: Cómo Funciona",
        stage_pre_title: "🎬 Pre-Producción",
        stage_pre_desc: "Proporciona tus palabras clave y tono. Prepara el escenario para tu marca.",
        stage_prod_title: "🎥 Producción",
        stage_prod_desc: "Nuestros modelos de IA generan todos tus activos de marca.",
        stage_post_title: "🎞️ Post-Producción",
        stage_post_desc: "Refina, revisa y exporta tus materiales de marca pulidos.",
        tools_title: "Las Herramientas del Estudio BizForge",
        why_title: "¿Por qué BizForge?",
        benefit_cost: "💰 Ahorro — Reemplaza agencias costosas.",
        benefit_speed: "⚡ Velocidad — De concepto a realidad en minutos.",
        benefit_ai: "🧠 IA Avanzada — Los mejores modelos LLM e imagen.",
        benefit_noskills: "🚫 Sin Habilidades — Interfaz guiada sin código.",
        footer_copy: "© 2025 BizForge. Todos los derechos reservados.",
        footer_credits: "Desarrollado con IBM Granite | Groq AI | SDXL"
    },
    fr: {
        nav_logo: "BizForge",
        hero_title: "Réalisez l'Histoire de Votre Marque.",
        hero_subtext: "Une suite de branding GenAI complète. Passez d'un concept brut à une identité de marque à succès en quelques minutes.",
        get_started: "Commencer →",
        stat_brands: "📽️ +10 000 Marques Créées",
        stat_tools: "🎞️ 24 Outils IA",
        stat_speed: "⚡ Réponse Sub-50ms",
        stat_langs: "🌍 5 Langues Supportées",
        how_title: "Le Director's Cut : Comment Ça Marche",
        stage_pre_title: "🎬 Pré-Production",
        stage_pre_desc: "Fournissez vos mots-clés et votre ton. Préparez la scène pour votre marque.",
        stage_prod_title: "🎥 Production",
        stage_prod_desc: "Nos modèles d'IA génèrent tous vos actifs de marque.",
        stage_post_title: "🎞️ Post-Production",
        stage_post_desc: "Affinez, révisez et exportez vos matériaux de marque soignés.",
        tools_title: "Les Outils du Studio BizForge",
        why_title: "Pourquoi BizForge ?",
        benefit_cost: "💰 Économies — Remplacez les agences coûteuses.",
        benefit_speed: "⚡ Rapidité — Du concept au résultat en minutes.",
        benefit_ai: "🧠 IA de Pointe — LLMs et modèles d'image de haute qualité.",
        benefit_noskills: "🚫 Sans Compétences — Interface guidée sans code.",
        footer_copy: "© 2025 BizForge. Tous droits réservés.",
        footer_credits: "Propulsé par IBM Granite | Groq AI | SDXL"
    },
    de: {
        nav_logo: "BizForge",
        hero_title: "Führen Sie Regie bei Ihrer Marke.",
        hero_subtext: "Eine komplette GenAI-Branding-Suite. Vom rohen Konzept zur Blockbuster-Markenidentität in wenigen Minuten.",
        get_started: "Loslegen →",
        stat_brands: "📽️ 10.000+ Marken Erstellt",
        stat_tools: "🎞️ 24 KI-Tools",
        stat_speed: "⚡ Sub-50ms Reaktionszeit",
        stat_langs: "🌍 5 Sprachen Unterstützt",
        how_title: "Der Director's Cut: So Funktioniert Es",
        stage_pre_title: "🎬 Vorproduktion",
        stage_pre_desc: "Geben Sie Ihre Schlüsselwörter und Ihren Ton an. Bereiten Sie die Bühne für Ihre Marke vor.",
        stage_prod_title: "🎥 Produktion",
        stage_prod_desc: "Unsere KI-Modelle generieren all Ihre Marken-Assets.",
        stage_post_title: "🎞️ Nachproduktion",
        stage_post_desc: "Verfeinern, überprüfen und exportieren Sie Ihre polierten Markenmaterialien.",
        tools_title: "Die BizForge Studio-Tools",
        why_title: "Warum BizForge?",
        benefit_cost: "💰 Kosteneinsparungen — Ersetzen Sie teure Agenturen.",
        benefit_speed: "⚡ Geschwindigkeit — Vom Konzept zur Fertigstellung in Minuten.",
        benefit_ai: "🧠 KI-gestützt — Modernste LLMs und Bildmodelle.",
        benefit_noskills: "🚫 Keine Kenntnisse nötig — Geführte, codefreie Oberfläche.",
        footer_copy: "© 2025 BizForge. Alle Rechte vorbehalten.",
        footer_credits: "Powered by IBM Granite | Groq AI | SDXL"
    },
    hi: {
        nav_logo: "BizForge",
        hero_title: "अपने ब्रांड की कहानी निर्देशित करें।",
        hero_subtext: "एक संपूर्ण GenAI ब्रांडिंग सुइट। मिनटों में कच्चे कॉन्सेप्ट से एक ब्लॉकबस्टर ब्रांड पहचान तक पहुंचें।",
        get_started: "शुरू करें →",
        stat_brands: "📽️ 10,000+ ब्रांड बनाए गए",
        stat_tools: "🎞️ 24 AI टूल्स",
        stat_speed: "⚡ 50ms से कम प्रतिक्रिया",
        stat_langs: "🌍 5 भाषाएं समर्थित",
        how_title: "डायरेक्टर्स कट: यह कैसे काम करता है",
        stage_pre_title: "🎬 प्री-प्रोडक्शन",
        stage_pre_desc: "अपने कीवर्ड और टोन प्रदान करें। अपने ब्रांड के लिए मंच तैयार करें।",
        stage_prod_title: "🎥 प्रोडक्शन",
        stage_prod_desc: "हमारे AI मॉडल आपके ब्रांड एसेट जनरेट करते हैं।",
        stage_post_title: "🎞️ पोस्ट-प्रोडक्शन",
        stage_post_desc: "अपनी पॉलिश्ड ब्रांड सामग्री को परिष्कृत, समीक्षा और निर्यात करें।",
        tools_title: "BizForge स्टूडियो टूल्स",
        why_title: "BizForge क्यों चुनें?",
        benefit_cost: "💰 लागत बचत — महंगी एजेंसियों की जगह लें।",
        benefit_speed: "⚡ गति — मिनटों में कॉन्सेप्ट से पूर्णता तक।",
        benefit_ai: "🧠 AI-संचालित — अत्याधुनिक LLM और इमेज मॉडल।",
        benefit_noskills: "🚫 कोई कौशल नहीं चाहिए — गाइडेड, ज़ीरो-कोड इंटरफ़ेस।",
        footer_copy: "© 2025 BizForge. सर्वाधिकार सुरक्षित।",
        footer_credits: "IBM Granite | Groq AI | SDXL द्वारा संचालित"
    }
};

// ── Apply translations to all [data-i18n] elements ──────────────────────────
function applyTranslation(lang) {
    const t = translations[lang] || translations["en"];
    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (t[key]) el.textContent = t[key];
    });
}

document.addEventListener("DOMContentLoaded", () => {
    const langSelector = document.getElementById("lang-selector");
    if (!langSelector) return;  // Guard: not on every page

    // Apply saved language preference or default
    const savedLang = localStorage.getItem("bizforge_lang") || CONFIG.DEFAULT_LANGUAGE;
    langSelector.value = savedLang;
    applyTranslation(savedLang);

    langSelector.addEventListener("change", (e) => {
        const lang = e.target.value;
        localStorage.setItem("bizforge_lang", lang);
        applyTranslation(lang);
    });
});
