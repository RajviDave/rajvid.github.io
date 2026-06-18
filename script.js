// Rajvi Dave — Portfolio
// Minimal interaction layer: mobile nav toggle + scroll-spy active link.

(function () {
    'use strict';

    /* ---------- Mobile nav toggle ---------- */
    var menuToggle = document.getElementById('menuToggle');
    var mobileNav = document.getElementById('mobileNav');

    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function () {
            var isOpen = mobileNav.classList.toggle('is-open');
            menuToggle.classList.toggle('is-open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        mobileNav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                mobileNav.classList.remove('is-open');
                menuToggle.classList.remove('is-open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* ---------- Scroll-spy: highlight active section in rail nav ---------- */
    var sections = Array.prototype.slice.call(document.querySelectorAll('main .block'));
    var railLinks = Array.prototype.slice.call(document.querySelectorAll('.rail-nav a'));

    if (sections.length && railLinks.length && 'IntersectionObserver' in window) {
        var linkBySectionId = {};
        railLinks.forEach(function (link) {
            var id = link.getAttribute('href').replace('#', '');
            linkBySectionId[id] = link;
        });

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                var id = entry.target.id;
                var link = linkBySectionId[id];
                if (!link) return;

                if (entry.isIntersecting) {
                    railLinks.forEach(function (l) { l.classList.remove('active'); });
                    link.classList.add('active');
                }
            });
        }, {
            rootMargin: '-40% 0px -50% 0px',
            threshold: 0
        });

        sections.forEach(function (section) {
            if (section.id) observer.observe(section);
        });
    }
})();
