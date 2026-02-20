// frontend/i18n.js

const translations = {
    en: {
        hero_title: "Direct Your Brand's Story.",
        hero_subtext: "A complete, cinematic GenAI branding suite. Go from raw concept to a blockbuster brand identity in minutes.",
        get_started: "Get Started →"
    },
    es: {
        hero_title: "Dirige la Historia de tu Marca.",
        hero_subtext: "Una suite completa de branding con GenAI. Pasa de un concepto en bruto a una identidad de marca exitosa en minutos.",
        get_started: "Empezar →"
    },
    fr: {
        hero_title: "Réalisez l'Histoire de Votre Marque.",
        hero_subtext: "Une suite de branding GenAI complète. Passez d'un concept brut à une identité de marque à succès en quelques minutes.",
        get_started: "Commencer →"
    },
    de: {
        hero_title: "Führen Sie Regie bei Ihrer Marke.",
        hero_subtext: "Eine komplette GenAI-Branding-Suite. Vom rohen Konzept zur Blockbuster-Markenidentität in wenigen Minuten.",
        get_started: "Loslegen →"
    },
    hi: {
        hero_title: "अपने ब्रांड की कहानी निर्देशित करें।",
        hero_subtext: "एक संपूर्ण GenAI ब्रांडिंग सुइट। मिनटों में कच्चे कॉन्सेप्ट से एक ब्लॉकबस्टर ब्रांड पहचान तक पहुंचें।",
        get_started: "शुरू करें →"
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const langSelector = document.getElementById('lang-selector');
    
    // Check if selector exists (it's on index.html, not branding.html)
    if (langSelector) {
        langSelector.addEventListener('change', (e) => {
            const lang = e.target.value;
            updateLanguage(lang);
        });
    }

    function updateLanguage(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang] && translations[lang][key]) {
                element.textContent = translations[lang][key];
            }
        });
    }
});