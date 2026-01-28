'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';
import Link from 'next/link';

export default function CartSidebar() {
  const { cart, isCartOpen, setCartOpen, updateQuantity, removeFromCart, getCartTotal } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <ShoppingBag className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-display font-semibold text-gray-900">Your Cart</h2>
                <span className="px-2 py-1 bg-primary-500/10 text-primary-600 text-sm font-medium rounded-full">
                  {cart.length} items
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setCartOpen(false)}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence mode="popLayout">
                {cart.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <ShoppingBag className="w-20 h-20 text-gray-400 mb-4" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-6">Discover our amazing products</p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setCartOpen(false)}
                      className="px-6 py-3 bg-primary-500 text-white font-medium rounded-full hover:bg-primary-600 transition-colors"
                    >
                      Start Shopping
                    </motion.button>
                  </motion.div>
                ) : (
                  cart.map((item) => (
                    <motion.div
                      key={`${item.id}-${item.selectedSize ?? 'na'}`}
                      layout
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      className="flex gap-4 p-4 bg-gray-50 rounded-2xl group hover:bg-gray-100 transition-colors"
                    >
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden bg-gray-200 flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 truncate">{item.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {item.selectedSize ? `Size: ${item.selectedSize}` : 'One Size'}
                        </p>
                        <p className="text-primary-600 font-semibold mt-2">
                          {formatPrice(item.price)}
                        </p>
                        <div className="flex items-center gap-3 mt-3">
                          <div className="flex items-center bg-white border border-gray-200 rounded-full">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            <span className="w-8 text-center text-gray-900 font-medium">
                              {item.quantity}
                            </span>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id, item.selectedSize)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-full transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 border-t border-gray-200 space-y-4 bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900">{formatPrice(getCartTotal())}</span>
                </div>
                <p className="text-sm text-gray-500">Shipping and taxes calculated at checkout</p>
                <Link href="/checkout" onClick={() => setCartOpen(false)}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
                  >
                    Proceed to Checkout
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
