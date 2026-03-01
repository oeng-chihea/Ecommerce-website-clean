'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

const NewsletterLine = dynamic(() => import('./NewsletterLine'), { ssr: false });

export default function Newsletter() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/15 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-orange-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="inline-block px-4 py-1 bg-primary-500/10 text-primary-700 text-sm font-semibold rounded-full mb-4">
            Stay Connected
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-4">
            Join Our Newsletter
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Subscribe for exclusive offers, early access to new drops, and styling tips for the perfect fit.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thank you for subscribing!');
          }}
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-6 py-4 bg-white border border-gray-200 rounded-full text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 transition-colors shadow-sm"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full flex items-center justify-center gap-2 hover:from-primary-600 hover:to-primary-700 transition-all shadow-lg shadow-primary-500/25"
          >
            Subscribe
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-sm text-gray-500 mt-4"
        >
          By subscribing, you agree to our Privacy Policy
        </motion.p>
      </div>

      {/* Animated hand-drawn curve line — client only to avoid hydration mismatch */}
      <NewsletterLine />
    </section>
  );
}
