/**
 * STACKLY LUXURY WATCHES — Homepage 3D Tourbillon Experience
 * Flagship: CHRONOS TYPE-0 (Skeletonized Flying Tourbillon)
 * Loaded exclusively on index.html.
 * Technologies: Three.js & GSAP ScrollTrigger
 * Strictly Monochromatic Palette: Grade 5 Titanium, Polished Rhodium, Black Ceramic, Sapphire Crystal
 */

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js';

class Chronos3DExperience {
  constructor() {
    this.container = document.getElementById('home-3d-canvas-container');
    if (!this.container) return;

    this.fallbackEl = document.getElementById('home-3d-fallback');
    this.isWebGLAvailable = this.checkWebGL();

    if (!this.isWebGLAvailable) {
      this.showFallback();
      return;
    }

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.watchGroup = null;

    // Component groups for Exploded-View animation
    this.crystalGroup = null;
    this.bezelGroup = null;
    this.dialGroup = null;
    this.handsGroup = null;
    this.movementGroup = null;
    this.tourbillonCage = null;
    this.caseBackGroup = null;
    this.strapsGroup = null;

    // Interaction state
    this.isDragging = false;
    this.previousPointerPosition = { x: 0, y: 0 };
    this.rotationVelocity = { x: 0, y: 0.003 };
    this.autoRotateSpeed = 0.0025;
    this.isUserInteracting = false;
    this.userInactivityTimeout = null;

    // Explosion state
    this.explosionProgress = 0;
    this.isExploded = false;

    // Performance state
    this.isSceneVisible = true;
    this.animationFrameId = null;
    this.clock = new THREE.Clock();

    // Reduced motion preference
    this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  checkWebGL() {
    try {
      const canvas = document.createElement('canvas');
      return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
    } catch (e) {
      return false;
    }
  }

  showFallback() {
    if (this.fallbackEl) {
      this.fallbackEl.style.display = 'flex';
    }
    if (this.container) {
      this.container.style.display = 'none';
    }
  }

  init() {
    try {
      this.setupScene();
      this.setupLights();
      this.buildChronosWatch();
      this.setupEventListeners();
      this.setupIntersectionObserver();
      this.setupScrollTrigger();
      this.setupInteractiveControls();
      this.animate();

      this.container.classList.add('is-ready');
      window.chronos3D = this;
    } catch (err) {
      console.warn('3D Scene initialization fallback:', err);
      this.showFallback();
    }
  }

  setupScene() {
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });

    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.35;

