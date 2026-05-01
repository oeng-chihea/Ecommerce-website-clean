# WEISON Ecommerce Project Memo

## Project Summary

This project is a Next.js 14 ecommerce website for the WEISON apparel store. It uses the App Router under `src/app`, React client components for interactive UI, Tailwind CSS for styling, Framer Motion for animation, Zustand for persisted cart and wishlist state, PostgreSQL for order storage, and Nodemailer for order receipt emails.

The storefront currently uses mock product data from `src/lib/data.ts`. Orders become real backend records only after checkout submits to the order API.

## Technology Stack

| Area | Technology | Main Files |
| --- | --- | --- |
| Framework | Next.js 14 App Router | `src/app/*` |
| Language | TypeScript | `tsconfig.json` |
| Styling | Tailwind CSS, global CSS | `tailwind.config.ts`, `src/app/globals.css` |
| Animation | Framer Motion | Page and component files |
| Icons | Lucide React | Page and component files |
| Client state | Zustand with persistence | `src/lib/store.ts` |
| Database | PostgreSQL through `pg` | `src/lib/db.ts`, `src/lib/orderService.ts` |
| Email | Nodemailer Gmail transport | `src/lib/emailService.ts` |

## Application Workflow

1. A visitor lands on `/`, which renders the hero, featured product grid, and newsletter section.
2. Product cards are populated from `mockProducts` in `src/lib/data.ts`.
3. Users can browse `/shop`, search products from the navbar modal, open `/product?id=<productId>`, save favorites, or add items to the cart.
4. Cart and wishlist data live in the Zustand store and are persisted in browser storage under the key `weison-store`.
5. Checkout at `/checkout` collects shipping details, formats payment fields, simulates payment, then posts the order to `POST /api/orders`.
6. The API validates the payload, saves order data through `OrderService.saveOrder`, sends an email receipt through `sendOrderReceipt`, then returns a success response.
7. The admin page at `/admin` reads orders from `GET /api/orders`, opens details from `GET /api/orders/[orderId]`, and updates statuses with `PUT /api/orders/[orderId]`.

## Pages

| Route | File | Purpose | Key Features |
| --- | --- | --- | --- |
| `/` | `src/app/page.tsx` | Home page composition | Renders `Hero`, `FeaturedProduct`, and `Newsletter` |
| Global layout | `src/app/layout.tsx` | HTML shell and shared navbar | Loads fonts, global CSS, metadata, and `NavbarClient` |
| `/shop` | `src/app/shop/page.tsx` | Product catalog | Category filters for All, Hoodie, T-shirt, Shoes; product grid |
| `/product?id=...` | `src/app/product/page.tsx` | Product detail page | Product lookup by query string, image, price, rating, size picker, quantity, cart, wishlist, features/spec tabs |
| `/checkout` | `src/app/checkout/page.tsx` | Checkout flow | Shipping form, payment form, order summary, tax calculation, API order submission, success screen |
| `/favorites` | `src/app/favorites/page.tsx` | Wishlist page | Shows products saved in Zustand wishlist, empty state, link back to shop |
| `/admin` | `src/app/admin/page.tsx` | Order management | Fetches orders, shows table, opens order details modal, updates order status |
| `/about` | `src/app/about/page.tsx` | Brand story page | Hero, stats, company story, values grid, CTA |
| `/contact` | `src/app/contact/page.tsx` | Contact page | Contact info, simulated contact form, FAQ, support hours |

## API Routes

| Endpoint | File | Method | Responsibility |
| --- | --- | --- | --- |
| `/api/orders` | `src/app/api/orders/route.ts` | `POST` | Validates checkout payload, saves order, sends receipt email |
| `/api/orders` | `src/app/api/orders/route.ts` | `GET` | Returns paginated order list for admin |
| `/api/orders/[orderId]` | `src/app/api/orders/[orderId]/route.ts` | `GET` | Returns one order, shipping address, and line items |
| `/api/orders/[orderId]` | `src/app/api/orders/[orderId]/route.ts` | `PUT` | Validates and updates order status |

