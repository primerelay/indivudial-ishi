/* =========================================
   Moxigul portfolio — JavaScript
   Asosiy interaktivlik uchun
   ========================================= */

(function () {
    'use strict';

    // --- 1. Yilni footerga qo'yish ---
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // --- 2. Mobil menyuni boshqarish ---
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            mainNav.classList.toggle('open');
            document.body.classList.toggle('menu-open');
        });

        // Linkni bosganda menyuni yopish
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                document.body.classList.remove('menu-open');
            });
        });
    }

    // --- 3. Faol bo'limni belgilash (scroll bo'yicha) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < bottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + id) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // --- 4. Kontakt formani boshqarish ---
    const form = document.getElementById('contactForm');
    const note = document.getElementById('formNote');

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const data = new FormData(form);
            const name = (data.get('name') || '').toString().trim();
            const email = (data.get('email') || '').toString().trim();
            const message = (data.get('message') || '').toString().trim();

            // Oddiy validatsiya
            if (!name || !email || !message) {
                showNote('Iltimos, barcha maydonlarni to\'ldiring.', 'error');
                return;
            }

            const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
            if (!emailValid) {
                showNote('Email manzili noto\'g\'ri formatda.', 'error');
                return;
            }

            // Demo holat — server bo'lmaganligi uchun shunchaki tasdiqlovchi xabar
            showNote('Rahmat, ' + name + '! Xabaringiz qabul qilindi.', 'success');
            form.reset();
        });
    }

    function showNote(text, type) {
        if (!note) return;
        note.textContent = text;
        note.className = 'form-note ' + type;
        note.hidden = false;
        clearTimeout(showNote._t);
        showNote._t = setTimeout(() => { note.hidden = true; }, 5000);
    }

    // --- 5. Skill bar animatsiyasi (kuzatuv orqali) ---
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                // Skill bardagi animatsiya
                if (entry.target.classList.contains('skill-card')) {
                    const bar = entry.target.querySelector('.bar span');
                    if (bar) {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        requestAnimationFrame(() => {
                            bar.style.width = width;
                        });
                    }
                }

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: .15 });

    document.querySelectorAll('.skill-card, .project-card, .about-card, .contact-info, .contact-form').forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // --- 6. Konsolda foydalanuvchini olqishlash :) ---
    console.log(
        '%c Salom! ',
        'background: linear-gradient(90deg,#6d4ed8,#ff8a73); color:#fff; font-size:14px; padding:6px 14px; border-radius:6px;'
    );
    console.log('Saytni ko\'rib chiqayotganingiz uchun rahmat. — Moxigul');

})();
