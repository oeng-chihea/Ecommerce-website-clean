'use client';

import { motion } from 'framer-motion';
import { Shirt, Truck, ShieldCheck, RefreshCcw } from 'lucide-react';

const features = [
  {
    icon: Shirt,
    title: 'Premium Fabric',
    description: 'Soft 180gsm cotton with a crisp, structured drape',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Complimentary shipping on all shirt orders',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Guarantee',
    description: 'Reinforced stitching and premium finishing',
  },
  {
    icon: RefreshCcw,
    title: '30-Day Returns',
    description: 'Try it on at home—easy returns within 30 days',
  },
];

export default function Features() {
  return (
    <section className="py-24 bg-dark-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="p-8 bg-dark-700 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all duration-300">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25"
                >
                  <feature.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400">
                  {feature.description}
                </p>
              </div>
              
              {/* Hover Glow Effect */}
              <div className="absolute inset-0 -z-10 bg-primary-500/20 blur-xl rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