    this.renderer.domElement.className = 'home-3d__canvas';
    this.renderer.domElement.setAttribute('aria-label', 'Interactive 3D model of CHRONOS TYPE-0 Tourbillon watch');
    this.renderer.domElement.setAttribute('role', 'img');
    this.container.appendChild(this.renderer.domElement);
  }

  setupLights() {
    // Pure studio ambient light
    const ambientLight = new THREE.AmbientLight(0x222222, 2.8);
    this.scene.add(ambientLight);

    // Neutral Key Light (Pure White)
    const keyLight = new THREE.DirectionalLight(0xffffff, 3.6);
    keyLight.position.set(4, 5, 5);
    this.scene.add(keyLight);

    // Neutral Fill Light (Soft White)
    const fillLight = new THREE.DirectionalLight(0xcccccc, 1.8);
    fillLight.position.set(-4, -2, 4);
    this.scene.add(fillLight);

    // Crisp Silhouette Rim Light
    const rimLight = new THREE.DirectionalLight(0xffffff, 3.2);
    rimLight.position.set(0, 6, -4);
    this.scene.add(rimLight);

    // Specular Highlight point light
    const pointLight = new THREE.PointLight(0xffffff, 1.6, 12);
    pointLight.position.set(0, -0.6, 1.2);
    this.scene.add(pointLight);
  }

  buildChronosWatch() {
    this.watchGroup = new THREE.Group();
    this.scene.add(this.watchGroup);

    // --- Strict Monochromatic Luxury Materials System ---
    // Grade 5 Titanium
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x262626,
      metalness: 0.88,
      roughness: 0.28
    });

    // Mirror-Polished Rhodium & Platinum
    const rhodiumMaterial = new THREE.MeshStandardMaterial({
      color: 0xf0f0f0,
      metalness: 0.98,
      roughness: 0.08
    });

    // Brushed Mechanical Steel
    const brushedSteelMaterial = new THREE.MeshStandardMaterial({
      color: 0x8e8e8e,
      metalness: 0.92,
      roughness: 0.24
    });

    // Black High-Tech Ceramic
    const darkCeramicMaterial = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      metalness: 0.35,
      roughness: 0.12
    });

    // Horological Synthetic Ruby Jewels (Synthetic corundum coradial bearings)
    const rubyMaterial = new THREE.MeshStandardMaterial({
      color: 0x8a122e,
      metalness: 0.1,
      roughness: 0.1,
      transparent: true,
      opacity: 0.85
    });

    // Double-domed Physical Sapphire Crystal
    const sapphireMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.02,
      roughness: 0.02,
      transmission: 0.92,
      ior: 1.77,
      transparent: true,
      opacity: 0.28,
      clearcoat: 1.0,
      clearcoatRoughness: 0.04
    });

    // Matte Black Alligator Leather
    const leatherMaterial = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.85,
      metalness: 0.06
    });

    // 1. Straps Group (Top & Bottom)
    this.strapsGroup = new THREE.Group();
    const strapGeo = new THREE.BoxGeometry(1.3, 2.2, 0.18);
    
    const topStrap = new THREE.Mesh(strapGeo, leatherMaterial);
    topStrap.position.set(0, 2.6, -0.15);
    topStrap.rotation.x = -0.18;
    this.strapsGroup.add(topStrap);

    const bottomStrap = new THREE.Mesh(strapGeo, leatherMaterial);
    bottomStrap.position.set(0, -2.6, -0.15);
    bottomStrap.rotation.x = 0.18;
    this.strapsGroup.add(bottomStrap);

    // Titanium Deployant Buckle
    const buckleGeo = new THREE.BoxGeometry(1.4, 0.3, 0.24);
    const buckle = new THREE.Mesh(buckleGeo, rhodiumMaterial);
    buckle.position.set(0, -3.6, -0.1);
    this.strapsGroup.add(buckle);

    this.watchGroup.add(this.strapsGroup);

    // 2. Case Back Group
    this.caseBackGroup = new THREE.Group();
    const caseBackGeo = new THREE.CylinderGeometry(2.0, 2.05, 0.22, 64);
    const caseBack = new THREE.Mesh(caseBackGeo, titaniumMaterial);
    caseBack.rotation.x = Math.PI / 2;
    caseBack.position.z = -0.4;
    this.caseBackGroup.add(caseBack);

    // Exhibition sapphire center
    const exhibitionGeo = new THREE.CylinderGeometry(1.4, 1.4, 0.24, 48);
    const exhibitionGlass = new THREE.Mesh(exhibitionGeo, sapphireMaterial);
    exhibitionGlass.rotation.x = Math.PI / 2;
    exhibitionGlass.position.z = -0.4;
    this.caseBackGroup.add(exhibitionGlass);

    this.watchGroup.add(this.caseBackGroup);

    // 3. Movement Group (Caliber ST-01 Openworked Flying Tourbillon)
    this.movementGroup = new THREE.Group();

    // Mainplate (Charcoal Titanium with skeleton cutouts)
    const plateGeo = new THREE.CylinderGeometry(1.85, 1.85, 0.14, 48);
    const mainplate = new THREE.Mesh(plateGeo, titaniumMaterial);
    mainplate.rotation.x = Math.PI / 2;
    mainplate.position.z = -0.15;
    this.movementGroup.add(mainplate);

    // Rhodium & Titanium Architectural Bridges
    const bridge1Geo = new THREE.BoxGeometry(1.6, 0.35, 0.12);
    const bridge1 = new THREE.Mesh(bridge1Geo, brushedSteelMaterial);
    bridge1.position.set(-0.2, 0.45, 0.0);
    bridge1.rotation.z = 0.3;
    this.movementGroup.add(bridge1);

    const bridge2Geo = new THREE.BoxGeometry(1.2, 0.28, 0.12);
    const bridge2 = new THREE.Mesh(bridge2Geo, rhodiumMaterial);
    bridge2.position.set(0.4, 0.1, 0.0);
    bridge2.rotation.z = -0.45;
    this.movementGroup.add(bridge2);

    // Meshing Gear Trains
    const createGear = (radius, teeth, z, colorMat) => {
      const gearGroup = new THREE.Group();
      const discGeo = new THREE.CylinderGeometry(radius, radius, 0.06, 32);
      const disc = new THREE.Mesh(discGeo, colorMat);
      disc.rotation.x = Math.PI / 2;
      gearGroup.add(disc);

      const spokeGeo = new THREE.CylinderGeometry(radius * 0.75, radius * 0.75, 0.07, 4);
      const spoke = new THREE.Mesh(spokeGeo, titaniumMaterial);
      spoke.rotation.x = Math.PI / 2;
      gearGroup.add(spoke);

      gearGroup.position.z = z;
      return gearGroup;
    };

    const gear1 = createGear(0.7, 36, -0.04, rhodiumMaterial);
    gear1.position.set(-0.45, 0.5, -0.04);
    this.movementGroup.add(gear1);

    const gear2 = createGear(0.5, 24, 0.02, brushedSteelMaterial);
    gear2.position.set(0.45, 0.4, 0.02);
    this.movementGroup.add(gear2);

    const gear3 = createGear(0.35, 18, 0.06, rhodiumMaterial);
    gear3.position.set(0.1, 0.15, 0.06);
    this.movementGroup.add(gear3);

    // Ruby Pivot Bearings (synthetic corundum jewels)
    const createJewel = (x, y, z) => {
      const jewelGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const jewel = new THREE.Mesh(jewelGeo, rubyMaterial);
      jewel.position.set(x, y, z);
      return jewel;
    };
    this.movementGroup.add(createJewel(-0.45, 0.5, 0.1));
    this.movementGroup.add(createJewel(0.45, 0.4, 0.1));
    this.movementGroup.add(createJewel(0.1, 0.15, 0.12));

    // Tourbillon Cage at 6 o'clock
    this.tourbillonCage = new THREE.Group();
    const cageRingGeo = new THREE.TorusGeometry(0.48, 0.04, 16, 32);
    const cageRing = new THREE.Mesh(cageRingGeo, rhodiumMaterial);
    this.tourbillonCage.add(cageRing);

    const balanceWheelGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 16);
    const balanceWheel = new THREE.Mesh(balanceWheelGeo, brushedSteelMaterial);
    balanceWheel.rotation.x = Math.PI / 2;
    this.tourbillonCage.add(balanceWheel);

    const cageBridgeGeo = new THREE.BoxGeometry(0.9, 0.08, 0.06);
    const cageBridge = new THREE.Mesh(cageBridgeGeo, rhodiumMaterial);
    this.tourbillonCage.add(cageBridge);

    const centerRuby = createJewel(0, 0, 0.04);
    this.tourbillonCage.add(centerRuby);

    this.tourbillonCage.position.set(0, -0.65, 0.12);
    this.movementGroup.add(this.tourbillonCage);

    this.watchGroup.add(this.movementGroup);

    // 4. Dial Group (Skeleton Chapter Ring & Hour Markers)
    this.dialGroup = new THREE.Group();
    const chapterRingGeo = new THREE.RingGeometry(1.65, 1.95, 48);
    const chapterRing = new THREE.Mesh(chapterRingGeo, darkCeramicMaterial);
    this.dialGroup.add(chapterRing);

    // 12 Rhodium Hour Markers
    for (let i = 0; i < 12; i++) {
      const angle = (i * Math.PI) / 6;
      const markerGeo = new THREE.BoxGeometry(0.08, 0.28, 0.08);
      const marker = new THREE.Mesh(markerGeo, rhodiumMaterial);
      marker.position.set(1.78 * Math.sin(angle), 1.78 * Math.cos(angle), 0.05);
      marker.rotation.z = -angle;
      this.dialGroup.add(marker);
    }

    // Top Brand Name Plaque
    const plaqueGeo = new THREE.BoxGeometry(0.9, 0.22, 0.06);
    const plaque = new THREE.Mesh(plaqueGeo, rhodiumMaterial);
    plaque.position.set(0, 1.05, 0.06);
    this.dialGroup.add(plaque);

    this.dialGroup.position.z = 0.22;
    this.watchGroup.add(this.dialGroup);

    // 5. Hands Group (Faceted Rhodium Hands)
    this.handsGroup = new THREE.Group();
    
    // Hour hand (set to 10:10)
    const hourHandGeo = new THREE.ConeGeometry(0.12, 1.0, 4);
    const hourHand = new THREE.Mesh(hourHandGeo, rhodiumMaterial);
    hourHand.position.set(-0.35, 0.35, 0.04);
    hourHand.rotation.z = Math.PI / 4 + 0.3;
    this.handsGroup.add(hourHand);

    // Minute hand
    const minuteHandGeo = new THREE.ConeGeometry(0.1, 1.45, 4);
    const minuteHand = new THREE.Mesh(minuteHandGeo, rhodiumMaterial);
    minuteHand.position.set(0.5, 0.5, 0.08);
    minuteHand.rotation.z = -Math.PI / 4 - 0.2;
    this.handsGroup.add(minuteHand);

    // Center Pinion Cap
    const pinionGeo = new THREE.CylinderGeometry(0.14, 0.14, 0.12, 24);
    const pinion = new THREE.Mesh(pinionGeo, rhodiumMaterial);
    pinion.rotation.x = Math.PI / 2;
    pinion.position.z = 0.1;
    this.handsGroup.add(pinion);

    this.handsGroup.position.z = 0.35;
    this.watchGroup.add(this.handsGroup);

    // 6. Bezel & Case Outer Ring Group
    this.bezelGroup = new THREE.Group();
    const bezelGeo = new THREE.TorusGeometry(2.05, 0.14, 16, 64);
    const bezel = new THREE.Mesh(bezelGeo, titaniumMaterial);
    this.bezelGroup.add(bezel);

    // Obsidian ceramic inner fluted ring
    const flutedGeo = new THREE.TorusGeometry(1.98, 0.06, 12, 64);
    const flutedRing = new THREE.Mesh(flutedGeo, darkCeramicMaterial);
    this.bezelGroup.add(flutedRing);

    // Crown at 3 o'clock
    const crownGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.3, 24);
    const crown = new THREE.Mesh(crownGeo, rhodiumMaterial);
    crown.rotation.z = Math.PI / 2;
    crown.position.set(2.25, 0, 0);
    this.bezelGroup.add(crown);

    this.bezelGroup.position.z = 0.38;
    this.watchGroup.add(this.bezelGroup);

    // 7. Crystal Group (Double-Domed Sapphire)
    this.crystalGroup = new THREE.Group();
    const crystalGeo = new THREE.CylinderGeometry(1.98, 1.98, 0.08, 48);
    const crystal = new THREE.Mesh(crystalGeo, sapphireMaterial);
    crystal.rotation.x = Math.PI / 2;
    this.crystalGroup.add(crystal);

    this.crystalGroup.position.z = 0.55;
    this.watchGroup.add(this.crystalGroup);

    // Initial cinematic angle
    this.watchGroup.rotation.x = 0.22;
    this.watchGroup.rotation.y = -0.38;
  }

  setExplosionProgress(progress) {
    this.explosionProgress = Math.max(0, Math.min(1, progress));
    
    if (this.crystalGroup && this.bezelGroup && this.dialGroup && this.handsGroup && this.caseBackGroup) {
      this.crystalGroup.position.z = 0.55 + this.explosionProgress * 2.2;
      this.bezelGroup.position.z = 0.38 + this.explosionProgress * 1.5;
      this.handsGroup.position.z = 0.35 + this.explosionProgress * 0.95;
      this.dialGroup.position.z = 0.22 + this.explosionProgress * 0.55;
      this.caseBackGroup.position.z = -0.4 - this.explosionProgress * 1.1;
      this.strapsGroup.position.z = 0 - this.explosionProgress * 0.6;
    }
  }

  setupEventListeners() {
    const dom = this.renderer.domElement;

    // Mouse drag handlers
    dom.addEventListener('mousedown', (e) => {
      this.isDragging = true;
      this.isUserInteracting = true;
      this.previousPointerPosition = { x: e.clientX, y: e.clientY };
      dom.style.cursor = 'grabbing';
    });

    window.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;
      const deltaX = e.clientX - this.previousPointerPosition.x;
      const deltaY = e.clientY - this.previousPointerPosition.y;

      this.watchGroup.rotation.y += deltaX * 0.007;
      this.watchGroup.rotation.x += deltaY * 0.007;

      this.rotationVelocity = {
        x: deltaY * 0.003,
        y: deltaX * 0.003
      };

      this.previousPointerPosition = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', () => {
      if (this.isDragging) {
        this.isDragging = false;
        dom.style.cursor = 'grab';
        this.resetInactivityTimer();
      }
    });

    // Touch drag handlers (mobile friendly, does not hijack vertical page scroll)
    let touchStartX = 0;
    let touchStartY = 0;
    let isHorizontalGesture = false;

    dom.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        this.previousPointerPosition = { x: touchStartX, y: touchStartY };
        isHorizontalGesture = false;
      }
    }, { passive: true });

    dom.addEventListener('touchmove', (e) => {
      if (e.touches.length !== 1) return;
      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = Math.abs(currentX - touchStartX);
      const diffY = Math.abs(currentY - touchStartY);

      if (!isHorizontalGesture && diffX > 10 && diffX > diffY) {
        isHorizontalGesture = true;
        this.isDragging = true;
        this.isUserInteracting = true;
      }

      if (this.isDragging) {
        const deltaX = currentX - this.previousPointerPosition.x;
        const deltaY = currentY - this.previousPointerPosition.y;

        this.watchGroup.rotation.y += deltaX * 0.007;
        this.watchGroup.rotation.x += deltaY * 0.007;

        this.previousPointerPosition = { x: currentX, y: currentY };
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      if (this.isDragging) {
        this.isDragging = false;
        this.resetInactivityTimer();
      }
      isHorizontalGesture = false;
    });

    window.addEventListener('resize', () => this.onWindowResize());
  }

  resetInactivityTimer() {
    clearTimeout(this.userInactivityTimeout);
    this.userInactivityTimeout = setTimeout(() => {
      this.isUserInteracting = false;
    }, 2500);
  }

  onWindowResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isSceneVisible = entry.isIntersecting;
        if (this.isSceneVisible && !this.animationFrameId) {
          this.animate();
        }
      });
    }, { threshold: 0.05 });

    observer.observe(this.container);
  }

  setupScrollTrigger() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined' || this.prefersReducedMotion) {
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    const explodedSection = document.getElementById('exploded-view-section');
    if (!explodedSection) return;

    // ScrollTrigger to trigger exploded component separation
    ScrollTrigger.create({
      trigger: explodedSection,
      start: 'top 80%',
      end: 'bottom 20%',
      scrub: 1.2,
      onUpdate: (self) => {
        this.setExplosionProgress(self.progress);
      }
    });
  }

  setupInteractiveControls() {
    const toggleExplodeBtn = document.getElementById('toggle-explode-btn');
    const resetExplodeBtn = document.getElementById('reset-explode-btn');

    if (toggleExplodeBtn) {
      toggleExplodeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.isExploded = !this.isExploded;
        
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            explosionProgress: this.isExploded ? 1 : 0,
            duration: 1.2,
            ease: 'power2.inOut',
            onUpdate: () => {
              this.setExplosionProgress(this.explosionProgress);
            }
          });
        } else {
          this.setExplosionProgress(this.isExploded ? 1 : 0);
        }

        toggleExplodeBtn.querySelector('span:not(.material-icons):not(.material-symbols-outlined)').textContent = 
          this.isExploded ? 'Assemble Caliber' : 'Explode Caliber Layers';
      });
    }

    if (resetExplodeBtn) {
      resetExplodeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        this.isExploded = false;
        if (typeof gsap !== 'undefined') {
          gsap.to(this, {
            explosionProgress: 0,
            duration: 1.0,
            ease: 'power2.inOut',
            onUpdate: () => this.setExplosionProgress(this.explosionProgress)
          });
          gsap.to(this.watchGroup.rotation, {
            x: 0.22,
            y: -0.38,
            duration: 1.0,
            ease: 'power2.out'
          });
        } else {
          this.setExplosionProgress(0);
          this.watchGroup.rotation.set(0.22, -0.38, 0);
        }
      });
    }
  }

  animate() {
    if (!this.isSceneVisible) {
      this.animationFrameId = null;
      return;
    }

    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const delta = this.clock.getDelta();

    // 1. Continuous Tourbillon Cage rotation (1 full turn per min = ~0.104 rad/sec)
    if (this.tourbillonCage) {
      this.tourbillonCage.rotation.z += delta * 1.8;
    }

    // 2. Idle auto-rotation when user is not dragging
    if (!this.isDragging && !this.isUserInteracting && this.watchGroup && !this.prefersReducedMotion) {
      this.watchGroup.rotation.y += this.autoRotateSpeed;
    } else if (!this.isDragging && this.watchGroup) {
      this.watchGroup.rotation.y += this.rotationVelocity.y;
      this.watchGroup.rotation.x += this.rotationVelocity.x;
      this.rotationVelocity.y *= 0.94;
      this.rotationVelocity.x *= 0.94;
    }

    this.renderer.render(this.scene, this.camera);
  }
}

// Instantiate exclusively when index.html is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Chronos3DExperience();
});
