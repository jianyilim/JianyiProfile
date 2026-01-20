document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Trigger when 15% visible
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- Typing Effect for Hero ---
    const textElement = document.getElementById('typing-text');
    if (textElement) {
        const textToType = textElement.getAttribute('data-text');
        textElement.textContent = '';
        let i = 0;

        function typeWriter() {
            if (i < textToType.length) {
                textElement.textContent += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 50); // Typing speed
            } else {
                // Remove cursor blink after typing
                textElement.classList.remove('border-r-2');
            }
        }

        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // --- Tilt Effect for Cards (Optional, simple version) ---
    const cards = document.querySelectorAll('.tilt-card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -5; // Max 5deg rotation
            const rotateY = ((x - centerX) / centerX) * 5;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // --- Calculate Years of Experience ---
    const expElement = document.getElementById('years-experience');
    if (expElement) {
        const startDate = new Date('2013-04-01');
        const now = new Date();
        const diffInMs = now - startDate;
        const years = diffInMs / (1000 * 60 * 60 * 24 * 365.25);
        expElement.textContent = years.toFixed(1);
    }
});
