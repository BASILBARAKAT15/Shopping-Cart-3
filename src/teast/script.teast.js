// Import functions and data from script.js
const cartModule = require('../src/assets/script.js');

describe('Cart Functionality Tests', () => {
  let product1;
  let product2;
  let cartArr;

  beforeEach(() => {
    // Reset the cart and product quantities before each test
    cartModule.emptyCart();
    cartModule.products.forEach(p => p.quantity = 0);

    product1 = cartModule.products[0]; // Cherries
    product2 = cartModule.products[1]; // Strawberries
    cartArr = cartModule.cart;
  });

  test('addProductToCart adds product to cart', () => {
    cartModule.addProductToCart(product1.productId);
    expect(cartArr.length).toBe(1);
    expect(cartArr[0].quantity).toBe(1);
    expect(cartArr[0].productId).toBe(product1.productId);
  });

  test('adding the same product again increases its quantity', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.addProductToCart(product1.productId);
    expect(cartArr.length).toBe(1);
    expect(cartArr[0].quantity).toBe(2);
  });

  test('increaseQuantity works correctly', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.increaseQuantity(product1.productId);
    expect(cartArr[0].quantity).toBe(2);
  });

  test('decreaseQuantity decreases quantity and removes item when 0', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.increaseQuantity(product1.productId); // quantity = 2
    cartModule.decreaseQuantity(product1.productId); // quantity = 1
    expect(cartArr[0].quantity).toBe(1);

    cartModule.decreaseQuantity(product1.productId); // quantity = 0 → removed
    expect(cartArr.length).toBe(0);
  });

  test('removeProductFromCart clears product from cart', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.removeProductFromCart(product1.productId);
    expect(cartArr.length).toBe(0);
  });
});

describe('Checkout Functionality Tests', () => {
  let product1;
  let product2;
  let cartArr;

  beforeEach(() => {
    cartModule.emptyCart();
    cartModule.products.forEach(p => p.quantity = 0);

    product1 = cartModule.products[0]; // Cherries
    product2 = cartModule.products[2]; // Oranges
    cartArr = cartModule.cart;
  });

  test('cartTotal calculates correct total', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.addProductToCart(product2.productId);
    cartModule.increaseQuantity(product1.productId); // Cherries quantity = 2

    const total = cartModule.cartTotal();
    expect(total).toBe(product1.price * 2 + product2.price * 1);
  });

  test('pay more than total returns success and correct change', () => {
    cartModule.addProductToCart(product1.productId);
    const result = cartModule.pay(1000);
    expect(result.success).toBe(true);
    expect(result.change).toBeGreaterThan(0);
  });

  test('partial payment returns remaining amount', () => {
    cartModule.addProductToCart(product1.productId);
    cartModule.addProductToCart(product2.productId);
    const result = cartModule.pay(1);
    expect(result.success).toBe(true);
    expect(result.remaining).toBeDefined();
    expect(result.remaining).toBeGreaterThan(0);
  });
});
