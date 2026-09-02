/**
 * Fall 2026 live polish — wedding hero crop + Inside Scoop Coming Soon.
 */
(function () {
  'use strict';

  function injectStyles() {
    var href = './css/upcoming.css?v=20260902e';
    var existing = document.querySelector('link[href*="upcoming.css"]');
    if (existing) {
      existing.href = href;
    } else {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
    }

    if (!document.getElementById('coming-soon-inline')) {
      var style = document.createElement('style');
      style.id = 'coming-soon-inline';
      style.textContent =
        '.coming-soon-media{position:relative;display:block}' +
        '.coming-soon-badge{position:absolute;top:.9rem;left:.9rem;z-index:2;' +
        'padding:.4rem .85rem;border-radius:9999px;background:#d4a017;color:#062820;' +
        'font-size:.68rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase;' +
        'box-shadow:0 8px 20px rgba(0,0,0,.18);pointer-events:none}';
      document.head.appendChild(style);
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
        'The <strong class="text-forest">Inside Scoop Deli &amp; General Store</strong> ' +
        'is on its way. Farm-fresh bites, cold drinks, and general-store favorites will be here ' +
        'for festival days, wedding tours, and everyday visits. Follow us on Facebook for opening day.';
    }

    var items = section.querySelectorAll('ul li');
    if (items.length >= 4) {
      items[3].innerHTML = '<span class="font-bold text-terracotta">·</span> Opening date announced on Facebook';
    }

    var actions = section.querySelector('.mt-8.flex');
    if (actions) {
      actions.innerHTML =
        '<a href="https://www.facebook.com/BottomViewFarm/" target="_blank" rel="noopener noreferrer" class="btn-primary">Follow for Opening Day</a>' +
        '<a href="tel:+16153257017" class="btn-secondary">(615) 325-7017</a>';
    }

    var media = section.querySelector('.order-1');
    if (media) {
      media.classList.add('coming-soon-media');
      if (!media.querySelector('.coming-soon-badge')) {
        var badge = document.createElement('span');
        badge.className = 'coming-soon-badge';
        badge.textContent = 'Coming Soon';
        media.appendChild(badge);
      }
    }

    var img = section.querySelector('img');
    if (img) {
      img.alt = 'The Inside Scoop Deli and General Store at Bottom View Farm — coming soon';
    }

    document.querySelectorAll('a[href*="inside-scoop"]').forEach(function (a) {
      if (a.classList.contains('nav-link') || a.classList.contains('mobile-nav-link')) {
        a.setAttribute('title', 'The Inside Scoop — Coming Soon');
      }
    });
  }

  function polishEventsList() {
    var list = document.querySelector('#october ul');
    if (!list) return;
    var items = list.querySelectorAll('li');
    for (var i = 0; i < items.length; i++) {
      var t = items[i].textContent || '';
      if (t.indexOf('Inside Scoop') !== -1) {
        items[i].innerHTML = '<span class="text-terracotta font-bold">·</span> Inside Scoop Deli — coming soon';
      }
    }
  }

  injectStyles();
  function run() {
    swapHero();
    markInsideScoopComingSoon();
    polishEventsList();
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
