import pool from './db';
import { CartItem, ShippingAddress } from './data';

export interface DatabaseOrder {
  id?: number;
  order_id: string;
  status: string;
  total_amount: number;
  subtotal: number;
  tax_amount: number;
  shipping_amount: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface DatabaseOrderItem {
  id?: number;
  order_id: string;
  product_id: string;
  product_name: string;
  price: number;
  quantity: number;
  selected_size?: string;
  product_image?: string;
  created_at?: Date;
}

export interface DatabaseShippingAddress {
  id?: number;
  order_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  country: string;
  created_at?: Date;
}

export class OrderService {
  // Save a complete order to the database
  static async saveOrder(
    orderId: string,
    cartItems: CartItem[],
    shippingAddress: ShippingAddress,
    totals: {
      subtotal: number;
      tax: number;
      shipping: number;
      total: number;
    }
  ): Promise<{ success: boolean; orderId?: string; error?: string }> {
    let client;
    
    try {
      client = await pool.connect();
      await client.query('BEGIN');

      // Insert order
      const orderResult = await client.query(
        `INSERT INTO orders (order_id, status, total_amount, subtotal, tax_amount, shipping_amount) 
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [orderId, 'processing', totals.total, totals.subtotal, totals.tax, totals.shipping]
      );

      // Insert shipping address
      await client.query(
        `INSERT INTO shipping_addresses 
         (order_id, first_name, last_name, email, phone, address, city, state, zip_code, country) 
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          orderId,
          shippingAddress.firstName,
          shippingAddress.lastName,
          shippingAddress.email,
          shippingAddress.phone,
          shippingAddress.address,
          shippingAddress.city,
          shippingAddress.state,
          shippingAddress.zipCode,
          shippingAddress.country,
        ]
      );

      // Insert order items
      for (const item of cartItems) {
        await client.query(
          `INSERT INTO order_items 
           (order_id, product_id, product_name, price, quantity, selected_size, product_image) 
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [
            orderId,
            item.id,
            item.name,
            item.price,
            item.quantity,
            item.selectedSize || null,
            item.image,
          ]
        );
      }

      await client.query('COMMIT');
      
      return { success: true, orderId };
    } catch (error) {
      if (client) {
        await client.query('ROLLBACK').catch((rollbackError) => {
          console.error('Error rolling back order transaction:', rollbackError);
        });
      }
      console.error('Error saving order:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      client?.release();
    }
  }

  // Get order by ID
  static async getOrderById(orderId: string): Promise<{
    success: boolean;
    order?: DatabaseOrder;
    shippingAddress?: DatabaseShippingAddress;
    items?: DatabaseOrderItem[];
    error?: string;
  }> {
    let client;
    
    try {
      client = await pool.connect();
      // Get order details
      const orderResult = await client.query(
        'SELECT * FROM orders WHERE order_id = $1',
        [orderId]
      );

      if (orderResult.rows.length === 0) {
        return { success: false, error: 'Order not found' };
      }

      // Get shipping address
      const shippingResult = await client.query(
        'SELECT * FROM shipping_addresses WHERE order_id = $1',
        [orderId]
      );

      // Get order items
      const itemsResult = await client.query(
        'SELECT * FROM order_items WHERE order_id = $1 ORDER BY id',
        [orderId]
      );

      return {
        success: true,
        order: orderResult.rows[0],
        shippingAddress: shippingResult.rows[0],
        items: itemsResult.rows,
      };
    } catch (error) {
      console.error('Error getting order:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      client?.release();
    }
  }

  // Get all orders with pagination
  static async getAllOrders(
    page: number = 1, 
    limit: number = 10
  ): Promise<{
    success: boolean;
    orders?: DatabaseOrder[];
    total?: number;
    error?: string;
  }> {
    let client;
    
    try {
      client = await pool.connect();
      const offset = (page - 1) * limit;

      // Get total count
      const countResult = await client.query('SELECT COUNT(*) FROM orders');
      const total = parseInt(countResult.rows[0].count);

      // Get orders
      const ordersResult = await client.query(
        'SELECT * FROM orders ORDER BY created_at DESC LIMIT $1 OFFSET $2',
        [limit, offset]
      );

      return {
        success: true,
        orders: ordersResult.rows,
        total,
      };
    } catch (error) {
      console.error('Error getting orders:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      client?.release();
    }
  }

  // Update order status
  static async updateOrderStatus(
    orderId: string, 
    status: string
  ): Promise<{ success: boolean; error?: string }> {
    let client;
    
    try {
      client = await pool.connect();
      const result = await client.query(
        'UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE order_id = $2',
        [status, orderId]
      );

      if (result.rowCount === 0) {
        return { success: false, error: 'Order not found' };
      }

      return { success: true };
    } catch (error) {
      console.error('Error updating order status:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    } finally {
      client?.release();
    }
  }
}
