# WEISON - Premium Ecommerce Website

A modern, full-featured ecommerce website for premium shirts built with Next.js 14, TypeScript, and PostgreSQL.

![Next.js](https://img.shields.io/badge/Next.js-14.0.4-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3.3-blue?style=flat-square&logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat-square&logo=postgresql)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.0-38B2AC?style=flat-square&logo=tailwind-css)

## 🌟 Features

### Frontend
- **Modern UI/UX**: Clean, responsive design with Tailwind CSS
- **Product Showcase**: Featured products with image gallery
- **Shopping Cart**: Full cart functionality with Zustand state management
- **Checkout System**: Complete checkout process with form validation
- **Search Functionality**: Product search with modal interface
- **Newsletter Signup**: Email subscription system
- **Dark Theme**: Modern dark-themed interface

### Backend & Database
- **PostgreSQL Integration**: Complete database setup with proper schema
- **Order Management**: Full order processing and tracking system
- **Admin Panel**: Administrative interface for order management
- **Email Service**: Automated email notifications using Nodemailer
- **API Endpoints**: RESTful API for order operations
- **Transaction Safety**: Database transactions for data integrity

### Pages & Navigation
- **Home**: Hero section, featured products, newsletter
- **Shop**: Product catalog and filtering
- **Product Details**: Individual product pages
- **Checkout**: Complete checkout flow
- **Admin**: Order management dashboard
- **About**: Company information
- **Contact**: Contact form and details
- **Favorites**: Wishlist functionality

## 🚀 Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, Custom CSS
- **State Management**: Zustand
- **Database**: PostgreSQL
- **Email**: Nodemailer
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Work Sans, Inter

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/oeng-chihea/Ecommerce-Website.git
   cd Ecommerce-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/ecommerce_db"
   SMTP_HOST="your-smtp-host"
   SMTP_PORT=587
   SMTP_USER="your-email@domain.com"
   SMTP_PASS="your-app-password"
   ```

4. **Database Setup**
   ```bash
   # Initialize the database
   npm run db:init
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## 🗄️ Database Schema

The application uses PostgreSQL with the following main tables:

### `orders`
- Order tracking and management
- Status, amounts, timestamps

### `shipping_addresses`
- Customer shipping information
- Linked to orders via foreign key

### `order_items`
- Individual product line items
- Product details and quantities

### Indexes
- Optimized queries with proper indexing
- Performance improvements for order lookup

## 🛠️ Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:init      # Initialize database
```

## 📱 Key Components

- **Navbar**: Navigation with cart, search, and menu
- **Hero**: Landing page hero section
- **ProductCard**: Reusable product display component
- **CartSidebar**: Shopping cart sidebar
- **FeaturedProduct**: Product showcase component
- **Footer**: Site footer with links and information

## 🔧 API Endpoints

- `POST /api/orders` - Create new order
- `GET /api/orders/[orderId]` - Get specific order
- `PUT /api/orders/[orderId]` - Update order status

## 🎨 Styling

The project uses Tailwind CSS with custom configurations:
- Dark theme implementation
- Custom color palette
- Responsive design patterns
- Modern animations and transitions

## 📧 Email Integration

- Order confirmation emails
- Newsletter subscriptions
- SMTP configuration support
- HTML email templates

## 🔒 Security Features

- Input validation and sanitization
- SQL injection prevention
- Secure database transactions
- Environment variable protection

## 🚀 Deployment

The application is ready for deployment on platforms like:
- Vercel (recommended for Next.js)
- Netlify
- Railway
- Heroku

Make sure to set up your environment variables in your deployment platform.

## 📝 Environment Variables

Required environment variables:
- `DATABASE_URL`: PostgreSQL connection string
- `SMTP_HOST`: Email server host
- `SMTP_PORT`: Email server port
- `SMTP_USER`: Email username
- `SMTP_PASS`: Email password

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Created by **Oeng Chihea**

---

**WEISON** - Discover premium shirts designed for a refined everyday fit and feel.
