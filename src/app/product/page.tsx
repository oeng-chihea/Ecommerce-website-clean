'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Star, Heart, ShoppingBag, Check, ChevronDown, Plus, Minus } from 'lucide-react';
import { mockProduct, mockProducts } from '@/lib/data';
import { useStore } from '@/lib/store';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';
import { useSearchParams } from 'next/navigation';

export default function ProductPage() {
  const searchParams = useSearchParams();
  const productId = searchParams.get('id');
  const product = useMemo(
    () => mockProducts.find((item) => item.id === productId) ?? mockProduct,
    [productId]
  );

  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'features' | 'specs'>('features');
  const [showAllFeatures, setShowAllFeatures] = useState(false);

  const { addToWishlist, removeFromWishlist, isInWishlist, setCartItemQuantity, cart } = useStore();
  const inWishlist = isInWishlist(product.id);

  useEffect(() => {
    setSelectedSize(product.sizes?.[0]);
    setQuantity(1);
  }, [product]);

  useEffect(() => {
    const existingItem = cart.find(
      (item) =>
        item.id === product.id &&
        item.selectedSize === selectedSize
    );

    if (existingItem) {
      setQuantity(existingItem.quantity);
    }
  }, [cart, product.id, selectedSize]);

  const handleAddToCart = () => {
    setCartItemQuantity(product, selectedSize, quantity);
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Product Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="sticky top-32">
              {/* Main Image */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
              >
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-center px-6">
                    <span className="text-lg font-semibold text-gray-700">
                      {product.name}
                    </span>
                  </div>
                )}
                
                {/* Discount Badge */}
                {product.originalPrice && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-6 left-6 px-4 py-2 bg-primary-500 text-white font-bold rounded-full"
                  >
                    -{getDiscountPercentage(product.originalPrice, product.price)}% OFF
                  </motion.div>
                )}

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute bottom-6 right-6 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full text-gray-700 text-sm"
                >
                  ⚡ Best Seller
                </motion.div>
              </motion.div>

            </div>
          </motion.div>

          {/* Product Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col"
          >
            {/* Category & Rating */}
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-primary-500/10 text-primary-700 text-sm font-semibold rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600 text-sm">{product.rating}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Price */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                  <span className="px-3 py-1 bg-green-500/10 text-green-400 text-sm font-medium rounded-full">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </span>
                </>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="mb-8">
                <h3 className="text-gray-900 font-semibold mb-4">
                  Size: <span className="text-primary-600">{selectedSize}</span>
                </h3>
                <div className="flex flex-wrap items-center gap-3">
                  {product.sizes.map((size) => (
                    <motion.button
                      key={size}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded-full border transition-all ${
                        selectedSize === size
                          ? 'border-primary-500 bg-primary-500/10 text-gray-900'
                          : 'border-gray-200 text-gray-600 hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-8">
              <h3 className="text-gray-900 font-semibold mb-4">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-100 rounded-full">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Minus className="w-5 h-5" />
                  </motion.button>
                  <span className="w-12 text-center text-gray-900 font-semibold text-lg">
                    {quantity}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 text-gray-500 hover:text-gray-900 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </motion.button>
                </div>
                <span className="text-gray-600">
                  Total: <span className="text-gray-900 font-semibold">{formatPrice(product.price * quantity)}</span>
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-3 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWishlistToggle}
                className={`p-4 rounded-full border transition-all ${
                  inWishlist
                    ? 'bg-red-500 border-red-500 text-white'
                    : 'border-gray-200 text-gray-500 hover:border-gray-400 hover:text-gray-900'
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
              </motion.button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-8 p-4 bg-green-500/10 rounded-xl">
              <Check className="w-5 h-5 text-green-600" />
              <span className="text-green-700 font-medium">In Stock</span>
              <span className="text-gray-600">— Ships within 24 hours</span>
            </div>

            {/* Tabs */}
            <div className="border-t border-gray-200 pt-8">
              <div className="flex gap-8 mb-6">
                {(['features', 'specs'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-2 font-medium capitalize transition-colors ${
                      activeTab === tab
                        ? 'text-primary-600 border-b-2 border-primary-600'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {activeTab === 'features' && (
                    <div className="space-y-3">
                      {product.features
                        .slice(0, showAllFeatures ? undefined : 4)
                        .map((feature, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                          >
                            <div className="w-8 h-8 bg-primary-500/10 rounded-lg flex items-center justify-center">
                              <Check className="w-4 h-4 text-primary-600" />
                            </div>
                            <span className="text-gray-700">{feature}</span>
                          </motion.div>
                        ))}
                      {product.features.length > 4 && (
                        <button
                          onClick={() => setShowAllFeatures(!showAllFeatures)}
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-500 transition-colors mt-2"
                        >
                          {showAllFeatures ? 'Show Less' : 'Show All Features'}
                          <ChevronDown className={`w-4 h-4 transition-transform ${showAllFeatures ? 'rotate-180' : ''}`} />
                        </button>
                      )}
                    </div>
                  )}

                  {activeTab === 'specs' && (
                    <div className="space-y-4">
                      {[
                        { label: 'Fabric', value: '100% Premium Cotton (180gsm)' },
                        { label: 'Fit', value: 'Modern Tailored' },
                        { label: 'Collar', value: 'Structured Spread Collar' },
                        { label: 'Care', value: 'Machine Wash Cold' },
                        { label: 'Wrinkle Resistance', value: 'Easy-Care Finish' },
                        { label: 'Origin', value: 'Ethically Made' },
                      ].map((spec, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-3 border-b border-gray-200"
                        >
                          <span className="text-gray-600">{spec.label}</span>
                          <span className="text-gray-900 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
