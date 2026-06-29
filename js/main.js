document.addEventListener('DOMContentLoaded', () => {
  // Theme Toggle Logic
  const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle');
  
  // Check local storage for theme
  const currentTheme = localStorage.getItem('theme') || 'dark';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcons(currentTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let theme = document.documentElement.getAttribute('data-theme');
      let newTheme = theme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcons(newTheme);
    });
  });

  function updateThemeIcons(theme) {
    themeToggles.forEach(toggle => {
      const icon = toggle.querySelector('i');
      if (!icon) return;
      if (theme === 'light') {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      } else {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      }
    });
  }

  // RTL Toggle Logic
  const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle');
  const currentDir = localStorage.getItem('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      let dir = document.documentElement.getAttribute('dir');
      let newDir = dir === 'ltr' ? 'rtl' : 'ltr';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
    });
  });

  // Sticky Header Logic
  const header = document.querySelector('.cyber-header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('active');
      
      // Animate hamburger lines
      const spans = mobileToggle.querySelectorAll('span');
      if (mobileMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Intersection Observer for Scroll Animations
  const animationElements = document.querySelectorAll(
    '.reveal-fade-up, .reveal-blur, .reveal-scale, .reveal-slide-right'
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const animationObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Optional: only animate once
      }
    });
  }, observerOptions);

  animationElements.forEach(el => {
    animationObserver.observe(el);
  });
});
