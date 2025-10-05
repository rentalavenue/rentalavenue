'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Laptop,
  DollarSign,
  Calendar,
  Wrench,
  Shield,
  Zap,
  TrendingUp,
  Headphones,
} from 'lucide-react'

export default function WhyChooseUs() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const benefits = [
    {
      icon: Laptop,
      title: 'Comprehensive IT Equipment Range',
      description:
        'From laptops and desktops to servers, networking devices, projectors, and printers - access the latest, fully configured IT assets tailored to your requirements.',
    },
    {
      icon: DollarSign,
      title: 'Cost-Effective Solutions',
      description:
        'Eliminate heavy upfront investments. Our flexible rental plans let you pay only for what you use, optimizing costs and maximizing ROI for your business.',
    },
    {
      icon: Calendar,
      title: 'Flexible Rental Terms',
      description:
        'Whether you need equipment for a day, month, or year, our rental options are customized to match your project timelines and business cycles.',
    },
    {
      icon: Wrench,
      title: 'End-to-End Support',
      description:
        'From delivery and installation to maintenance and quick replacements - we handle the technology so you can focus on growing your business.',
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description:
        'All equipment is rigorously tested, regularly updated, and meticulously maintained to ensure peak performance and zero downtime.',
    },
    {
      icon: Zap,
      title: 'Rapid Deployment',
      description:
        'We understand urgency. Our team ensures fast dispatch, seamless installation, and smooth onboarding to get you operational immediately.',
    },
    {
      icon: TrendingUp,
      title: 'Scalable & Business-Ready',
      description:
        'From startups and SMEs to large enterprises and events, we scale IT infrastructure precisely as per your growth and project needs.',
    },
    {
      icon: Headphones,
      title: '24/7 Dedicated Support',
      description:
        'Our experienced technical team is available round-the-clock to provide expert support and on-site assistance whenever required.',
    },
  ]

  return (
    <section ref={ref} className="py-20 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Why Choose RENTAL AVENUE
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We make technology simple, flexible, and affordable for businesses of all sizes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <benefit.icon className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}