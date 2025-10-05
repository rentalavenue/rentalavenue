import { z } from 'zod'

export const enquirySchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  mobile: z.string().regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
  email: z.string().email('Please enter a valid email address'),
  requirement: z.string().min(10, 'Please describe your requirement (minimum 10 characters)'),
  product_id: z.string().optional(),
  product_name: z.string().optional(),
  category_name: z.string().optional(),
})

export const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
})

export const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  category_id: z.string().min(1, 'Please select a category'),
  sub_description: z.string().min(10, 'Description must be at least 10 characters'),
  specifications: z.string().min(10, 'Specifications must be at least 10 characters'),
})