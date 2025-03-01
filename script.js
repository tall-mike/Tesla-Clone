"use strict";

// Array of Tesla Model 3 images
const images = [
  "images/Model3_52.jpg",
  "images/Model3_53.jpg",
  "images/Model3_54.jpg",
  "images/Model3_55.jpg",
  "images/Model3_56.jpg",
];

let currentImageIndex = 0;
const heroSection = document.querySelector(".hero");
let isConfigured = false;

heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;

function changeBackground() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;
}

setInterval(changeBackground, 5000);

// Toggle navigation dropdown
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
}

// Smooth scrolling with scrollIntoView
document.querySelectorAll(".nav__link").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetId = link.getAttribute("href").substring(1);
    const targetSection = document.getElementById(targetId);
    targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    nav.classList.remove("active");
    navToggle.classList.remove("active");
  });
});

// Configurator Modal
const configBtn = document.getElementById("config-btn");
const configModal = document.getElementById("config-modal");
const closeConfigModal = document.getElementById("close-config-modal");
const applyConfigBtn = document.getElementById("apply-config");
const totalPriceDisplay = document.getElementById("total-price");
const configSelects = document.querySelectorAll(".config__select");

function updateTotalPrice() {
  let total = 39990;
  configSelects.forEach((select) => {
    const price =
      parseInt(select.options[select.selectedIndex].dataset.price) || 0;
    total += price;
  });
  totalPriceDisplay.textContent = total.toLocaleString();
  const priceElement = totalPriceDisplay.parentElement;
  priceElement.classList.add("updated");
  setTimeout(() => priceElement.classList.remove("updated"), 500);
}

if (configBtn && configModal && closeConfigModal && applyConfigBtn) {
  configBtn.addEventListener("click", () => {
    configModal.style.display = "block";
    updateTotalPrice();
  });

  closeConfigModal.addEventListener("click", () => {
    configModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === configModal) {
      configModal.style.display = "none";
    }
  });

  configSelects.forEach((select) => {
    select.addEventListener("change", updateTotalPrice);
  });

  applyConfigBtn.addEventListener("click", () => {
    isConfigured = true;
    configModal.style.display = "none";
    alert("Configuration applied! Click 'Order Now' to proceed.");
  });
}

// Order Prompt and Form Modals
const orderBtn = document.getElementById("order-btn");
const promptModal = document.getElementById("prompt-modal");
const closePromptModal = document.getElementById("close-prompt-modal");
const goToConfigBtn = document.getElementById("go-to-config");
const orderModal = document.getElementById("order-modal");
const closeOrderModal = document.getElementById("close-order-modal");
const orderForm = document.getElementById("order-form");

if (
  orderBtn &&
  promptModal &&
  closePromptModal &&
  goToConfigBtn &&
  orderModal &&
  closeOrderModal &&
  orderForm
) {
  orderBtn.addEventListener("click", () => {
    if (!isConfigured) {
      promptModal.style.display = "block";
    } else {
      orderModal.style.display = "block";
    }
  });

  closePromptModal.addEventListener("click", () => {
    promptModal.style.display = "none";
  });

  goToConfigBtn.addEventListener("click", () => {
    promptModal.style.display = "none";
    configModal.style.display = "block";
    updateTotalPrice();
  });

  window.addEventListener("click", (event) => {
    if (event.target === promptModal) {
      promptModal.style.display = "none";
    }
  });

  closeOrderModal.addEventListener("click", () => {
    orderModal.style.display = "none";
  });

  window.addEventListener("click", (event) => {
    if (event.target === orderModal) {
      orderModal.style.display = "none";
    }
  });

  orderForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const location = document.getElementById("location").value;
    if (name && address && location) {
      alert(
        `Order Submitted!\nName: ${name}\nAddress: ${address}\nLocation: ${location}\nTotal: $${totalPriceDisplay.textContent}`
      );
      orderModal.style.display = "none";
      orderForm.reset();
    } else {
      alert("Please fill in all fields to submit your order.");
    }
  });
}

// Learn More scrolls to About
const learnMoreBtn = document.getElementById("learn-more-btn");
if (learnMoreBtn) {
  learnMoreBtn.addEventListener("click", () => {
    document
      .getElementById("about")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
}
