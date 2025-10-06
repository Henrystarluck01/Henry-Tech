// Responsive navigation menu toggle
document.addEventListener('DOMContentLoaded', function() {
  // Menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.querySelector('.nav');
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Intersection Observer for .home-content animation
  const homeContent = document.querySelector('.home-content');
  if (homeContent) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          homeContent.classList.add('animate-in');
        } else {
          homeContent.classList.remove('animate-in');
        }
      });
    }, { threshold: 0.3 });
    observer.observe(homeContent);
  }

  // Theme toggle logic
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const setTheme = (dark) => {
      if (dark) {
        document.documentElement.classList.add('dark-theme');
        themeToggle.textContent = '☀️';
      } else {
        document.documentElement.classList.remove('dark-theme');
        themeToggle.textContent = '🌙';
      }
      localStorage.setItem('theme', dark ? 'dark' : 'light');
    };
    // Initial theme
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme ? savedTheme === 'dark' : prefersDark);
    themeToggle.addEventListener('click', () => {
      setTheme(!document.documentElement.classList.contains('dark-theme'));
    });
  }
  // Typing effect for .skills
  const skillsElement = document.querySelector('.skills');
  if (skillsElement) {
    const skills = [
      'Ethical Hacking',
      'Cyber Security',
      'fullstack web development',
      'digital forensics',      
    ];
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typeSpeed = 80;
    const backSpeed = 80;
    const backDelay = 1200;
    function typeSkill() {
      const currentSkill = skills[skillIndex];
      if (!isDeleting) {
        skillsElement.textContent = currentSkill.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentSkill.length) {
          isDeleting = true;
          setTimeout(typeSkill, backDelay);
        } else {
          setTimeout(typeSkill, typeSpeed);
        }
      } else {
        skillsElement.textContent = currentSkill.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          isDeleting = false;
          skillIndex = (skillIndex + 1) % skills.length;
          setTimeout(typeSkill, typeSpeed);
        } else {
          setTimeout(typeSkill, backSpeed);
        }
      }
    }
    // Start typing effect
    typeSkill();
  }
});
