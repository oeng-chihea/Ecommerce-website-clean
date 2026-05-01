# Weison E-commerce Database Setup

## Overview
This setup integrates PostgreSQL database connectivity to store all order data when customers complete their purchases.

## Features
- ✅ **Complete Order Storage**: Stores order details, shipping addresses, and line items
- ✅ **Transaction Safety**: Uses database transactions to ensure data consistency
- ✅ **API Endpoints**: RESTful APIs for order management
- ✅ **Admin Interface**: View and manage orders at `/admin`
- ✅ **Error Handling**: Comprehensive error handling and validation

## Database Schema

### Tables Created:
1. **orders** - Main order information
2. **shipping_addresses** - Customer shipping details
3. **order_items** - Individual product line items

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Configuration
1. Update the `.env.local` file with your PostgreSQL connection details:
```env
DATABASE_URL="postgresql://your_username:your_password@your_host:5432/your_database_name"
```

### 3. Initialize Database
Run the database initialization script to create tables:
```bash
npm run db:init
```

### 4. Start Development Server
```bash
npm run dev
```

## API Endpoints

### Create Order
- **POST** `/api/orders`
- Body: `{ orderId, cartItems, shippingAddress, totals }`

### Get All Orders
- **GET** `/api/orders?page=1&limit=10`

### Get Single Order
- **GET** `/api/orders/{orderId}`

### Update Order Status
- **PUT** `/api/orders/{orderId}`
- Body: `{ status: "processing" | "shipped" | "delivered" | "cancelled" }`

## Order Flow

1. **Customer completes checkout** → Order data is validated
2. **Payment processing** → Simulated 2-second delay
3. **Database storage** → Order saved with all details:
   - Order summary (totals, status, timestamps)
   - Shipping address (all customer details)
   - Line items (products, quantities, prices, sizes)
4. **Success confirmation** → Customer sees order confirmation
5. **Admin visibility** → Orders appear in admin dashboard

## Data Stored

### Order Information:
- Order ID (unique identifier)
- Status (processing, shipped, delivered, etc.)
- Total amounts (subtotal, tax, shipping, total)
- Timestamps (created, updated)

### Shipping Address:
- Customer name, email, phone
- Complete address details
- Country and postal code

### Order Items:
- Product details (ID, name, price, image)
- Quantity and selected size
- Line totals

## Admin Dashboard

Visit `/admin` to:
- View all orders with pagination
- See order details and customer information
- Update order status
- Track order history

## Security Features
- Input validation on all API endpoints
- SQL injection prevention using parameterized queries
- Transaction rollback on errors
- Environment-based configuration

## Error Handling
- Comprehensive error messages
- Database connection failure handling
- Transaction rollback on partial failures
- User-friendly error notifications

## Next Steps
1. **Configure your PostgreSQL database**
2. **Update the `.env.local` file**
3. **Run the database initialization**
4. **Test the checkout process**
5. **Monitor orders in the admin panel**

The system is now ready to store all order data securely in your PostgreSQL database!
