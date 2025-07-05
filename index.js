// Scroll animation for navbar
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) { // Adjust threshold (50px)
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Show Hamburger for smaller screens
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("show"); //Show nav links when hamburger clicked
});

// Newsletter
const newsLetter = document.querySelector("#newsletterForm");
const messagePopup = document.querySelector("#newsLetterPopup")
newsLetter.addEventListener("submit", function(e) {
  e.preventDefault();
  // Show popup
  messagePopup.classList.add("visible");
  setTimeout(() => {
    messagePopup.classList.remove("visible");
  }, 3000);

  newsLetter.reset();
});

// Show testimonials
const testimonials = document.querySelectorAll(".testimonial");

const testimonialObserve = new IntersectionObserver((enter) => {
  enter.forEach(entry => {
    entry.target.classList.toggle("show", entry.isIntersecting);
  });
}, {
  threshold: 0.5
});

testimonials.forEach(testimonial => testimonialObserve.observe(testimonial));

// Carousel
const cards = document.querySelectorAll(".testimonial-card");
const nextBtn = document.querySelector("#next");
const prevBtn = document.querySelector("#prev");
const carousel = document.querySelector("#carousel");

let currentIndex = 0;
let autoSlide;
let hovered = false;

// Show only the current testimonial
function showSlide(index) {
  cards.forEach((card, each) => {
    card.classList.remove("active");
    if (each === index) card.classList.add("active");
  });
}

// Next slide
function nextSlide() {
  currentIndex = (currentIndex + 1) % cards.length;
  showSlide(currentIndex);
}

// Previous slide
function prevSlide() {
  currentIndex = (currentIndex - 1 + cards.length) %  cards.length;
  showSlide(currentIndex);
}

// Start auto-slide
function startAutoSlide() {
  autoSlide = setInterval(() => {
    if (!hovered) nextSlide();
  }, 5000);
}

// Stop auto-slide
function stopAutoSlide() {
  clearInterval(autoSlide);
}

// Handle hover to pause auto-slide
carousel.addEventListener("mouseenter", () => {
  hovered = true;
});

carousel.addEventListener("mouseleave", () => {
  hovered = false;
});

// Button click event next slide
nextBtn.addEventListener("click", () => {
  nextSlide();
});

// Button click event previous slide
prevBtn.addEventListener("click", () => {
  prevSlide();
});

// Swipe support
let touchStartX = 0;
let touchEndX = 0;

carousel.addEventListener("toushstart", (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

carousel.addEventListener("touchend", (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeDistance = touchEndX - touchStartX;
  const threshold = 50; //Minimum swipe distanse

  if (swipeDistance > threshold) {
    //Swipe right previous
    prevSlide();
  } else if (swipeDistance < -threshold) {
    //Swipe left next
    nextSlide();
  }
}

// Initialize
showSlide(currentIndex);
startAutoSlide();
