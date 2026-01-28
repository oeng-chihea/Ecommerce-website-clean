import nodemailer from 'nodemailer';

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Email template for order receipt
const generateReceiptTemplate = (orderData: any) => {
  const { order, shippingAddress, items, totals } = orderData;
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>Order Receipt - ${order.orderId}</title>
        <style>
            body { 
                font-family: 'Arial', sans-serif; 
                margin: 0; 
                padding: 20px; 
                background-color: #f5f5f5; 
            }
            .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: white; 
                padding: 40px; 
                border-radius: 8px; 
                box-shadow: 0 2px 10px rgba(0,0,0,0.1); 
            }
            .header { 
                text-align: center; 
                margin-bottom: 30px; 
                border-bottom: 2px solid #f97316; 
                padding-bottom: 20px; 
            }
            .brand { 
                font-size: 28px; 
                font-weight: bold; 
                color: #f97316; 
                margin-bottom: 10px; 
            }
            .order-info { 
                background: #f8f9fa; 
                padding: 20px; 
                border-radius: 6px; 
                margin: 20px 0; 
            }
            .success-badge { 
                display: inline-block; 
                background: #22c55e; 
                color: white; 
                padding: 8px 16px; 
                border-radius: 20px; 
                font-size: 14px; 
                margin-bottom: 20px; 
            }
            .item { 
                display: flex; 
                justify-content: space-between; 
                align-items: center; 
                padding: 15px 0; 
                border-bottom: 1px solid #eee; 
            }
            .item:last-child { border-bottom: none; }
            .item-details h4 { 
                margin: 0; 
                color: #333; 
                font-size: 16px; 
            }
            .item-details p { 
                margin: 5px 0 0 0; 
                color: #666; 
                font-size: 14px; 
            }
            .total-section { 
                background: #f97316; 
                color: white; 
                padding: 20px; 
                border-radius: 6px; 
                margin-top: 30px; 
            }
            .total-row { 
                display: flex; 
                justify-content: space-between; 
                margin: 5px 0; 
            }
            .total-row.final { 
                font-size: 20px; 
                font-weight: bold; 
                border-top: 1px solid rgba(255,255,255,0.3); 
                padding-top: 15px; 
                margin-top: 15px; 
            }
            .shipping-info { 
                margin: 30px 0; 
                padding: 20px; 
                background: #f8f9fa; 
                border-radius: 6px; 
            }
            .footer { 
                text-align: center; 
                margin-top: 40px; 
                padding-top: 30px; 
                border-top: 1px solid #eee; 
                color: #666; 
                font-size: 14px; 
            }
            .footer a { 
                color: #f97316; 
                text-decoration: none; 
            }
        </style>
    </head>
    <body>
        <div class="container">
            <!-- Header -->
            <div class="header">
                <div class="brand">WEISON</div>
                <div class="success-badge">✅ Order Confirmed</div>
                <h2 style="margin: 0; color: #333;">Thank You for Your Purchase!</h2>
            </div>

            <!-- Order Information -->
            <div class="order-info">
                <h3 style="margin-top: 0; color: #333;">📋 Order Details</h3>
                <p><strong>Order Number:</strong> ${order.orderId}</p>
                <p><strong>Order Date:</strong> ${new Date().toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
                <p><strong>Status:</strong> <span style="color: #22c55e;">Processing</span></p>
                <p><strong>Estimated Delivery:</strong> 3-5 Business Days</p>
            </div>

            <!-- Items Purchased -->
            <div style="margin: 30px 0;">
                <h3 style="color: #333; margin-bottom: 20px;">🛍️ Items Ordered</h3>
                ${items.map((item: any) => `
                    <div class="item">
                        <div class="item-details">
                            <h4>${item.name}</h4>
                            <p>Size: ${item.selectedSize || 'N/A'} • Quantity: ${item.quantity}</p>
                        </div>
                        <div style="text-align: right;">
                            <strong>$${item.price.toFixed(2)}</strong>
                            <br>
                            <small style="color: #666;">$${(item.price / item.quantity).toFixed(2)} each</small>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Total Section -->
            <div class="total-section">
                <h3 style="margin-top: 0;">💳 Order Summary</h3>
                <div class="total-row">
                    <span>Subtotal:</span>
                    <span>$${totals.subtotal.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Shipping:</span>
                    <span>${totals.shipping === 0 ? 'Free' : '$' + totals.shipping.toFixed(2)}</span>
                </div>
                <div class="total-row">
                    <span>Tax:</span>
                    <span>$${totals.tax.toFixed(2)}</span>
                </div>
                <div class="total-row final">
                    <span>Total Paid:</span>
                    <span>$${totals.total.toFixed(2)}</span>
                </div>
            </div>

            <!-- Shipping Information -->
            <div class="shipping-info">
                <h3 style="margin-top: 0; color: #333;">🚚 Shipping Address</h3>
                <p><strong>${shippingAddress.firstName} ${shippingAddress.lastName}</strong></p>
                <p>${shippingAddress.address}</p>
                <p>${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}</p>
                <p>${shippingAddress.country}</p>
                <p><strong>Email:</strong> ${shippingAddress.email}</p>
                <p><strong>Phone:</strong> ${shippingAddress.phone}</p>
            </div>

            <!-- Footer -->
            <div class="footer">
                <p><strong>Questions about your order?</strong></p>
                <p>Contact us at <a href="mailto:support@weison.com">support@weison.com</a></p>
                <p style="margin-top: 20px;">
                    Thank you for shopping with <strong>WEISON</strong>!<br>
                    We appreciate your business and hope you love your new items.
                </p>
            </div>
        </div>
    </body>
    </html>
  `;
};

// Send order receipt email
export async function sendOrderReceipt(orderData: any) {
  try {
    const { shippingAddress, order } = orderData;
    
    const mailOptions = {
      from: `"WEISON Store" <${process.env.GMAIL_USER}>`,
      to: shippingAddress.email,
      subject: `✅ Order Confirmation - ${order.orderId} | WEISON`,
      html: generateReceiptTemplate(orderData),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Order receipt sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('❌ Failed to send order receipt:', error);
    return { success: false, error: error.message };
  }
}

// Test email configuration
export async function testEmailConnection() {
  try {
    await transporter.verify();
    console.log('✅ Email service is ready to send messages');
    return { success: true };
  } catch (error) {
    console.error('❌ Email service configuration error:', error);
    return { success: false, error: error.message };
  }
}