// DOM Elements
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const header = document.querySelector(".header");
const hospitalCards = document.querySelectorAll(".hospital-card");
const arrowBtns = document.querySelectorAll(".arrow-btn");
const socialLinks = document.querySelectorAll(".social-link");
const navLinks = document.querySelectorAll(".nav-link");
const contactItems = document.querySelectorAll(".contact-item");
const images = document.querySelectorAll("img");
const hospitals = [ /* data rumah sakit */ ];
const hospitalMarkers = [ /* marker peta */ ];
const map = [/* referensi ke peta Leaflet */];

// Toggle mobile menu
menuBtn.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// Focus search input on click
searchBtn.addEventListener("click", () => {
  searchInput.focus();
});
// Search input handling
searchInput.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  console.log("Searching for:", searchTerm);
  // Implement real-time search filtering if needed
});

// Hospital card click interaction 
hospitalCards.forEach((card) => {
  card.addEventListener("click", function(e) {
    // Skip if click came from arrow button
    if (e.target.closest('.arrow-btn')) return;
    
    const link = this.getAttribute("data-link");
    const hospitalName = this.querySelector(".hospital-name").textContent;

    if (link) {
      // Jika data-link ada, buka URL
      window.open(link, "_blank");
    } else {
      // Cari rumah sakit di data hospitals
      const hospital = hospitals.find(h => h.name.includes(hospitalName));
      
      if (hospital) {
        // Zoom ke lokasi rumah sakit di peta
        map.flyTo(hospital.coords, 15);
        
        // Buka popup marker
        const marker = hospitalMarkers.find(m => m.name === hospital.name)?.marker;
        if (marker) {
          marker.openPopup();
        }
      } else {
        console.log("Hospital data not found:", hospitalName);
      }
    }
  });
});

// Arrow button interaction (inside card)
arrowBtns.forEach((btn) => {
  btn.addEventListener("click", function(e) {
    e.stopPropagation(); // Prevent card click
    const hospitalName = this.closest(".hospital-card").querySelector(".hospital-name").textContent;
    console.log("Arrow clicked for:", hospitalName);
    // Implement specific action if needed
  });
});

// Social media links - cleaned up without alert
socialLinks.forEach((link) => {
  link.addEventListener("click", function(e) {
    const href = this.getAttribute("href");
    if (href && href.startsWith("http")) {
      window.open(href, "_blank");
    }
  });
});

// Navigation links - smooth scroll
navLinks.forEach((link) => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    const linkText = this.textContent;

    // Highlight active link
    navLinks.forEach((l) => l.classList.remove("active"));
    this.classList.add("active");

    // Close mobile menu
    nav.classList.remove("active");

    // Scroll to section
    if (linkText === "Map") {
      document.querySelector(".map-section").scrollIntoView({ behavior: "smooth" });
    }
    // Add logic for other nav items if needed
  });
});

// Contact item interaction (tel / email)
contactItems.forEach((item) => {
  item.addEventListener("click", function() {
    const text = this.querySelector("span").textContent;
    const isPhone = this.querySelector(".fa-phone");
    const isEmail = this.querySelector(".fa-envelope");

    if (isPhone) {
      window.open(`tel:${text}`);
    } else if (isEmail) {
      window.open(`mailto:${text}`);
    }
  });
});

// Fade-in animation for images
images.forEach((img) => {
  img.style.opacity = "0.5";
  img.addEventListener("load", function() {
    this.style.opacity = "1";
  });
  img.addEventListener("error", function() {
    this.src = "https://via.placeholder.com/300x200/e5e7eb/9ca3af?text=Image+Not+Found";
  });
});

// Page load: Animate cards
document.addEventListener("DOMContentLoaded", () => {
  console.log("Healthcare website loaded successfully");

  const cards = document.querySelectorAll(".hospital-card");
  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";

    setTimeout(() => {
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 200);
  });
});

// Window resize: auto-close menu
window.addEventListener("resize", () => {
  if (window.innerWidth >= 768) {
    nav.classList.remove("active");
  }
});

// Scroll effect: hide header when scrolling down
let lastScrollTop = 0;

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.style.transform = "translateY(-100%)";
  } else {
    header.style.transform = "translateY(0)";
  }

  lastScrollTop = scrollTop;
});
