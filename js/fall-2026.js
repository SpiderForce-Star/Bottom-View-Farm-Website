/**
 * Homepage hero: wedding kiss + device crop (couple above the farm seal).
 */
(function () {
  'use strict';

  function injectStyles() {
    var href = './css/upcoming.css?v=20260902b';
    var existing = document.querySelector('link[href*="upcoming.css"]');
    if (existing) {
      existing.href = href;
      return;
    }
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    document.head.appendChild(link);
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

  injectStyles();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', swapHero);
  } else {
    swapHero();
  }
})();
