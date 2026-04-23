// Wails Cafe – Main Script

const menuData = {
  breakfast: [
    { name: "Sandwich", price: "60" },
    { name: "Zinger Burger", price: "90" },
    { name: "Hotdog", price: "110" },
    { name: "Chicken Wrap", price: "150" },
    { name: "Fried Rice", price: "160" },
    { name: "Loaded Fries", price: "170" },
    { name: "Crispy Roll", price: "120" }
  ],
  rolls: [
    { name: "Crispy Chicken Roll", price: "120" },
    { name: "Paneer Roll", price: "100" },
    { name: "Egg Roll", price: "90" },
    { name: "BBQ Beef Roll", price: "150" },
    { name: "Veggie Roll", price: "80" }
  ],
  burgers: [
    { name: "Classic Wails Burger", price: "180" },
    { name: "Zinger Burger", price: "150" },
    { name: "Double Smash Burger", price: "220" },
    { name: "Chicken Burger", price: "160" },
    { name: "Veggie Burger", price: "130" }
  ],
  sandwiches: [
    { name: "Club Sandwich", price: "100" },
    { name: "Grilled Chicken Sandwich", price: "130" },
    { name: "BLT Sandwich", price: "120" },
    { name: "Tuna Melt", price: "140" },
    { name: "Veggie Delight", price: "90" }
  ],
  snacks: [
    { name: "Loaded Fries", price: "170" },
    { name: "Onion Rings", price: "90" },
    { name: "Chicken Nuggets", price: "130" },
    { name: "Corn Dog", price: "80" },
    { name: "Nachos", price: "110" }
  ],
  evening: [
    { name: "Spicy Fried Chicken", price: "200" },
    { name: "BBQ Wings", price: "210" },
    { name: "Pasta Arrabbiata", price: "180" },
    { name: "Grilled Fish Fillet", price: "250" },
    { name: "Lamb Kebab Platter", price: "350" }
  ],
  common: [
    { name: "Chicken Fried Rice", price: "160" },
    { name: "Egg Fried Rice", price: "120" },
    { name: "Vegetable Fried Rice", price: "100" },
    { name: "Butter Chicken", price: "220" },
    { name: "Dal Makhani", price: "140" }
  ],
  drinks: [
    { name: "Classic Cold Coffee", price: "120" },
    { name: "Berry Blast Shake", price: "160" },
    { name: "Oreo Shake", price: "180" },
    { name: "Mango Smoothie", price: "150" },
    { name: "Fresh Lime Soda", price: "80" }
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  initPageLoader();
  initStickyHeader();
  initRevealAnimations();
  initMenuFiltering();
  initOrderPopup();
  initHamburger();
  initPhoneCarousel();
});

// Sticky Header
function initStickyHeader() {
  const header = document.getElementById('header');
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 80);
  });
}

// Reveal on Scroll
function initRevealAnimations() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('active');
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// Menu Filtering
function initMenuFiltering() {
  const container = document.getElementById('menu-items');
  const categoryTitle = document.getElementById('current-category');
  const tabs = document.querySelectorAll('.tab-btn');

  function renderMenu(category) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';
    setTimeout(() => {
      const items = menuData[category] || [];
      categoryTitle.textContent = category.replace(/-/g, ' ').toUpperCase();
      container.innerHTML = items.map(item => `
        <div class="menu-item">
          <span>${item.name}</span>
          <div class="item-dots"></div>
          <span class="price">₹ ${item.price}</span>
        </div>
      `).join('');
      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
    }, 250);
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.category);
    });
  });

  renderMenu('breakfast');
}

// Order Popup
function initOrderPopup() {
  const popup = document.getElementById('order-popup');
  const openBtn = document.getElementById('hero-order-btn');
  const closeBtn = document.getElementById('popup-close-btn');

  function openPopup() {
    popup.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closePopup() {
    popup.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (openBtn) openBtn.addEventListener('click', openPopup);
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Close on overlay click
  popup.addEventListener('click', e => {
    if (e.target === popup) closePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && popup.classList.contains('open')) closePopup();
  });
}
// Page Loader
function initPageLoader() {
  const loader = document.getElementById('page-loader');
  if (!loader) return;
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1600);
  });
  // Fallback
  setTimeout(() => loader.classList.add('hidden'), 3000);
}

// Hamburger Menu
function initHamburger() {
  const btn = document.getElementById('ham-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    btn.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', open);
  });

  // Close on link click
  menu.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', false);
    });
  });

  // Close on outside click
  document.addEventListener('click', e => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      btn.classList.remove('open');
    }
  });
}

// Phone Carousel (scroll-driven)
function initPhoneCarousel() {
  const track = document.getElementById('phone-scroll-track');
  if (!track) return;
  const slides = track.querySelectorAll('.phone-slide');
  if (!slides.length) return;

  let current = 0;
  const total = slides.length;

  // Auto-advance every 2.5s
  setInterval(() => {
    current = (current + 1) % total;
    track.style.transform = `translateY(-${current * 100}%)`;
  }, 2500);

  // Also drive by page scroll position relative to section
  const section = track.closest('section');
  if (!section) return;

  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const viewH = window.innerHeight;
    const progress = 1 - (rect.bottom / (rect.height + viewH));
    const idx = Math.min(total - 1, Math.max(0, Math.floor(progress * total)));
    current = idx;
    track.style.transform = `translateY(-${idx * 100}%)`;
  }, { passive: true });
}

// Title animation trigger (works with IntersectionObserver)
(function initTitleAnims() {
  const titles = document.querySelectorAll('.anim-title');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  titles.forEach(t => io.observe(t));
})();
