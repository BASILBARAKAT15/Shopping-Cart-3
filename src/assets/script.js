// ---------------------------
// Global Variables
// ---------------------------
const products = [
  { productId: 1, name: "Carton of Cherries", price: 4, quantity: 0 },
  { productId: 2, name: "Carton of Strawberries", price: 5, quantity: 0 },
  { productId: 3, name: "Bag of Oranges", price: 10, quantity: 0 }
];

let balance = 20;  // User balance
let cart = [];     // Shopping cart
let totalPaid = 0; // For partial payments

// ---------------------------
// Cart Operations
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
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

function emptyCart() {
  cart = [];
  totalPaid = 0;
}

// ---------------------------
// Payment Function
// ---------------------------
function pay(amount) {
  if (isNaN(amount) || amount <= 0) return { success: false, message: "Invalid amount" };
  if (amount > balance) return { success: false, message: "Insufficient balance" };

  balance -= amount;
  totalPaid += amount;

  const total = cartTotal();
  const remaining = total - totalPaid;

  if (remaining <= 0) {
    const change = -remaining; // positive if overpaid
    balance += change; // refund extra money
    emptyCart();
    return { success: true, change, message: "Payment successful" };
  } else {
    return { success: true, remaining, message: "Partial payment received" };
  }
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
   emptyCart,
   /* Uncomment the following line if completing the currency converter bonus */
   // currency
};
