# Restaurant Customer Ordering Website

A modern, mobile-first contactless QR dining and ordering application built with React, Vite, TypeScript, and Tailwind CSS.

## Overview

**ChefDesk Customer QR Ordering** enables restaurant patrons to scan a table QR code, browse interactive food categories, filter by dietary preferences (Vegetarian, Non-Vegetarian, Chef's Special), configure their order, and track dining tickets—all directly from their mobile browser without downloading an app.

## Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite 6](https://vitejs.dev/)
- **Language:** [TypeScript 5](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com/)
- **Routing:** [React Router DOM v6](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [React Hot Toast](https://react-hot-toast.com/)
- **Forms & Validation:** [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)

## Application Routes

- `/menu/:tableToken` - Dynamic QR table entry and authentic Indian food menu (`TABLE-001` through `TABLE-005`).
- `/cart` - Dedicated cart page with quantity adjustments, guest & cooking notes, and direct order placement.
- `/order-confirmation/:orderNumber` - Order confirmation page (`#ORD-XXXX`) with initial `Pending Confirmation` status.
- `/order-details/:orderNumber` - Customer order details page with interactive 5-stage status timeline (Pending, Accepted, Preparing, Ready, Completed).

## Folder Structure

```
Restaurant-Customer/
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── assets/
│   │   ├── images/
│   │   └── icons/
│   ├── components/
│   │   ├── common/         # Button, Badge, Card, Modal, LoadingSpinner, EmptyState
│   │   ├── layout/         # CustomerHeader, CustomerFooter, BottomCartBar
│   │   ├── menu/           # MenuCategoryPills, MenuItemCard
│   │   └── cart/           # CartItemRow, OrderSummaryCard
│   ├── constants/          # Brand colors (#F47738), tax rates, dietary filters
│   ├── data/               # Static mock data (categories.json, menu.json, restaurant.json, tables.json)
│   ├── hooks/              # useCart (pure in-memory state), useMenu (filtering & search)
│   ├── layouts/            # CustomerLayout shell with header and responsive container
│   ├── pages/              # Dedicated page views (reserved for future steps)
│   ├── routes/             # AppRoutes with React Router configuration
│   ├── types/              # TypeScript interfaces for Cart, Menu, Table, Order
│   └── utils/              # Class merging (cn), currency & date formatters
```

## Architectural Guidelines

- **Zero Backend / Offline Mock Data:** The application relies entirely on static JSON files in `src/data/`. No external APIs, databases, or MongoDB connections are used.
- **Pure React State:** All user interactions, cart mutations, quantity adjustments, and status progressions run strictly within in-memory React state.
- **Design System:**
  - **Brand Accent:** Warm Orange (`#F47738`)
  - **Typography:** Inter with smooth font antialiasing
  - **Mobile Experience:** Optimized touch targets, hidden scrollbars, bottom safe area padding, sticky action bars.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The application runs locally on `http://localhost:5173/`.

### 3. Build for Production

```bash
npm run build
```
