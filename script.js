document.addEventListener('DOMContentLoaded', () => {

    // --- SMOOTH AUTO-SCROLL MECHANISM ---
    const triggerButtons = document.querySelectorAll('.trigger-form-scroll');
    const targetSection = document.getElementById('application-funnel');

    triggerButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- NATIVE APPLICATION MULTI-STEP FUNNEL LOGIC ---
    const steps = Array.from(document.querySelectorAll('.form-step-panel'));
    const indicators = Array.from(document.querySelectorAll('.step-indicator'));
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formElement = document.getElementById('native-application-form');

    if (formElement) {
        // Progression handler
        nextButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentPanel = document.querySelector('.form-step-panel.current');
                if (!currentPanel) return;
                
                const currentIdx = steps.indexOf(currentPanel);
                const inputsInPanel = currentPanel.querySelectorAll('input, select, textarea');
                let isPanelValid = true;
                
                inputsInPanel.forEach(input => {
                    if(!input.checkValidity()) {
                        input.reportValidity();
                        isPanelValid = false;
                    }
                });

                if (isPanelValid && currentIdx < steps.length - 1) {
                    currentPanel.classList.remove('current');
                    steps[currentIdx + 1].classList.add('current');
                    
                    if (indicators[currentIdx + 1]) {
                        indicators[currentIdx + 1].classList.add('active');
                    }
                }
            });
        });

        // Regression handler
        prevButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const currentPanel = document.querySelector('.form-step-panel.current');
                if (!currentPanel) return;
                
                const currentIdx = steps.indexOf(currentPanel);

                if (currentIdx > 0) {
                    currentPanel.classList.remove('current');
                    steps[currentIdx - 1].classList.add('current');
                    
                    if (indicators[currentIdx]) {
                        indicators[currentIdx].classList.remove('active');
                    }
                }
            });
        });

        // --- FORM CONVERSION SUBMISSION EVENT OUTLET ---
        formElement.addEventListener('submit', (e) => {
            e.preventDefault();

            // Extracts text strings safely (core_challenge/analysis completely removed)
            const name = document.getElementById('student_name').value.trim();
            const phone = document.getElementById('student_phone').value.trim();
            const email = document.getElementById('student_email').value.trim();
            const tier = document.getElementById('academic_tier').value;
            const year = document.getElementById('target_year').value;
            const resources = document.getElementById('current_resources').value.trim() || 'Not Specified';
            const statement = document.getElementById('motivation_statement').value.trim();

            // Refactored message payload for WhatsApp
            const messagePayload = 
`🚀 *New AIR Mentorship Application* 🚀

*1. Personal Profile:*
• Name: ${name}
• WhatsApp: ${phone}
• Email: ${email}

*2. Academic Metrics:*
• Stage: ${tier}
• Target Attempt Year: ${year}
• Current Material: ${resources}

*3. Motivation:*
• Statement: "${statement}"`;

            const encodedText = encodeURIComponent(messagePayload);
            const destinationWhatsAppLink = `https://wa.me/919975393386?text=${encodedText}`;

            // 1. Open WhatsApp to deliver student data to you
            window.open(destinationWhatsAppLink, '_blank');

            // 2. Enforce compulsory flow: Smoothly scroll down to payment cards
            const pricingSection = document.querySelector('.pricing-section');
            if (pricingSection) {
                pricingSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});