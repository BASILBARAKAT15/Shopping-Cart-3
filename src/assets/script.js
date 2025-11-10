// ---------------------------
// Global Variables
// ---------------------------
const products = [
  { productId: 1, name: "Carton of Cherries", price: 4, image: "./images/cherry.jpg" },
  { productId: 2, name: "Carton of Strawberries", price: 5, image: "./images/strawberry.jpg" },
  { productId: 3, name: "Bag of Oranges", price: 10, image: "./images/orange.jpg" }
];


let balance = 20;
let cart = [];
let totalPaid = 0;

// ---------------------------
// Cart Functions
// ---------------------------
function addProductToCart(id) {
  const product = products.find(p => p.productId === id);
  if (!product) return;

  const item = cart.find(i => i.productId === id);
  if (item) {
    item.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
}

function increaseQuantity(id) {
  const item = cart.find(i => i.productId === id);
  if (item) item.quantity++;
}

function decreaseQuantity(id) {
  const item = cart.find(i => i.productId === id);
  if (!item) return;

  item.quantity--;
  if (item.quantity <= 0) {
    removeProductFromCart(id);
  }
}

function removeProductFromCart(id) {
  cart = cart.filter(i => i.productId !== id);
}

function cartTotal() {
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

function emptyCart() {
  cart = [];
  totalPaid = 0;
}

// ---------------------------
// Payment Function
// ---------------------------
function pay(amount) {
  if (isNaN(amount) || amount <= 0) {
    return { success: false, message: "Invalid amount" };
  }

  if (amount > balance) {
    return { success: false, message: "Insufficient balance" };
  }

  balance -= amount;
  totalPaid += amount;

  const total = cartTotal();
  const remaining = total - totalPaid;

  if (remaining <= 0) {
    const change = -remaining;
    balance += change;
    emptyCart();
    return { success: true, change, message: "Payment successful" };
  }

  return { success: true, remaining, message: "Partial payment received" };
}

// ---------------------------
// Export Block
// ---------------------------
module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay,
  emptyCart
};
