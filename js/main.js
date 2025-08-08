document.addEventListener("DOMContentLoaded", function() {
    // --- 1. DYNAMICALLY LOAD HEADER AND FOOTER ---
    // This avoids you having to copy/paste the menu on every page.
    const loadHTML = (selector, url) => {
        fetch(url)
            .then(response => response.ok ? response.text() : Promise.reject('File not found'))
            .then(data => {
                const element = document.querySelector(selector);
                if (element) element.innerHTML = data;
            })
            .catch(error => console.error(`Error loading ${url}:`, error));
    };

    loadHTML("#header-placeholder", "partials/header.html");
    loadHTML("#footer-placeholder", "partials/footer.html");


    // --- 2. HEADER SCROLL EFFECT & MOBILE MENU LOGIC ---
    // We need to wait for the header to be loaded before adding listeners.
    // A small delay or a more complex MutationObserver is needed. A simple timeout works well here.
    setTimeout(() => {
        const header = document.getElementById("main-header");
        const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
        const mainNav = document.getElementById("main-nav");

        if (!header || !mobileMenuToggle || !mainNav) {
            console.error("Header or menu elements not found. Check your partials/header.html file.");
            return;
        }

        // Header scroll effect
        window.addEventListener("scroll", () => {
            if (window.scrollY > 50) {
                header.classList.add("scrolled");
            } else {
                header.classList.remove("scrolled");
            }
        });

        // Mobile menu toggle
        mobileMenuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("active");
            mobileMenuToggle.classList.toggle("active");
        });

    }, 200); // 200ms delay to ensure header.html is loaded
});