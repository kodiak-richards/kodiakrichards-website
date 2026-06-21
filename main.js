/* ============================================================
   kodiakrichards.com — Main JavaScript
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     FILM GRAIN — canvas-generated noise texture
  ---------------------------------------------------------- */
  function buildGrainTexture() {
    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width  = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const img = ctx.createImageData(size, size);
    const d   = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() * 255 | 0;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL();
  }

  const grainUrl = buildGrainTexture();
  document.querySelectorAll('.grain-overlay').forEach(el => {
    el.style.backgroundImage = `url(${grainUrl})`;
    el.style.backgroundSize  = '256px 256px';
  });

  /* ----------------------------------------------------------
     NAVIGATION — scroll behavior + active link
  ---------------------------------------------------------- */
  const nav  = document.querySelector('.nav');
  const hero = document.querySelector('.hero');

  if (nav) {
    if (!hero) {
      nav.classList.add('scrolled');
    } else {
      const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 24);
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
    }

    const here = window.location.pathname.split('/').pop() || 'index.html';
    nav.querySelectorAll('.nav__links a').forEach(a => {
      const href = a.getAttribute('href');
      if (href === here || (here === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ----------------------------------------------------------
     HAMBURGER MENU
  ---------------------------------------------------------- */
  const hamburger  = document.querySelector('.nav__hamburger');
  const mobileMenu = document.querySelector('.nav__mobile');

  if (hamburger && mobileMenu) {
    const toggle = open => {
      hamburger.classList.toggle('open', open);
      mobileMenu.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
      mobileMenu.setAttribute('aria-hidden',  String(!open));
      document.body.style.overflow = open ? 'hidden' : '';
    };

    hamburger.addEventListener('click', () => toggle(!hamburger.classList.contains('open')));
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggle(false)));
    document.addEventListener('click', e => {
      if (hamburger.classList.contains('open') &&
          !hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        toggle(false);
      }
    });
  }

  /* ----------------------------------------------------------
     FADE-IN ON SCROLL
  ---------------------------------------------------------- */
  const fadeEls = document.querySelectorAll('.fade-in');
  if (fadeEls.length) {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => obs.observe(el));
  }

  /* ----------------------------------------------------------
     DRAG-TO-SCROLL CAROUSELS (offers + tracks)
  ---------------------------------------------------------- */
  function addDragScroll(el) {
    if (!el) return;
    let isDown = false, startX, scrollLeft;

    el.addEventListener('mousedown', e => {
      isDown    = true;
      startX    = e.pageX - el.getBoundingClientRect().left;
      scrollLeft = el.scrollLeft;
      el.classList.add('is-dragging');
      e.preventDefault();
    });

    const up = () => { isDown = false; el.classList.remove('is-dragging'); };
    document.addEventListener('mouseup',    up);
    document.addEventListener('mouseleave', up);

    document.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - el.getBoundingClientRect().left;
      const walk = (x - startX) * 1.4;
      el.scrollLeft = scrollLeft - walk;
    });

    /* Prevent click-through after a drag */
    el.addEventListener('click', e => {
      if (el.dataset.dragged === 'true') {
        e.preventDefault();
        e.stopPropagation();
        delete el.dataset.dragged;
      }
    });

    el.addEventListener('mousedown', () => { el.dataset.dragStart = el.scrollLeft; });
    document.addEventListener('mouseup', () => {
      if (Math.abs(el.scrollLeft - Number(el.dataset.dragStart)) > 4) {
        el.dataset.dragged = 'true';
      }
    });
  }

  addDragScroll(document.querySelector('.offers__grid'));
  addDragScroll(document.querySelector('.tracks__grid'));

  /* ----------------------------------------------------------
     TESTIMONIALS CAROUSEL
  ---------------------------------------------------------- */
  document.querySelectorAll('.testimonials__carousel').forEach(carousel => {
    const track = carousel.querySelector('.testimonials__track');
    const slides = carousel.querySelectorAll('.testimonial-slide');
    /* Dots live in a sibling container */
    const dotsWrap = carousel.closest('.testimonials__inner')
                              ?.querySelector('.testimonials__dots');
    const dots = dotsWrap ? dotsWrap.querySelectorAll('.dot') : [];
    let current = 0, timer;

    const goTo = idx => {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    };

    const start = () => { timer = setInterval(() => goTo(current + 1), 5200); };
    const stop  = () => clearInterval(timer);

    dots.forEach((d, i) => d.addEventListener('click', () => { stop(); goTo(i); start(); }));

    let sx = 0;
    carousel.addEventListener('touchstart', e => { sx = e.changedTouches[0].clientX; stop(); }, { passive: true });
    carousel.addEventListener('touchend',   e => {
      const dx = sx - e.changedTouches[0].clientX;
      if (Math.abs(dx) > 44) goTo(current + (dx > 0 ? 1 : -1));
      start();
    }, { passive: true });

    goTo(0);
    start();
  });

  /* ----------------------------------------------------------
     READ MORE — expandable sections (all instances)
  ---------------------------------------------------------- */
  document.querySelectorAll('.read-more').forEach(btn => {
    const targetId  = btn.getAttribute('aria-controls');
    const expandable = document.getElementById(targetId);
    if (!expandable) return;

    btn.addEventListener('click', () => {
      const open = expandable.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      expandable.setAttribute('aria-hidden', String(!open));
      const textEl = btn.querySelector('.read-more__text');
      if (textEl) textEl.textContent = open ? 'Read less' : 'Read more';
    });
  });

  /* ----------------------------------------------------------
     TRACK CARD — "Learn More" expand
  ---------------------------------------------------------- */
  document.querySelectorAll('.track-card__learn-more').forEach(btn => {
    const targetId  = btn.getAttribute('aria-controls');
    const expandable = document.getElementById(targetId);
    if (!expandable) return;

    btn.addEventListener('click', () => {
      const open = expandable.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      const textEl = btn.querySelector('.lm-text');
      if (textEl) textEl.textContent = open ? 'Close' : 'How it works';
    });
  });

  /* ----------------------------------------------------------
     POH STORY TOGGLE — "The story behind POH" expandable
  ---------------------------------------------------------- */
  document.querySelectorAll('.poh-story__toggle').forEach(btn => {
    const targetId = btn.getAttribute('aria-controls');
    const body     = document.getElementById(targetId);
    if (!body) return;

    btn.addEventListener('click', () => {
      const open = body.classList.toggle('open');
      btn.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
      body.setAttribute('aria-hidden', String(!open));
    });
  });

  /* ----------------------------------------------------------
     TRACK ACCORDION — deep-dive section on 1:1 page
  ---------------------------------------------------------- */
  document.querySelectorAll('.track-accordion__btn').forEach(btn => {
    const item = btn.closest('.track-accordion__item');
    const body = item ? item.querySelector('.track-accordion__body') : null;
    if (!item || !body) return;

    btn.addEventListener('click', () => {
      const open = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', String(open));
    });
  });

  /* ----------------------------------------------------------
     SCROLL-TRAP FIX — horizontal carousels must not capture
     vertical wheel events; normalize deltaMode and pass to page
  ---------------------------------------------------------- */
  document.querySelectorAll('.tracks__grid, .counseling-card-wrap').forEach(el => {
    el.addEventListener('wheel', e => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        let delta = e.deltaY;
        if (e.deltaMode === 1) delta *= 40;
        if (e.deltaMode === 2) delta *= window.innerHeight;
        window.scrollBy({ top: delta, behavior: 'auto' });
      }
    }, { passive: false });
  });

  /* ----------------------------------------------------------
     COACHING TRACKS ARROWS — prev/next scroll controls
  ---------------------------------------------------------- */
  (function () {
    const grid = document.querySelector('.tracks__grid');
    const prev = document.querySelector('.tracks__arrow--prev');
    const next = document.querySelector('.tracks__arrow--next');
    if (!grid || !prev || !next) return;

    const cards = Array.from(grid.querySelectorAll('.track-card'));
    if (!cards.length) return;

    const cardWidth = () => cards[0].offsetWidth + parseInt(getComputedStyle(grid).gap || 24);

    const updateArrows = () => {
      const sl = grid.scrollLeft;
      const maxScroll = grid.scrollWidth - grid.clientWidth;
      prev.disabled = sl <= 2;
      next.disabled = sl >= maxScroll - 2;
    };

    prev.addEventListener('click', () => {
      grid.scrollBy({ left: -cardWidth(), behavior: 'smooth' });
    });
    next.addEventListener('click', () => {
      grid.scrollBy({ left: cardWidth(), behavior: 'smooth' });
    });

    grid.addEventListener('scroll', updateArrows, { passive: true });
    updateArrows();
  })();

  /* ----------------------------------------------------------
     COACHING TRACKS DOTS — manual swipe/click sync, no auto-scroll
  ---------------------------------------------------------- */
  (function () {
    const grid     = document.querySelector('.tracks__grid');
    const dotsWrap = document.querySelector('.tracks__dots');
    if (!grid || !dotsWrap) return;

    const cards = Array.from(grid.querySelectorAll('.track-card'));
    const dots  = Array.from(dotsWrap.querySelectorAll('.dot'));
    if (!cards.length || dots.length !== cards.length) return;

    /* Snap offset for each card relative to grid scroll origin */
    const snapPos = card => card.offsetLeft - cards[0].offsetLeft;

    const updateDots = () => {
      const sl = grid.scrollLeft;
      let activeIdx = 0, minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(snapPos(card) - sl);
        if (dist < minDist) { minDist = dist; activeIdx = i; }
      });
      dots.forEach((d, i) => {
        d.classList.toggle('active', i === activeIdx);
        d.setAttribute('aria-selected', String(i === activeIdx));
      });
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        grid.scrollTo({ left: snapPos(cards[i]), behavior: 'smooth' });
      });
    });

    grid.addEventListener('scroll', updateDots, { passive: true });
    updateDots();
  })();

})();
