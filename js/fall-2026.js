/**
 * Homepage hero: use the high-res farm wedding kiss instead of the buildings collage.
 */
(function () {
  'use strict';

  function injectStyles() {
    if (document.querySelector('link[href*="upcoming.css"]')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = './css/upcoming.css?v=20260901b';
    document.head.appendChild(link);
  }

  function swapHero() {
    var path = (location.pathname || '').split('/').pop() || 'index.html';
    if (path !== '' && path !== 'index.html') return;
    var img = document.querySelector('.hero-section img');
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
