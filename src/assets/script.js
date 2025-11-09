// ---------------------------
// Global Variables
// ---------------------------
const products = [
  { productId: 1, name: "Carton of Cherries", price: 4, quantity: 0, image: "./images/cherry.jpg" },
  { productId: 2, name: "Carton of Strawberries", price: 5, quantity: 0, image: "./images/strawberry.jpg" },
  { productId: 3, name: "Bag of Oranges", price: 10, quantity: 0, image: "./images/orange.jpg" }
];

let balance = 20;
let cart = [];
let totalPaid = 0; // Global variable for partial payments

// ---------------------------
// Add product to cart
// ---------------------------
function addToCart(id) {
  const product = products.find(p => p.productId === id);
  if (!product) return;

  const item = cart.find(i => i.productId === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  renderCart();
}

// ---------------------------
// Remove item from cart
// ---------------------------
function removeItem(id) {
  cart = cart.filter(i => i.productId !== id);
  renderCart();
}

// ---------------------------
// Change quantity
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
// Calculate cart total
// ---------------------------
function cartTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ---------------------------
// Empty cart
// ---------------------------
function emptyCart() {
  cart = [];
  renderCart();
}

// ---------------------------
// Render cart in the DOM
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

  cartTotalEl.textContent = `Cart Total: $${cartTotal().toFixed(2)}`;
}

// ---------------------------
// Update user balance
// ---------------------------
function updateBalance(amount) {
  if (amount < 0 || isNaN(amount)) return;
  balance = amount;
  document.getElementById("user-balance").textContent = `Your Balance: $${balance.toFixed(2)}`;
}

// ---------------------------
// Payment function (supports partial payments)
// ---------------------------
function pay(amount) {
  if (isNaN(amount) || amount <= 0) {
    document.getElementById("return-msg").textContent = "Please enter a valid amount.";
    return;
  }

  // If user doesn't have enough balance
  if (amount > balance) {
    document.getElementById("return-msg").textContent = "Insufficient balance!";
    return;
  }

  // Deduct payment from user's balance
  balance -= amount;
  totalPaid += amount;

  const total = cartTotal();
  const remaining = total - totalPaid;

  if (remaining <= 0) {
    const change = -remaining; // positive if overpaid
    balance += change; // refund only the extra money
    emptyCart();
    totalPaid = 0;

    document.getElementById("return-msg").textContent = `Payment successful! Your change: $${change.toFixed(2)} 🎉`;
  } else {
    document.getElementById("return-msg").textContent = `Partial payment received. Remaining: $${remaining.toFixed(2)}`;
  }

  // Update displayed info
  document.getElementById("user-balance").textContent = `Your Balance: $${balance.toFixed(2)}`;
  document.getElementById("cash-received").textContent = `Cash Received: $${amount.toFixed(2)}`;
  document.getElementById("remaining-balance").textContent = `Remaining to Pay: $${remaining > 0 ? remaining.toFixed(2) : 0}`;
  return remaining <= 0 ? -remaining : -remaining;
}

// ---------------------------
// Event Listeners
// ---------------------------

// Pay button
document.getElementById("pay-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash-input").value);
  pay(cash);
  document.getElementById("cash-input").value = "";
});

// Clear cart button
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  emptyCart();
  totalPaid = 0;
  document.getElementById("return-msg").textContent = "";
  document.getElementById("cash-received").textContent = "Cash Received: $0";
  document.getElementById("remaining-balance").textContent = "Remaining to Pay: $0";
});

// Optional: update balance input if starter HTML has it
const balanceInput = document.getElementById("balance-input");
const updateBalanceBtn = document.getElementById("update-balance-btn");
if (balanceInput && updateBalanceBtn) {
  updateBalanceBtn.addEventListener("click", () => {
    const amount = parseFloat(balanceInput.value);
    updateBalance(amount);
    balanceInput.value = "";
  });
}

// ---------------------------
// Initialize
// ---------------------------
renderCart();
document.getElementById("user-balance").textContent = `Your Balance: $${balance.toFixed(2)}`;
