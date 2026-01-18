// ========== SMOOTH SCROLL BEHAVIOR ==========

// Add smooth scroll to all navigation links in TOC
document.querySelectorAll('.toc-nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Highlight the active link
            document.querySelectorAll('.toc-nav a').forEach(link => {
                link.style.color = 'var(--neon-cyan)';
            });
            this.style.color = 'var(--neon-pink)';
        }
    });
});

// ========== SCROLL PROGRESS TRACKER ==========

// Track scroll position and highlight current module
function updateActiveModule() {
    const modules = document.querySelectorAll('.module');
    const tocLinks = document.querySelectorAll('.toc-nav a');

    let currentModule = null;
    let maxVisibility = 0;

    modules.forEach(module => {
        const rect = module.getBoundingClientRect();
        const visibility = Math.max(0, Math.min(1, 1 - Math.abs(rect.top) / rect.height));

        if (visibility > maxVisibility) {
            maxVisibility = visibility;
            currentModule = module.id;
        }
    });

    // Update active link
    tocLinks.forEach(link => {
        const href = link.getAttribute('href').substring(1);
        if (href === currentModule) {
            link.style.color = 'var(--neon-pink)';
        } else {
            link.style.color = 'var(--neon-cyan)';
        }
    });
}

window.addEventListener('scroll', updateActiveModule);

// ========== INTERSECTION OBSERVER FOR ANIMATIONS ==========

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

// Observe all modules and summary cards
document.querySelectorAll('.module, .summary-card').forEach(el => {
    observer.observe(el);
});

// ========== BACK BUTTON ==========

document.addEventListener('DOMContentLoaded', function() {
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', function(e) {
            // Allow default navigation
        });
    }
});

// ========== KEYBOARD NAVIGATION ==========

document.addEventListener('keydown', function(event) {
    // Ctrl/Cmd + F : Focus on TOC (accessibility feature)
    if ((event.ctrlKey || event.metaKey) && event.key === 'f') {
        event.preventDefault();
        document.querySelector('.toc-nav').focus();
    }

    // Tab navigation support
    if (event.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-nav');
});

// ========== CODE BLOCK INTERACTION ==========

// Add copy-to-clipboard functionality for code blocks
document.querySelectorAll('.code-block').forEach(block => {
    const code = block.querySelector('code').textContent;
    
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.textContent = '📋 Copier';
    copyBtn.style.cssText = `
        position: absolute;
        top: 10px;
        right: 10px;
        padding: 0.5rem 1rem;
        background: rgba(0, 240, 255, 0.2);
        border: 1px solid var(--neon-cyan);
        color: var(--neon-cyan);
        border-radius: 5px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: all 0.3s ease;
    `;
    
    copyBtn.addEventListener('mouseover', function() {
        this.style.background = 'rgba(0, 240, 255, 0.4)';
        this.style.boxShadow = '0 0 15px var(--glow-cyan)';
    });
    
    copyBtn.addEventListener('mouseout', function() {
        this.style.background = 'rgba(0, 240, 255, 0.2)';
        this.style.boxShadow = 'none';
    });
    
    copyBtn.addEventListener('click', function() {
        navigator.clipboard.writeText(code).then(() => {
            copyBtn.textContent = '✅ Copié !';
            setTimeout(() => {
                copyBtn.textContent = '📋 Copier';
            }, 2000);
        });
    });
    
    block.style.position = 'relative';
    block.style.paddingTop = '50px';
    block.appendChild(copyBtn);
});

// ========== PROGRESS TRACKER ==========

// Create a simple reading progress indicator
const progressDiv = document.createElement('div');
progressDiv.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--neon-cyan), var(--neon-pink));
    z-index: 100;
`;
document.body.appendChild(progressDiv);

window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressDiv.style.width = scrolled + '%';
});

// ========== LAZY LOAD VIDEOS ==========

const videos = document.querySelectorAll('video');
videos.forEach(video => {
    video.setAttribute('loading', 'lazy');
});

// ========== PRINT SUPPORT ==========

// Optimize styling for printing
const style = document.createElement('style');
style.textContent = `
    @media print {
        .back-button,
        .cta-section {
            display: none;
        }
        
        .module {
            page-break-inside: avoid;
        }
        
        .video-wrapper {
            display: none;
        }
    }
`;
document.head.appendChild(style);

// ========== PDF DOWNLOAD FUNCTIONALITY ==========

document.getElementById('downloadPdfBtn').addEventListener('click', function(e) {
    e.preventDefault();
    
    // Show loading state
    const originalText = this.textContent;
    this.textContent = '⏳ Téléchargement...';
    this.disabled = true;
    this.style.opacity = '0.6';

    // Create a download link for the PDF file
    const link = document.createElement('a');
    link.href = 'cour.pdf';
    link.download = 'Cours_Complet_Bases_de_Donnees_MERISE_SQL.pdf';
    link.style.display = 'none';
    
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Remove the link element
    document.body.removeChild(link);
    
    // Update button state
    setTimeout(() => {
        this.textContent = '✅ PDF téléchargé !';
        setTimeout(() => {
            this.textContent = originalText;
            this.disabled = false;
            this.style.opacity = '1';
        }, 2000);
    }, 500);
});

// ========== CONSOLE MESSAGE ==========

console.log('%cCOURS MERISE & SQL', 'color: #00f0ff; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00f0ff;');
console.log('%c7 modules complets pour maîtriser les bases de données', 'color: #ff006e; font-size: 12px;');
