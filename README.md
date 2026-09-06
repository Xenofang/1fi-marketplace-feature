# 1Fi Marketplace

A responsive marketplace feature built for the 1Fi application. The feature allows users to browse available products, search products, select product variants, choose an EMI plan, and proceed to payment.

---

## 📌 Features

### Marketplace

- Browse products available in the marketplace.
- Search products by name.
- View product details.
- Select available product variants.
- Select an available EMI plan.
- View EMI-related information before proceeding.
- Proceed from product selection to the payment page.
- Responsive layout for desktop and mobile devices.

### Product Selection

Users can:

1. Select a product.
2. Select the required variant.
3. Select an EMI plan.
4. Review the selected details.
5. Proceed to payment.

### Payment Flow

The marketplace is connected to a payment-flow page where the selected:

- Product
- Variant
- EMI plan

are passed to the payment screen.

### Bottom Navigation

A reusable bottom navigation component is used throughout the application.

Navigation includes:

- Home
- Shop
- EMI Dues
- Limit
- Profile

The active page is automatically highlighted.

---

## 🛠️ Tech Stack

### Frontend

- **React.js** – Component-based UI development
- **JavaScript (ES6+)** – Application logic
- **Tailwind CSS** – Responsive styling and UI design
- **Lucide React** – Icons
- **React Router DOM** – Page navigation

### Data

- **JSON** – Product data
- **Fetch API** – Fetching product data from `product.json`

---

## 📂 Project Structure

```text
src/
│
├── Components/
│   └── BottomNavbar.jsx
│
├── Page/
│   ├── Home.jsx
│   ├── Payment.jsx
│   ├── EMI.jsx
│   ├── Limit.jsx
│   ├── Profile.jsx
│   │
│   └── Shop/
│       ├── Shop.jsx
│       └── Marketplace.jsx
│
├── services/
│   └── ProductApi.js
│
├── App.jsx
│
public/
└── product.json
