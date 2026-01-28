'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { mockProducts } from '@/lib/data';
import ProductCard from '@/components/ProductCard';
import { LayoutGrid, Shirt, Footprints, Hourglass } from 'lucide-react';

const categoryFilters = [
  { label: 'All', value: 'All', icon: LayoutGrid },
  { label: 'Hoodie', value: 'Hoodie', icon: Hourglass },
  { label: 'T-shirt', value: 'T-shirt', icon: Shirt },
  { label: 'Shoes', value: 'Shoes', icon: Footprints },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return mockProducts;
    }
    return mockProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1 bg-primary-500/10 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Fashion Collection
          </span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Explore Our Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover premium hoodies, stylish t-shirts, and comfortable shoes from our curated collection.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          {categoryFilters.map((category, index) => (
            <motion.button
              key={category.value}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setActiveCategory(category.value)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-medium transition-all ${
                activeCategory === category.value
                  ? 'bg-primary-500 text-white border-primary-500 shadow-sm'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary-500/50 hover:text-gray-900'
              }`}
            >
              <category.icon className="w-4 h-4" />
              {category.label}
            </motion.button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
