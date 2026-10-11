# STACKLY Luxury Watches — Flagship Horology Web Platform

A Swiss-inspired luxury timepiece boutique and editorial e-commerce platform built strictly with **semantic HTML5**, **modular CSS3**, and **Vanilla JavaScript**. Designed for high-end horological storytelling, micro-mechanical appreciation, and seamless static hosting (including GitHub Pages).

---

## 1. Project Overview & Brand Identity

- **Brand Name**: STACKLY Luxury Watches
- **Brand Positioning**: Precision craftsmanship, micro-mechanical innovation, timeless design, and exclusive collector allocations.
- **Visual Aesthetic**:
  - **Obsidian Black** (`#0a0b0d`) & **Deep Charcoal** (`#121418`)
  - **Champagne Gold** (`#c5a059`) & **Brushed Gold** (`#dfbe76`)
  - **Warm Ivory** (`#f7f5f0`) & **Muted Silver** (`#a3a8b0`)
- **Iconography**: Google Material Icons exclusively (`<span class="material-icons" aria-hidden="true">...</span>`).
- **Logo Standard**: Standardized logo across every viewport, navigation drawer, authentication card, and footer:
  ```html
  <a href="index.html" class="nav-logo" aria-label="STACKLY Luxury Watches home">
    <img src="./images/logo-dark.webp" alt="STACKLY Luxury Watches" class="nav-logo-img">
  </a>
  ```

---

## 2. Technical Architecture & Constraints

- **Zero Frameworks**: Built without React, Vue, Angular, Bootstrap, Tailwind CSS, jQuery, PHP, or Node.js.
- **100% Static & GitHub Pages Ready**: All asset links and navigation routes use relative paths (`./images/...`, `./css/...`, `./js/...`, `./*.html`).
- **Client-Side State Management**:
  - `CartStore` (`js/cart.js`): Persistent shopping bag, item quantities, promo codes, wishlist toggling, and toast alerts via `localStorage`.
  - `AuthStore` (`js/auth.js`): Role-based access control (`user` vs `admin`), route guarding via `guardPage()`, pre-seeded demo patrons, and persistent active sessions.
  - `CatalogStore` (`js/products.js`): 12 high-complication timepieces with dynamic runtime extensions (admin-created timepieces saved to `localStorage`).
  - `DashboardSimulator` (`js/dashboard.js`): Native 2D Canvas revenue charts, real-time order status toggling, and live catalog management.

---

## 3. Demo Credentials & Discount Code

For demonstration and quality assurance evaluation, the platform includes pre-seeded accounts:

| Portal Role | Registered Email | Password | Target Destination |
| :--- | :--- | :--- | :--- |
| **Private Patron** | `client@stackly-horology.com` | `Patron2026!` | `user-dashboard.html` |
| **Atelier Director** | `director@stackly-horology.com` | `Manufacture2026!` | `admin-dashboard.html` |

- **Role Dropdown on Login**: Selecting a role on `login.html` instantly populates the appropriate demo credentials.
- **Demonstration Promo Code**: Enter `STACKLY10` on `cart.html` to apply an automatic 10% privilege discount.

---

## 4. Complete Page Inventory & Section Map

### 1. Home Page (`index.html`) — 11 Sections
1. **Luxury Hero**: Cinematic presentation, gold typography, dual CTAs (*Explore Collection* & *Discover Our Craft*), and an interactive 3D caliber inspection canvas.
2. **Featured Collections**: Curated showcases for Signature Tourbillons, Automatic Calibers, Vanguard Chronographs, and Heritage Editions.
3. **Bestselling Timepieces**: Dynamic catalog cards with Quick-View modal trigger, one-click Wishlist toggle, and variant selectors.
4. **Craftsmanship**: Editorial breakdown of sapphire crystal, hand-finished bevels, platinum/titanium alloys, and water resistance.
5. **New Arrivals**: Spotlight on newly debuted calibers with direct cart-addition actions.
6. **The Art of Watchmaking**: Editorial narrative covering balance-wheel regulation, Côte de Genève finishing, and master casing.
7. **Find Your Timepiece**: Real-time multi-filter engine (Collection, Price Range, Movement, Case Material, Dial Color, Strap Type) with instant zero-reload catalog updates.
8. **Why Choose STACKLY**: Six core brand pillars highlighting 5-year manufacture warranties, bespoke concierge support, and insured courier transport.
9. **Brand Heritage & Animated Statistics**: Transparent horological milestones featuring dynamic numeric increment animations.
10. **Editorial & Testimonials**: Dual-format luxury horology care guides paired with client testimonials.
11. **Newsletter, CTA & Global Footer**: Validated email subscription box, comprehensive site sitemap, and regulatory demonstration disclosures.

