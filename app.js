// Aivra.co - Full Fidelity Flagship Engine (Home, Collections, Reviews, Instagram DM Concierge)

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lenis Smooth Scroll
  let lenis;
  try {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  } catch (e) {
    console.warn('Lenis scroll running in fallback:', e);
  }

  // 2. Audio Chime (Gentle Luxury Tone)
  let audioCtx = null;
  let soundEnabled = true;
  function playLuxuryChime(freq = 528, duration = 0.35) {
    if (!soundEnabled) return;
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.35, audioCtx.currentTime + duration);
      gain.gain.setValueAtTime(0.035, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (err) {}
  }

  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.innerHTML = soundEnabled ? 
        `<svg class="w-4 h-4 text-[#781926]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15.536 8.464a5 5 0 010 7.072M18.364 5.636a9 9 0 010 12.728M11 5L6 9H2v6h4l5 4V5z"/></svg>` :
        `<svg class="w-4 h-4 text-[#8E8284]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"/></svg>`;
      if (soundEnabled) playLuxuryChime(880, 0.2);
    });
  }

  // 3. Page View Switcher (Home, Collections, Reviews)
  const navBtns = document.querySelectorAll('[data-nav-btn]');
  const pageViews = {
    home: document.getElementById('page-home'),
    collections: document.getElementById('page-collections'),
    reviews: document.getElementById('page-reviews')
  };

  function switchPage(pageKey) {
    // If "about", go to home and scroll to Our Story section
    if (pageKey === 'about') {
      switchPage('home');
      setTimeout(() => {
        window.scrollTo({ top: 850, behavior: 'smooth' });
      }, 50);
      return;
    }

    // Toggle pages
    Object.keys(pageViews).forEach(k => {
      if (pageViews[k]) {
        if (k === pageKey) {
          pageViews[k].classList.remove('hidden');
        } else {
          pageViews[k].classList.add('hidden');
        }
      }
    });

    // Update nav active states
    navBtns.forEach(btn => {
      const target = btn.getAttribute('data-nav-btn');
      if (target === pageKey) {
        btn.classList.add('text-[#781926]', 'font-bold', 'border-b', 'border-[#781926]');
      } else {
        btn.classList.remove('text-[#781926]', 'font-bold', 'border-b', 'border-[#781926]');
      }
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
    playLuxuryChime(660, 0.15);
  }

  navBtns.forEach(b => {
    b.addEventListener('click', () => {
      const page = b.getAttribute('data-nav-btn');
      switchPage(page);
    });
  });

  const pageTargetLinks = document.querySelectorAll('[data-page-target]');
  pageTargetLinks.forEach(l => {
    l.addEventListener('click', (e) => {
      e.preventDefault();
      switchPage(l.getAttribute('data-page-target'));
    });
  });

  // Category clicks go to collections
  const categoryItems = document.querySelectorAll('.category-item');
  categoryItems.forEach(ci => {
    ci.addEventListener('click', () => {
      switchPage('collections');
    });
  });

  // 4. Hero Caustic Spotlight
  const heroStage = document.getElementById('hero-stage');
  const spotlight = document.getElementById('caustic-spotlight');
  if (heroStage && spotlight) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      spotlight.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
      spotlight.style.opacity = '1';
    });
    heroStage.addEventListener('mouseleave', () => {
      spotlight.style.opacity = '0.3';
    });
  }

  // 5. Products Database (Exact from Screenshots with INR ₹ pricing)
  const products = [
    {
      id: 'p-heart',
      name: 'Heart Pendant Necklace',
      price: 499,
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
      finish: '18K Gold Plated',
      material: 'Stainless Steel & Micro Zircon Core'
    },
    {
      id: 'p-bow',
      name: 'Minimal Bow Necklace',
      price: 449,
      image: 'https://images.unsplash.com/photo-1611591475155-4284ec289e0d?auto=format&fit=crop&w=500&q=80',
      finish: '18K Gold Plated',
      material: 'Tarnish-Free Stainless Steel'
    },
    {
      id: 'p-pearl',
      name: 'Pearl Charm Bracelet',
      price: 599,
      image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=500&q=80',
      finish: '18K Gold Plated',
      material: 'Freshwater Pearls & Gold Charms'
    },
    {
      id: 'p-floral',
      name: 'Floral Drop Earrings',
      price: 399,
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80',
      finish: '18K Gold Plated',
      material: 'Rose Petal Enamel & Gold Stud'
    },
    {
      id: 'p-initial',
      name: 'Initial Necklace',
      price: 469,
      image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80',
      finish: '18K Gold Plated',
      material: 'Dainty Gold Letter Pendant'
    }
  ];

  // 6. Cart & Saze-Style Instagram DM Checkout (@aivra.co)
  let cart = [];
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartToggleBtns = document.querySelectorAll('[data-cart-toggle]');
  const cartCloseBtn = document.getElementById('cart-close');
  const cartItemsContainer = document.getElementById('cart-items');
  const cartCountBadges = document.querySelectorAll('[data-cart-count]');
  const cartSubtotalEl = document.getElementById('cart-subtotal');
  const cartRefCodeEl = document.getElementById('cart-ref-code');
  const orderMessagePreviewEl = document.getElementById('order-message-preview');

  function generateRefCode() {
    return 'AIV-' + Math.floor(1000 + Math.random() * 9000);
  }
  let currentRefCode = generateRefCode();

  function openCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartOverlay.classList.remove('hidden');
    setTimeout(() => {
      cartOverlay.classList.remove('opacity-0');
      cartDrawer.classList.remove('translate-x-full');
    }, 10);
    playLuxuryChime(580, 0.2);
    updateCartUI();
  }

  function closeCart() {
    if (!cartDrawer || !cartOverlay) return;
    cartDrawer.classList.add('translate-x-full');
    cartOverlay.classList.add('opacity-0');
    setTimeout(() => {
      cartOverlay.classList.add('hidden');
    }, 300);
  }

  cartToggleBtns.forEach(b => b.addEventListener('click', openCart));
  if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  function addToCart(productId) {
    const item = products.find(p => p.id === productId);
    if (!item) return;

    const existing = cart.find(c => c.id === productId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        ...item,
        qty: 1
      });
    }

    playLuxuryChime(784, 0.25);
    showToast(`Added ${item.name} to Bag`);
    updateCartUI();
    openCart();
  }

  function updateCartUI() {
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(b => b.textContent = totalCount);

    if (cartRefCodeEl) {
      cartRefCodeEl.textContent = currentRefCode;
    }

    if (cartItemsContainer) {
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
          <div class="py-16 text-center flex flex-col items-center justify-center">
            <div class="w-16 h-16 rounded-full border border-dashed border-[#781926]/30 flex items-center justify-center mb-4 text-[#781926]">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <p class="font-serif-luxury text-base text-[#21191B] font-bold">Your Bag is Empty</p>
            <p class="text-xs text-[#615658] mt-1 max-w-[220px]">Explore bestsellers and tap 'Add to Cart' to complete your order via Instagram DM.</p>
          </div>
        `;
        if (cartSubtotalEl) cartSubtotalEl.textContent = '₹0';
        if (orderMessagePreviewEl) orderMessagePreviewEl.textContent = 'Bag is empty.';
        return;
      }

      let subtotal = 0;
      cartItemsContainer.innerHTML = '';
      
      cart.forEach((item, index) => {
        subtotal += item.price * item.qty;
        const row = document.createElement('div');
        row.className = 'p-3.5 rounded-xl bg-white border border-[#781926]/12 flex gap-3.5 items-center relative group shadow-sm';
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded-lg border border-[#781926]/10 shrink-0" />
          <div class="flex-1 min-w-0">
            <h4 class="text-xs font-serif-luxury text-[#21191B] font-bold truncate">${item.name}</h4>
            <p class="text-[11px] font-mono text-[#781926] font-semibold mt-0.5">${item.finish}</p>
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs font-mono font-bold text-[#781926]">₹${item.price * item.qty}</span>
              <div class="flex items-center gap-2 border border-[#781926]/20 rounded-lg px-2 py-0.5 bg-[#F5EAE1]">
                <button data-cart-dec="${index}" class="text-xs text-[#21191B] hover:text-[#781926] px-1 font-bold">−</button>
                <span class="text-xs font-mono text-[#21191B] font-bold">${item.qty}</span>
                <button data-cart-inc="${index}" class="text-xs text-[#21191B] hover:text-[#781926] px-1 font-bold">+</button>
              </div>
            </div>
          </div>
          <button data-cart-remove="${index}" class="absolute top-2 right-2 text-[#8E8284] hover:text-[#781926] p-1" title="Remove">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        `;
        cartItemsContainer.appendChild(row);
      });

      if (cartSubtotalEl) {
        cartSubtotalEl.textContent = `₹${subtotal}`;
      }

      const formattedDM = generateInstagramDMMessage(subtotal);
      if (orderMessagePreviewEl) {
        orderMessagePreviewEl.textContent = formattedDM;
      }
    }
  }

  function generateInstagramDMMessage(subtotal) {
    let msg = `✨ NEW ORDER INQUIRY // @aivra.co\n`;
    msg += `Ref: #${currentRefCode}\n`;
    msg += `Delivery Area: Goa / Pan-India\n`;
    msg += `------------------------------------\n`;
    cart.forEach(item => {
      msg += `• ${item.name} (Qty: ${item.qty})\n`;
      msg += `  Type: ${item.finish}\n`;
      msg += `  Price: ₹${item.price * item.qty}\n`;
    });
    msg += `------------------------------------\n`;
    msg += `Total: ₹${subtotal}\n`;
    msg += `Hi Aivra team! I'd like to confirm availability and shipping details for this order ♡`;
    return msg;
  }

  // Cart delegations
  document.addEventListener('click', (e) => {
    const quickAdd = e.target.closest('[data-action="quick-add"]');
    if (quickAdd) {
      const id = quickAdd.getAttribute('data-id');
      addToCart(id);
      return;
    }

    const incBtn = e.target.closest('[data-cart-inc]');
    if (incBtn) {
      const idx = parseInt(incBtn.getAttribute('data-cart-inc'));
      cart[idx].qty += 1;
      updateCartUI();
      return;
    }

    const decBtn = e.target.closest('[data-cart-dec]');
    if (decBtn) {
      const idx = parseInt(decBtn.getAttribute('data-cart-dec'));
      if (cart[idx].qty > 1) {
        cart[idx].qty -= 1;
      } else {
        cart.splice(idx, 1);
      }
      updateCartUI();
      return;
    }

    const removeBtn = e.target.closest('[data-cart-remove]');
    if (removeBtn) {
      const idx = parseInt(removeBtn.getAttribute('data-cart-remove'));
      cart.splice(idx, 1);
      updateCartUI();
      return;
    }
  });

  // 7. Saze-Style Checkout on Instagram DM
  const igCheckoutBtn = document.getElementById('ig-checkout-btn');
  const copyOrderSummaryBtn = document.getElementById('copy-order-summary-btn');

  function executeInstagramCheckout() {
    if (cart.length === 0) {
      showToast('Please add at least one piece to checkout.');
      return;
    }

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const message = generateInstagramDMMessage(subtotal);

    navigator.clipboard.writeText(message).then(() => {
      showToast('Order sheet copied! Opening Instagram DM @aivra.co...');
    }).catch(() => {
      showToast('Opening Instagram DM @aivra.co...');
    });

    playLuxuryChime(987, 0.3);

    const igUrl = `https://ig.me/m/aivra.co`;
    setTimeout(() => {
      window.open(igUrl, '_blank');
    }, 450);
  }

  if (igCheckoutBtn) igCheckoutBtn.addEventListener('click', executeInstagramCheckout);

  if (copyOrderSummaryBtn) {
    copyOrderSummaryBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Bag is empty.');
        return;
      }
      const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
      const message = generateInstagramDMMessage(subtotal);
      navigator.clipboard.writeText(message).then(() => {
        showToast('Order sheet copied! Paste into @aivra.co DM.');
      });
      playLuxuryChime(784, 0.15);
    });
  }

  function showToast(text) {
    let toast = document.getElementById('luxury-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'luxury-toast';
      toast.className = 'fixed bottom-6 right-6 z-[99999] px-5 py-3 rounded-xl bg-[#781926] text-white font-mono text-xs tracking-wide shadow-2xl transition-all duration-300 transform translate-y-8 opacity-0 flex items-center gap-3';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `
      <div class="w-2 h-2 rounded-full bg-[#E8D3A7] animate-ping"></div>
      <span>${text}</span>
    `;
    toast.classList.remove('translate-y-8', 'opacity-0');
    setTimeout(() => {
      toast.classList.add('translate-y-8', 'opacity-0');
    }, 3800);
  }

  // Pre-load the Heart Pendant Necklace (₹499)
  addToCart('p-heart');
});
