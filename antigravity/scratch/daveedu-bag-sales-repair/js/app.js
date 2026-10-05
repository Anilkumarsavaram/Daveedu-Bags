/**
 * Daveedu Bag Sales & Repair - Frontend Logic & Interactivity
 * Location: Ramanayapeta, Kakinada, Andhra Pradesh - 533005
 * Phone: 092472 71717
 */

document.addEventListener('DOMContentLoaded', () => {
  const BUSINESS_PHONE_CLEAN = '919247271717';

  // -------------------------------------------------------------------------
  // Mobile Navigation Toggle
  // -------------------------------------------------------------------------
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('is-open');
      mobileMenuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileMenuBtn.innerHTML = isOpen
        ? `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`
        : `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
    });

    // Close mobile menu when any nav item is clicked
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('is-open')) {
          navMenu.classList.remove('is-open');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
          mobileMenuBtn.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        }
      });
    });
  }

  // -------------------------------------------------------------------------
  // Active Navigation Link on Scroll
  // -------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*='${sectionId}']`);
      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // Product Search & Filter Functionality
  // -------------------------------------------------------------------------
  const productSearchInput = document.getElementById('productSearch');
  const productFilterBtns = document.querySelectorAll('.product-filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  function filterProducts() {
    const query = productSearchInput ? productSearchInput.value.toLowerCase().trim() : '';
    const activeBtn = document.querySelector('.product-filter-btn.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-filter') : 'all';

    let visibleCount = 0;
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category') || '';
      const cardTitle = card.querySelector('.product-name')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.product-desc')?.textContent.toLowerCase() || '';

      const matchesCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchesSearch = query === '' || cardTitle.includes(query) || cardDesc.includes(query);

      if (matchesCategory && matchesSearch) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    const noResultsMsg = document.getElementById('noProductsFound');
    if (noResultsMsg) {
      noResultsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  }

  if (productSearchInput) {
    productSearchInput.addEventListener('input', filterProducts);
  }

  productFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      productFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts();
    });
  });

  // -------------------------------------------------------------------------
  // Repair Services Category Filter
  // -------------------------------------------------------------------------
  const serviceFilterBtns = document.querySelectorAll('.service-filter-btn');
  const serviceCards = document.querySelectorAll('.service-card');

  serviceFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      serviceFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const selected = btn.getAttribute('data-filter');

      serviceCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (selected === 'all' || cat === selected) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // Inquiry Modal & WhatsApp Deep-Linking
  // -------------------------------------------------------------------------
  const inquiryModal = document.getElementById('inquiryModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalItemTitle = document.getElementById('modalItemTitle');
  const modalItemType = document.getElementById('modalItemType');
  const modalInquiryForm = document.getElementById('modalInquiryForm');

  function openInquiryModal(itemName, itemType) {
    if (modalItemTitle) modalItemTitle.textContent = itemName;
    if (modalItemType) modalItemType.value = `${itemType}: ${itemName}`;
    if (inquiryModal) {
      inquiryModal.classList.add('is-active');
      inquiryModal.setAttribute('aria-hidden', 'false');
    }
  }

  function closeInquiryModal() {
    if (inquiryModal) {
      inquiryModal.classList.remove('is-active');
      inquiryModal.setAttribute('aria-hidden', 'true');
    }
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeInquiryModal);
  }

  if (inquiryModal) {
    inquiryModal.addEventListener('click', (e) => {
      if (e.target === inquiryModal) {
        closeInquiryModal();
      }
    });
  }

  // Trigger modal or direct WhatsApp from product "Contact for Price" buttons
  document.querySelectorAll('.btn-inquire-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product') || 'Bag Product';
      openInquiryModal(productName, 'Product');
    });
  });

  // Trigger modal or direct WhatsApp from repair "Enquire Repair" buttons
  document.querySelectorAll('.btn-inquire-repair').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceName = btn.getAttribute('data-service') || 'Repair Service';
      openInquiryModal(serviceName, 'Repair Service');
    });
  });

  // Handle modal submit -> sends directly to WhatsApp
  if (modalInquiryForm) {
    modalInquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const customerName = document.getElementById('modalCustomerName')?.value.trim() || 'Customer';
      const customerPhone = document.getElementById('modalCustomerPhone')?.value.trim() || '';
      const selectedItem = modalItemType?.value || 'General Inquiry';
      const customerMsg = document.getElementById('modalCustomerMsg')?.value.trim() || '';

      const text = `Hello Daveedu Bag Sales & Repair,\n\nI am interested in:\n📌 *${selectedItem}*\n\nMy Details:\n👤 Name: ${customerName}\n📞 Phone: ${customerPhone}\n📝 Note: ${customerMsg || 'Please provide pricing & availability'}\n\nCould you please let me know details? Thank you!`;

      const whatsappUrl = `https://wa.me/${BUSINESS_PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      closeInquiryModal();
    });
  }

  // -------------------------------------------------------------------------
  // Main Contact Section Form Submission -> WhatsApp
  // -------------------------------------------------------------------------
  const mainContactForm = document.getElementById('mainContactForm');
  const formSuccessAlert = document.getElementById('formSuccessAlert');

  if (mainContactForm) {
    mainContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName')?.value.trim() || 'Customer';
      const phone = document.getElementById('contactPhone')?.value.trim() || '';
      const serviceType = document.getElementById('contactService')?.value || 'General Inquiry';
      const message = document.getElementById('contactMessage')?.value.trim() || '';

      const text = `Hello Daveedu Bag Sales & Repair,\n\nI have an inquiry regarding: *${serviceType}*\n\n👤 Name: ${name}\n📞 Phone: ${phone}\n💬 Message: ${message || 'Please contact me regarding this service.'}\n\nLooking forward to hearing from you.`;

      const whatsappUrl = `https://wa.me/${BUSINESS_PHONE_CLEAN}?text=${encodeURIComponent(text)}`;
      
      if (formSuccessAlert) {
        formSuccessAlert.style.display = 'block';
        setTimeout(() => {
          window.open(whatsappUrl, '_blank');
          mainContactForm.reset();
        }, 600);
      } else {
        window.open(whatsappUrl, '_blank');
        mainContactForm.reset();
      }
    });
  }

  // -------------------------------------------------------------------------
  // Image Lightbox for Gallery
  // -------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImage = document.getElementById('lightboxImage');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCloseBtn = document.getElementById('lightboxCloseBtn');

  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('img');
      const caption = item.querySelector('.gallery-caption')?.textContent || '';
      if (img && lightboxImage && lightboxModal) {
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt || caption;
        if (lightboxCaption) lightboxCaption.textContent = caption;
        lightboxModal.classList.add('is-active');
        lightboxModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (lightboxCloseBtn && lightboxModal) {
    lightboxCloseBtn.addEventListener('click', () => {
      lightboxModal.classList.remove('is-active');
      lightboxModal.setAttribute('aria-hidden', 'true');
    });

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('is-active');
        lightboxModal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Keyboard accessibility (ESC to close modals)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeInquiryModal();
      if (lightboxModal) {
        lightboxModal.classList.remove('is-active');
      }
    }
  });

  // -------------------------------------------------------------------------
  // Image Fallback Handling
  // -------------------------------------------------------------------------
  // In case external images fail or user runs offline, provide reliable fallback styling
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('error', () => {
      img.style.opacity = '0.9';
      img.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='600' height='400' fill='%23382519'/%3E%3Ctext x='50%25' y='46%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='26' fill='%23E2934D'%3EDaveedu Bag Sales %26 Repair%3C/text%3E%3Ctext x='50%25' y='58%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18' fill='%23FAF8F5'%3ERamanayapeta, Kakinada%3C/text%3E%3C/svg%3E";
    });
  });
});
