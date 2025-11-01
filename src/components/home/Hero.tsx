'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import BannerCarousel from './BannerCarousel'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Compact CTA Section - Fits in viewport with carousel */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-3 leading-tight">
              Premium IT Equipment
              <span className="block text-blue-600">On Flexible Rental</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 mb-6 leading-relaxed max-w-3xl mx-auto"
          >
            India&apos;s most trusted IT rental partner. Access world-class technology
            without heavy investments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 justify-center mb-6"
          >
            <Link href="/products">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 px-8">
                Explore Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="px-8">
                Get a Quote
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4 md:gap-6 text-sm"
          >
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-slate-700">Pan-India Service</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-slate-700">24/7 Support</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-slate-700">Flexible Plans</span>
            </div>
            <div className="flex items-center gap-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span className="font-medium text-slate-700">Zero Downtime</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}