## Components

### Navigation and Global UI

| Component | File | Responsibility |
| --- | --- | --- |
| `NavbarClient` | `src/components/NavbarClient.tsx` | Dynamically loads `Navbar` with SSR disabled to avoid client-state hydration issues |
| `Navbar` | `src/components/Navbar.tsx` | Fixed header with WEISON logo, search button, favorites count, cart count, and mounted modals |
| `CartSidebar` | `src/components/CartSidebar.tsx` | Slide-out cart panel with item list, quantity controls, remove action, subtotal, and checkout link |
| `SearchModal` | `src/components/SearchModal.tsx` | Product search overlay using mock product name, category, description, and keyword matching |
| `Footer` | `src/components/Footer.tsx` | Footer links, brand copy, social links, and contact details. It exists but is not currently mounted in `layout.tsx` or `page.tsx` |

### Storefront Sections

| Component | File | Responsibility |
| --- | --- | --- |
| `Hero` | `src/components/Hero.tsx` | Animated landing hero with background image, particles, typewriter text, CTA buttons, and scroll indicator |
| `FeaturedProduct` | `src/components/FeaturedProduct.tsx` | Home page product section with category filters and `ProductCard` grid |
| `ProductCard` | `src/components/ProductCard.tsx` | Reusable product card with image, category, rating, price, wishlist toggle, and add-to-cart button |
| `Newsletter` | `src/components/Newsletter.tsx` | Newsletter signup section with animated background and client-only `NewsletterLine` |
| `NewsletterLine` | `src/components/NewsletterLine.tsx` | Animated SVG line shown inside the newsletter section |
| `Features` | `src/components/Features.tsx` | Four-column feature section for fabric, shipping, guarantee, and returns. Not currently mounted |
| `Testimonials` | `src/components/Testimonials.tsx` | Customer testimonial block using `mockTestimonial`. Not currently mounted |

## Library and Data Files

| File | Purpose |
| --- | --- |
| `src/lib/data.ts` | Central TypeScript types and mock data: `Product`, `CartItem`, `Order`, `ShippingAddress`, `Testimonial`, `mockProducts`, `mockProduct`, and category labels |
| `src/lib/store.ts` | Zustand store for cart, wishlist, orders, UI modal state, and shipping address persistence |
| `src/lib/utils.ts` | Shared helpers: `cn`, `formatPrice`, `generateOrderId`, `getDiscountPercentage` |
| `src/lib/db.ts` | PostgreSQL connection pool configuration |
| `src/lib/orderService.ts` | Database service for creating orders, reading orders, reading one order, and updating order status |
| `src/lib/emailService.ts` | Gmail/Nodemailer transport and HTML order receipt template |
| `src/lib/initDb.ts` | Reads and applies the SQL schema, plus database connection test helper |
| `src/lib/schema.sql` | SQL schema for `orders`, `shipping_addresses`, `order_items`, and indexes |

## Database Model

| Table | Purpose | Important Fields |
| --- | --- | --- |
| `orders` | Main order records | `order_id`, `status`, `total_amount`, `subtotal`, `tax_amount`, `shipping_amount`, timestamps |
| `shipping_addresses` | Customer delivery information | `order_id`, name, email, phone, address, city, state, zip code, country |
| `order_items` | Purchased products per order | `order_id`, `product_id`, `product_name`, `price`, `quantity`, `selected_size`, `product_image` |

Order writes are transaction-based in `OrderService.saveOrder`. If inserting the order, address, or any item fails, the transaction rolls back.

## Feature Map

