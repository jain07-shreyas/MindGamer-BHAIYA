
    // === Typewriter Effect ===
const text = "Welcome to Mind Gamer Bhaiya";
let i = 0;
const speed = 100;

function typeWriter() {
  const welcomeText = document.getElementById("welcome-text");
  if (i < text.length) {
    welcomeText.innerHTML += text.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  }
}

// === Stars Background Animation ===


// === Cart System with LocalStorage ===
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(name, price) {
  cart.push({ name, price });
  saveCart();
  updateCart();
    showToast(`${name} added to cart`, "success");
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCart() {
  const cartList = document.getElementById("cartItems");
  const totalDisplay = document.getElementById("total");

  if (!cartList || !totalDisplay) return;

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item,index) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price.toFixed(2)} <button class="remove-item" onclick="removeFromCart(${index})">X</button>`;
    // Pass the index to removeFromCart
    cartList.appendChild(li);
    total += item.price;
  });

  totalDisplay.textContent = `Total: $${total.toFixed(2)}`;
}

 

// === Mobile Navbar Toggle ===
function toggleMenu() {
  const nav = document.getElementById("navMenu");
  nav.classList.toggle("active");
}

// === Page Load Initialization ===
window.onload = () => {
  typeWriter();
  updateCart();
};

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3000); // 3 seconds
}

function removeFromCart(index) {
  const removedItem = cart[index];
  cart.splice(index, 1);
  saveCart();
  updateCart();
  showToast(`${removedItem.name} removed from cart`, "error");
}
function searchProducts() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".product-card");

  cards.forEach(card => {
    const title = card.querySelector("h3").textContent.toLowerCase();
    if (title.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
function buyNow() {
  if (cart.length === 0) {
    showToast("Your cart is empty.", "warning");
    return;
  }
  saveCart(); // make sure cart is saved
  window.location.href = "payment.html";
}
ScrollReveal().reveal('.hero-content', {
  delay: 300,
  origin: 'top',
  distance: '80px',
  duration: 1000,
  easing: 'ease-in-out',
  reset: false
});

ScrollReveal().reveal('.product-card', {
  interval: 200,
  origin: 'bottom',
  distance: '40px',
  duration: 800,
  easing: 'ease-in-out',
  reset: false
});

ScrollReveal().reveal('.cart', {
  origin: 'left',
  distance: '60px',
  duration: 1000,
  easing: 'ease',
  reset: false
});
// === 3D Starfield with Three.js ===
// === 3D Starfield with Three.js ===
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("bg-stars").appendChild(renderer.domElement);

const starGeometry = new THREE.BufferGeometry();
const starCount = 1000;
const positions = [];

for (let i = 0; i < starCount; i++) {
  positions.push(
    (Math.random() - 0.5) * 100,
    (Math.random() - 0.5) * 100,
    -Math.random() * 100
  );
}

starGeometry.setAttribute(
  "position",
  new THREE.Float32BufferAttribute(positions, 3)
);

const starMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 0.5,
});

const starField = new THREE.Points(starGeometry, starMaterial);
scene.add(starField);

function animateStars() {
  requestAnimationFrame(animateStars);
  starField.rotation.y += 0.0008;
  renderer.render(scene, camera);
}
animateStars();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
function scrollToProducts() {
  const productsSection = document.querySelector(".products");
  if (productsSection) {
    productsSection.scrollIntoView({ behavior: "smooth" });
  }
}
function askAI() {
  const question = document.getElementById("question").value;

  if (!question) {
    document.getElementById("aiReply").innerText = "❗ Please type a question.";
    return;
  }

  fetch("http://localhost:5000/ask-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: question })
  })
    .then(res => res.json())
    .then(data => {
      if (data.reply) {
        document.getElementById("aiReply").innerText = "🤖 " + data.reply;
      } else if (data.error) {
        document.getElementById("aiReply").innerText = "❌ AI error: " + data.error;
      } else {
        document.getElementById("aiReply").innerText = "❌ No response from AI.";
      }
    })
    .catch(err => {
      console.error(err);
      document.getElementById("aiReply").innerText = "❌ Server error. Check console.";
    });
}
