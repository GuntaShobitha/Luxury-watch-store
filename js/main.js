/**
 * STACKLY LUXURY WATCHES — Main Global Interactions
 * Brand: STACKLY — Time, Crafted to Last.
 * Handles mobile navigation, header scroll effects, search modal,
 * accessible accordions, newsletter validation, gallery lightbox,
 * contact form validation, blog filtering, and scroll reveals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initSearchModal();
  initNewsletterForms();
  initAccordions();
  initScrollReveals();
  initComparisonTool();
  initSpotlightHotspots();
  initTestimonialSliders();
  initGalleryLightbox();
  initPasswordToggles();
  initBlogFilters();
  initContactForm();
  initQuickViewModal();
  initHomepageDiscovery();
  initAnimatedCounters();
  initArticleReaderModal();
});

// 1. Sticky Header Transition
function initStickyHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}

// 2. Mobile Menu Navigation & Scroll Lock (Prompt Sec 21)
function initMobileMenu() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const navDrawer = document.querySelector('.mobile-nav-drawer');
  const backdrop = document.querySelector('.mobile-nav-backdrop');
  if (!toggleBtn || !navDrawer) return;

  function openMenu() {
    navDrawer.classList.add('is-open');
    if (backdrop) backdrop.classList.add('is-visible');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open'); // Prompt: body.menu-open { overflow: hidden; }
  }

  function closeMenu() {
    navDrawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }

  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const isOpen = navDrawer.classList.contains('is-open');
    if (isOpen) closeMenu();
    else openMenu();
  });

  if (backdrop) {
    backdrop.addEventListener('click', closeMenu);
  }

  const closeBtn = navDrawer.querySelector('.mobile-menu-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMenu();
    });
  }

  // Close when clicking mobile nav links
  navDrawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navDrawer.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// 3. Global Search Overlay Modal
function initSearchModal() {
  const searchTriggers = document.querySelectorAll('[data-open-search]');
  const searchModal = document.getElementById('search-modal');
  if (!searchModal) return;

  const closeBtn = searchModal.querySelector('[data-close-search], .search-close-btn');
  const searchInput = searchModal.querySelector('#search-modal-input');
  const resultsContainer = searchModal.querySelector('#search-modal-results');

  function openSearch() {
    searchModal.classList.add('is-active');
    document.body.style.overflow = 'hidden';
    if (searchInput) {
      setTimeout(() => searchInput.focus(), 100);
    }
    renderSearchResults('');
  }

  function closeSearch() {
    searchModal.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  searchTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSearch);
  }

  searchModal.addEventListener('click', (e) => {
    if (e.target === searchModal) closeSearch();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && searchModal.classList.contains('is-active')) {
      closeSearch();
    }
  });

  if (searchInput && resultsContainer) {
    searchInput.addEventListener('input', (e) => {
      renderSearchResults(e.target.value.trim().toLowerCase());
    });
  }

  function renderSearchResults(query) {
    if (!resultsContainer) return;
    const products = window.STACKLY_PRODUCTS || [];

    let filtered = products;
    if (query) {
      filtered = products.filter(p => 
        p.name.toLowerCase().includes(query) ||
        p.collectionName.toLowerCase().includes(query) ||
        p.movement.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-secondary);">
          <p>No timepieces found matching "<strong>${query}</strong>".</p>
          <small style="color: var(--white-50);">Try searching for "Tourbillon", "Dress", "Chronograph", or "Titanium".</small>
        </div>
      `;
      return;
    }

    resultsContainer.innerHTML = `
      <div class="search-results-grid">
        ${filtered.map(p => `
          <a href="./product.html?id=${p.id}" class="product-card" style="padding: 1rem; border-radius: var(--radius-sm); display: flex; flex-direction: column; align-items: center; text-align: center;">
            <div style="width: 100%; aspect-ratio: 1/1; display: flex; align-items: center; justify-content: center; margin-bottom: 0.8rem;">
              <img src="${p.image}" alt="${p.name}" style="max-height: 85%; object-fit: contain;">
            </div>
            <span style="font-size: 0.72rem; letter-spacing: 0.14em; text-transform: uppercase; color: var(--white-50);">${p.collectionName}</span>
            <h4 style="font-size: 1.15rem; margin: 0.3rem 0;">${p.name}</h4>
            <span style="font-family: var(--font-serif); font-size: 1.1rem; color: var(--white);">${p.formattedPrice}</span>
          </a>
        `).join('')}
      </div>
    `;
  }
}

// 4. Newsletter Subscription Form Validation
function initNewsletterForms() {
  const forms = document.querySelectorAll('.newsletter-form');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const feedback = form.querySelector('.newsletter-feedback');
      if (!input) return;

      const email = input.value.trim();
      if (!emailRegex.test(email)) {
        if (feedback) {
          feedback.textContent = 'Please provide a valid email address.';
          feedback.className = 'newsletter-feedback is-error';
          feedback.style.display = 'block';
        }
        input.focus();
        return;
      }

      // Success
      input.value = '';
      if (feedback) {
        feedback.textContent = 'Welcome to the STACKLY Journal private dispatch.';
        feedback.className = 'newsletter-feedback is-success';
        feedback.style.display = 'block';
      }
      if (window.CartStore) {
        window.CartStore.showToast('Subscription Confirmed', 'You have been registered for private editorial dispatches.');
      }
    });
  });
}

// 5. Accessible Accordions (FAQ on Services, Contact & Home)
function initAccordions() {
  const accordions = document.querySelectorAll('.faq-accordion-item, .accordion-item');

  accordions.forEach(item => {
    const trigger = item.querySelector('.faq-accordion-header, .accordion-header');
    const content = item.querySelector('.faq-accordion-body, .accordion-body');
    if (!trigger || !content) return;

    trigger.addEventListener('click', () => {
      const isExpanded = trigger.getAttribute('aria-expanded') === 'true' || item.classList.contains('is-open');

      // Close sibling items in the same container
      const parent = item.parentElement;
      if (parent) {
        parent.querySelectorAll('.faq-accordion-item, .accordion-item').forEach(sibling => {
          if (sibling !== item) {
            const sibTrigger = sibling.querySelector('.faq-accordion-header, .accordion-header');
            const sibContent = sibling.querySelector('.faq-accordion-body, .accordion-body');
            if (sibTrigger) sibTrigger.setAttribute('aria-expanded', 'false');
            if (sibContent) sibContent.style.maxHeight = null;
            sibling.classList.remove('is-open');
          }
        });
      }

      if (isExpanded) {
        trigger.setAttribute('aria-expanded', 'false');
        content.style.maxHeight = null;
        item.classList.remove('is-open');
      } else {
        trigger.setAttribute('aria-expanded', 'true');
        content.style.maxHeight = content.scrollHeight + 'px';
        item.classList.add('is-open');
      }
    });
  });
}

// 6. Section Scroll Reveals with IntersectionObserver
function initScrollReveals() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.querySelectorAll('.reveal-on-scroll').forEach(el => el.classList.add('is-revealed'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// 7. Interactive Watch Comparison Tool
function initComparisonTool() {
  const select1 = document.getElementById('compare-select-1');
  const select2 = document.getElementById('compare-select-2');
  const select3 = document.getElementById('compare-select-3');
  if (!select1 || !select2 || !select3) return;

  const products = window.STACKLY_PRODUCTS || [];
  if (products.length === 0) return;

  [select1, select2, select3].forEach((sel, idx) => {
    sel.innerHTML = products.map((p, i) => `
      <option value="${p.id}" ${i === idx ? 'selected' : ''}>${p.name}</option>
    `).join('');

    sel.addEventListener('change', updateComparisonTable);
  });

  function updateComparisonTable() {
    const p1 = window.getProductById(select1.value);
    const p2 = window.getProductById(select2.value);
    const p3 = window.getProductById(select3.value);

    renderCompareColumn(1, p1);
    renderCompareColumn(2, p2);
    renderCompareColumn(3, p3);
  }

  function renderCompareColumn(colNum, p) {
    const imgEl = document.getElementById(`compare-img-${colNum}`);
    const nameEl = document.getElementById(`compare-name-${colNum}`);
    const priceEl = document.getElementById(`compare-price-${colNum}`);
    const matEl = document.getElementById(`compare-case-${colNum}`);
    const movEl = document.getElementById(`compare-movement-${colNum}`);
    const sizeEl = document.getElementById(`compare-diameter-${colNum}`);
    const strapEl = document.getElementById(`compare-strap-${colNum}`);
    const waterEl = document.getElementById(`compare-water-${colNum}`);
    const actionEl = document.getElementById(`compare-action-${colNum}`);

    if (imgEl && p) imgEl.src = p.image;
    if (nameEl && p) nameEl.textContent = p.name;
    if (priceEl && p) priceEl.textContent = p.formattedPrice;
    if (matEl && p) matEl.textContent = p.caseMaterial;
    if (movEl && p) movEl.textContent = p.movement;
    if (sizeEl && p) sizeEl.textContent = p.caseDiameter;
    if (strapEl && p) strapEl.textContent = p.strapMaterial;
    if (waterEl && p) waterEl.textContent = p.waterResistance;
    if (actionEl && p) {
      actionEl.innerHTML = `
        <a href="./product.html?id=${p.id}" class="btn btn--outline btn--sm">View Watch</a>
        <button class="btn btn--secondary btn--sm" data-add-to-bag="${p.id}">Add to Bag</button>
      `;
    }
  }

  updateComparisonTable();
}

// 8. Signature Watch Spotlight Hotspots (Monochromatic Data)
function initSpotlightHotspots() {
  const hotspots = document.querySelectorAll('.spotlight-hotspot');
  const detailsTitle = document.getElementById('hotspot-active-title');
  const detailsText = document.getElementById('hotspot-active-text');
  if (hotspots.length === 0) return;

  const HOTSPOT_DATA = {
    dial: {
      title: 'Openworked Chapter Dial',
      desc: 'Skeletonized multi-tier titanium dial ring hand-beveled with diamond compound. Displays rhodium faceted indices filled with luminescent pigments.'
    },
    movement: {
      title: 'Flying Tourbillon Caliber ST-01',
      desc: 'Single-axis anti-gravitational carriage completing one full rotation every sixty seconds, regulating precision against earth’s gravity.'
    },
    case: {
      title: 'Grade 5 Titanium & Obsidian Ceramic',
      desc: 'Forged from aeronautical Grade 5 titanium, flanked by a scratch-impervious black ceramic fluted bezel for extreme durability and lightness.'
    },
    strap: {
      title: 'Hand-Stitched Alligator & Titanium Clasp',
      desc: 'Artisanal semi-matte alligator leather, double-stitched with charcoal thread and an integrated Grade 5 titanium safety deployment clasp.'
    }
  };

  hotspots.forEach(btn => {
    btn.addEventListener('click', () => {
      const type = btn.getAttribute('data-hotspot');
      hotspots.forEach(h => h.classList.remove('is-active'));
      btn.classList.add('is-active');

      if (HOTSPOT_DATA[type] && detailsTitle && detailsText) {
        detailsTitle.textContent = HOTSPOT_DATA[type].title;
        detailsText.textContent = HOTSPOT_DATA[type].desc;
      }
    });
  });
}

// 9. Client Stories & Journal Sliders
function initTestimonialSliders() {
  const track = document.querySelector('.journal-slider-track');
  const prevBtn = document.querySelector('.journal-slider-prev');
  const nextBtn = document.querySelector('.journal-slider-next');
  if (!track || !prevBtn || !nextBtn) return;

  let currentIndex = 0;
  const cards = track.querySelectorAll('.journal-slide-card');
  const totalCards = cards.length;

  function updateSlide() {
    const cardWidth = cards[0] ? cards[0].offsetWidth + 24 : 320;
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= totalCards - 1;
  }

  prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
      updateSlide();
    }
  });

  window.addEventListener('resize', updateSlide);
  updateSlide();
}

// 10. Product Gallery Lightbox Modal (Prompt Sec 9)
function initGalleryLightbox() {
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const galleryItems = document.querySelectorAll('[data-gallery-image]');

  if (!lightbox || !lightboxImg || galleryItems.length === 0) return;

  function openLightbox(src, caption) {
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.textContent = caption || 'STACKLY CHRONOS TYPE-0 Detail';
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const src = item.getAttribute('data-gallery-image') || item.querySelector('img')?.src;
      const caption = item.getAttribute('data-gallery-caption') || item.querySelector('img')?.alt;
      if (src) openLightbox(src, caption);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeLightbox);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
}

// 11. Password Visibility Toggles (Prompt Sec 12 & 13)
function initPasswordToggles() {
  const toggles = document.querySelectorAll('[data-toggle-password]');
  toggles.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-toggle-password');
      const targetInput = document.getElementById(targetId);
      const icon = btn.querySelector('.material-icons, .material-symbols-outlined');
      if (!targetInput) return;

      if (targetInput.type === 'password') {
        targetInput.type = 'text';
        if (icon) icon.textContent = 'visibility_off';
      } else {
        targetInput.type = 'password';
        if (icon) icon.textContent = 'visibility';
      }
    });
  });
}

// 12. Blog Filtering & Load More (Prompt Sec 10)
function initBlogFilters() {
  const filterButtons = document.querySelectorAll('[data-blog-filter]');
  const articles = document.querySelectorAll('[data-blog-category]');
  const loadMoreBtn = document.getElementById('blog-load-more');

  if (filterButtons.length === 0 || articles.length === 0) return;

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-blog-filter');
      
      filterButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      articles.forEach(article => {
        const cat = article.getAttribute('data-blog-category');
        if (filter === 'all' || cat === filter) {
          article.style.display = '';
        } else {
          article.style.display = 'none';
        }
      });
    });
  });

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', (e) => {
      e.preventDefault();
      loadMoreBtn.textContent = 'All Articles Displayed';
      loadMoreBtn.classList.add('disabled');
      loadMoreBtn.style.opacity = '0.5';
      loadMoreBtn.style.pointerEvents = 'none';
      if (window.CartStore) {
        window.CartStore.showToast('Journal Archives', 'All current editorial essays are loaded.');
      }
    });
  }
}

// 13. Contact Form Client-Side Validation & Feedback (Prompt Sec 11)
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const statusMsg = document.getElementById('contact-form-status');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#contact-name')?.value.trim();
    const email = form.querySelector('#contact-email')?.value.trim();
    const message = form.querySelector('#contact-message')?.value.trim();

    if (!name || !email || !message) {
      if (statusMsg) {
        statusMsg.className = 'auth-status-message is-error';
        statusMsg.style.display = 'flex';
        statusMsg.innerHTML = '<span class="material-icons" aria-hidden="true">error</span> Please fill out all required fields.';
      }
      return;
    }

    if (!emailRegex.test(email)) {
      if (statusMsg) {
        statusMsg.className = 'auth-status-message is-error';
        statusMsg.style.display = 'flex';
        statusMsg.innerHTML = '<span class="material-icons" aria-hidden="true">error</span> Please enter a valid email address.';
      }
      return;
    }

    // Submit demonstration feedback
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span class="material-icons" aria-hidden="true">hourglass_empty</span> Sending...';
    }

    setTimeout(() => {
      if (statusMsg) {
        statusMsg.className = 'auth-status-message is-success';
        statusMsg.style.display = 'flex';
        statusMsg.innerHTML = '<span class="material-icons" aria-hidden="true">check_circle</span> Inquiry received. Our horological concierge will reach out within 24 hours. (Demonstration submission)';
      }
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Transmit Message</span><span class="material-icons" aria-hidden="true">send</span>';
      }
      if (window.CartStore) {
        window.CartStore.showToast('Inquiry Transmitted', 'Your private salon consultation request has been received.');
      }
    }, 600);
  });
}

// 14. Luxury Watch Card Markup Generator
function renderWatchCardHtml(p) {
  const isWishlisted = window.CartStore && window.CartStore.getWishlist().includes(p.id);
  const variantsHtml = (p.variants || ['black', 'gold']).map(v => `<span class="variant-dot variant-dot--${v}"></span>`).join('');
  return `
    <article class="product-card reveal-on-scroll is-revealed" data-product-id="${p.id}">
      <span class="product-card__badge">${p.collectionName || 'Haute Horlogerie'}</span>
      <div class="product-card__actions">
        <button class="product-action-btn ${isWishlisted ? 'is-active' : ''}" data-wishlist-id="${p.id}" aria-label="Save ${p.name} to Wishlist">
          <span class="material-icons" aria-hidden="true">${isWishlisted ? 'favorite' : 'favorite_border'}</span>
        </button>
        <button class="product-action-btn" data-quickview-id="${p.id}" aria-label="Quick View ${p.name}">
          <span class="material-icons" aria-hidden="true">visibility</span>
        </button>
      </div>
      <div class="product-card__media">
        <a href="./product.html?id=${p.id}" aria-label="View ${p.name}">
          <img src="${p.image}" alt="${p.name} luxury timepiece" loading="lazy" width="300" height="300">
        </a>
      </div>
      <div class="product-card__content">
        <div class="product-card__variants">${variantsHtml}</div>
        <h3 class="product-card__title">
          <a href="./product.html?id=${p.id}" style="color: inherit; text-decoration: none;">${p.name}</a>
        </h3>
        <p class="product-card__tagline">${p.tagline || ''}</p>
        <div class="product-card__meta">
          <span class="product-card__price">${p.formattedPrice || '$' + p.price.toLocaleString()}</span>
          <span style="font-size: 0.78rem; color: var(--text-muted);">${p.movementType || 'Mechanical'}</span>
        </div>
        <div class="product-card__footer-btns">
          <a href="./product.html?id=${p.id}" class="btn btn--secondary btn--sm">View Details</a>
          <button class="btn btn--primary btn--sm" data-add-to-bag="${p.id}">Shop Now</button>
        </div>
      </div>
    </article>
  `;
}

// 15. Quick-View Action & Modal (Prompt Sec 4.3)
function initQuickViewModal() {
  let modal = document.getElementById('quickview-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'quickview-modal';
    modal.className = 'quickview-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Product Quick View');
    modal.innerHTML = `
      <div class="quickview-card">
        <button class="quickview-close-btn" id="quickview-close-btn" aria-label="Close Quick View">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
        <div class="quickview-media">
          <img id="qv-img" src="" alt="Timepiece Preview">
        </div>
        <div class="quickview-info">
          <span id="qv-collection" class="section-eyebrow">Collection</span>
          <h2 id="qv-title" style="font-size: 2rem; margin: 0.3rem 0;">Product Name</h2>
          <div id="qv-price" style="font-family: var(--font-serif); font-size: 1.8rem; color: var(--champagne-gold); margin-bottom: 1rem;">$0</div>
          <p id="qv-desc" style="font-size: 0.92rem; line-height: 1.6; color: var(--text-secondary); margin-bottom: 1.5rem;"></p>
          <ul class="quickview-specs-list">
            <li><span>Caliber Movement</span><span id="qv-movement">-</span></li>
            <li><span>Case Material</span><span id="qv-case">-</span></li>
            <li><span>Diameter</span><span id="qv-diameter">-</span></li>
            <li><span>Strap / Bracelet</span><span id="qv-strap">-</span></li>
            <li><span>Water Resistance</span><span id="qv-water">-</span></li>
          </ul>
          <div style="display: flex; gap: 1rem; align-items: center; margin-top: auto; padding-top: 1rem;">
            <button id="qv-add-to-bag" class="btn btn--primary" style="flex: 1;">
              <span class="material-icons" aria-hidden="true">shopping_bag</span>
              <span>Add to Bag</span>
            </button>
            <a id="qv-view-full" href="#" class="btn btn--secondary">Full Details</a>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('quickview-close-btn');
    const closeQuickView = () => {
      modal.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    };

    closeBtn.addEventListener('click', closeQuickView);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeQuickView();
      }
    });
  }

  function openQuickView(id) {
    const product = typeof getProductById === 'function' ? getProductById(id) : null;
    if (!product) return;

    document.getElementById('qv-img').src = product.image;
    document.getElementById('qv-img').alt = product.name;
    document.getElementById('qv-collection').textContent = product.collectionName || 'Haute Horlogerie';
    document.getElementById('qv-title').textContent = product.name;
    document.getElementById('qv-price').textContent = product.formattedPrice || '$' + product.price.toLocaleString();
    document.getElementById('qv-desc').textContent = product.description;
    document.getElementById('qv-movement').textContent = product.movement;
    document.getElementById('qv-case').textContent = product.caseMaterial;
    document.getElementById('qv-diameter').textContent = product.caseDiameter;
    document.getElementById('qv-strap').textContent = product.strapMaterial;
    document.getElementById('qv-water').textContent = product.waterResistance;
    document.getElementById('qv-view-full').href = `./product.html?id=${product.id}`;

    const addBtn = document.getElementById('qv-add-to-bag');
    addBtn.onclick = () => {
      if (window.CartStore) window.CartStore.addToCart(product.id, 1);
      modal.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    };

    modal.classList.add('is-active');
    document.body.classList.add('menu-open');
  }

  // Global delegation for quickview triggers
  document.body.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-quickview-id]');
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      openQuickView(btn.getAttribute('data-quickview-id'));
    }
  });
}

// 16. Find Your Timepiece Interactive Discovery Engine (Prompt Sec 4.7)
function initHomepageDiscovery() {
  const resultsContainer = document.getElementById('find-results-grid');
  const countEl = document.getElementById('find-results-count');
  const resetBtn = document.getElementById('find-reset-btn');

  if (!resultsContainer) return;

  const collectionSel = document.getElementById('find-collection');
  const priceSel = document.getElementById('find-price');
  const movementSel = document.getElementById('find-movement');
  const caseSel = document.getElementById('find-case');
  const dialSel = document.getElementById('find-dial');
  const strapSel = document.getElementById('find-strap');

  function updateResults() {
    const filters = {
      collection: collectionSel?.value || 'all',
      priceRange: priceSel?.value || 'all',
      movement: movementSel?.value || 'all',
      caseMaterial: caseSel?.value || 'all',
      dialColor: dialSel?.value || 'all',
      strapType: strapSel?.value || 'all'
    };

    const filtered = typeof filterProducts === 'function' ? filterProducts(filters) : (window.STACKLY_PRODUCTS || []);

    if (countEl) {
      countEl.textContent = `${filtered.length} Timepiece${filtered.length === 1 ? '' : 's'} Available`;
    }

    if (filtered.length === 0) {
      resultsContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem;" class="glass-panel">
          <span class="material-icons" style="font-size: 48px; color: var(--champagne-gold); margin-bottom: 1rem;" aria-hidden="true">search_off</span>
          <h3>No matching timepieces found</h3>
          <p style="color: var(--text-secondary); margin: 0.8rem 0 1.5rem 0;">Adjust or reset the search parameters above to view available atelier references.</p>
          <button id="find-empty-reset-btn" class="btn btn--secondary btn--sm">Reset Filters</button>
        </div>
      `;
      document.getElementById('find-empty-reset-btn')?.addEventListener('click', resetFilters);
    } else {
      resultsContainer.innerHTML = filtered.map(p => renderWatchCardHtml(p)).join('');
      if (window.CartStore) window.CartStore.updateHeaderBadges();
    }
  }

  function resetFilters() {
    if (collectionSel) collectionSel.value = 'all';
    if (priceSel) priceSel.value = 'all';
    if (movementSel) movementSel.value = 'all';
    if (caseSel) caseSel.value = 'all';
    if (dialSel) dialSel.value = 'all';
    if (strapSel) strapSel.value = 'all';
    updateResults();
  }

  [collectionSel, priceSel, movementSel, caseSel, dialSel, strapSel].forEach(sel => {
    if (sel) sel.addEventListener('change', updateResults);
  });

  if (resetBtn) resetBtn.addEventListener('click', resetFilters);

  // Initial load
  updateResults();
}

// 17. Animated Statistics Counters (Prompt Sec 4.9)
function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-counter-number[data-target]');
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const prefix = el.getAttribute('data-prefix') || '';
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1600;
        const start = performance.now();

        function step(now) {
          const progress = Math.min((now - start) / duration, 1);
          const easeOut = 1 - Math.pow(1 - progress, 3);
          const current = Math.floor(easeOut * target);
          el.textContent = `${prefix}${current}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = `${prefix}${target}${suffix}`;
          }
        }
        requestAnimationFrame(step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

// 18. Editorial Monograph Reader Modal (Prompt Sec 10)
const EDITORIAL_ARTICLES = {
  'tourbillons': {
    title: 'The Architecture of Flying Tourbillons',
    category: 'Watchmaking & Horology',
    date: 'Autumn Edition 2026',
    image: './images/journal-horology.webp',
    content: `
      <p>Conceived in 1801 by Abraham-Louis Breguet to counteract the disruptive pull of Earth’s gravitational field on sensitive hairsprings, the tourbillon remains the pinnacle of mechanical micromechanics. However, the contemporary flying tourbillon represents a dramatic evolutionary leap: by eliminating the traditional upper bridge, the entire 0.28-gram carriage appears to float in mid-air.</p>
      <p>Inside the STACKLY atelier, each cantilevered tourbillon cage is milled from Grade 5 titanium. Operating at 28,800 vibrations per hour (4 Hz), the cage executes one complete 360-degree rotation every 60 seconds. This continual rotation averages out positional timing variances across vertical orientations, guaranteeing supreme chronometric stability.</p>
      <p>Hand-finishing the twenty-eight components comprising the tourbillon assembly requires over 180 hours of manual labor by our master watchmakers. Every interior angle is beveled using natural gentian wood pegs charged with diamond paste, producing mirror-polished reflections that industrial machines simply cannot achieve.</p>
    `
  },
  'quartz-vs-mechanical': {
    title: 'Mechanical Movements Versus Quartz: The Soul of Horology',
    category: 'Mechanical vs Quartz Watches',
    date: 'Summer Edition 2026',
    image: './images/journal-movements.webp',
    content: `
      <p>While quartz oscillators derive their temporal cadence from electrical pulses passing through synthetic crystals, mechanical horology represents an uninterrupted kinetic legacy powered solely by the coiled potential energy of a mainspring.</p>
      <p>A fine mechanical watch does not measure time as an abstract digital calculation, but as an intimate tactile continuum. The sweeping second hand glides fluidly across the dial, driven by an intricate gear train and escapement that has preserved centuries of human ingenuity.</p>
      <p>Unlike disposable electronics subject to software obsolescence, a high-grade mechanical caliber is designed to endure for centuries. Given periodic ultrasonic maintenance and fresh synthetic lubricants every five years, a STACKLY timepiece becomes an immortal heirloom to be passed down through generations.</p>
    `
  },
  'chronographs': {
    title: 'Understanding Chronographs: Column Wheels & Vertical Clutches',
    category: 'Understanding Chronographs',
    date: 'Spring Edition 2026',
    image: './images/vanguard-chronograph.webp',
    content: `
      <p>The chronograph is one of horology’s most demanding complications. Far beyond a stopwatch, a haute horlogerie chronograph requires instant start, stop, and reset tactile commands without disturbing the underlying timekeeping train.</p>
      <p>In the STACKLY Vanguard Chronograph, we engineered an integrated column wheel with a vertical friction clutch. Unlike stamped cam-actuated mechanisms that cause the central chronograph hand to jump upon actuation, our vertical clutch clamps smoothly onto the fourth wheel pinion, ensuring zero start-stutter.</p>
      <p>Coupled with our flyback complication, a single press of the 4 o'clock reset pusher instantly returns the timing hands to zero and immediately recommences timing, allowing aviators and drivers to measure sequential intervals seamlessly.</p>
    `
  },
  'materials': {
    title: 'Noble Elements: Grade 5 Titanium, Sintered Ceramic & Solid 950 Platinum',
    category: 'Luxury Watch Materials',
    date: 'Winter Edition 2026',
    image: './images/craft-materials.webp',
    content: `
      <p>In contemporary haute horlogerie, metallurgical chemistry is as vital as micromechanical architecture. STACKLY selects only inert, biocompatible, and enduring noble materials that resist atmospheric degradation.</p>
      <p>Grade 5 Titanium (Ti-6Al-4V) provides twice the tensile strength of 316L stainless steel while reducing case weight by 45%. Sintered at 1,400°C under 2,000 bars of pressure, our obsidian zirconium oxide ceramics reach a hardness of 1,500 Vickers, rendering bezels virtually scratchproof.</p>
      <p>For our high complication references, solid 950 platinum offers an authoritative heft on the wrist and an immutable silvery-white luster that never tarnishes or oxidizes throughout a patron's lifetime.</p>
    `
  },
  'care-guide': {
    title: 'Essential Watch-Care: Preserving Chronometric Longevity',
    category: 'Watch-Care Guides',
    date: 'Year-Round Guidance',
    image: './images/services-care.webp',
    content: `
      <p>Caring for a fine mechanical watch requires simple yet disciplined rituals. Keep your timepiece away from powerful magnetic fields such as smartphone speakers, induction stovetops, and magnetic clasps, which can magnetize the delicate balance spring.</p>
      <p>Always verify that the winding crown is completely screwed down or pushed flush against the case before any contact with moisture. Even with 50-meter water resistance, thermal shocks from saunas or hot tubs can cause gaskets to expand unevenly.</p>
      <p>For manual-wind calibers, wind smoothly at approximately the same time each morning until you feel mild mechanical resistance; never force the crown past its natural stop. For automatics, an initial 25 manual turns primes the mainspring for optimal kinetic efficiency.</p>
    `
  },
  'sartorial-styling': {
    title: 'Harmonizing Bespoke Tailoring & Horology',
    category: 'Styling & Occasions',
    date: 'Autumn Edition 2026',
    image: './images/journal-styling.webp',
    content: `
      <p>A gentleman or lady’s timepiece communicates personal discretion before a single word is spoken. Understanding the harmony between sleeve cuff diameter, metal finishes, and strap leather is fundamental to refined sartorial elegance.</p>
      <p>For black-tie occasions, an ultra-thin reference like the STACKLY Elysium or Aethelgard Classic slips effortlessly beneath French double cuffs. Clean grand feu enamel dials and black alligator straps offer quiet sovereignty without ostentation.</p>
      <p>For executive boardroom meetings or weekend retreats, titanium chronographs and GMT dual-time references effortlessly bridge formal tailoring with modern international travel.</p>
    `
  },
  'collecting': {
    title: 'The Art of Watch Collecting: Provenance & Independent Horology',
    category: 'Watch Collecting',
    date: 'Collector Edition 2026',
    image: './images/imperium-platinum.webp',
    content: `
      <p>Entering the realm of fine watch collecting is a journey of intellectual discovery. True collectors seek out pieces defined not merely by ubiquitous marketing, but by artisanal scarcity, provenance, and uncompromising hand-finishing.</p>
      <p>Preserving original documentation, certificates of origin, and bespoke presentation cases is essential to safeguarding long-term secondary market value. Every STACKLY timepiece is permanently recorded in our private Geneva atelier archives under its unique individual serial number.</p>
    `
  },
  'movement-tech': {
    title: 'Movement Technology: Escapement Friction & Twin-Barrel Autonomy',
    category: 'Movement Technology',
    date: 'Technical Edition 2026',
    image: './images/craft-movement.webp',
    content: `
      <p>At the beating heart of every STACKLY caliber is a balance spring oscillating at 28,800 beats per hour. Maintaining steady amplitude over three to seven days requires innovative energy management.</p>
      <p>By implementing twin series-coupled mainspring barrels, torque is distributed evenly throughout the entire 72 to 168-hour power reserve. This prevents the timing drop-off common in single-barrel calibers as the spring winds down.</p>
      <p>Micro-adjusting regulating weights on the variable-inertia balance rim allow our watchmakers to regulate rate deviations to within -2/+2 seconds per day.</p>
    `
  },
  'future-horology': {
    title: 'Future Innovations in Timekeeping: Modern Horological Horizons',
    category: 'Future Innovations in Timekeeping',
    date: 'Research Edition 2026',
    image: './images/craft-dial.webp',
    content: `
      <p>What is the future of an art form whose core mechanisms were perfected two centuries ago? The answer lies in the synthesis of micro-computational parametric design with ancestral finishing methods.</p>
      <p>At STACKLY, generative 3D modeling allows us to shave away structural material to microscopic thresholds, maximizing structural rigidity while creating transparent Caliber ST-01 tourbillons that redefine skeletonized aesthetics.</p>
    `
  }
};

function initArticleReaderModal() {
  let modal = document.getElementById('article-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'article-modal';
    modal.className = 'article-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-label', 'Editorial Article Reader');
    modal.innerHTML = `
      <div class="article-modal-card">
        <button class="quickview-close-btn" id="article-modal-close-btn" aria-label="Close Article">
          <span class="material-icons" aria-hidden="true">close</span>
        </button>
        <div style="margin-bottom: 2rem;">
          <span id="article-modal-category" class="section-eyebrow">Horological Essay</span>
          <h2 id="article-modal-title" style="font-size: 2.2rem; margin: 0.5rem 0;">Article Title</h2>
          <div style="display: flex; gap: 1.5rem; color: var(--text-muted); font-size: 0.82rem;">
            <span id="article-modal-date">Date</span>
            <span>&bull;</span>
            <span>STACKLY Atelier Monographs</span>
          </div>
        </div>
        <img id="article-modal-img" src="" alt="Article Photograph" style="width: 100%; max-height: 380px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border); margin-bottom: 2rem;">
        <div id="article-modal-content" class="article-modal-body"></div>
        <div style="margin-top: 2.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center;">
          <span style="font-size: 0.82rem; color: var(--text-muted);">&copy; STACKLY Horology Journal</span>
          <button id="article-modal-close-bottom" class="btn btn--secondary btn--sm">Close Monograph</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = document.getElementById('article-modal-close-btn');
    const closeBottomBtn = document.getElementById('article-modal-close-bottom');
    const closeModal = () => {
      modal.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    };

    closeBtn.addEventListener('click', closeModal);
    closeBottomBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-active')) {
        closeModal();
      }
    });
  }

  function openArticle(key) {
    const article = EDITORIAL_ARTICLES[key] || EDITORIAL_ARTICLES['tourbillons'];
    document.getElementById('article-modal-title').textContent = article.title;
    document.getElementById('article-modal-category').textContent = article.category;
    document.getElementById('article-modal-date').textContent = article.date;
    document.getElementById('article-modal-img').src = article.image;
    document.getElementById('article-modal-img').alt = article.title;
    document.getElementById('article-modal-content').innerHTML = article.content;

    modal.classList.add('is-active');
    document.body.classList.add('menu-open');
  }

  document.body.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-read-article]');
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      const articleKey = trigger.getAttribute('data-read-article');
      openArticle(articleKey);
    }
  });
}

// Expose helpers globally
if (typeof window !== 'undefined') {
  window.renderWatchCardHtml = renderWatchCardHtml;
}
