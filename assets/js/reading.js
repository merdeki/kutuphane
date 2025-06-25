// Reading Features JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Generate Table of Contents
    function generateTOC() {
        const headings = document.querySelectorAll('.text-body h1, .text-body h2, .text-body h3, .text-body h4, .text-body h5, .text-body h6');
        const tocList = document.getElementById('tocList');
        const tocToggle = document.getElementById('tocToggle');
        
        if (!headings.length || !tocList || !tocToggle) {
            if (tocToggle) tocToggle.style.display = 'none';
            return;
        }
        
        headings.forEach(function(heading, index) {
            // Add ID to heading for linking
            const id = 'heading-' + index;
            heading.id = id;
            
            // Create TOC entry
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = '#' + id;
            a.textContent = heading.textContent;
            a.className = 'toc-' + heading.tagName.toLowerCase();
            
            // Smooth scroll to heading
            a.addEventListener('click', function(e) {
                e.preventDefault();
                heading.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Hide TOC on mobile after clicking
                if (window.innerWidth <= 600) {
                    const tableOfContents = document.getElementById('tableOfContents');
                    if (tableOfContents) {
                        tableOfContents.style.display = 'none';
                        tocToggle.textContent = '📖 Table of Contents';
                    }
                }
            });
            
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }
    
    // TOC Toggle
    const tocToggle = document.getElementById('tocToggle');
    const tableOfContents = document.getElementById('tableOfContents');
    
    if (tocToggle && tableOfContents) {
        tocToggle.addEventListener('click', function() {
            if (tableOfContents.style.display === 'none' || !tableOfContents.style.display) {
                tableOfContents.style.display = 'block';
                tocToggle.textContent = '📖 Hide TOC';
            } else {
                tableOfContents.style.display = 'none';
                tocToggle.textContent = '📖 Table of Contents';
            }
        });
    }
    
    // Font Size Toggle
    const fontToggle = document.getElementById('fontToggle');
    const textBody = document.getElementById('textBody');
    
    if (fontToggle && textBody) {
        const fontSizes = ['font-small', 'font-normal', 'font-large', 'font-xl'];
        let currentFontIndex = 1; // Start with normal
        
        fontToggle.addEventListener('click', function() {
            textBody.classList.remove(...fontSizes);
            currentFontIndex = (currentFontIndex + 1) % fontSizes.length;
            textBody.classList.add(fontSizes[currentFontIndex]);
            
            const labels = ['Small', 'Normal', 'Large', 'X-Large'];
            fontToggle.textContent = '🔤 ' + labels[currentFontIndex];
        });
    }
    
    // Dark Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            
            if (document.body.classList.contains('dark-theme')) {
                themeToggle.textContent = '☀️ Light Mode';
                try {
                    localStorage.setItem('darkTheme', 'true');
                } catch (e) {
                    // Fallback if localStorage is not available
                    document.body.setAttribute('data-theme', 'dark');
                }
            } else {
                themeToggle.textContent = '🌙 Dark Mode';
                try {
                    localStorage.setItem('darkTheme', 'false');
                } catch (e) {
                    // Fallback if localStorage is not available
                    document.body.removeAttribute('data-theme');
                }
            }
        });
        
        // Load saved theme
        try {
            if (localStorage.getItem('darkTheme') === 'true') {
                document.body.classList.add('dark-theme');
                themeToggle.textContent = '☀️ Light Mode';
            }
        } catch (e) {
            // Fallback: check for data attribute
            if (document.body.getAttribute('data-theme') === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.textContent = '☀️ Light Mode';
            }
        }
    }
    
    // Reading Progress
    const progressFill = document.getElementById('progressFill');
    
    function updateProgress() {
        if (!progressFill) return;
        
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        progressFill.style.width = Math.min(Math.max(scrollPercent, 0), 100) + '%';
    }
    
    // Floating Buttons Visibility
    const floatingToc = document.getElementById('floatingToc');
    const backToTop = document.getElementById('backToTop');
    
    function updateFloatingButtons() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 300) {
            if (floatingToc) floatingToc.classList.add('visible');
            if (backToTop) backToTop.classList.add('visible');
        } else {
            if (floatingToc) floatingToc.classList.remove('visible');
            if (backToTop) backToTop.classList.remove('visible');
        }
    }
    
    // Floating Button Actions
    if (floatingToc && tableOfContents && tocToggle) {
        floatingToc.addEventListener('click', function() {
            if (tableOfContents.style.display === 'none' || !tableOfContents.style.display) {
                tableOfContents.style.display = 'block';
                tableOfContents.scrollIntoView({ behavior: 'smooth' });
                tocToggle.textContent = '📖 Hide TOC';
            } else {
                tableOfContents.style.display = 'none';
                tocToggle.textContent = '📖 Table of Contents';
            }
        });
    }
    
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    
    // Scroll Event Listeners
    function handleScroll() {
        updateProgress();
        updateFloatingButtons();
    }
    
    // Throttle scroll events for better performance
    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(function() {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    });
    
    // Initialize
    generateTOC();
    updateProgress();
    updateFloatingButtons();
});
