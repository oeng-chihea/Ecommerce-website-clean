'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, CreditCard, Lock, Check, ChevronDown, Package, Truck, MapPin } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice, generateOrderId } from '@/lib/utils';
import { ShippingAddress, Order } from '@/lib/data';

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart, addOrder, setShippingAddress } = useStore();
  const [step, setStep] = useState<'shipping' | 'payment' | 'success'>('shipping');
  const [isProcessing, setIsProcessing] = useState(false);

  const [formData, setFormData] = useState<ShippingAddress>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiry: '',
    cvv: '',
    cardName: '',
  });

  const shipping = 0;
  const tax = getCartTotal() * 0.08;
  const total = getCartTotal() + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\D/g, '').slice(0, 16).replace(/(\d{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formattedValue = value.replace(/\D/g, '').slice(0, 4).replace(/(\d{2})/, '$1/');
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    }

    setPaymentData((prev) => ({ ...prev, [name]: formattedValue }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShippingAddress(formData);
    setStep('payment');
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const orderId = generateOrderId();
      const order: Order = {
        id: orderId,
        items: cart,
        total: total,
        status: 'processing',
        date: new Date().toISOString(),
        shippingAddress: formData,
      };

      // Save order to database
      const orderData = {
        orderId: orderId,
        cartItems: cart,
        shippingAddress: formData,
        totals: {
          subtotal: getCartTotal(),
          tax: tax,
          shipping: shipping,
          total: total
        }
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Failed to save order');
      }

      console.log('Order saved successfully:', result);

      // Add order to local state (for UI display)
      addOrder(order);
      clearCart();
      setIsProcessing(false);
      setStep('success');

    } catch (error) {
      console.error('Error processing order:', error);
      setIsProcessing(false);
      
      // Show error to user (you might want to add error state)
      alert('Failed to process order. Please try again.');
    }
  };

  if (cart.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen bg-white pt-24 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Package className="w-24 h-24 text-gray-400 mx-auto mb-6" />
          <h1 className="text-3xl font-display font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to checkout</p>
          <Link href="/product">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-full"
            >
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Progress Steps */}
        {step !== 'success' && (
          <div className="flex items-center justify-center mb-12">
            {[
              { key: 'shipping', label: 'Shipping', icon: MapPin },
              { key: 'payment', label: 'Payment', icon: CreditCard },
            ].map((s, index) => (
              <div key={s.key} className="flex items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full ${
                    step === s.key
                      ? 'bg-primary-500 text-white'
                      : index === 0 && step === 'payment'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {index === 0 && step === 'payment' ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <s.icon className="w-5 h-5" />
                  )}
                  <span className="font-medium">{s.label}</span>
                </motion.div>
                {index < 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    step === 'payment' ? 'bg-green-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {step === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-lg mx-auto text-center py-16"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8"
              >
                <Check className="w-12 h-12 text-white" />
              </motion.div>
              <h1 className="text-4xl font-display font-bold text-gray-900 mb-4">
                Order Confirmed!
              </h1>
              <p className="text-gray-600 text-lg mb-8">
                Thank you for your purchase. We&apos;ll send you an email with order details.
              </p>
              <div className="p-6 bg-gray-50 border border-gray-200 rounded-2xl mb-8">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Order Number</span>
                  <span className="text-primary-600 font-mono font-semibold">
                    {generateOrderId()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Estimated Delivery</span>
                  <span className="text-gray-900 font-medium">3-5 Business Days</span>
                </div>
              </div>
              <div className="flex gap-4 justify-center">
                <Link href="/">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-primary-500 text-white font-semibold rounded-full"
                  >
                    Back to Home
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Form Section */}
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="lg:col-span-2"
              >
                {step === 'shipping' && (
                  <form onSubmit={handleShippingSubmit}>
                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
                      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <MapPin className="w-6 h-6 text-primary-500" />
                        Shipping Information
                      </h2>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">First Name *</label>
                          <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Last Name *</label>
                          <input
                            type="text"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Email *</label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Phone *</label>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Address *</label>
                          <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">City *</label>
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">State *</label>
                          <input
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">ZIP Code *</label>
                          <input
                            type="text"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Country</label>
                          <div className="relative">
                            <select
                              name="country"
                              value={formData.country}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 appearance-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                            >
                              <option value="United States">United States</option>
                              <option value="Canada">Canada</option>
                              <option value="United Kingdom">United Kingdom</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
                          </div>
                        </div>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full mt-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-2"
                      >
                        Continue to Payment
                        <CreditCard className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </form>
                )}

                {step === 'payment' && (
                  <form onSubmit={handlePaymentSubmit}>
                    <button
                      type="button"
                      onClick={() => setStep('shipping')}
                      className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                    >
                      <ArrowLeft className="w-5 h-5" />
                      Back to Shipping
                    </button>

                    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg">
                      <h2 className="text-2xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-primary-500" />
                        Payment Details
                      </h2>

                      <div className="space-y-6">
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Card Number *</label>
                          <div className="relative">
                            <input
                              type="text"
                              name="cardNumber"
                              value={paymentData.cardNumber}
                              onChange={handlePaymentChange}
                              placeholder="1234 5678 9012 3456"
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                            />
                            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-gray-700 text-sm mb-2 font-medium">Cardholder Name *</label>
                          <input
                            type="text"
                            name="cardName"
                            value={paymentData.cardName}
                            onChange={handlePaymentChange}
                            placeholder="John Doe"
                            required
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">Expiry Date *</label>
                            <input
                              type="text"
                              name="expiry"
                              value={paymentData.expiry}
                              onChange={handlePaymentChange}
                              placeholder="MM/YY"
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-gray-700 text-sm mb-2 font-medium">CVV *</label>
                            <input
                              type="text"
                              name="cvv"
                              value={paymentData.cvv}
                              onChange={handlePaymentChange}
                              placeholder="123"
                              required
                              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-xl flex items-center gap-3">
                        <Lock className="w-5 h-5 text-green-400" />
                        <p className="text-green-400 text-sm">
                          Your payment is secured with 256-bit SSL encryption
                        </p>
                      </div>

                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={isProcessing}
                        className="w-full mt-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Processing...
                          </>
                        ) : (
                          <>
                            Complete Order - {formatPrice(total)}
                            <Lock className="w-5 h-5" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                )}
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-1"
              >
                <div className="bg-white border border-gray-200 rounded-3xl p-6 sticky top-32 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

                  <div className="space-y-4 mb-6">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedSize ?? 'na'}`} className="flex gap-4">
                        <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-gray-900 text-sm font-medium">{item.name}</h4>
                          <p className="text-gray-600 text-sm">
                            {item.selectedSize ? `Size: ${item.selectedSize}` : 'One Size'}
                          </p>
                          <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <span className="text-gray-900 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 pt-4 space-y-3">
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>{formatPrice(getCartTotal())}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Shipping</span>
                      <span className="text-green-600">Free</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-600">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    <div className="flex items-center justify-between text-gray-900 text-lg font-bold pt-3 border-t border-gray-200">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mt-6">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Promo code"
                        className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl text-gray-900 text-sm focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-colors"
                      />
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-3 bg-gray-100 border border-gray-300 text-gray-900 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
                      >
                        Apply
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