### 2. About Page (`about.html`) — 9 Sections
1. **Brand Introduction Hero**: Editorial vision of Swiss horological traditions.
2. **Company Story**: Founding journey, independent manufacture autonomy, and workshop roots.
3. **Watchmaking Philosophy**: Deep dive into chronometric precision and aesthetic restraint.
4. **Design Vision**: Balance between classical proportions and architectural skeletonization.
5. **Craftsmanship & Materials**: Sourcing grade-5 titanium, 950 platinum, and anti-reflective sapphire crystals.
6. **Manufacturing Standards**: Tolerance testing under ISO-equivalent chronometer conditions.
7. **Brand Timeline**: Chronological journey spanning founding, first in-house tourbillon, and international salons.
8. **Achievements & Values**: Core commitments to ethical precious-metal sourcing and horological education.
9. **Curated CTA & Global Footer**: Direct access to bespoke consultations and collection exploration.

### 3. Collections Page (`collections.html`) — 9 Content Areas
1. **Collection Hero**: Dramatic header with horological philosophy and breadcrumbs.
2. **Interactive Filter & Explorer Grid**: Dynamic search, multi-faceted filtering, sorting (Price Low/High, Name, Bestsellers), and live count indicators.
3. **Automatic Calibers Area**: Curated presentation of self-winding daily companions.
4. **Chronograph Calibers Area**: High-precision split-second timers and tachymeter bezels.
5. **Dress Timepieces Area**: Ultra-thin profiles paired with alligator leather straps.
6. **Sports & Diver Timepieces Area**: 300m water-resistant diving watches with luminescent ceramic bezels.
7. **Gold & Precious Metals Area**: 18k Rose Gold and 950 Platinum masterpieces.
8. **Limited Editions & Heritage Area**: Rare numbered allocations and skeletonized exhibition movements.
9. **Collection CTA & Footer**: Client concierge assistance and site directory.

### 4. Product Details Page (`product.html`)
- **URL Parameter Driven**: Loads any timepiece via `?id=chronos-type-0`.
- **Keyboard-Accessible Image Gallery**: Main interactive viewport with clickable thumbnails.
- **Comprehensive Horological Specs**: Movement caliber, power reserve, frequency, case diameter, water resistance, lug width, and dial finishing.
- **Interactive Controls**: Dial variant selector, quantity adjuster, Add to Bag, Wishlist toggle, and stock status.
- **Tabs Interface**: Switch between Technical Caliber, Finishing & Craft, and Insured Delivery & Returns.
- **Related Timepieces**: Curated companion timepieces from the same horological family.

### 5. Services Page (`services.html`) — 9 Sections
1. **Hero**: High-touch manufacture service overview.
2. **Bespoke Consultation**: Private horological advising and custom allocations.
3. **Curated Selection Guidance**: Personalized matching for milestone gifts and collections.
4. **Preventive Care Advice**: Ultrasonic cleaning, demagnetization, and power-reserve maintenance.
5. **Complete Atelier Overhaul**: 6-step mechanical overhaul and pressure testing.
6. **Service Appointment Booking Form**: Client-side validated salon booking engine.
7. **Custom Strap Atelier**: Bespoke alligator, saffiano leather, and titanium bracelet tailoring.
8. **Armored & Insured Transit**: Global high-security transit and white-glove hand delivery.
9. **Support CTA & Global Footer**: Direct concierge phone and encrypted inquiry options.

### 6. Blog & Journal (`blog.html`) — 9 Editorial Categories
1. **Brand Stories**: The historical origins of haute horlogerie.
2. **Watchmaker Interviews**: Conversations with master complications regulators.
3. **Movement Guides**: Understanding tourbillons, perpetual calendars, and escapements.
4. **Care Advice**: Storage in winding boxes, avoiding thermal shock, and water resistance maintenance.
5. **Style Guides**: Matching case metals to black-tie attire and lifestyle settings.
6. **New Releases**: Technical unveiling of seasonal limited editions.
7. **Collector Insights**: Market liquidity and auction preservation of vintage calibers.
8. **Manufacture Features**: The chemistry of rhodium electroplating and hand anglage.
9. **Newsletter, Archive & Interactive Article Reader**: Full reading modal with rich typography triggered by any *Read Full Article* button.

