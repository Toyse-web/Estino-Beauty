window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) { // Adjust threshold (50px)
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});