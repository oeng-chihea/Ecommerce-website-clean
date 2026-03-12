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
const generateReceiptTemplate = (orderData: any, baseUrl: string) => {
  const { order, shippingAddress, items, totals } = orderData;

  const orderDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 20px 0; border-bottom: 1px solid #222222;">
        <table cellpadding="0" cellspacing="0" border="0" width="100%">
          <tr>
            <td width="80" valign="top">
              <img
                src="${baseUrl}${encodeURI(item.image)}"
                alt="${item.name}"
                width="80"
                height="80"
                style="display: block; border-radius: 10px; object-fit: cover; background-color: #1e1e1e;"
              />
            </td>
            <td valign="top" style="padding-left: 16px;">
              <p style="margin: 0 0 5px 0; font-size: 15px; font-weight: 700; color: #ffffff; line-height: 1.3;">${item.name}</p>
              <p style="margin: 0 0 4px 0; font-size: 13px; color: #888888;">
                Size:&nbsp;<span style="color: #cccccc;">${item.selectedSize || 'N/A'}</span>
                &nbsp;&nbsp;·&nbsp;&nbsp;
                Qty:&nbsp;<span style="color: #cccccc;">${item.quantity}</span>
              </p>
              ${item.category ? `<p style="margin: 0; display: inline-block; font-size: 11px; color: #f97316; text-transform: uppercase; letter-spacing: 1px; border: 1px solid #f9731640; padding: 2px 8px; border-radius: 20px;">${item.category}</p>` : ''}
            </td>
            <td valign="top" align="right" style="padding-left: 12px; white-space: nowrap;">
              <p style="margin: 0 0 4px 0; font-size: 17px; font-weight: 800; color: #f97316;">$${(item.price * item.quantity).toFixed(2)}</p>
              <p style="margin: 0; font-size: 12px; color: #555555;">$${item.price.toFixed(2)} each</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `).join('');

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Order Confirmation — ${order.orderId}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #080808; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">

  <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #080808; padding: 48px 20px;">
    <tr>
      <td align="center">
        <table cellpadding="0" cellspacing="0" border="0" width="600" style="max-width: 600px; width: 100%;">

          <!-- ── Header ── -->
          <tr>
            <td style="background-color: #111111; border-radius: 16px 16px 0 0; padding: 36px 48px 32px; text-align: center; border-bottom: 2px solid #f97316;">
              <p style="margin: 0 0 6px 0; font-size: 34px; font-weight: 900; color: #f97316; letter-spacing: 8px; text-transform: uppercase; line-height: 1;">WEISON</p>
              <p style="margin: 0; font-size: 11px; color: #444444; letter-spacing: 4px; text-transform: uppercase;">Premium Apparel</p>
            </td>
          </tr>

          <!-- ── Confirmed Banner ── -->
          <tr>
            <td style="background: linear-gradient(90deg, #ea6500 0%, #f97316 50%, #fb923c 100%); padding: 28px 48px; text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 24px; font-weight: 800; color: #ffffff; letter-spacing: 0.5px;">Order Confirmed!</p>
              <p style="margin: 0; font-size: 14px; color: rgba(255,255,255,0.88); line-height: 1.5;">
                Hey <strong>${shippingAddress.firstName}</strong>, your order is confirmed and being processed.<br>
                We'll notify you once it ships.
              </p>
            </td>
          </tr>

          <!-- ── Order Meta Strip ── -->
          <tr>
            <td style="background-color: #111111; padding: 0 48px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="border-bottom: 1px solid #1e1e1e;">
                <tr>
                  <td style="padding: 24px 0;" align="center">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="text-align: center; padding: 0 20px; border-right: 1px solid #222222;">
                          <p style="margin: 0 0 5px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1.5px;">Order ID</p>
                          <p style="margin: 0; font-size: 13px; font-weight: 700; color: #f97316;">${order.orderId}</p>
                        </td>
                        <td style="text-align: center; padding: 0 20px; border-right: 1px solid #222222;">
                          <p style="margin: 0 0 5px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1.5px;">Date</p>
                          <p style="margin: 0; font-size: 13px; font-weight: 600; color: #dddddd;">${orderDate}</p>
                        </td>
                        <td style="text-align: center; padding: 0 20px; border-right: 1px solid #222222;">
                          <p style="margin: 0 0 5px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1.5px;">Status</p>
                          <p style="margin: 0; font-size: 13px; font-weight: 700; color: #22c55e;">Processing</p>
                        </td>
                        <td style="text-align: center; padding: 0 20px;">
                          <p style="margin: 0 0 5px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1.5px;">Delivery</p>
                          <p style="margin: 0; font-size: 13px; font-weight: 600; color: #dddddd;">3 – 5 Business Days</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Items ── -->
          <tr>
            <td style="background-color: #111111; padding: 0 48px;">
              <p style="margin: 28px 0 4px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">Items Ordered (${items.length} ${items.length === 1 ? 'item' : 'items'})</p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                ${itemsHtml}
              </table>
            </td>
          </tr>

          <!-- ── Order Summary ── -->
          <tr>
            <td style="background-color: #111111; padding: 24px 48px 32px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #161616; border-radius: 12px; overflow: hidden; border: 1px solid #222222;">
                <tr>
                  <td style="padding: 20px 24px; border-bottom: 1px solid #222222;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 13px; color: #777777;">Subtotal</td>
                        <td align="right" style="font-size: 13px; color: #cccccc; font-weight: 500;">$${totals.subtotal.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #222222;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 13px; color: #777777;">Shipping</td>
                        <td align="right" style="font-size: 13px; color: #22c55e; font-weight: 700;">${totals.shipping === 0 ? 'Free' : '$' + totals.shipping.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 16px 24px; border-bottom: 1px solid #222222;">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 13px; color: #777777;">Tax (8%)</td>
                        <td align="right" style="font-size: 13px; color: #cccccc; font-weight: 500;">$${totals.tax.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 20px 24px; background: linear-gradient(90deg, #ea6500 0%, #f97316 100%);">
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td style="font-size: 15px; font-weight: 700; color: #ffffff;">Total Paid</td>
                        <td align="right" style="font-size: 22px; font-weight: 900; color: #ffffff;">$${totals.total.toFixed(2)}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Shipping Address ── -->
          <tr>
            <td style="background-color: #111111; padding: 0 48px 40px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #161616; border-radius: 12px; border: 1px solid #222222; border-left: 3px solid #f97316;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="margin: 0 0 16px 0; font-size: 10px; color: #f97316; text-transform: uppercase; letter-spacing: 2px; font-weight: 700;">Shipping Address</p>
                    <p style="margin: 0 0 6px 0; font-size: 15px; font-weight: 700; color: #ffffff;">${shippingAddress.firstName} ${shippingAddress.lastName}</p>
                    <p style="margin: 0 0 3px 0; font-size: 13px; color: #999999; line-height: 1.6;">${shippingAddress.address}</p>
                    <p style="margin: 0 0 3px 0; font-size: 13px; color: #999999;">${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zipCode}</p>
                    <p style="margin: 0 0 16px 0; font-size: 13px; color: #999999;">${shippingAddress.country}</p>
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding-right: 24px;">
                          <p style="margin: 0 0 2px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1px;">Email</p>
                          <p style="margin: 0; font-size: 13px; color: #cccccc;">${shippingAddress.email}</p>
                        </td>
                        <td>
                          <p style="margin: 0 0 2px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 1px;">Phone</p>
                          <p style="margin: 0; font-size: 13px; color: #cccccc;">${shippingAddress.phone}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── What's Next ── -->
          <tr>
            <td style="background-color: #111111; padding: 0 48px 40px;">
              <table cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color: #0f0f0f; border-radius: 12px; border: 1px solid #1e1e1e;">
                <tr>
                  <td style="padding: 24px 28px;">
                    <p style="margin: 0 0 16px 0; font-size: 10px; color: #555555; text-transform: uppercase; letter-spacing: 2px; font-weight: 600;">What Happens Next</p>
                    <table cellpadding="0" cellspacing="0" border="0" width="100%">
                      <tr>
                        <td valign="top" width="28">
                          <div style="width: 20px; height: 20px; background-color: #f97316; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 700; color: white;">1</div>
                        </td>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 1px 0; font-size: 13px; font-weight: 600; color: #dddddd;">Order Confirmed</p>
                          <p style="margin: 0; font-size: 12px; color: #555555;">We've received your order and it's being prepared.</p>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="28">
                          <div style="width: 20px; height: 20px; background-color: #1e1e1e; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 700; color: #555555; border: 1px solid #333333;">2</div>
                        </td>
                        <td style="padding-bottom: 12px;">
                          <p style="margin: 0 0 1px 0; font-size: 13px; font-weight: 600; color: #555555;">Packed & Dispatched</p>
                          <p style="margin: 0; font-size: 12px; color: #444444;">Your items will be carefully packed and handed to the carrier.</p>
                        </td>
                      </tr>
                      <tr>
                        <td valign="top" width="28">
                          <div style="width: 20px; height: 20px; background-color: #1e1e1e; border-radius: 50%; text-align: center; line-height: 20px; font-size: 11px; font-weight: 700; color: #555555; border: 1px solid #333333;">3</div>
                        </td>
                        <td>
                          <p style="margin: 0 0 1px 0; font-size: 13px; font-weight: 600; color: #555555;">Delivered to You</p>
                          <p style="margin: 0; font-size: 12px; color: #444444;">Expected in 3–5 business days at your shipping address.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Footer ── -->
          <tr>
            <td style="background-color: #0d0d0d; border-radius: 0 0 16px 16px; padding: 32px 48px; text-align: center; border-top: 1px solid #1a1a1a;">
              <p style="margin: 0 0 6px 0; font-size: 20px; font-weight: 900; color: #f97316; letter-spacing: 5px;">WEISON</p>
              <p style="margin: 0 0 16px 0; font-size: 13px; color: #444444; line-height: 1.6;">
                Questions about your order?<br>
                Reach us at <a href="mailto:support@weison.com" style="color: #f97316; text-decoration: none; font-weight: 600;">support@weison.com</a>
              </p>
              <p style="margin: 0; font-size: 11px; color: #2e2e2e;">© ${new Date().getFullYear()} WEISON. All rights reserved.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
};

// Send order receipt email
export async function sendOrderReceipt(orderData: any, baseUrl: string = '') {
  try {
    const { shippingAddress, order } = orderData;

    const mailOptions = {
      from: `"WEISON Store" <${process.env.GMAIL_USER}>`,
      to: shippingAddress.email,
      subject: `Order Confirmed — ${order.orderId} | WEISON`,
      html: generateReceiptTemplate(orderData, baseUrl),
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('📧 Order receipt sent successfully:', result.messageId);
    return { success: true, messageId: result.messageId };

  } catch (error) {
    console.error('❌ Failed to send order receipt:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
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
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}
