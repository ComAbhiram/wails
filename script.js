// Wails Cafe – Main Script

const menuData = {
  drinks: [
    { name: "Ice Tea", price: "74" },
    { name: "Lemonade", price: "74" },
    { name: "Grape Juice", price: "74" },
    { name: "Mint Twist", price: "76" },
    { name: "Sunburst Soda", price: "109" },
    { name: "Sunrise Mocktail", price: "109" },
    { name: "Blue Lagoon Mocktail", price: "109" },
    { name: "Pink Crush Mocktail", price: "109" },
    { name: "Gua Chilly Mocktail", price: "109" },
    { name: "Ice Brew Bliss", price: "139" },
    { name: "Cold Coffee", price: "139" },
    { name: "Ice Cream Shake", price: "136" },
    { name: "Tender Coconut Shake", price: "159" },
    { name: "Chikku Shake", price: "159" },
    { name: "Oreo Shake", price: "159" },
    { name: "Pink Berry", price: "159" },
    { name: "Peanut Butter Shake", price: "166" },
    { name: "Berry Blast", price: "166" }
  ],
  fried_chicken: [
    { name: "Fried Chicken Single Pcs", price: "95" },
    { name: "Fried Chicken Choice Pcs Single", price: "99" },
    { name: "Mini Royal Box (4 pcs, fries, bun 2, mayo 2, drink 2)", price: "494" },
    { name: "Royal Box (6 pcs, fries, bun 3, mayo 3, drink 3)", price: "767" },
    { name: "Chicken Wings", price: "119" },
    { name: "Flavoured Chicken Wings", price: "139" }
  ],
  sides: [
    { name: "French Fries", price: "59" },
    { name: "Loaded Fries Chicken", price: "199" },
    { name: "Loaded Fries Beef", price: "236" },
    { name: "Loaded Paneer", price: "196" }
  ],
  addons: [
    { name: "Mayonaise", price: "22" },
    { name: "Parotta", price: "18" },
    { name: "Bun", price: "25" },
    { name: "Cheese", price: "15" },
    { name: "Egg", price: "12" },
    { name: "Rumali", price: "21" },
    { name: "Meals (Fries + Lemonade)", price: "74" },
    { name: "Choice BBQ", price: "22" },
    { name: "Chicken Patty Extra", price: "54" },
    { name: "Beef Patty Extra", price: "82" },
    { name: "Add Ones Spices", price: "12" }
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
  const menuImg = document.getElementById('menu-category-img');

  const categoryImages = {
    'drinks': 'assets/826ece70ae66aa9655cd931e978584ac5c2ef1fe.png',
    'fried_chicken': 'assets/8e5db7f52748dc7d1da75038bcd768af4338833b.png',
    'sides': 'assets/b657effb90d4926427c5fa54643b2137576c0145.png',
    'addons': 'assets/5cd4045e01d39737c7a89c1174785e168e241c22.png'
  };

  function renderMenu(category) {
    container.style.opacity = '0';
    container.style.transform = 'translateY(8px)';
    
    // Animate image opacity if it exists
    if (menuImg) {
      menuImg.style.opacity = '0';
      menuImg.style.transform = 'scale(0.98)';
      menuImg.style.transition = 'all 0.3s ease';
    }

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
      
      if (menuImg && categoryImages[category]) {
        menuImg.src = categoryImages[category];
      }

      container.style.opacity = '1';
      container.style.transform = 'translateY(0)';
      
      if (menuImg) {
        menuImg.style.opacity = '1';
        menuImg.style.transform = 'scale(1)';
      }
    }, 250);
  }

  tabs.forEach(btn => {
    btn.addEventListener('click', () => {
      tabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMenu(btn.dataset.category);
    });
  });

  renderMenu('drinks');
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

// Franchise Form AJAX Submission
function initFranchiseForm() {
  const form = document.getElementById('franchise-application-form');
  const successMsg = document.getElementById('form-success-msg');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const btnText = btn.querySelector('.btn-text');
    const spinner = btn.querySelector('.btn-spinner');
    
    // UI Loading state
    btn.disabled = true;
    if (btnText) btnText.textContent = 'Sending...';
    if (spinner) spinner.style.display = 'block';
    if (successMsg) successMsg.style.display = 'none';

    const formData = new FormData(form);
    
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        if (successMsg) {
          successMsg.innerHTML = "<strong>Thanks!</strong> Your application has been submitted successfully. We'll be in touch soon.";
          successMsg.style.color = "#2ed573";
          successMsg.style.borderColor = "#2ed573";
          successMsg.style.backgroundColor = "rgba(46, 213, 115, 0.1)";
          successMsg.style.display = 'block';
        }
        form.reset();
      } else {
        if (successMsg) {
          successMsg.innerHTML = "<strong>Oops!</strong> There was a problem submitting your form. Please try again.";
          successMsg.style.color = "#ff4757";
          successMsg.style.borderColor = "#ff4757";
          successMsg.style.backgroundColor = "rgba(255, 71, 87, 0.1)";
          successMsg.style.display = 'block';
        }
      }
    })
    .catch(error => {
        if (successMsg) {
          successMsg.innerHTML = "<strong>Oops!</strong> There was a problem submitting your form. Please try again.";
          successMsg.style.color = "#ff4757";
          successMsg.style.borderColor = "#ff4757";
          successMsg.style.backgroundColor = "rgba(255, 71, 87, 0.1)";
          successMsg.style.display = 'block';
        }
    })
    .finally(() => {
      btn.disabled = false;
      if (btnText) btnText.textContent = 'Submit Application';
      if (spinner) spinner.style.display = 'none';
      
      if (successMsg && successMsg.style.color === "rgb(46, 213, 115)") {
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 8000);
      }
    });
  });
}
initFranchiseForm();

/* ── SCROLL TO TOP BUTTON ── */
const scrollTopBtn = document.getElementById('scroll-top-btn');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });
}

/* ── ACTIVE NAV LINK DETECTION ── */
(function() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links li a');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + entry.target.id) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(section => observer.observe(section));
})();

/* ── OFFER BANNER – tilt effect on mouse move ── */
const offerBanner = document.querySelector('.offer-banner');
if (offerBanner) {
  offerBanner.addEventListener('mousemove', (e) => {
    const rect = offerBanner.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
    offerBanner.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`;
  });
  offerBanner.addEventListener('mouseleave', () => {
    offerBanner.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  });
}

/* ── BRANCH CARDS – subtle tilt ── */
document.querySelectorAll('.branch-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
    card.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${y}deg) translateY(-10px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'transform 0.5s ease, box-shadow 0.5s ease';
  });
});
