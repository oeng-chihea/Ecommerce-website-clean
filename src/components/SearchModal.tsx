'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Search } from 'lucide-react';
import { useStore } from '@/lib/store';
import { mockProducts } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function SearchModal() {
  const { isSearchOpen, setSearchOpen } = useStore();
  const [searchQuery, setSearchQuery] = useState('');

  const searchTokens = searchQuery.toLowerCase().split(' ').filter(Boolean);
  const results = mockProducts.filter((product) =>
    searchTokens.some((word) =>
      product.name.toLowerCase().includes(word) ||
      product.category.toLowerCase().includes(word) ||
      product.description.toLowerCase().includes(word) ||
      ['shirt', 'shirts', 'cotton', 'apparel', 'fashion', 'casual', 'formal', 'linen', 'polo', 'oxford'].includes(word)
    )
  );

  return (
    <AnimatePresence>
      {isSearchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50 flex items-start justify-center pt-20 px-4"
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-2xl bg-dark-800 rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Search Input */}
            <div className="relative flex items-center border-b border-white/10">
              <Search className="absolute left-6 w-6 h-6 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products..."
                autoFocus
                className="w-full py-6 pl-16 pr-16 bg-transparent text-white text-lg placeholder-gray-500 focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSearchOpen(false)}
                className="absolute right-4 p-2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </motion.button>
            </div>

            {/* Search Results */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {searchQuery === '' ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">Start typing to search...</p>
                </div>
              ) : results.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <p className="text-gray-400 text-sm mb-4">{results.length} result{results.length > 1 ? 's' : ''} found</p>
                  <div className="space-y-3">
                    {results.map((product) => (
                      <Link
                        key={product.id}
                        href={`/product?id=${product.id}`}
                        onClick={() => setSearchOpen(false)}
                        className="flex gap-4 p-4 bg-dark-700 rounded-2xl hover:bg-dark-600 transition-colors group"
                      >
                        <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-dark-600 flex-shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-white group-hover:text-primary-400 transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-400 mt-1">{product.category}</p>
                          <p className="text-primary-400 font-semibold mt-2">
                            ${product.price}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">No results found for &quot;{searchQuery}&quot;</p>
                </div>
              )}
            </div>

            {/* Quick Links */}
            <div className="p-6 bg-dark-900/50 border-t border-white/10">
              <p className="text-sm text-gray-400 mb-3">Popular searches</p>
              <div className="flex flex-wrap gap-2">
                {['T-Shirt', 'Oxford', 'Polo', 'Linen'].map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(tag)}
                    className="px-4 py-2 bg-dark-700 text-gray-300 text-sm rounded-full hover:bg-dark-600 hover:text-white transition-colors"
                  >
                    {tag}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
