'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { HeartOff } from 'lucide-react';
import { useStore } from '@/lib/store';
import ProductCard from '@/components/ProductCard';

export default function FavoritesPage() {
  const { wishlist } = useStore();

  return (
    <div className="min-h-screen bg-dark-900 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white">
              Favorites
            </h1>
            <p className="text-gray-400 mt-2">Items you love and saved.</p>
          </div>
          <Link
            href="/shop"
            className="text-primary-400 hover:text-primary-300 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>

        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
              <HeartOff className="w-7 h-7 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-white mb-2">No favorites yet</h2>
            <p className="text-gray-400 mb-6">
              Tap the heart on a product to save it here.
            </p>
            <Link
              href="/shop"
              className="px-6 py-3 rounded-full bg-primary-500 text-white font-semibold hover:bg-primary-600 transition-colors"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {wishlist.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
