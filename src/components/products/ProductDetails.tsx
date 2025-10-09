'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import EnquiryForm from '@/components/EnquiryForm'
import type { Product } from '@/lib/types'
import { ArrowLeft, Mail } from 'lucide-react'

interface ProductDetailsProps {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [showEnquiryDialog, setShowEnquiryDialog] = useState(false)

  const imageUrl = product.image_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_url}`
    : '/placeholder.jpg'

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link
            href="/products"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto lg:items-start">
          {/* Product Image */}
          <div className="bg-white rounded-2xl shadow-lg p-4 lg:sticky lg:top-24">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full h-auto max-h-[1500px] object-contain"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = '/placeholder.jpg'
              }}
            />
          </div>

          {/* Product Info */}
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            {product.categories && (
              <Badge variant="secondary" className="mb-4">
                {product.categories.name}
              </Badge>
            )}
            
            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            <div className="mb-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-2">
                Description
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {product.sub_description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-semibold text-slate-900 mb-3">
                Specifications
              </h2>
              <div className="bg-slate-50 rounded-lg p-4">
                <p className="text-slate-700 whitespace-pre-line">
                  {product.specifications}
                </p>
              </div>
            </div>

            <Button
              onClick={() => setShowEnquiryDialog(true)}
              size="lg"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get a Quote for This Product
            </Button>
          </div>
        </div>

        {/* Enquiry Dialog */}
        <Dialog open={showEnquiryDialog} onOpenChange={setShowEnquiryDialog}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Request a Quote</DialogTitle>
            </DialogHeader>
            <EnquiryForm
              productName={product.name}
              productId={product.id}
              categoryName={product.categories?.name}
              onSuccess={() => setShowEnquiryDialog(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}