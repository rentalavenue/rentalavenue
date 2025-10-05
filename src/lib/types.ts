export interface Category {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  category_id: string
  name: string
  sub_description: string
  specifications: string
  image_url: string | null
  created_at: string
  updated_at: string
  categories?: Category
}

export interface Enquiry {
  id: string
  name: string
  mobile: string
  email: string
  requirement: string
  product_id: string | null
  product_name: string | null
  category_name: string | null
  status: string
  created_at: string
}

export interface EnquiryFormData {
  name: string
  mobile: string
  email: string
  requirement: string
  product_id?: string
  product_name?: string
  category_name?: string
}