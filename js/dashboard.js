/**
 * STACKLY LUXURY WATCHES — Dashboard Logic
 * Powers both User Dashboard and Admin Dashboard demonstrations.
 * Pure Vanilla JS, responsive tabs, localStorage integration.
 * NO Three.js or 3D scene code.
 */

// Sample seed demo orders if none exist
const DEFAULT_DEMO_ORDERS = [
  {
    id: 'STK-89241',
    date: '2026-09-14',
    items: [
      { id: 'chronos-type-0', name: 'CHRONOS TYPE-0', price: 48500, quantity: 1 }
    ],
    total: 48500,
    status: 'Insured Transit',
    tracking: 'FEDEX-PRIORITY-981024',
    deliveryMethod: 'White-Glove Armored Courier'
  },
  {
    id: 'STK-77192',
    date: '2026-06-22',
    items: [
      { id: 'aethelgard-classic', name: 'Aethelgard Classic', price: 14200, quantity: 1 }
    ],
    total: 14200,
    status: 'Delivered',
    tracking: 'FEDEX-PRIORITY-443210',
    deliveryMethod: 'Complimentary Insured Courier'
  }
];

const DashboardManager = {
  getOrders() {
    try {
      const stored = localStorage.getItem('stacklyOrders');
      if (stored) return JSON.parse(stored);
      // Seed default orders for demonstration
      localStorage.setItem('stacklyOrders', JSON.stringify(DEFAULT_DEMO_ORDERS));
      return DEFAULT_DEMO_ORDERS;
    } catch (e) {
      return DEFAULT_DEMO_ORDERS;
    }
  },

  addOrder(order) {
    const orders = this.getOrders();
    orders.unshift(order);
    localStorage.setItem('stacklyOrders', JSON.stringify(orders));
  },

  // Initialize Tab Switcher & Mobile Drawer
  initTabs() {
    const navItems = document.querySelectorAll('[data-dashboard-tab]');
    const tabPanes = document.querySelectorAll('.dashboard-pane');
    const contentArea = document.querySelector('.dashboard-content-area');
    const sidebar = document.querySelector('.dashboard-sidebar');

    // Ensure Drawer Backdrop exists
    let backdrop = document.querySelector('.dashboard-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'dashboard-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      const layout = document.querySelector('.dashboard-layout');
      if (layout) {
        layout.insertBefore(backdrop, layout.firstChild);
      } else {
        document.body.appendChild(backdrop);
      }
    }

    const closeMobileSidebar = () => {
      if (sidebar) sidebar.classList.remove('is-mobile-open');
      if (backdrop) backdrop.classList.remove('is-active');
      document.body.classList.remove('menu-open');
    };

    const openMobileSidebar = () => {
      if (sidebar) sidebar.classList.add('is-mobile-open');
      if (backdrop) backdrop.classList.add('is-active');
      document.body.classList.add('menu-open');
    };

    navItems.forEach(item => {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-dashboard-tab');

        navItems.forEach(n => n.classList.remove('is-active'));
        tabPanes.forEach(p => p.classList.remove('is-active'));

        item.classList.add('is-active');
        const targetPane = document.getElementById(targetId);
        if (targetPane) {
          targetPane.classList.add('is-active');
          if (contentArea) {
            contentArea.scrollTo({ top: 0, behavior: 'smooth' });
          }
          if (targetId === 'admin-tab-overview' && typeof this.renderAdminCanvasChart === 'function') {
            setTimeout(() => this.renderAdminCanvasChart(), 50);
          }
        }

        // Close mobile drawer if open
        if (window.innerWidth <= 1024) {
          closeMobileSidebar();
        }
      });
    });

    // Mobile sidebar toggle
    const toggleBtn = document.querySelector('.dashboard-menu-toggle');
    if (toggleBtn && sidebar) {
      toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (sidebar.classList.contains('is-mobile-open')) {
          closeMobileSidebar();
        } else {
          openMobileSidebar();
        }
      });
    }

    // Sidebar close buttons
    document.querySelectorAll('.dashboard-sidebar-close').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        closeMobileSidebar();
      });
    });

    // Backdrop click closes drawer
    if (backdrop) {
      backdrop.addEventListener('click', closeMobileSidebar);
    }

    // Escape key closes drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar && sidebar.classList.contains('is-mobile-open')) {
        closeMobileSidebar();
      }
    });

    // Setup independent scroll containment
    this.initScrollIsolation();
  },

  // Isolate mouse wheel events on desktop so side nav and body never cross-scroll
  initScrollIsolation() {
    const sidebar = document.querySelector('.dashboard-sidebar');
    const contentArea = document.querySelector('.dashboard-content-area');

    const isolateElement = (el) => {
      if (!el) return;
      el.addEventListener('wheel', (e) => {
        if (window.innerWidth <= 1024) return;
        const delta = e.deltaY;
        const up = delta < 0;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;
        const scrollTop = el.scrollTop;

        if (!up && delta > scrollHeight - clientHeight - scrollTop) {
          el.scrollTop = scrollHeight;
          e.preventDefault();
        } else if (up && -delta > scrollTop) {
          el.scrollTop = 0;
          e.preventDefault();
        }
      }, { passive: false });
    };

    isolateElement(sidebar);
    isolateElement(contentArea);
  },

  // Render User Dashboard
  renderUserDashboard() {
    const user = window.AuthStore ? window.AuthStore.getUser() : null;
    const nameEl = document.getElementById('user-profile-name');
    const emailEl = document.getElementById('user-profile-email');
    const welcomeEl = document.getElementById('user-welcome-name');

    if (nameEl && user) nameEl.textContent = user.name;
    if (emailEl && user) emailEl.textContent = user.email;
    if (welcomeEl && user) welcomeEl.textContent = user.name;

    // Render Orders
    const orders = this.getOrders();
    const ordersList = document.getElementById('user-orders-table-body');
    const recentOrdersContainer = document.getElementById('user-recent-orders-list');

    if (ordersList) {
      if (orders.length === 0) {
        ordersList.innerHTML = `<tr><td colspan="6" class="table-empty">No orders placed yet.</td></tr>`;
      } else {
        ordersList.innerHTML = orders.map(o => {
          const firstItem = o.items[0];
          const imgPath = firstItem && firstItem.id ? `./images/${firstItem.id}.webp` : './images/chronos-type-0.webp';
          return `
          <tr>
            <td><strong>#${o.id}</strong></td>
            <td>${o.date}</td>
            <td>
              <div style="display: flex; align-items: center; gap: 0.8rem;">
                <img src="${imgPath}" alt="${firstItem?.name || 'Timepiece'}" style="width: 44px; height: 44px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border);">
                <div>
                  <strong>${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}</strong>
                  <small style="display: block; color: var(--text-muted); font-size: 0.75rem;">Armored White-Glove Dispatch</small>
                </div>
              </div>
            </td>
            <td style="color: var(--champagne-gold); font-family: var(--font-serif);">$${o.total.toLocaleString()}</td>
            <td><span class="status-badge status-${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span></td>
            <td><button class="btn btn--outline btn--sm" onclick="window.CartStore?.showToast('Invoice Downloaded', 'Official Tax Invoice #${o.id} PDF saved.');">PDF Invoice</button></td>
          </tr>
        `;
        }).join('');
      }
    }

    if (recentOrdersContainer) {
      recentOrdersContainer.innerHTML = orders.slice(0, 3).map(o => {
        const firstItem = o.items[0];
        const imgPath = firstItem && firstItem.id ? `./images/${firstItem.id}.webp` : './images/chronos-type-0.webp';
        return `
        <div class="dashboard-order-card" style="display: flex; gap: 1rem; align-items: center;">
          <img src="${imgPath}" alt="${firstItem?.name || 'Timepiece'}" style="width: 64px; height: 64px; object-fit: cover; border-radius: var(--radius-sm); border: 1px solid var(--border-gold); flex-shrink: 0;">
          <div style="flex-grow: 1;">
            <div class="order-card-header" style="margin-bottom: 0.3rem;">
              <div>
                <span class="order-card-id">Order #${o.id}</span>
                <span class="order-card-date">${o.date}</span>
              </div>
              <span class="status-badge status-${o.status.toLowerCase().replace(/\s+/g, '-')}">${o.status}</span>
            </div>
            <div class="order-card-body">
              <p class="order-card-items" style="margin: 0; font-size: 0.88rem;">${o.items.map(i => `${i.name} &times; ${i.quantity}`).join(', ')}</p>
              <p class="order-card-total" style="margin-top: 0.2rem; font-size: 0.82rem;">Total: <strong style="color: var(--champagne-gold);">$${o.total.toLocaleString()}</strong></p>
            </div>
          </div>
        </div>
      `;
      }).join('');
    }

    // Render Wishlist in User Dashboard
    this.renderUserWishlist();

    // Service request form
    const serviceForm = document.getElementById('service-request-form');
    if (serviceForm) {
      serviceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        window.CartStore.showToast('Service Request Logged', 'A concierge specialist will contact you within 24 hours.');
        serviceForm.reset();
      });
    }

    // Profile Settings Form
    const settingsForm = document.getElementById('user-settings-form');
    if (settingsForm) {
      const nameInput = document.getElementById('settings-name-input');
      const emailInput = document.getElementById('settings-email-input');
      if (nameInput && user) nameInput.value = user.name;
      if (emailInput && user) emailInput.value = user.email;

      settingsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const updatedName = nameInput ? nameInput.value.trim() : user.name;
        const updatedEmail = emailInput ? emailInput.value.trim() : user.email;
        const updatedUser = { ...user, name: updatedName, email: updatedEmail };
        localStorage.setItem('stacklyUser', JSON.stringify(updatedUser));
        localStorage.setItem('userName', updatedName);
        localStorage.setItem('userEmail', updatedEmail);
        if (nameEl) nameEl.textContent = updatedName;
        if (emailEl) emailEl.textContent = updatedEmail;
        if (welcomeEl) welcomeEl.textContent = updatedName;
        if (window.AuthStore) window.AuthStore.updateHeaderAuth();
        window.CartStore.showToast('Settings Saved', 'Your profile preferences have been updated.');
      });
    }
  },

  renderUserWishlist() {
    const container = document.getElementById('dashboard-wishlist-grid');
    if (!container) return;

    const wishlist = window.CartStore ? window.CartStore.getWishlist() : [];
    if (wishlist.length === 0) {
      container.innerHTML = `
        <div class="dashboard-empty-state">
          <span class="material-icons" style="font-size: 48px; color: var(--champagne-gold);" aria-hidden="true">favorite_border</span>
          <h3>Your Wishlist is Empty</h3>
          <p>Explore our master watch collections and save your favorite timepieces.</p>
          <a href="./collections.html" class="btn btn--secondary btn--sm">Explore Collections</a>
        </div>
      `;
      return;
    }

    container.innerHTML = wishlist.map(id => {
      const p = window.getProductById(id);
      if (!p) return '';
      return `
        <div class="dashboard-wishlist-card">
          <div class="dashboard-wishlist-thumb">
            <img src="${p.image}" alt="${p.name}">
          </div>
          <div class="dashboard-wishlist-info">
            <h4>${p.name}</h4>
            <span class="price" style="color: var(--champagne-gold);">${p.formattedPrice}</span>
            <div class="dashboard-wishlist-actions">
              <button class="btn btn--secondary btn--sm" data-add-to-bag="${p.id}">Move to Bag</button>
              <button class="btn-icon-subtle" data-wishlist-id="${p.id}" title="Remove" aria-label="Remove ${p.name}">
                <span class="material-icons" aria-hidden="true">delete</span>
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Attach Wishlist Actions
    container.querySelectorAll('[data-add-to-bag]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-add-to-bag');
        if (window.CartStore) {
          window.CartStore.addItem(prodId, 1);
        }
      });
    });

    container.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const prodId = btn.getAttribute('data-wishlist-id');
        if (window.CartStore) {
          window.CartStore.removeFromWishlist(prodId);
          this.renderUserWishlist();
        }
      });
    });
  },

  // Render Native Canvas KPI Chart
  renderAdminCanvasChart() {
    const canvas = document.getElementById('admin-revenue-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high-DPI scaling with safe fallback
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const containerW = canvas.parentElement ? canvas.parentElement.clientWidth : 600;
    const width = rect.width > 50 ? rect.width : (containerW || 600);
    const height = 220;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    const padding = { top: 20, right: 30, bottom: 40, left: 60 };

    ctx.clearRect(0, 0, width, height);

    // Monthly data points ($ thousands)
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
    const values = [240, 310, 280, 420, 390, 480, 520];
    const maxVal = 600;

    // Draw horizontal grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.font = '11px Manrope, sans-serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.textAlign = 'right';

    for (let i = 0; i <= 3; i++) {
      const yVal = (maxVal / 3) * i;
      const yPos = height - padding.bottom - ((height - padding.top - padding.bottom) * (yVal / maxVal));
      ctx.beginPath();
      ctx.moveTo(padding.left, yPos);
      ctx.lineTo(width - padding.right, yPos);
      ctx.stroke();
      ctx.fillText(`$${yVal}k`, padding.left - 10, yPos + 4);
    }

    // Plot line and gradient
    const chartW = width - padding.left - padding.right;
    const stepX = chartW / (months.length - 1);

    const points = values.map((val, idx) => ({
      x: padding.left + (idx * stepX),
      y: height - padding.bottom - ((height - padding.top - padding.bottom) * (val / maxVal))
    }));

    // Area fill gradient
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(197, 160, 89, 0.28)');
    gradient.addColorStop(1, 'rgba(197, 160, 89, 0.00)');

    ctx.beginPath();
    ctx.moveTo(points[0].x, height - padding.bottom);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.lineTo(points[points.length - 1].x, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Line stroke
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(pt => ctx.lineTo(pt.x, pt.y));
    ctx.strokeStyle = '#c5a059';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // Data points & X-axis labels
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';

    points.forEach((pt, idx) => {
      // Circle node
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = '#c5a059';
      ctx.fill();
      ctx.strokeStyle = '#0c0d0e';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Month text
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.fillText(months[idx], pt.x, height - 15);
    });
  },

  // Render Admin Dashboard
  renderAdminDashboard() {
    const products = typeof getCatalog === 'function' ? getCatalog() : (window.STACKLY_PRODUCTS || []);
    const orders = this.getOrders();
    const users = window.AuthStore ? window.AuthStore.getUsers() : [];

    // Stats
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 482900);
    const revEl = document.getElementById('admin-stat-revenue');
    const ordersEl = document.getElementById('admin-stat-orders');
    const productsEl = document.getElementById('admin-stat-products');

    if (revEl) revEl.textContent = `$${totalRevenue.toLocaleString()}`;
    if (ordersEl) ordersEl.textContent = orders.length.toString();
    if (productsEl) productsEl.textContent = products.length.toString();

    // Render Canvas KPI Chart
    this.renderAdminCanvasChart();
    window.addEventListener('resize', () => this.renderAdminCanvasChart());

    // Render Products Table
    const prodTable = document.getElementById('admin-products-table-body');
    if (prodTable) {
      prodTable.innerHTML = products.map((p, idx) => `
        <tr data-admin-prod-row="${p.id}">
          <td>
            <div class="table-product-cell">
              <img src="${p.image}" alt="${p.name}" class="table-product-thumb">
              <div>
                <strong>${p.name}</strong>
                <small style="color: var(--text-muted);">${p.collectionName}</small>
              </div>
            </div>
          </td>
          <td style="color: var(--champagne-gold); font-family: var(--font-serif);">${p.formattedPrice || '$' + p.price.toLocaleString()}</td>
          <td>${p.movementType || 'Mechanical'}</td>
          <td><span class="badge ${p.availability.includes('Limited') ? 'badge--highlight' : 'badge--muted'}">${p.availability.includes('Limited') ? 'Limited Edition' : 'In Stock'}</span></td>
          <td>
            <div style="display: flex; gap: 0.5rem;">
              <a href="./product.html?id=${p.id}" class="table-link" title="Preview Reference" aria-label="View ${p.name}">
                <span class="material-icons" aria-hidden="true">visibility</span>
              </a>
              <button class="table-link" onclick="DashboardManager.deleteProduct('${p.id}')" title="Delete Piece" aria-label="Delete ${p.name}">
                <span class="material-icons" style="color: #ff6b6b;" aria-hidden="true">delete</span>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    // Render Orders Table
    const ordTable = document.getElementById('admin-orders-table-body');
    if (ordTable) {
      ordTable.innerHTML = orders.map(o => `
        <tr>
          <td><strong>#${o.id}</strong></td>
          <td>${o.date}</td>
          <td>${o.items.map(i => i.name).join(', ')}</td>
          <td style="color: var(--champagne-gold);">$${o.total.toLocaleString()}</td>
          <td>
            <select class="admin-status-select form-select" style="padding: 0.3rem 0.6rem; font-size: 0.8rem;" data-order-id="${o.id}">
              <option value="Pending" ${o.status === 'Pending' ? 'selected' : ''}>Pending</option>
              <option value="Processing" ${o.status === 'Processing' ? 'selected' : ''}>Processing</option>
              <option value="Insured Transit" ${o.status === 'Insured Transit' ? 'selected' : ''}>Insured Transit</option>
              <option value="Delivered" ${o.status === 'Delivered' ? 'selected' : ''}>Delivered</option>
            </select>
          </td>
        </tr>
      `).join('');

      // Status change listener
      document.querySelectorAll('.admin-status-select').forEach(sel => {
        sel.addEventListener('change', () => {
          const ordId = sel.getAttribute('data-order-id');
          const newStatus = sel.value;
          const allOrders = DashboardManager.getOrders();
          const target = allOrders.find(x => x.id === ordId);
          if (target) {
            target.status = newStatus;
            localStorage.setItem('stacklyOrders', JSON.stringify(allOrders));
            if (window.CartStore) window.CartStore.showToast('Status Updated', `Order #${ordId} marked as ${newStatus}.`);
          }
        });
      });
    }

    // Render Patron Directory Table
    const custTable = document.getElementById('admin-customers-table-body');
    if (custTable) {
      custTable.innerHTML = users.map(u => `
        <tr>
          <td><strong>${u.name}</strong></td>
          <td>${u.email}</td>
          <td>${u.phone || '+1 (555) 000-0000'}</td>
          <td><span class="badge ${u.role === 'admin' ? 'badge--highlight' : 'badge--muted'}">${u.role === 'admin' ? 'Atelier Director' : 'Client Patron'}</span></td>
          <td><span style="color: #4cd964; font-size: 0.8rem;">Active Session</span></td>
        </tr>
      `).join('');
    }

    // Add Product Form Listener
    const addProdForm = document.getElementById('admin-add-product-form');
    if (addProdForm) {
      addProdForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('add-prod-name')?.value.trim();
        const price = parseInt(document.getElementById('add-prod-price')?.value, 10);
        const collection = document.getElementById('add-prod-collection')?.value;
        const movement = document.getElementById('add-prod-movement')?.value;
        const caseMaterial = document.getElementById('add-prod-case')?.value;
        const image = document.getElementById('add-prod-image')?.value || './images/chronos-type-0.webp';

        if (!name || isNaN(price)) return;

        const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        const newProduct = {
          id,
          name,
          tagline: 'Artisanal Commission Reference',
          collection: collection || 'limited',
          collectionName: collection === 'sport' ? 'Sport & Chronograph' : collection === 'dress' ? 'Classic Dress Watches' : 'Limited Editions',
          price,
          formattedPrice: '$' + price.toLocaleString(),
          image,
          gallery: [image],
          movement: movement || 'Mechanical Automatic',
          movementType: 'automatic',
          caseMaterial: caseMaterial || 'Grade 5 Titanium',
          caseType: 'titanium',
          dialColor: 'black',
          strapMaterial: 'Hand-Stitched Alligator Leather',
          strapType: 'alligator',
          caseDiameter: '41 mm',
          caseThickness: '10.5 mm',
          waterResistance: '50 m / 5 ATM',
          powerReserve: '65 Hours',
          frequency: '28,800 vph (4 Hz)',
          availability: 'In Stock — Atelier Commission',
          bestseller: false,
          isNewArrival: true,
          variants: ['black', 'gold'],
          rating: 5.0,
          reviewsCount: 1,
          description: `Bespoke reference crafted to order. Engineered in ${caseMaterial} with high-precision horological finishing.`
        };

        const currentCatalog = typeof getCatalog === 'function' ? [...getCatalog()] : [];
        currentCatalog.unshift(newProduct);
        localStorage.setItem('stacklyCustomProducts', JSON.stringify(currentCatalog));

        if (window.CartStore) window.CartStore.showToast('Reference Created', `${name} has been added to catalog.`);
        addProdForm.reset();
        DashboardManager.renderAdminDashboard();
      });
    }
  },

  deleteProduct(id) {
    if (!confirm('Are you sure you wish to decommission this reference from the active demonstration catalog?')) return;
    const currentCatalog = typeof getCatalog === 'function' ? [...getCatalog()] : [];
    const updated = currentCatalog.filter(p => p.id !== id);
    localStorage.setItem('stacklyCustomProducts', JSON.stringify(updated));
    if (window.CartStore) window.CartStore.showToast('Reference Deleted', 'Timepiece removed from catalog.');
    this.renderAdminDashboard();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Page guards
  if (document.body.classList.contains('page-user-dashboard')) {
    if (window.AuthStore && !window.AuthStore.guardPage()) return;
    DashboardManager.initTabs();
    DashboardManager.renderUserDashboard();
  }

  if (document.body.classList.contains('page-admin-dashboard')) {
    if (window.AuthStore && !window.AuthStore.guardPage('admin')) return;
    DashboardManager.initTabs();
    DashboardManager.renderAdminDashboard();
  }
});

window.DashboardManager = DashboardManager;
