document.addEventListener('DOMContentLoaded', () => {

    // --- SMOOTH AUTO-SCROLL MECHANISM ---
    // Smoothly routes user directly to application block when clicking primary CTA buttons
    const triggerButtons = document.querySelectorAll('.trigger-form-scroll');
    const targetSection = document.getElementById('application-funnel');

    triggerButtons.forEach(button => {
        button.addEventListener('click', () => {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });


    // --- NATIVE APPLICATION MULTI-STEP FUNNEL LOGIC ---
    // Manages clean progression across the built-in form workflow panels
    const steps = Array.from(document.querySelectorAll('.form-step-panel'));
    const indicators = Array.from(document.querySelectorAll('.step-indicator'));
    const nextButtons = document.querySelectorAll('.next-btn');
    const prevButtons = document.querySelectorAll('.prev-btn');
    const formElement = document.getElementById('native-application-form');

    // Progression handler
    nextButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentPanel = document.querySelector('.form-step-panel.current');
            const currentIdx = steps.indexOf(currentPanel);

            // Basic Field Verification validation checklist rule before forward movement
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
                
                // Track active step indicators matching the array layout index rules
                indicators[currentIdx + 1].classList.add('active');
            }
        });
    });

    // Regression handler (Moving backward)
    prevButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentPanel = document.querySelector('.form-step-panel.current');
            const currentIdx = steps.indexOf(currentPanel);

            if (currentIdx > 0) {
                currentPanel.classList.remove('current');
                steps[currentIdx - 1].classList.add('current');
                
                indicators[currentIdx].classList.remove('active');
            }
        });
    });

    // --- FORM CONVERSION SUBMISSION EVENT OUTLET ---
    // Converts form answers into a cleanly organized text block and submits to your WhatsApp link automatically
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();

        // Extracts text strings safely from form components
        const name = document.getElementById('student_name').value.trim();
        const phone = document.getElementById('student_phone').value.trim();
        const email = document.getElementById('student_email').value.trim();
        const tier = document.getElementById('academic_tier').value;
        const year = document.getElementById('target_year').value;
        const resources = document.getElementById('current_resources').value.trim() || 'Not Specified';
        const challenge = document.getElementById('core_challenge').value;
        const statement = document.getElementById('motivation_statement').value.trim();

        // Formulates a highly polished text message template for WhatsApp
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

*3. Diagnostic Check:*
• Core Challenge: ${challenge}
• Statement: "${statement}"`;

        // URL encodes the text message block for clean distribution rules
        const encodedText = encodeURIComponent(messagePayload);
        const destinationWhatsAppLink = `https://wa.me/919975393386?text=${encodedText}`;

        // Triggers safe interface shift directly redirecting student workflow to your phone
        window.open(destinationWhatsAppLink, '_blank');
    });
});