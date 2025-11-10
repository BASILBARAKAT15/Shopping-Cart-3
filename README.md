# 🍓 Fruit Store Web App

## Project Overview

**Fruit Store** is an interactive, responsive, and user-friendly web application that simulates a mini e-commerce store for purchasing fruits. Users can browse products, add items to a shopping cart, manage quantities, and checkout while keeping track of their balance.

This project demonstrates DOM manipulation, event handling, dynamic rendering, and JavaScript-based state management.

---

## 🛠 Features

* **Product Listing**

  * Displays products dynamically with images, names, prices, and add-to-cart buttons.
  * Responsive grid layout adapts to screen sizes.

* **Shopping Cart**

  * Add, remove, increase, and decrease product quantities.
  * Real-time cart total calculation.
  * Prevents adding items that exceed available balance.

* **User Balance Management**

  * Editable balance input.
  * Automatically updates available balance after purchases.

* **Checkout & Payment**

  * Input for cash received.
  * Calculates remaining balance or cash return.
  * Generates a receipt with cart total, cash received, and remaining balance.

* **UX Enhancements**

  * Inline messages instead of pop-ups for alerts.
  * Hover effects and visually appealing card designs.
  * Clean and modern “glass-like” UI design with semi-transparent sections.

---

## 📦 Technologies Used

* **HTML5** – Structure of the web app.
* **CSS3** – Styling with modern gradients, shadows, and flex/grid layouts.
* **JavaScript (ES6)** – Dynamic product rendering, cart management, balance updates, and payment processing.
* **Responsive Design** – Flexbox and Grid layout for adaptable interfaces.

---

## ⚙ Installation & Usage

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/fruit-store.git
   ```

2. **Navigate to the project folder**

   ```bash
   cd fruit-store
   ```

3. **Open `index.html` in your browser**

   * Double-click `index.html` or use a live server in VS Code.

4. **Start Using the App**

   * Browse products and click **Add to Cart**.
   * Adjust quantities using `+` and `-` buttons.
   * Enter your available balance or update it.
   * Checkout by entering cash received.
   * View receipt with totals and remaining balance.

---

## 📐 Project Structure

```
├── src
│   ├── assets
│   │   ├── front.js
│   │   ├── script.js  
│   │   └── styles.css
│   ├── images
│   │   ├── cherry.jpg
│   │   ├── orange.jpg
│   │   └── strawberry.jpg
│   └──  index.html
├── tests
│   └── script.test.js
├── package.json
└── package-lock.json  
```

---

## 🖼 Screenshots

**Home Page**
![Home Page](screenshots/home.png)

**Product Listing**
![Product Listing](screenshots/products.png)

**Shopping Cart**
![Shopping Cart](screenshots/cart.png)

**Checkout & Receipt**
![Checkout](screenshots/checkout.png)

> *Replace the screenshots folder with actual images of your app.*

---

## 📌 Code Quality & Best Practices

* All product properties strictly follow Udacity rubric:

  ```javascript
  name (string), price (number), quantity (number), productId (number), image (string)
  ```
* All numbers formatted with 2 decimal places.
* Inline messages replace JavaScript `alert()` for smoother UX.
* Modular functions for cart operations, rendering, and payment.
* Event listeners attached dynamically to ensure maintainability.

---

## 🎯 Project Goals

* Demonstrate proficiency in **DOM manipulation** and **event handling**.
* Implement **state management** using JavaScript objects and arrays.
* Apply **responsive design** principles using Flexbox and Grid.
* Deliver a **clean, professional, and user-friendly UI**.

---

## ✅ Future Improvements

* Persistent cart using **localStorage**.
* Filter or search products by name or price.
* Add product categories for better navigation.
* Integrate animations for smoother user experience.

---

## 📄 License

This project is **open-source** and available under the MIT License.

---

## 👨‍💻 Author

**BASILBARAKAT**

