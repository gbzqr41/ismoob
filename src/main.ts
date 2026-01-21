import './index.css'

// Full Screen Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const menuPopup = document.getElementById('menu-popup');
const menuLinks = document.querySelectorAll('.menu-popup-link');

const toggleMenu = () => {
  if (menuPopup) {
    menuPopup.classList.toggle('translate-y-full');
    menuPopup.classList.toggle('translate-y-0');
    // Lock scroll when menu is open
    document.body.style.overflow = menuPopup.classList.contains('translate-y-0') ? 'hidden' : '';
  }
};

if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', toggleMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);

// Close menu when a link is clicked
menuLinks.forEach(link => {
  link.addEventListener('click', toggleMenu);
});

// Service Accordion Logic
const accordionItems = document.querySelectorAll('.service-accordion-item');

accordionItems.forEach(item => {
  item.addEventListener('click', () => {
    const content = item.querySelector('.service-accordion-content');
    const icon = item.querySelector('[data-lucide="chevron-down"]');
    if (!content || !icon) return;

    const isOpen = !content.classList.contains('hidden');

    // Close all other items
    accordionItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.querySelector('.service-accordion-content')?.classList.add('hidden');
        otherItem.querySelector('[data-lucide="chevron-down"]')?.classList.remove('rotate-180');
      }
    });

    // Toggle current item
    if (isOpen) {
      content.classList.add('hidden');
      icon.classList.remove('rotate-180');
    } else {
      content.classList.remove('hidden');
      icon.classList.add('rotate-180');
    }
  });
});

// FAQ Accordion Logic
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
  const btn = item.querySelector('button');
  btn?.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');
    const currentIcon = item.querySelector('.faq-icon');

    // Close others
    faqItems.forEach(otherItem => {
      if (otherItem !== item) {
        otherItem.classList.remove('is-open');
        const otherIcon = otherItem.querySelector('.faq-icon');
        if (otherIcon) {
          otherIcon.setAttribute('data-lucide', 'plus');
        }
      }
    });

    // Toggle current
    if (isOpen) {
      item.classList.remove('is-open');
      currentIcon?.setAttribute('data-lucide', 'plus');
    } else {
      item.classList.add('is-open');
      currentIcon?.setAttribute('data-lucide', 'minus');
    }

    // Re-initialize Lucide for all icons
    // @ts-ignore
    lucide.createIcons();
  });
});

// Video Rotation Logic (1.5s interval)
const heroVideos = document.querySelectorAll<HTMLVideoElement>('.hero-video');
let currentVideoIndex = 0;

if (heroVideos.length > 0) {
  // Ensure all videos are playing
  heroVideos.forEach(v => v.play().catch(() => { }));

  setInterval(() => {
    heroVideos[currentVideoIndex].classList.remove('active');
    currentVideoIndex = (currentVideoIndex + 1) % heroVideos.length;
    heroVideos[currentVideoIndex].classList.add('active');

    // Proactively play the next video in case it was paused
    heroVideos[currentVideoIndex].play().catch(() => { });
  }, 1500);
}

// Mobile Contact Drawer Logic
const mobileFab = document.getElementById('mobile-fab');
const contactDrawer = document.getElementById('contact-drawer');
const drawerOverlay = document.getElementById('contact-drawer-overlay');
const closeDrawerBtn = document.getElementById('close-drawer-btn');

const toggleDrawer = (show: boolean) => {
  if (contactDrawer && drawerOverlay) {
    if (show) {
      drawerOverlay.classList.remove('hidden');
      setTimeout(() => {
        drawerOverlay.style.opacity = '1';
        contactDrawer.classList.remove('translate-y-full');
      }, 10);
      document.body.style.overflow = 'hidden';
    } else {
      drawerOverlay.style.opacity = '0';
      contactDrawer.classList.add('translate-y-full');
      setTimeout(() => {
        drawerOverlay.classList.add('hidden');
        document.body.style.overflow = '';
      }, 500);
    }
  }
};

if (mobileFab) mobileFab.addEventListener('click', () => toggleDrawer(true));
if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

// Initialize Lucide Icons
// @ts-ignore
lucide.createIcons();

