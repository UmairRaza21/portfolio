/* ============================================================
   Portfolio JavaScript — Interactivity & Animations
   Muhammad Umair Raza | Dark Navy & Gold Theme
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ─── Typing Effect ───────────────────────────────────────
  const titles = [
    'Information Technology Student',
    'Graphic Designer',
    'Social Media Manager',
    'AI & Prompt Engineering Enthusiast'
  ];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingEl = document.getElementById('typingText');

  function typeEffect() {
    const current = titles[titleIndex];

    if (isDeleting) {
      typingEl.textContent = current.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingEl.textContent = current.substring(0, charIndex + 1);
      charIndex++;
    }

    // Add blinking cursor via border
    typingEl.style.borderRight = '2px solid var(--accent)';

    let speed = isDeleting ? 35 : 65;

    if (!isDeleting && charIndex === current.length) {
      speed = 2000; // Pause at end
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      speed = 400; // Pause before new word
    }

    setTimeout(typeEffect, speed);
  }

  typeEffect();

  // ─── Consolidated & Optimized Scroll Event Handler ────────
  const navbar = document.getElementById('navbar');
  const sections = document.querySelectorAll('section[id]');
  const navLinkElements = document.querySelectorAll('.nav-link[data-section]');
  const backToTop = document.getElementById('backToTop');

  function handleScroll() {
    const scrollY = window.scrollY;

    // Navbar scrolled class
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }

    // Highlight active nav link
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (scrollY >= top) {
        current = section.getAttribute('id');
      }
    });

    navLinkElements.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-section') === current) {
        link.classList.add('active');
      }
    });
  }

  // Throttle scroll events using requestAnimationFrame for smooth scrolling
  let isScrolling = false;
  window.addEventListener('scroll', () => {
    if (!isScrolling) {
      window.requestAnimationFrame(() => {
        handleScroll();
        isScrolling = false;
      });
      isScrolling = true;
    }
  }, { passive: true });

  // ─── Mobile Menu ─────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  // Close mobile menu on link click
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
    });
  });

  // Active nav link highlighting is handled by the consolidated scroll listener above

  // ─── Cursor Reactive Text Glow (About section) ────────────
  const glowLayer = document.querySelector('.about-glow-layer');
  const glowTargets = document.querySelectorAll('[data-glow-text]');

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (glowLayer && glowTargets.length && !prefersReduced) {
    let activeEl = null;

    const updateGlow = (el, x, y) => {
      const r = el.getBoundingClientRect();
      const rx = ((x - r.left) / r.width) * 100;
      const ry = ((y - r.top) / r.height) * 100;
      glowLayer.style.setProperty('--gx', `${rx}%`);
      glowLayer.style.setProperty('--gy', `${ry}%`);
      glowLayer.style.opacity = '1';

      // stronger glow
      el.style.textShadow =
        '0 0 22px rgba(245,188,65,0.55), 0 0 50px rgba(245,188,65,0.25)';
    };

    const clearGlow = (el) => {
      el.style.textShadow = '';
      glowLayer.style.opacity = '0';
    };

    glowTargets.forEach(el => {
      el.addEventListener('mouseenter', (e) => {
        if (activeEl && activeEl !== el) clearGlow(activeEl);
        activeEl = el;
        updateGlow(el, e.clientX, e.clientY);
      });

      el.addEventListener('mousemove', (e) => {
        if (activeEl === el) updateGlow(el, e.clientX, e.clientY);
      });

      el.addEventListener('mouseleave', () => {
        if (activeEl === el) {
          clearGlow(el);
          activeEl = null;
        }
      });
    });
  }


  // ─── Scroll Reveal Animations ────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');


  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── Timeline Animation ──────────────────────────────────
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        timelineObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  });

  timelineItems.forEach(item => timelineObserver.observe(item));

  // ─── Skill Bar Animation ─────────────────────────────────
  const skillItems = document.querySelectorAll('.skill-item');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const percent = entry.target.getAttribute('data-percent');
        const fill = entry.target.querySelector('.skill-fill');
        if (fill && percent) {
          fill.style.width = percent + '%';
          entry.target.classList.add('animated');
        }
        skillObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3
  });

  skillItems.forEach(item => skillObserver.observe(item));

  // ─── Counter Animation ───────────────────────────────────
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let countersAnimated = false;

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  const statsBar = document.getElementById('stats-bar');
  if (statsBar) counterObserver.observe(statsBar);

  function animateCounters() {
    statNumbers.forEach(num => {
      const target = parseInt(num.getAttribute('data-target'));
      const duration = 2000;
      const step = Math.ceil(target / (duration / 50));
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          current = target;
          clearInterval(timer);
          // Add "+" suffix
          num.textContent = target + '+';
        } else {
          num.textContent = current;
        }
      }, 50);
    });
  }

  // Back to top button visibility is handled by the consolidated scroll listener above

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ─── Lightbox for Certificates ───────────────────────────
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxClose = document.getElementById('lightboxClose');

  // Certificate image map — update paths when images are available
  const certImageMap = {
    'Diploma of Information Technology': '../certification/Gemini_Generated_Image_i4xro0i4xro0i4xr.png',
    'Graphic Designing': 'Graphic_design.jpg',
    'Digital Marketing': 'Digital_marketing.jpg',
    'Freelancing': 'DSTP_Certificate.jpg'
  };


  document.querySelectorAll('.cert-card').forEach(card => {
    card.addEventListener('click', () => {
      const certName = card.getAttribute('data-cert');
      const imgSrc = certImageMap[certName];
      if (imgSrc) {
        lightboxImage.src = imgSrc;
        lightboxImage.alt = certName;
        lightboxTitle.textContent = certName;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeLightbox();
  });

  function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      lightboxImage.src = '';
    }, 400);
  }

  // ─── Particle Effect (Tech Symbols) ──────────────────────
  const particlesContainer = document.getElementById('particles');
  const symbols = ['{ }', '< />', '[]', '/', ';', '#'];

  function createParticles() {
    const count = 25;
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle-symbol');
      particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      particle.style.position = 'absolute';
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animation = `float ${6 + Math.random() * 6}s ease-in-out infinite alternate`;
      particle.style.animationDelay = Math.random() * 8 + 's';
      particle.style.opacity = 0.1 + Math.random() * 0.25;
      particle.style.color = 'var(--gold-400)';
      particle.style.fontSize = (12 + Math.random() * 18) + 'px';
      particle.style.fontWeight = 'bold';
      particle.style.zIndex = '0';
      particle.style.pointerEvents = 'none';
      if (particlesContainer) {
        particlesContainer.appendChild(particle);
      }
    }
  }

  createParticles();

  // ─── Hero Image 3D Tilt ──────────────────────────────────
  const heroCard = document.querySelector('.hero-image-wrapper');
  if (heroCard && !prefersReduced) {
    heroCard.addEventListener('mousemove', (e) => {
      const rect = heroCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xRot = ((y / rect.height) - 0.5) * -15;
      const yRot = ((x / rect.width) - 0.5) * 15;
      
      heroCard.style.transform = `perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale3d(1.02, 1.02, 1.02)`;
      heroCard.style.transition = 'none';
    });

    heroCard.addEventListener('mouseleave', () => {
      heroCard.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
      heroCard.style.transition = 'transform 0.5s var(--transition-spring)';
    });
  }

  // ─── Featured Projects Accordion Cards ──────────────────
  const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;


  const projectCards = Array.from(document.querySelectorAll('.project-card.project-accordion'));
  let openCard = null;

  function closeAllProjects() {
    projectCards.forEach(card => {
      card.dataset.open = 'false';
      const details = card.querySelector('.project-details');
      if (details) details.hidden = true;
      const btn = card.querySelector('.project-toggle');
      if (btn) btn.setAttribute('aria-expanded', 'false');
    });
    openCard = null;
  }

  function openProject(card) {
    if (!card) return;
    closeAllProjects();

    card.dataset.open = 'true';
    const details = card.querySelector('.project-details');
    if (details) details.hidden = false;

    const btn = card.querySelector('.project-toggle');
    if (btn) btn.setAttribute('aria-expanded', 'true');

    openCard = card;

    // sequential section fade-in + divider draw
    if (!prefersReducedMotion) {
      const sections = card.querySelectorAll('.details-section');
      const dividers = card.querySelectorAll('.details-divider');

      dividers.forEach((d, idx) => {
        d.style.transitionDelay = '0ms';
        d.style.transform = 'scaleX(0)';
      });

      sections.forEach((s, i) => {
        s.style.transitionDelay = `${80 + i * 70}ms`;
      });

      // kick divider draw
      const firstDivider = dividers[0];
      if (firstDivider) {
        firstDivider.getBoundingClientRect();
        dividers.forEach((d, i) => {
          setTimeout(() => {
            d.classList.add('draw');
            d.style.transform = 'scaleX(1)';
          }, i * 120);
        });
      }

      // tech shimmer start handled by CSS hover/active; set open state only
      // ripple is handled separately
    }
  }

  function toggleProject(card) {
    if (!card) return;
    const isOpen = card.dataset.open === 'true';
    if (isOpen) closeAllProjects();
    else openProject(card);
  }

  // Ripple
  function spawnRipple(card, x, y) {
    if (prefersReducedMotion) return;
    const ripple = card.querySelector('.project-ripple');
    if (!ripple) return;

    ripple.style.background = 'radial-gradient(circle at center, rgba(245,188,65,0.55), rgba(245,188,65,0.0) 60%)';
    ripple.style.opacity = '1';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.55s var(--transition-spring), opacity 0.55s ease';
    // place via CSS variables for potential future use
    ripple.style.setProperty('--rx', `${x}px`);
    ripple.style.setProperty('--ry', `${y}px`);

    requestAnimationFrame(() => {
      ripple.style.transform = 'scale(1)';
      ripple.style.opacity = '0';
    });
  }

  projectCards.forEach(card => {
    card.dataset.open = 'false';

    const btn = card.querySelector('.project-toggle');

    // Click anywhere except links/buttons
    card.addEventListener('click', (e) => {
      const link = e.target && e.target.closest && e.target.closest('a');
      const innerBtn = e.target && e.target.closest && e.target.closest('button');
      if (link) return; // keep existing functionality
      if (innerBtn && innerBtn !== btn) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spawnRipple(card, x, y);

      toggleProject(card);
    });

    if (btn) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleProject(card);
      });
    }

    // mouse-follow tilt for active card (when open) + also on hover
    const applyTilt = (clientX, clientY) => {
      if (prefersReducedMotion) return;

      const rect = card.getBoundingClientRect();
      const px = (clientX - rect.left) / rect.width;
      const py = (clientY - rect.top) / rect.height;

      const rotY = (px - 0.5) * 10; // left/right
      const rotX = -(py - 0.5) * 8; // up/down

      card.style.transform = `translateY(-10px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    };

    const resetTilt = () => {
      if (prefersReducedMotion) return;
      card.style.transform = '';
    };

    card.addEventListener('mousemove', (e) => {
      if (card.dataset.open === 'true') applyTilt(e.clientX, e.clientY);
    });

    card.addEventListener('mouseleave', () => {
      if (card.dataset.open === 'true') resetTilt();
    });
  });

  // close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllProjects();
  });

  // ─── Project Info Modal ────────────────────────────────
  const projectInfoModal = document.getElementById('projectInfoModal');
  const projectInfoBody = document.getElementById('projectInfoBody');
  const projectInfoTitle = document.getElementById('projectInfoTitle');
  const projectInfoClose = document.getElementById('projectInfoClose');


  const projectInfoData = {
    'sindh-tech': {
      title: 'Sindh Tech Solutions',
      description: 'Project focused on improving the client’s social media presence through content strategy, graphics, and consistent branding over 6 months.',
      bullets: ['Designed social media creatives (logos, banners, posts)', 'Managed content schedules and publishing workflow', 'Supported brand consistency across platforms', 'Helped increase visibility and engagement']
    },
    'rabtech': {
      title: 'Rabtech',
      description: 'A branding & social media project where I created comprehensive assets and managed the digital presence to strengthen the client’s professional image.',
      bullets: ['Created branding visuals and promotional creatives', 'Managed social media content delivery', 'Planned and supported promotional campaigns', 'Ensured consistent visual identity']
    },
    'coki': {
      title: 'City of Knowledge Institute',
      description: 'Educational marketing campaign work including student awareness creatives and social media promotional materials.',
      bullets: ['Designed awareness and marketing creatives', 'Created educational social media graphics', 'Supported campaign consistency across posts', 'Improved student outreach through visuals']
    },
    'gun-shop': {
      title: 'Muhammad Saleh Memon Gun Shop',
      description: 'Retail marketing project for product promotion graphics, advertisement creatives, and ongoing social media presence management.',
      bullets: ['Created product promotion and ad creatives', 'Managed social media content for the business', 'Designed marketing visuals to attract customers', 'Supported regular promotion updates']
    },
    'library': {
      title: 'Library Management System',
      description: 'Software development project to manage books, records, and user information with automated handling.',
      bullets: ['Implemented core C++ programming fundamentals', 'Automated records handling', 'Organized book and user data efficiently', 'Delivered a practical console-based system']
    }
  };

  function openProjectInfo(projectKey) {
    const data = projectInfoData[projectKey];
    if (!data) return;

    projectInfoTitle.textContent = data.title;
    projectInfoBody.innerHTML = `
      <p style="margin-bottom:14px;">${data.description}</p>
      <ul>${(data.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
    `;

    projectInfoModal.classList.add('active');
    projectInfoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeProjectInfo() {
    projectInfoModal.classList.remove('active');
    projectInfoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Keep content as-is for faster reopen
  }

  document.addEventListener('click', (e) => {
    const btn = e.target && e.target.closest ? e.target.closest('[data-project-info]') : null;
    if (!btn) return;

    const key = btn.getAttribute('data-project-info');
    openProjectInfo(key);
  });

  if (projectInfoClose) {
    projectInfoClose.addEventListener('click', closeProjectInfo);
  }

  if (projectInfoModal) {
    projectInfoModal.addEventListener('click', (e) => {
      if (e.target === projectInfoModal) closeProjectInfo();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeProjectInfo();
  });

  // ─── Contact Form Handler ────────────────────────────────
  const contactForm = document.getElementById('contactForm');
  const contactSubmitBtn = document.getElementById('contactSubmitBtn');
  const formStatus = document.getElementById('formStatus');

  if (contactForm && contactSubmitBtn && formStatus) {
    contactForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const originalButtonContent = contactSubmitBtn.innerHTML;
      contactSubmitBtn.disabled = true;
      contactSubmitBtn.innerHTML = '<i data-lucide="loader-circle" class="spin" style="width:18px;height:18px;"></i> Sending...';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: 'POST',
          body: new URLSearchParams(formData),
          headers: {
            'Accept': 'application/json'
          }
        });

        if (response.ok) {
          contactForm.reset();
          formStatus.className = 'form-status success';
          formStatus.textContent = 'Your message has been sent successfully. I will reply soon.';
        } else {
          throw new Error('Unable to send message right now.');
        }
      } catch (error) {
        formStatus.className = 'form-status error';
        formStatus.textContent = 'Message could not be sent. Please contact me directly via email or WhatsApp.';
      } finally {
        contactSubmitBtn.disabled = false;
        contactSubmitBtn.innerHTML = originalButtonContent;
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }
    });
  }

  // ─── Smooth Scroll for anchor links ──────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});

// ─── Add spin animation for loading icon ───────────────────
const style = document.createElement('style');
style.textContent = `
  @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  .spin { animation: spin 1s linear infinite; }
`;
document.head.appendChild(style);
