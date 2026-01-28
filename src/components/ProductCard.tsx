'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star } from 'lucide-react';
import { Product } from '@/lib/data';
import { useStore } from '@/lib/store';
import { formatPrice, getDiscountPercentage } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const inWishlist = isInWishlist(product.id);

  if (!product.image) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        className="h-full"
      >
        <Link href={`/product?id=${product.id}`} className="block h-full">
          <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            className="group relative bg-white border border-gray-200 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col justify-center min-h-[300px]"
          >
            <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              {product.name}
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              {product.description}
            </p>
            <div className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </div>
          </motion.div>
        </Link>
      </motion.div>
    );
  }

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, product.sizes?.[0]);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <Link href={`/product?id=${product.id}`} className="block h-full">
        <motion.div
          whileHover={{ y: -8, scale: 1.02 }}
          className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col h-full border border-gray-100 hover:border-primary-200"
        >
          {/* Discount Badge */}
          {product.originalPrice && (
            <div className="absolute top-3 left-3 z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-lg backdrop-blur-sm"
              >
                -{getDiscountPercentage(product.originalPrice, product.price)}%
              </motion.div>
            </div>
          )}

          {/* Favorite Button */}
          <div className="absolute top-3 right-3 z-10">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistClick}
              className={`p-2 rounded-lg backdrop-blur-sm transition-all duration-200 shadow-lg ${
                inWishlist
                  ? 'bg-red-500 text-white'
                  : 'bg-white/90 text-gray-600 hover:text-red-500 hover:bg-white'
              }`}
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
            </motion.button>
          </div>

          {/* Image Container */}
          <div className="relative aspect-[3/4] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover object-center w-full h-full transition-transform duration-500 group-hover:scale-105"
              priority={index < 4}
            />
            {/* Subtle overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Content Section */}
          <div className="relative p-4 sm:p-5 flex flex-col flex-grow bg-white border-t border-gray-100">
            {/* Category and Rating */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <span className="text-primary-600 text-xs font-semibold uppercase tracking-wider bg-primary-50 px-2 py-1 rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1 text-amber-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-semibold text-gray-700">{product.rating}</span>
              </div>
            </div>

            {/* Product Title */}
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
              {product.name}
            </h3>

            {/* Product Description */}
            <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow leading-relaxed">
              {product.description}
            </p>

            {/* Price Section with Cart Button */}
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-bold text-gray-900">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddToCart}
                className="p-2.5 rounded-xl bg-primary-500 text-white hover:bg-primary-600 shadow-lg hover:shadow-xl transition-all duration-200 border-2 border-transparent hover:border-primary-200"
              >
                <ShoppingBag className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
