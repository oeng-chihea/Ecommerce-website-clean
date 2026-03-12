import { NextRequest, NextResponse } from 'next/server';
import { OrderService } from '@/lib/orderService';
import { sendOrderReceipt } from '@/lib/emailService';
import { CartItem, ShippingAddress } from '@/lib/data';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { orderId, cartItems, shippingAddress, totals } = body;

    // Validate required fields
    if (!orderId || !cartItems || !shippingAddress || !totals) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate cart items
    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return NextResponse.json(
        { error: 'Cart items must be a non-empty array' },
        { status: 400 }
      );
    }

    // Validate shipping address
    const requiredShippingFields = [
      'firstName', 'lastName', 'email', 'phone', 
      'address', 'city', 'state', 'zipCode', 'country'
    ];
    
    for (const field of requiredShippingFields) {
      if (!shippingAddress[field]) {
        return NextResponse.json(
          { error: `Missing required shipping field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Validate totals
    if (typeof totals.total !== 'number' || totals.total <= 0) {
      return NextResponse.json(
        { error: 'Invalid total amount' },
        { status: 400 }
      );
    }

    // Save order to database
    const result = await OrderService.saveOrder(
      orderId,
      cartItems as CartItem[],
      shippingAddress as ShippingAddress,
      totals
    );

    if (!result.success) {
      console.error('Failed to save order:', result.error);
      return NextResponse.json(
        { error: 'Failed to save order to database' },
        { status: 500 }
      );
    }

    // Build base URL so product images render correctly in the email
    const protocol = request.headers.get('x-forwarded-proto') || 'https';
    const host = request.headers.get('host') || '';
    const baseUrl = `${protocol}://${host}`;

    // Send email receipt to customer
    const emailResult = await sendOrderReceipt({
      order: { orderId },
      shippingAddress,
      items: cartItems,
      totals,
    }, baseUrl);

    console.log('📧 Email sending result:', emailResult);

    return NextResponse.json({
      success: true,
      orderId: result.orderId,
      emailSent: emailResult.success,
      message: emailResult.success 
        ? 'Order saved and receipt sent to your email!' 
        : 'Order saved successfully (email sending failed)'
    });

  } catch (error) {
    console.error('Order creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    const result = await OrderService.getAllOrders(page, limit);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to fetch orders' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      orders: result.orders,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil((result.total || 0) / limit)
    });

  } catch (error) {
    console.error('Orders fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}