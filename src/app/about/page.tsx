'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Award, Users, Globe, Sparkles, Target, Heart } from 'lucide-react';

export default function AboutPage() {
  const stats = [
    { value: '100K+', label: 'Happy Customers' },
    { value: '50+', label: 'Countries Served' },
    { value: '99%', label: 'Satisfaction Rate' },
    { value: '24/7', label: 'Support Available' },
  ];

  const values = [
    {
      icon: Award,
      title: 'Quality First',
      description: 'We never compromise on quality. Every product is crafted with precision and care.',
    },
    {
      icon: Users,
      title: 'Customer Focused',
      description: 'Your satisfaction is our priority. We listen, adapt, and deliver excellence.',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Delivering premium wardrobe essentials to customers worldwide.',
    },
    {
      icon: Sparkles,
      title: 'Innovation',
      description: 'Constantly refining fabric, fit, and finish for a better shirt.',
    },
    {
      icon: Target,
      title: 'Precision',
      description: 'Attention to detail in every aspect, from design to delivery.',
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do, and it shows in everything we create.',
    },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-24">
      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <motion.div
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block px-4 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full mb-4">
              Our Story
            </span>
            <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-6">
              Crafting the Perfect{' '}
              <span className="bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                Shirt
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed">
              Founded with a passion for timeless style, WEISON reimagines the everyday shirt.
              We believe everyone deserves a refined fit and premium comfort—without the fuss.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent mb-2">
                  {stat.value}
                </p>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-display font-bold text-white mb-6">
                Our Journey to Shirt Excellence
              </h2>
              <div className="space-y-4 text-gray-400 leading-relaxed">
                <p>
                  WEISON started in a small atelier with a simple goal: create the perfect shirt
                  that looks sharp, feels effortless, and lasts season after season.
                </p>
                <p>
                  After years of fabric testing, pattern refinement, and countless fittings,
                  we launched our first essential shirt. The response was immediate—people
                  wanted quality they could feel.
                </p>
                <p>
                  Today, we blend classic tailoring with modern comfort to craft shirts that
                  move with you and elevate any outfit.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative aspect-square rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&q=80"
                  alt="Shirt craftsmanship"
                  fill
                  className="object-cover"
                />
              </div>
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute -bottom-8 -left-8 p-6 bg-primary-500 rounded-2xl shadow-xl"
              >
                <p className="text-3xl font-bold text-white">10+</p>
                <p className="text-white/80">Years of Excellence</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-dark-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block px-4 py-1 bg-primary-500/10 text-primary-400 text-sm font-medium rounded-full mb-4">
              Our Values
            </span>
            <h2 className="text-4xl font-display font-bold text-white mb-4">
              What Drives Us
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              These core values guide every decision we make and every product we create.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="p-8 bg-dark-700 rounded-3xl border border-white/5 hover:border-primary-500/30 transition-all"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-500/25"
                >
                  <value.icon className="w-7 h-7 text-white" />
                </motion.div>
                <h3 className="text-xl font-semibold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-display font-bold text-white mb-6">
              Ready for Your Perfect Shirt?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join thousands of satisfied customers and feel the difference.
            </p>
            <motion.a
              href="/product"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-full shadow-lg shadow-primary-500/25"
            >
              Shop the Shirt
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