### 7. Contact Page (`contact.html`) — 7 Sections
1. **Hero**: Concierge desk communication portal.
2. **Direct Contact Details**: Geneva Atelier, Paris Flagship, and London Private Salon addresses.
3. **Validated Inquiry Form**: Real-time client-side validation with demonstration response feedback.
4. **Private Concierge Appointment Booking**: Date, time, and salon selector for bespoke viewings.
5. **Customer Service FAQ**: Interactive accordion resolving inquiries regarding authenticity, service lead times, and payment.
6. **Global Salon Directory & Virtual Consultation**: Hours of operation and private video consultation links.
7. **Support CTA & Global Footer**: Direct access to horological representatives.

### 8. Client Authentication Pages
- **`login.html`**:
  - Role selector dropdown pre-filling demo accounts.
  - Password visibility toggle (`visibility` / `visibility_off`).
  - Remember device checkbox.
  - Redirects users to `user-dashboard.html` and admins to `admin-dashboard.html`.
- **`register.html`**:
  - Validated fields: Full Name, Email, Telephone, Password, and Password Confirmation.
  - Account role selector (`user` or `admin`).
  - Duplicate email prevention checks.
- **`forgot-password.html`**:
  - Standardized credential recovery simulation with instant feedback.

### 9. Private Dashboards
- **User Dashboard (`user-dashboard.html`)**:
  - Route guarded: Redirects non-authenticated visitors to `login.html`.
  - Patron profile card with editable details saved to `localStorage`.
  - Active Orders tab displaying simulated delivery timelines and order references.
  - Saved Timepieces (Wishlist) with one-click *Move to Shopping Bag*.
  - Concierge & Service Requests tab tracking atelier maintenance appointments.
- **Admin Dashboard (`admin-dashboard.html`)**:
  - Route guarded: Restricts non-admin accounts.
  - Native 2D Canvas revenue analytics chart with responsive scaling.
  - Live Add New Timepiece form that inserts watches directly into the live shopping catalog.
  - Live Catalog Inventory Table with one-click timepiece removal actions.
  - Order Fulfillment Simulator allowing admins to advance orders from *Processing* to *Dispatched* or *Delivered*.
  - Patron Directory tracking registered clients.

### 10. E-Commerce Flow
- **Shopping Bag (`cart.html`)**:
  - Quantity steppers (`+` / `-`) with automatic price recalculation.
  - Item removal with confirmation.
  - Promo code verification (`STACKLY10`).
  - Clear Bag action and empty bag state.
- **Checkout (`checkout.html`)**:
  - Multi-section shipping and billing address forms with client-side validation.
  - Order review summary showing subtotals, applied discount, and insured shipping.
  - Interactive demonstration order submission generating an official STACKLY order confirmation modal with unique order reference (`STK-2026-XXXX`).
- **Wishlist (`wishlist.html`)**:
  - Persistent collection of favored timepieces.
  - Instant *Add to Bag* and *Remove* controls.
  - Live synchronization with global navbar counters.

### 11. Error Experience (`404.html`)
- Dedicated luxury error page featuring an animated horological clock dial with sweeping second hands.
- Quick navigation pathways returning visitors safely to the boutique home, collections, or concierge desk.

---

## 5. Local Setup & GitHub Pages Deployment

### Running Locally
Because this project uses vanilla web standards, you can open it directly in any modern browser:

1. **Direct Open**:
   Double-click `index.html` in your file explorer.
2. **Local HTTP Server** (Recommended for ES module compatibility):
   Using Python:
   ```bash
   python -m http.server 8000
   ```
   Or using Node http-server (if installed):
   ```bash
   npx serve .
   ```
   Then open `http://localhost:8000` in your browser.

### Deploying to GitHub Pages
1. Push this repository to GitHub.
2. Navigate to **Repository Settings** > **Pages**.
3. Under **Build and deployment**, select **Source: Deploy from a branch**.
4. Choose the `main` branch and `/ (root)` folder, then click **Save**.
5. Your STACKLY Luxury Watches website will be live at `https://<username>.github.io/<repo-name>/`.

---

## 6. Verification & Quality Assurance Summary

- [x] All 16 HTML pages formatted with identical brand logo (`./images/logo-dark.webp`) linking to `index.html`.
- [x] Exclusive use of Google Material Icons (`material-icons`) with zero external font dependencies or broken glyphs.
- [x] Complete relative pathing for GitHub Pages deployment compatibility.
- [x] Zero JavaScript console errors across all interactive modules.
- [x] Fully responsive across mobile, tablet, laptop, and ultra-wide desktop viewports.
- [x] Client-side persistence and simulation clearly labeled for demonstration purposes.
