/**
 * STACKLY LUXURY WATCHES — Authentication & Client Session Store
 * Handles registered demo accounts, role-based demonstration routing,
 * profile synchronization, and session protection.
 */

// const DEFAULT_DEMO_ACCOUNTS = [
//   {
//     name: 'Lord Sterling',
//     email: 'client@stackly-horology.com',
//     phone: '+1 (555) 234-5678',
//     password: 'Monochrome2026!',
//     role: 'user'
//   },
//   {
//     name: 'Boutique Director',
//     email: 'director@stackly-horology.com',
//     phone: '+41 22 819 9000',
//     password: 'Atelier2026!',
//     role: 'admin'
//   }
// ];

const AuthStore = {
  getUsers() {
    try {
      const stored = localStorage.getItem('stacklyUsers');
      if (stored) return JSON.parse(stored);
      localStorage.setItem('stacklyUsers', JSON.stringify(DEFAULT_DEMO_ACCOUNTS));
      return DEFAULT_DEMO_ACCOUNTS;
    } catch (e) {
      return DEFAULT_DEMO_ACCOUNTS;
    }
  },

  getUser() {
    try {
      const session = localStorage.getItem('stacklyUser');
      if (session) return JSON.parse(session);
      const email = localStorage.getItem('userEmail');
      const name = localStorage.getItem('userName');
      const role = localStorage.getItem('userRole') || 'user';
      if (!email) return null;
      return { email, name: name || 'Valued Client', role };
    } catch (e) {
      return null;
    }
  },

  isLoggedIn() {
    return !!this.getUser();
  },

  isAdmin() {
    const user = this.getUser();
    return user && user.role === 'admin';
  },

  login(email, password, role = 'user') {
    const users = this.getUsers();
    const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    // In demo environment: if account exists, verify password; if valid demo user/admin, proceed
    if (existing && existing.password !== password) {
      return { success: false, message: 'Invalid password. Please check your credentials.' };
    }

    const userName = existing ? existing.name : (role === 'admin' ? 'Boutique Director' : 'Valued Client');
    const assignedRole = role || (existing ? existing.role : 'user');
    const userObj = { name: userName, email: email, role: assignedRole };

    try {
      localStorage.setItem('stacklyUser', JSON.stringify(userObj));
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', email);
      localStorage.setItem('userRole', assignedRole);
      this.updateHeaderAuth();
      return { success: true, user: userObj };
    } catch (e) {
      return { success: false, message: 'Unable to save demonstration session.' };
    }
  },

  register(name, email, phone, password, role = 'user') {
    const users = this.getUsers();
    const duplicate = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (duplicate) {
      return { success: false, message: 'An account with this email address is already registered.' };
    }

    const newUser = { name, email, phone, password, role };
    users.push(newUser);

    try {
      localStorage.setItem('stacklyUsers', JSON.stringify(users));
      return { success: true, user: newUser };
    } catch (e) {
      return { success: false, message: 'Failed to record demonstration account.' };
    }
  },

  logout() {
    try {
      localStorage.removeItem('stacklyUser');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      localStorage.removeItem('userRole');
      this.updateHeaderAuth();
      window.location.href = './login.html'; // Prompt Section 16: Redirect logout to login.html
    } catch (e) {
      window.location.href = './login.html';
    }
  },

  updateHeaderAuth() {
    const user = this.getUser();
    const authLinks = document.querySelectorAll('.header-auth-link');

    authLinks.forEach(link => {
      if (user) {
        const dest = user.role === 'admin' ? './admin-dashboard.html' : './user-dashboard.html';
        link.href = dest;
        link.innerHTML = `
          <span class="material-icons" aria-hidden="true">person</span>
          <span class="header-auth-text">${user.name.split(' ')[0]}</span>
        `;
        link.title = `Signed in as ${user.name} (${user.role === 'admin' ? 'Boutique Director' : 'Client'})`;
      } else {
        link.href = './login.html';
        link.innerHTML = `
          <span class="material-icons" aria-hidden="true">person</span>
          <span class="header-auth-text">Sign In</span>
        `;
        link.title = 'Sign In or Register';
      }
    });
  },

  guardPage(requiredRole = null) {
    const user = this.getUser();
    if (!user) {
      window.location.href = './login.html';
      return false;
    }
    if (requiredRole && user.role !== requiredRole) {
      if (user.role === 'admin') {
        window.location.href = './admin-dashboard.html';
      } else {
        window.location.href = './user-dashboard.html';
      }
      return false;
    }
    return true;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthStore.updateHeaderAuth();

  // Attach logout handlers
  document.querySelectorAll('[data-logout-button]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      AuthStore.logout();
    });
  });
});

window.AuthStore = AuthStore;
