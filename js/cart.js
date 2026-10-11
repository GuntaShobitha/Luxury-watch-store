/**
 * STACKLY LUXURY WATCHES — Shopping Cart & Wishlist Management
 * Persists state seamlessly across all pages via localStorage.
 * Storage keys: 'stacklyCart', 'stacklyWishlist'
 */

// Cart & Wishlist Store
const CartStore = {
  getCart() {
    try {
      const data = localStorage.getItem('stacklyCart');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Storage access warning:', e);
      return [];
    }
  },

  saveCart(cart) {
    try {
      localStorage.setItem('stacklyCart', JSON.stringify(cart));
      this.updateHeaderBadges();
      window.dispatchEvent(new CustomEvent('stackly:cart-updated', { detail: { cart } }));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
  },

  getWishlist() {
    try {
      const data = localStorage.getItem('stacklyWishlist');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Storage access warning:', e);
      return [];
    }
  },

  saveWishlist(wishlist) {
    try {
      localStorage.setItem('stacklyWishlist', JSON.stringify(wishlist));
      this.updateHeaderBadges();
      window.dispatchEvent(new CustomEvent('stackly:wishlist-updated', { detail: { wishlist } }));
    } catch (e) {
      console.warn('Storage save warning:', e);
    }
  },

  // Add Item to Cart
  addToCart(productId, quantity = 1, options = {}) {
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    if (!product) return;

    const cart = this.getCart();
    const existingIndex = cart.findIndex(item => item.id === productId);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += quantity;
    } else {
      cart.push({
        id: productId,
        quantity: quantity,
        addedAt: new Date().toISOString(),
        options: options
      });
    }

    this.saveCart(cart);
    this.showToast(`Added to Bag`, `${product.name} has been added to your shopping bag.`);
  },

  // Remove Item from Cart
  removeFromCart(productId) {
    let cart = this.getCart();
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    cart = cart.filter(item => item.id !== productId);
    this.saveCart(cart);
    if (product) {
      this.showToast('Item Removed', `${product.name} was removed from your bag.`);
    }
  },

  // Update Cart Quantity
  updateQuantity(productId, delta) {
    const cart = this.getCart();
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.removeFromCart(productId);
    } else {
      this.saveCart(cart);
    }
  },

  // Toggle Wishlist Item
  toggleWishlist(productId) {
    const wishlist = this.getWishlist();
    const product = typeof getProductById === 'function' ? getProductById(productId) : null;
    const index = wishlist.indexOf(productId);

    if (index > -1) {
      wishlist.splice(index, 1);
      this.saveWishlist(wishlist);
      if (product) {
        this.showToast('Removed from Wishlist', `${product.name} removed from your saved pieces.`);
      }
      return false;
    } else {
      wishlist.push(productId);
      this.saveWishlist(wishlist);
      if (product) {
        this.showToast('Saved to Wishlist', `${product.name} added to your private wishlist.`);
      }
      return true;
    }
  },

  // Move Item from Wishlist to Cart
  moveWishlistToCart(productId) {
    this.addToCart(productId, 1);
    this.toggleWishlist(productId); // Removes from wishlist
  },

  // Calculate Totals
  getTotals() {
    const cart = this.getCart();
    let subtotal = 0;
    let itemCount = 0;

    cart.forEach(item => {
      const product = typeof getProductById === 'function' ? getProductById(item.id) : null;
      if (product) {
        subtotal += product.price * item.quantity;
        itemCount += item.quantity;
      }
    });

    const promoCode = sessionStorage.getItem('stacklyPromo');
    let discount = 0;
    if (promoCode === 'STACKLY10') {
      discount = subtotal * 0.10;
    }

    const shipping = 0; // Complimentary Insured Global Courier
    const total = subtotal - discount + shipping;

    return {
      subtotal,
      discount,
      shipping,
      total,
      itemCount,
      promoCode
    };
  },

  // Update Header Badges across pages
  updateHeaderBadges() {
    const cart = this.getCart();
    const wishlist = this.getWishlist();

    const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalWishlistCount = wishlist.length;

    document.querySelectorAll('.cart-count-badge').forEach(el => {
      el.textContent = totalCartCount;
      el.style.display = totalCartCount > 0 ? 'inline-flex' : 'none';
    });

    document.querySelectorAll('.wishlist-count-badge').forEach(el => {
      el.textContent = totalWishlistCount;
      el.style.display = totalWishlistCount > 0 ? 'inline-flex' : 'none';
    });

    // Update active state of wishlist buttons across the page
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const id = btn.getAttribute('data-wishlist-id');
      const isWishlisted = wishlist.includes(id);
      if (isWishlisted) {
        btn.classList.add('is-active');
        const icon = btn.querySelector('.material-icons, .material-symbols-outlined');
        if (icon) icon.textContent = 'favorite';
      } else {
        btn.classList.remove('is-active');
        const icon = btn.querySelector('.material-icons, .material-symbols-outlined');
        if (icon) icon.textContent = 'favorite_border';
      }
    });
  },

  // Luxury Toast Notification System
  showToast(title, message) {
    let container = document.getElementById('stackly-toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'stackly-toast-container';
      container.className = 'stackly-toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'stackly-toast';
    toast.innerHTML = `
      <div class="stackly-toast__header">
        <span class="material-icons stackly-toast__icon" aria-hidden="true">check_circle</span>
        <span class="stackly-toast__title">${title}</span>
      </div>
      <p class="stackly-toast__message">${message}</p>
    `;

    container.appendChild(toast);

    // Animate in
    setTimeout(() => toast.classList.add('is-visible'), 10);

    // Auto remove after 3.8s
    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3800);
  }
};

// Auto-initialize badge updates on DOM load
document.addEventListener('DOMContentLoaded', () => {
  CartStore.updateHeaderBadges();

  // Global event delegation for Wishlist toggles
  document.body.addEventListener('click', (e) => {
    const wishlistBtn = e.target.closest('[data-wishlist-id]');
    if (wishlistBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = wishlistBtn.getAttribute('data-wishlist-id');
      CartStore.toggleWishlist(productId);
    }

    const addToBagBtn = e.target.closest('[data-add-to-bag]');
    if (addToBagBtn) {
      e.preventDefault();
      e.stopPropagation();
      const productId = addToBagBtn.getAttribute('data-add-to-bag');
      CartStore.addToCart(productId, 1);
    }
  });
});

window.CartStore = CartStore;
