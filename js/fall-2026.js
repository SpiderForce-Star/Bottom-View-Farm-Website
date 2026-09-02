/**
 * Fall 2026 live polish — wedding hero crop + Inside Scoop Coming Soon.
 */
(function () {
  'use strict';

  function injectStyles() {
    var href = './css/upcoming.css?v=20260902d';
    var existing = document.querySelector('link[href*="upcoming.css"]');
    if (existing) {
      existing.href = href;
    } else {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }
  }

  function isHome() {
    var raw = (location.pathname || '').replace(/\/+$/, '');
    var last = raw.split('/').pop() || '';
    return last === '' || last === 'index.html' || last === 'Bottom-View-Farm-Website';
  }

  function swapHero() {
    if (!isHome()) return;
    var img = document.querySelector('.hero-section > img') ||
              document.querySelector('.hero-section img.absolute');
    if (!img) return;
    img.src = './images/WeddingPics.jpg';
    img.alt = 'Bride and groom sharing a kiss at Bottom View Farm';
    img.classList.add('hero-photo');
  }

  function markInsideScoopComingSoon() {
    var section = document.getElementById('inside-scoop');
    if (!section) return;

    var eyebrow = section.querySelector('.section-eyebrow');
    if (eyebrow) eyebrow.textContent = 'Coming Soon';

    var copy = section.querySelector('p.mt-6');
    if (copy) {
      copy.innerHTML =
        '<strong class="text-forest">The Inside Scoop Deli & General Store</strong>
' +
        'is coming soon to Bottom View Farm. Farm-fresh bites, cold drinks, and general-store
' +
        'favorites will be here for hayrides, the pumpkin patch, and wedding tours.
' +
        'Follow us on Facebook for the opening date.';
    }

    var items = section.querySelectorAll('ul li');
    if (items.length >= 4) {
      items[3].innerHTML = '<span class="font-bold text-terracotta">·</span> Opening date announced on Facebook';
    }

    var actions = section.querySelector('.mt-8.flex');
    if (actions) {
      actions.innerHTML =
        '<a href="https://www.facebook.com/BottomViewFarm/" target="_blank" rel="noopener noreferrer" class="btn-primary">Follow for Opening Date</a>' +
        '<a href="tel:+16153257017" class="btn-secondary">(615) 325-7017</a>';
    }

    var media = section.querySelector('.order-1.lg\\:order-2, .order-1');
    if (media && !media.querySelector('.coming-soon-badge')) {
      media.classList.add('coming-soon-media');
      media.style.position = 'relative';
      var badge = document.createElement('span');
      badge.className = 'coming-soon-badge';
      badge.textContent = 'Coming Soon';
      media.appendChild(badge);
    }

    var navLinks = document.querySelectorAll('a[href*="inside-scoop"]');
    navLinks.forEach(function (a) {
      if (a.classList.contains('nav-link') || a.classList.contains('mobile-nav-link')) {
        if (a.textContent.indexOf('Coming Soon') === -1) {
          a.textContent = 'Inside Scoop';
          a.setAttribute('title', 'The Inside Scoop — Coming Soon');
        }
      }
    });
  }

  injectStyles();
  function run() {
    swapHero();
    markInsideScoopComingSoon();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
