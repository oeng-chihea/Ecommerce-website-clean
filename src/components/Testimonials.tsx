'use client';

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import Image from 'next/image';
import { mockTestimonial } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full mb-4">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            What Our Customers Say
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Join thousands of customers who upgraded their everyday wardrobe
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative p-8 md:p-12 bg-gradient-to-br from-dark-800 to-dark-700 rounded-3xl border border-white/5">
            {/* Quote Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="absolute -top-6 left-8 w-12 h-12 bg-primary-500 rounded-2xl flex items-center justify-center shadow-lg shadow-primary-500/25"
            >
              <Quote className="w-6 h-6 text-white" />
            </motion.div>

            {/* Rating */}
            <div className="flex items-center gap-1 mb-6">
              {[...Array(mockTestimonial.rating)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                </motion.div>
              ))}
            </div>

            {/* Comment */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white font-light leading-relaxed mb-8"
            >
              &quot;{mockTestimonial.comment}&quot;
            </motion.p>

            {/* Author */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="relative w-14 h-14 rounded-full overflow-hidden ring-2 ring-primary-500/50">
                <Image
                  src={mockTestimonial.avatar}
                  alt={mockTestimonial.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">{mockTestimonial.name}</p>
                <p className="text-sm text-gray-400">Verified Buyer</p>
              </div>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-primary-500/5 rounded-full blur-3xl -z-10" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