| Feature | Main Files | Notes |
| --- | --- | --- |
| Product catalog | `src/lib/data.ts`, `src/app/shop/page.tsx`, `src/components/ProductCard.tsx` | Uses in-repo mock product data, not database products |
| Product details | `src/app/product/page.tsx` | Reads `id` from query string and falls back to `mockProduct` |
| Cart | `src/lib/store.ts`, `src/components/CartSidebar.tsx`, `src/components/ProductCard.tsx`, `src/app/product/page.tsx` | Supports size-specific line items and persisted browser storage |
| Wishlist/favorites | `src/lib/store.ts`, `src/app/favorites/page.tsx`, `src/components/ProductCard.tsx`, `src/app/product/page.tsx` | Stores full product objects in persisted state |
| Search | `src/components/SearchModal.tsx`, `src/components/Navbar.tsx` | Client-side search against `mockProducts` |
| Checkout | `src/app/checkout/page.tsx`, `src/app/api/orders/route.ts` | Simulated payment, then real order API submission |
| Order storage | `src/app/api/orders/route.ts`, `src/lib/orderService.ts`, `src/lib/schema.sql` | PostgreSQL tables store order, shipping, and line items |
| Email receipts | `src/app/api/orders/route.ts`, `src/lib/emailService.ts` | Sends HTML receipt after order is saved |
| Admin order management | `src/app/admin/page.tsx`, `src/app/api/orders/*`, `src/lib/orderService.ts` | Lists orders, views details, updates status |
| Contact form | `src/app/contact/page.tsx` | Simulated submission only; no API route or email is connected |
| Newsletter | `src/components/Newsletter.tsx` | Simulated subscription with browser alert only |

## Where To Change Common Things

| Goal | Edit This File |
| --- | --- |
| Add or edit products | `src/lib/data.ts` |
| Change categories | `src/lib/data.ts`, `src/app/shop/page.tsx`, `src/components/FeaturedProduct.tsx` |
| Change cart behavior | `src/lib/store.ts`, then UI in `src/components/CartSidebar.tsx` |
| Change product card layout | `src/components/ProductCard.tsx` |
| Change product detail page | `src/app/product/page.tsx` |
| Change checkout fields or totals | `src/app/checkout/page.tsx` and `src/app/api/orders/route.ts` |
| Change saved order schema | `src/lib/schema.sql`, `src/lib/orderService.ts`, and admin page types |
| Change order email design | `src/lib/emailService.ts` |
| Change admin order statuses | `src/app/admin/page.tsx`, `src/app/api/orders/[orderId]/route.ts` |
| Change colors/fonts | `tailwind.config.ts`, `src/app/globals.css`, `src/app/layout.tsx` |
| Add a footer globally | Import and render `Footer` inside `src/app/layout.tsx` below `<main>` |

## Important Review Notes

1. `src/lib/db.ts` contains fallback database credentials in source code. Move all credentials to environment variables and remove hard-coded secrets before deploying or sharing the repo.
2. `README.md` and `DATABASE_SETUP.md` mention environment variable names such as `DATABASE_URL` and SMTP variables, but the current code reads `DB_USER`, `DB_PASSWORD`, `DB_HOST`, `DB_NAME`, `DB_PORT`, `GMAIL_USER`, and `GMAIL_APP_PASSWORD`.
3. The contact form and newsletter form are frontend simulations only. They do not currently save data or send messages.
4. Product data is static mock data. The database currently stores orders only, not product inventory.
5. `Footer`, `Features`, and `Testimonials` are available components but are not currently rendered by the home page or layout.
6. Some source text contains mojibake characters from encoding issues, especially in display text, logs, and README content. Cleaning files to UTF-8 text would improve polish.
7. The checkout success screen displays a newly generated order ID instead of reusing the order ID that was saved. Store the submitted order ID in component state if the confirmation number must match the database.
8. There is no authentication on `/admin` or the order APIs. Add protection before using this as a production admin panel.

## Development Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start local Next.js development server |
| `npm run build` | Build production bundle |
| `npm run start` | Run production server after build |
| `npm run lint` | Run Next lint script |
| `npm run db:init` | Create database tables from `src/lib/schema.sql` |
