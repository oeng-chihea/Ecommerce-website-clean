'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { mockProducts } from '@/lib/data';
import ProductCard from './ProductCard';
import { LayoutGrid, Shirt, Footprints, Hourglass } from 'lucide-react';

const categoryFilters = [
  { label: 'All', value: 'All', icon: LayoutGrid },
  { label: 'Hoodie', value: 'Hoodie', icon: Hourglass },
  { label: 'T-shirt', value: 'T-shirt', icon: Shirt },
  { label: 'Shoes', value: 'Shoes', icon: Footprints },
];

export default function FeaturedProduct() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') {
      return mockProducts;
    }
    return mockProducts.filter((product) => product.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative py-24 bg-white overflow-hidden">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[40rem] -translate-x-1/2 rounded-full bg-primary-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-8 h-56 w-56 rounded-full bg-orange-400/10 blur-3xl" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 bg-primary-500/10 text-primary-700 text-sm font-semibold rounded-full mb-4"
          >
            Shop by Category
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Find Your Perfect Style
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our curated collection of hoodies, t-shirts, and shoes to find your ideal fit.
          </p>
          <div className="mt-6 flex justify-center">
            <a
              href="/shop"
              className="px-6 py-3 rounded-full bg-gray-900 text-white border border-gray-900 hover:border-primary-600 hover:bg-primary-600 transition-all"
            >
              View All
            </a>
          </div>
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

        {/* Product Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
