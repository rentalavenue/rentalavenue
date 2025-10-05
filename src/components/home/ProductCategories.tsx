'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function ProductCategories() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const categories = [
    {
      name: 'Computers & Laptops',
      description: 'High-performance devices for every business need',
      image: '/computer_laptops1.jpg',
    },
    {
      name: 'Printers & Scanners',
      description: 'Multifunction printing solutions',
      image: '/printer_section1.jpg',
    },
    {
      name: 'Networking Equipment',
      description: 'Enterprise-grade networking solutions',
      image: '/networking1.jpg',
    },
    {
      name: 'Projectors & Video Conference',
      description: 'Crystal-clear presentation devices',
      image: '/projector1.jpg',
    },
    {
      name: 'Servers & Storage',
      description: 'Robust data infrastructure',
      image: '/server_storage2.jpg',
    },
    {
      name: 'Smart TVs & Tablets',
      description: 'Modern display and mobile solutions',
      image: '/tv_phones_tablets1.jpg',
    },
    {
      name: 'UPS Systems',
      description: 'Uninterrupted power protection',
      image: '/ups4.jpg',
    },
  ]

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
            Our Product Categories
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
            Comprehensive IT equipment rental solutions across all major categories
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden bg-slate-100">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  {category.name}
                </h3>
                <p className="text-slate-600 mb-4">{category.description}</p>
                <Link
                  href="/products"
                  className="text-blue-600 font-medium hover:text-blue-700 inline-flex items-center"
                >
                  View Products
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/products">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}