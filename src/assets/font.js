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
      <p class="product-price">Price: $${product.price}</p>
      <button class="add-to-cart-btn" onclick="addToCart(${product.productId})">Add to Cart</button>
    `;

    productList.appendChild(card);
  });
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
      <div class="cart-item-info">Price: $${item.price}</div>
      <div class="cart-item-info">Quantity: ${item.quantity}</div>
      <div class="cart-controls">
        <button class="quantity-btn" onclick="changeQuantity(${item.productId}, 1)">+</button>
        <button class="quantity-btn" onclick="changeQuantity(${item.productId}, -1)">-</button>
        <button class="remove-btn" onclick="removeItem(${item.productId})">Remove</button>
      </div>
    `;

    cartList.appendChild(div);
  });

  cartTotalEl.textContent = `Cart Total: $${cartTotal()}`;
}

// ---------------------------
// Cart UI Wrappers
// ---------------------------
function addToCart(id) {
  addProductToCart(id);
  renderCart();
}

function changeQuantity(id, amount) {
  if (amount === 1) increaseQuantity(id);
  else decreaseQuantity(id);
  renderCart();
}

function removeItem(id) {
  removeProductFromCart(id);
  renderCart();
}

// ---------------------------
// Checkout Actions
// ---------------------------
document.getElementById("pay-btn").addEventListener("click", () => {
  const cash = parseFloat(document.getElementById("cash-input").value);
  const result = pay(cash);
  const msg = document.getElementById("return-msg");
  const remainingEl = document.getElementById("remaining-balance");
  const cashReceived = document.getElementById("cash-received");
  const userBalance = document.getElementById("user-balance");

  if (!result.success) {
    msg.textContent = result.message;
    return;
  }

  userBalance.textContent = `Your Balance: $${balance}`;
  cashReceived.textContent = `Cash Received: $${cash}`;

  if (result.change !== undefined) {
    msg.textContent = `Payment successful! Change: $${result.change}`;
    remainingEl.textContent = `Remaining: $0`;
    renderCart();
  } else {
    msg.textContent = `Partial payment: $${result.remaining}`;
    remainingEl.textContent = `Remaining: $${result.remaining}`;
  }

  document.getElementById("cash-input").value = "";
});

// Clear cart button
document.getElementById("clear-cart-btn").addEventListener("click", () => {
  emptyCart();
  renderCart();
  document.getElementById("return-msg").textContent = "";
  document.getElementById("cash-received").textContent = "Cash Received: $0";
  document.getElementById("remaining-balance").textContent = "Remaining: $0";
});

// ---------------------------
// Initialize
// ---------------------------
displayProducts();
renderCart();
document.getElementById("user-balance").textContent = `Your Balance: $${balance}`;
