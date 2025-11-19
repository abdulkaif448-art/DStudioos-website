document.addEventListener('DOMContentLoaded', () => {
  highlightNav();
  initHeroSlider();
  initGalleryFilters();
  initLightbox();
  initBeforeAfter();
  initFaqAccordion();
  initBookingForm();
});

function highlightNav() {
  const currentPage = document.body.dataset.page;
  document.querySelectorAll('[data-nav]').forEach(link => {
    if (link.dataset.nav === currentPage) {
      link.classList.add('active');
    }
  });
}

function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  if (!slides.length) return;

  let index = 0;
  slides[index].classList.add('active');

  setInterval(() => {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
  }, 6000);
}

function initGalleryFilters() {
  const filterButtons = document.querySelectorAll('.filter-button');
  const galleryItems = document.querySelectorAll('[data-category]');

  if (!filterButtons.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.dataset.filter;
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      galleryItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

function initLightbox() {
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  const galleryItems = document.querySelectorAll('.gallery-card img');

  if (!lightbox || !galleryItems.length) return;

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      lightboxImg.src = img.src;
      lightbox.classList.add('open');
    });
  });

  lightbox.addEventListener('click', () => {
    lightbox.classList.remove('open');
    lightboxImg.src = '';
  });
}

function initBeforeAfter() {
  const slider = document.querySelector('.slider-input');
  const afterImage = document.querySelector('.after-image');

  if (!slider || !afterImage) return;

  slider.addEventListener('input', () => {
    const value = slider.value;
    afterImage.style.width = `${value}%`;
  });
}

function initFaqAccordion() {
  document.querySelectorAll('.faq-item button').forEach(button => {
    button.addEventListener('click', () => {
      const item = button.closest('.faq-item');
      item.classList.toggle('open');
    });
  });
}

function initBookingForm() {
  const bookingForm = document.querySelector('#booking-form');
  if (!bookingForm) return;

  bookingForm.addEventListener('submit', event => {
    event.preventDefault();
    const formData = new FormData(bookingForm);
    const missing = [];

    ['name', 'phone', 'email', 'date', 'time', 'service'].forEach(field => {
      if (!formData.get(field)) missing.push(field);
    });

    if (missing.length) {
      alert(`Please complete: ${missing.join(', ')}`);
      return;
    }

    alert('Thank you! We will confirm your booking shortly.');
    bookingForm.reset();
  });
}

