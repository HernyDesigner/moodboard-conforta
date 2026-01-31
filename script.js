document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.moodboard');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const titleElement = document.getElementById('moodboard-title');
    const navContainer = document.getElementById('scrollspy-nav');

    let currentIndex = 0;

    // Helper: Create URL-friendly slug
    function createSlug(text) {
        return text.toLowerCase()
            .replace(/\s+\+\s+/g, '-') // Replace " + " with "-"
            .replace(/\s+/g, '-')      // Replace other spaces
            .replace(/[^a-z0-9-]/g, ''); // Remove special chars
    }

    // Helper: Generates a short display label for the nav
    function createNavLabel(styleText) {
        // Example: "minimalista + ambiental" -> "Ambiental"
        // We assume the first part "minimalista" is common, so we take the second part if available
        const parts = styleText.split('+');
        if (parts.length > 1) {
            return parts[1].trim().charAt(0).toUpperCase() + parts[1].trim().slice(1);
        }
        return styleText.charAt(0).toUpperCase() + styleText.slice(1);
    }

    // Initialize Scrollspy Nav
    function initNav() {
        if (!navContainer) return;

        slides.forEach((slide, index) => {
            const style = slide.getAttribute('data-style');
            const slug = createSlug(style);
            const label = createNavLabel(style);

            // Create Link
            const link = document.createElement('a');
            link.href = `#${slug}`;
            link.className = 'scrollspy-link';
            link.textContent = label;
            link.setAttribute('data-index', index);

            // Handle Click
            link.addEventListener('click', (e) => {
                e.preventDefault();
                goToSlide(index);
            });

            navContainer.appendChild(link);
        });
    }

    function updateView() {
        // Reset all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Activate current slide
        const activeSlide = slides[currentIndex];
        activeSlide.classList.add('active');

        // Update Title
        const styleName = activeSlide.getAttribute('data-style');
        const clientName = activeSlide.getAttribute('data-client');

        // Smooth fade for text update
        titleElement.style.opacity = 0;
        setTimeout(() => {
            titleElement.innerHTML = `<b>Moodboard:</b> ${styleName} para ${clientName}`;
            titleElement.style.opacity = 1;
        }, 200);

        // Update URL Hash without jumping
        const slug = createSlug(styleName);
        history.replaceState(null, null, `#${slug}`);

        // Update Nav Active State
        updateNavState(slug);
    }

    function updateNavState(currentSlug) {
        const links = document.querySelectorAll('.scrollspy-link');
        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSlug}`) {
                link.classList.add('active');
            }
        });
    }

    function goToSlide(index) {
        if (index < 0) index = slides.length - 1;
        if (index >= slides.length) index = 0;
        currentIndex = index;
        updateView();
    }

    function nextSlide() {
        goToSlide(currentIndex + 1);
    }

    function prevSlide() {
        goToSlide(currentIndex - 1);
    }

    // Check URL Hash on Load
    function checkHash() {
        const hash = window.location.hash.replace('#', '');
        if (hash) {
            let foundIndex = -1;
            slides.forEach((slide, index) => {
                const slug = createSlug(slide.getAttribute('data-style'));
                if (slug === hash) {
                    foundIndex = index;
                }
            });

            if (foundIndex !== -1) {
                currentIndex = foundIndex;
            }
        }
    }

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
    });

    // Initialize
    initNav();
    checkHash(); // Check hash before first updateView
    updateView();
    
    // Add transition for title fade
    titleElement.style.transition = 'opacity 0.2s ease';
});
