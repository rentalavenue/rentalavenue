'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Search, FileText, Truck, Headphones, CheckCircle } from 'lucide-react'

export default function HowItWorks() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const steps = [
    {
      icon: Search,
      title: 'Browse Our Catalog',
      description:
        'Explore our extensive range of IT equipment across multiple categories and find exactly what you need.',
    },
    {
      icon: FileText,
      title: 'Request a Quote',
      description:
        'Select your equipment, specify rental duration, and submit a quote request with your requirements.',
    },
    {
      icon: CheckCircle,
      title: 'Confirm Your Order',
      description:
        'Our team reviews your request, provides a detailed quote, and helps you finalize the rental agreement.',
    },
    {
      icon: Truck,
      title: 'Fast Delivery & Setup',
      description:
        'We deliver equipment to your location and provide complete installation and configuration support.',
    },
    {
      icon: Headphones,
      title: 'Ongoing Support',
      description:
        'Enjoy 24/7 technical support, maintenance, and quick replacements throughout your rental period.',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Get started with RENTAL AVENUE in five simple steps
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex items-start mb-12 last:mb-0"
            >
              <div className="flex-shrink-0">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  {index + 1}
                </div>
              </div>
              <div className="ml-6 flex-grow">
                <div className="bg-white p-6 rounded-xl shadow-md">
                  <div className="flex items-center mb-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <step.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-slate-900">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}