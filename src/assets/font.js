
// ---------------------------
// Global Variables
// ---------------------------
const products = [
  {
    productId: 1,
    name: "Carton of Cherries",
    price: 4,
    quantity: 0,
    image: "./images/cherry.jpg"   
  },
  {
    productId: 2,
    name: "Carton of Strawberries",
    price: 5,
    quantity: 0,
    image: "./images/strawberry.jpg"   
  },
  {
    productId: 3,
    name: "Bag of Oranges",
    price: 10,
    quantity: 0,
    image: "./images/orange.jpg"   
  }
];

let balance = 20;
let cart = [];
let totalPaid = 0; // Global variable for partial payments

// ---------------------------
// Display Products
// ---------------------------
function displayProducts() {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image">
      <h3 class="product-name">${product.name}</h3>
      <p class="product-price">Price: $${product.price.toFixed(2)}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.productId})">Add to Cart</button>
    `;

    productList.appendChild(card);
  });
}

// ---------------------------
// Add to Cart
// ---------------------------
function addToCart(id) {
  const product = products.find(p => p.productId === id);
  const item = cart.find(i => i.productId === id);

  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// ---------------------------
// Render Cart
// ---------------------------
function renderCart() {
  const cartList = document.getElementById("cart-list");
  const cartTotalEl = document.getElementById("cart-total");

  cartList.innerHTML = "";

  if (cart.length === 0) {
    cartList.innerHTML = "<p>Your cart is empty.</p>";
    cartTotalEl.textContent = "Cart Total: $0";
    return;
  }

  cart.forEach(item => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-item-name">${item.name}</div>
      <div class="cart-item-info">Price: $${item.price.toFixed(2)}</div>
      <div class="cart-item-info">Quantity: ${item.quantity}</div>
      <div class="cart-controls">
        <button class="quantity-btn" onclick="changeQuantity(${item.productId}, 1)">+</button>
        <button class="quantity-btn" onclick="changeQuantity(${item.productId}, -1)">-</button>
        <button class="remove-btn" onclick="removeItem(${item.productId})">Remove</button>
      </div>
    `;
    cartList.appendChild(div);
  });

  const total = cartTotal();
  cartTotalEl.textContent = `Cart Total: $${total.toFixed(2)}`;
}

// ---------------------------
// Change Quantity
// ---------------------------
function changeQuantity(id, amount) {
  const item = cart.find(i => i.productId === id);
  if (!item) return;

  item.quantity += amount;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.productId !== id);
  }

  renderCart();
}

// ---------------------------
// Remove Item
// ---------------------------
function removeItem(id) {
  cart = cart.filter(i => i.productId !== id);
  renderCart();
}

// ---------------------------
// Clear Cart
// ---------------------------
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  emptyCart();
  totalPaid = 0;
  renderCart();
  document.getElementById("return-msg").textContent = "";
});

// ---------------------------
// Update Balance
// ---------------------------
document.getElementById("update-balance-btn").addEventListener("click", () => {
  const input = document.getElementById("balance-input").value;
  if (input === "" || input < 0) return;
  balance = parseFloat(input);
  document.getElementById("user-balance").textContent = `Your Balance: $${balance.toFixed(2)}`;
});

// ---------------------------
// Cart Total Function
// ---------------------------
function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ---------------------------
// Empty Cart Function
// ---------------------------
function emptyCart() {
  cart = [];
  renderCart();
}

// ---------------------------
// Payment Function (Supports Partial Payments)
// ---------------------------
function pay(amount) {
  const msg = document.getElementById("return-msg");
  const cashReceived = document.getElementById("cash-received");
  const remainingEl = document.getElementById("remaining-balance");
  const userBalance = document.getElementById("user-balance");

  if (isNaN(amount) || amount <= 0) {
    msg.textContent = "Please enter a valid amount.";
    return;
  }

  if (amount > balance) {
    msg.textContent = "Insufficient balance!";
    return;
  }

  // Deduct from user's balance
  balance -= amount;
  totalPaid += amount;

  const total = cartTotal();
  const remaining = total - totalPaid;

  if (remaining <= 0) {
    const change = -remaining;
    balance += change; // refund any overpaid amount
    emptyCart();
    totalPaid = 0;
    msg.textContent = `Payment successful! Your change: $${change.toFixed(2)} 🎉`;
  } else {
    msg.textContent = `Partial payment received. Remaining: $${remaining.toFixed(2)}`;
  }

  // Update displayed amounts
  userBalance.textContent = `Your Balance: $${balance.toFixed(2)}`;
  cashReceived.textContent = `Cash Received: $${amount.toFixed(2)}`;
  remainingEl.textContent = `Remaining to Pay: $${remaining > 0 ? remaining.toFixed(2) : 0}`;
}

// ---------------------------
// Event Listeners
// ---------------------------
document.getElementById("pay-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash-input").value);
  pay(cash);
  document.getElementById("cash-input").value = "";
});

document.getElementById("clear-cart-btn").addEventListener("click", () => {
  emptyCart();
  totalPaid = 0;
  document.getElementById("return-msg").textContent = "";
  document.getElementById("cash-received").textContent = "Cash Received: $0";
  document.getElementById("remaining-balance").textContent = "Remaining to Pay: $0";
});

document.getElementById("update-balance-btn").addEventListener("click", () => {
  const amount = parseFloat(document.getElementById("balance-input").value);
  updateBalance(amount);
  document.getElementById("balance-input").value = "";
});

// ---------------------------
// Initialize
// ---------------------------
displayProducts();
renderCart();
document.getElementById("user-balance").textContent = `Your Balance: $${balance.toFixed(2)}`;
