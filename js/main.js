/**
 * Bottom View Farms — site interactions
 * Navigation, gallery filters, SimpleLightbox
 */

(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  var header = document.getElementById('site-header');
  var marquee = document.querySelector('.festival-marquee');
  var ribbon = document.querySelector('.announcement-ribbon');
  var isInnerPage = document.body.classList.contains('page-inner');
  var scrollThreshold = 40;

  function syncMarqueeOffset() {
    if (!marquee) return;
    var h = marquee.offsetHeight || 40;
    document.documentElement.style.setProperty('--marquee-h', h + 'px');
  }

  function syncRibbonOffset() {
    if (!ribbon || !document.body.classList.contains('has-ribbon')) return;
    var h = ribbon.offsetHeight;
    document.documentElement.style.setProperty('--ribbon-h', h + 'px');
  }

  function updateHeader() {
    if (!header) return;
    if (isInnerPage || window.scrollY > scrollThreshold) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  window.addEventListener('resize', function () {
    syncMarqueeOffset();
    syncRibbonOffset();
  }, { passive: true });
  syncMarqueeOffset();
  syncRibbonOffset();
  updateHeader();

  var menuToggle = document.getElementById('menu-toggle');
  var mobileMenu = document.getElementById('mobile-menu');
  var iconOpen = document.getElementById('icon-open');
  var iconClose = document.getElementById('icon-close');

  function setMenuOpen(open) {
    if (!mobileMenu || !menuToggle) return;
    mobileMenu.classList.toggle('hidden', !open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (iconOpen) iconOpen.classList.toggle('hidden', open);
    if (iconClose) iconClose.classList.toggle('hidden', !open);
  }

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      var isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      setMenuOpen(!isOpen);
    });
  }

  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      setMenuOpen(false);
    });
  });

  var filterButtons = document.querySelectorAll('.filter-btn');
  var galleryCards = document.querySelectorAll('#gallery-grid .gallery-card');

  filterButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.getAttribute('data-filter') || 'all';

      filterButtons.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      galleryCards.forEach(function (card) {
        var category = card.getAttribute('data-category');
        var show = filter === 'all' || category === filter;
        card.classList.toggle('is-hidden', !show);
      });

      if (window.mainLightbox) {
        window.mainLightbox.refresh();
      }
    });
  });

  if (typeof SimpleLightbox !== 'undefined') {
    if (document.querySelector('#gallery-grid a.gallery-item')) {
      window.mainLightbox = new SimpleLightbox('#gallery-grid a.gallery-item', {
        captionsData: 'alt',
        captionDelay: 200,
        animationSpeed: 250,
        fadeSpeed: 250,
        scrollZoom: false,
        overlayOpacity: 0.92,
      });
    }

    if (document.querySelector('a.about-gallery')) {
      window.aboutLightbox = new SimpleLightbox('a.about-gallery', {
        captionsData: 'alt',
        captionDelay: 200,
        animationSpeed: 250,
        fadeSpeed: 250,
        scrollZoom: false,
        overlayOpacity: 0.92,
      });
    }

    if (document.querySelector('a.wedding-gallery')) {
      window.weddingLightbox = new SimpleLightbox('a.wedding-gallery', {
        captionsData: 'alt',
        captionDelay: 200,
        animationSpeed: 250,
        fadeSpeed: 250,
        scrollZoom: false,
        overlayOpacity: 0.92,
      });
    }

    if (document.querySelector('a.event-gallery')) {
      window.eventLightbox = new SimpleLightbox('a.event-gallery', {
        captionsData: 'alt',
        captionDelay: 200,
        animationSpeed: 250,
        fadeSpeed: 250,
        scrollZoom: false,
        overlayOpacity: 0.92,
      });
    }
  }

  (function showFormSuccess() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get('sent') === '1') {
        var banner = document.getElementById('form-success');
        var form = document.getElementById('booking-form');
        if (banner) {
          banner.classList.remove('hidden');
          banner.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        if (form) {
          form.classList.add('hidden');
        }
        if (window.history && window.history.replaceState) {
          var cleanUrl = window.location.pathname + window.location.hash;
          window.history.replaceState({}, document.title, cleanUrl);
        }
      }
    } catch (e) { /* ignore */ }
  })();

})();
