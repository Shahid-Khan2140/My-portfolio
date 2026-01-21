"use strict";

/**
 * ------------------------------------------------------------------------
 *  DOM ELEMENTS
 * ------------------------------------------------------------------------
 */
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const mobileLinks = document.querySelectorAll(".mobile-link");
const navLinks = document.querySelectorAll(".nav-link");
const typingElement = document.querySelector(".typing-text");
const sections = document.querySelectorAll("section, header");
const revealElements = document.querySelectorAll(
  ".fade-up, .fade-left, .fade-right",
);
const tiltCards = document.querySelectorAll(".tilt-card");
const preloader = document.querySelector(".preloader");
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");
const scrollProgressBar = document.querySelector(".scroll-progress-bar");
const backToTopBtn = document.querySelector(".back-to-top");

/**
 * ------------------------------------------------------------------------
 *  PRELOADER
 * ------------------------------------------------------------------------
 */
window.addEventListener("load", () => {
  setTimeout(() => {
    preloader.classList.add("hidden");
  }, 2000); // 2 seconds delay
});

/**
 * ------------------------------------------------------------------------
 *  PARTICLE ANIMATION (Interactive)
 * ------------------------------------------------------------------------
 */
const canvas = document.getElementById("particles-canvas");
const ctx = canvas.getContext("2d");
let particlesArray;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
  x: null,
  y: null,
  radius: (canvas.height / 80) * (canvas.width / 80),
};

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 1;
    this.speedX = Math.random() * 1.5 - 0.75;
    this.speedY = Math.random() * 1.5 - 0.75;
    this.color = "rgba(0, 242, 255, 0.3)";
  }
  update() {
    // Movement
    this.x += this.speedX;
    this.y += this.speedY;

    // Wall collision
    if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
    if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

    // Mouse Interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius + 100) {
      // Interaction radius
      if (mouse.x < this.x && this.x < canvas.width - this.size * 10) {
        this.x += 3;
      }
      if (mouse.x > this.x && this.x > this.size * 10) {
        this.x -= 3;
      }
      if (mouse.y < this.y && this.y < canvas.height - this.size * 10) {
        this.y += 3;
      }
      if (mouse.y > this.y && this.y > this.size * 10) {
        this.y -= 3;
      }
    }
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
}

function initParticles() {
  particlesArray = [];
  let numberOfParticles = (canvas.height * canvas.width) / 15000;
  for (let i = 0; i < numberOfParticles; i++) {
    particlesArray.push(new Particle());
  }
}

function connectParticles() {
  let opacityValue = 1;
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let distance =
        (particlesArray[a].x - particlesArray[b].x) *
          (particlesArray[a].x - particlesArray[b].x) +
        (particlesArray[a].y - particlesArray[b].y) *
          (particlesArray[a].y - particlesArray[b].y);
      if (distance < (canvas.width / 7) * (canvas.height / 7)) {
        opacityValue = 1 - distance / 20000;
        ctx.strokeStyle = "rgba(0, 242, 255," + opacityValue * 0.15 + ")";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  requestAnimationFrame(animateParticles);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
    particlesArray[i].draw();
  }
  connectParticles();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  mouse.radius = (canvas.height / 80) * (canvas.width / 80);
  initParticles();
});

initParticles();
animateParticles();

/**
 * ------------------------------------------------------------------------
 *  TYPING ANIMATION
 * ------------------------------------------------------------------------
 */
const textArray = [
  "Full-Stack Developer",
  "AI Enthusiast",
  "BCA Student",
  "UI/UX Designer",
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

function type() {
  const currentText = textArray[textIndex];

  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    typeSpeed = 50;
  } else {
    typingElement.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    typeSpeed = 100;
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    typeSpeed = 2000;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    textIndex++;
    typeSpeed = 500;
    if (textIndex === textArray.length) {
      textIndex = 0;
    }
  }

  setTimeout(type, typeSpeed);
}

document.addEventListener("DOMContentLoaded", type);

/**
 * ------------------------------------------------------------------------
 *  CUSTOM CURSOR
 * ------------------------------------------------------------------------
 */
window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  // Dot follows cursor instantly
  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // Outline follows with slight delay (handled by CSS transition or simple JS)
  // Using CSS transition for smoothness, keeping JS simple
  cursorOutline.style.left = `${posX}px`;
  cursorOutline.style.top = `${posY}px`;

  // Add interactions
  // cursorOutline.animate({
  //     left: `${posX}px`,
  //     top: `${posY}px`
  // }, { duration: 500, fill: "forwards" });
});

// Hover effect for links and buttons
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .tilt-card",
);

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1.5)";
    cursorOutline.style.backgroundColor = "rgba(0, 242, 255, 0.1)";
    cursorDot.style.transform = "translate(-50%, -50%) scale(2)";
  });
  el.addEventListener("mouseleave", () => {
    cursorOutline.style.transform = "translate(-50%, -50%) scale(1)";
    cursorOutline.style.backgroundColor = "transparent";
    cursorDot.style.transform = "translate(-50%, -50%) scale(1)";
  });
});

/**
 * ------------------------------------------------------------------------
 *  SCROLL PROGRESS & NAV & BACK TO TOP
 * ------------------------------------------------------------------------
 */
window.addEventListener("scroll", () => {
  // Navbar Logic
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
    backToTopBtn.classList.add("active");
  } else {
    navbar.classList.remove("scrolled");
    backToTopBtn.classList.remove("active");
  }

  // Scroll Progress Logic
  const scrollTop =
    document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;
  scrollProgressBar.style.width = scrolled + "%";

  // Active Link Logic
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    // const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 250) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href").includes(current)) {
      link.classList.add("active");
    }
  });
});

/**
 * ------------------------------------------------------------------------
 *  MOBILE MENU TOGGLE
 * ------------------------------------------------------------------------
 */
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobileMenu.classList.toggle("active");
  document.body.style.overflow = mobileMenu.classList.contains("active")
    ? "hidden"
    : "auto";
});

mobileLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mobileMenu.classList.remove("active");
    hamburger.classList.remove("active");
    document.body.style.overflow = "auto";
  });
});

/**
 * ------------------------------------------------------------------------
 *  SCROLL REVEAL
 * ------------------------------------------------------------------------
 */
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

revealElements.forEach((el) => observer.observe(el));

/**
 * ------------------------------------------------------------------------
 *  3D TILT EFFECT
 * ------------------------------------------------------------------------
 */
tiltCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform =
      "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
    card.style.transition = "transform 0.5s ease";
  });

  card.addEventListener("mouseenter", () => {
    card.style.transition = "none";
  });
});

/**
 * ------------------------------------------------------------------------
 *  SMOOTH SCROLLING
 * ------------------------------------------------------------------------
 */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    if (targetId === "#") return; // For empty links
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: "smooth",
      });
    }
  });
});
