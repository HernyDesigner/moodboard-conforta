document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.moodboard');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const titleElement = document.getElementById('moodboard-title');

    let currentIndex = 0;

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
    }

    function nextSlide() {
        currentIndex++;
        if (currentIndex >= slides.length) {
            currentIndex = 0;
        }
        updateView();
    }

    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = slides.length - 1;
        }
        updateView();
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
    updateView();
    // Add transition for title fade
    titleElement.style.transition = 'opacity 0.2s ease';
});
