// main.js - Portfolio site interactivity

// Toast Notification Logic
window.addEventListener('DOMContentLoaded', function() {
  const toast = document.getElementById('toast');
  if (toast) {
    toast.style.display = 'block';
    toast.classList.add('show');
  }

  // Floating Scroll Button Logic
  const scrollBtn = document.getElementById('scroll-btn');
  const scrollIcon = scrollBtn ? scrollBtn.querySelector('i') : null;
  const contactSection = document.getElementById('contact');

  function updateScrollBtn() {
    if (!scrollBtn || !scrollIcon) return;
    if (window.scrollY < window.innerHeight * 0.4) {
      // Near top: show down arrow
      scrollIcon.classList.remove('fa-arrow-up');
      scrollIcon.classList.add('fa-arrow-down');
      scrollBtn.setAttribute('aria-label', 'Scroll Down');
    } else {
      // Scrolled down: show up arrow
      scrollIcon.classList.remove('fa-arrow-down');
      scrollIcon.classList.add('fa-arrow-up');
      scrollBtn.setAttribute('aria-label', 'Scroll Up');
    }
  }

  window.addEventListener('scroll', updateScrollBtn);
  updateScrollBtn();

  if (scrollBtn) {
    scrollBtn.addEventListener('click', function() {
      if (window.scrollY < window.innerHeight * 0.4) {
        // Scroll to bottom/contact
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
      } else {
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
});

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger && hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Dark mode toggle
const darkToggle = document.getElementById('darkmode-toggle');
const userPrefDark = localStorage.getItem('theme') === 'dark';
if (userPrefDark) document.body.classList.add('dark');
darkToggle && darkToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  localStorage.setItem('theme', document.body.classList.contains('dark') ? 'dark' : 'light');
});

// Smooth scroll for 'See My Work' button
const seeWork = document.getElementById('see-work');
seeWork && seeWork.addEventListener('click', () => {
  window.location.href = 'projects.html';
});

// Typing animation for hero headline
const typed = document.getElementById('typed');
if (typed) {
  const messages = [
    "Hi, I’m TipKode",
    "Python Developer & Cybersecurity Enthusiast"
  ];
  let msgIdx = 0, charIdx = 0, isDeleting = false;
  function type() {
    let current = messages[msgIdx];
    let display = isDeleting ? current.substring(0, charIdx--) : current.substring(0, charIdx++);
    typed.textContent = display;
    if (!isDeleting && charIdx === current.length + 1) {
      setTimeout(() => isDeleting = true, 1200);
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      msgIdx = (msgIdx + 1) % messages.length;
    }
    setTimeout(type, isDeleting ? 50 : 90);
  }
  type();
}

// Contact form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields.');
      e.preventDefault();
    }
    // Basic email validation
    if (!/^[^@]+@[^@]+\.[^@]+$/.test(email)) {
      alert('Please enter a valid email address.');
      e.preventDefault();
    }
  });
}
