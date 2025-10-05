'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Target, Eye } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <section ref={ref} className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            About RENTAL AVENUE
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Your trusted partner for high-quality IT rental solutions across India
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl"
          >
            <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center mb-6">
              <Target className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              To provide reliable, affordable, and flexible IT rental solutions that
              empower businesses to operate smoothly while staying updated with
              rapidly evolving technology. We help organizations reduce costs,
              minimize capital expenditure, and scale operations efficiently.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-8 rounded-2xl"
          >
            <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center mb-6">
              <Eye className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Our Vision</h3>
            <p className="text-slate-600 leading-relaxed">
              To be India&apos;s most trusted and innovative IT rental partner, empowering
              businesses with flexible, affordable, and cutting-edge technology
              solutions. We envision a future where companies of every size can access
              world-class IT infrastructure, enabling them to focus on innovation and
              success.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}