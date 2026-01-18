// ========== VIDEO MODAL CONTROLS ==========

// Close modal when clicking outside of it
window.onclick = function(event) {
    const videoModal = document.getElementById('videoModal');
    if (event.target === videoModal) {
        videoModal.style.display = 'none';
    }
};

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    const videoModal = document.getElementById('videoModal');
    if (event.key === 'Escape' && videoModal.style.display === 'flex') {
        videoModal.style.display = 'none';
    }
});

// Pause video when modal is closed
function closeVideoModal() {
    const videoModal = document.getElementById('videoModal');
    const video = videoModal.querySelector('video');
    if (video) {
        video.pause();
    }
    videoModal.style.display = 'none';
}

// ========== SMOOTH SCROLL BEHAVIOR ==========

// Add smooth scroll to all navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========

// Add animation to elements when they enter the viewport
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'float-in 0.8s ease-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and feature cards
document.querySelectorAll('.card, .feature-card').forEach(el => {
    observer.observe(el);
});

// ========== RESPONSIVE VIDEO MODAL ==========

// Adjust video modal on window resize
function adjustVideoModalSize() {
    const modal = document.getElementById('videoModal');
    const content = modal.querySelector('.video-modal-content');
    
    if (window.innerWidth < 768) {
        content.style.maxWidth = '100%';
    } else {
        content.style.maxWidth = '90%';
    }
}

window.addEventListener('resize', adjustVideoModalSize);
window.addEventListener('load', adjustVideoModalSize);

// ========== PERFORMANCE OPTIMIZATION ==========

// Lazy load videos
const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.setAttribute('loading', 'lazy');
});

// ========== ACCESSIBILITY ==========

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Tab') {
        // Tab navigation is already supported by default
        // This ensures focus is visible on interactive elements
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ========== CONSOLE MESSAGE ==========

console.log('%cDATA QUEST', 'color: #00f0ff; font-size: 24px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;');
console.log('%cBienvenue sur la plateforme d\'apprentissage MERISE & SQL', 'color: #ff006e; font-size: 14px;');
