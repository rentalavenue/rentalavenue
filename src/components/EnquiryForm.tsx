'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { enquirySchema } from '@/lib/validations'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import type { EnquiryFormData } from '@/lib/types'

interface EnquiryFormProps {
  productName?: string
  productId?: string
  categoryName?: string
  onSuccess?: () => void
}

export default function EnquiryForm({
  productName,
  productId,
  categoryName,
  onSuccess,
}: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      product_name: productName,
      product_id: productId,
      category_name: categoryName,
    },
  })

  const onSubmit = async (data: EnquiryFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error('Failed to submit enquiry')

      toast.success('Enquiry submitted successfully! We will contact you soon.')
      reset()
      onSuccess?.()
    } catch (error) {
      toast.error('Failed to submit enquiry. Please try again.')
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {productName && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-slate-600">Enquiry for:</p>
          <p className="font-semibold text-slate-900">{productName}</p>
          {categoryName && (
            <p className="text-sm text-slate-500">{categoryName}</p>
          )}
        </div>
      )}

      <div>
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder="Enter your full name"
          className="mt-1"
        />
        {errors.name && (
          <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="mobile">Mobile Number *</Label>
        <Input
          id="mobile"
          {...register('mobile')}
          placeholder="10-digit mobile number"
          maxLength={10}
          className="mt-1"
        />
        {errors.mobile && (
          <p className="text-sm text-red-600 mt-1">{errors.mobile.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder="your.email@example.com"
          className="mt-1"
        />
        {errors.email && (
          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="requirement">Describe Your Requirement *</Label>
        <Textarea
          id="requirement"
          {...register('requirement')}
          placeholder="Please describe your rental requirements, duration, quantity, etc."
          rows={4}
          className="mt-1"
        />
        {errors.requirement && (
          <p className="text-sm text-red-600 mt-1">{errors.requirement.message}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Enquiry'
        )}
      </Button>
    </form>
  )
}