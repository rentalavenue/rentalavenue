import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductDetails from '@/components/products/ProductDetails'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function ProductPage({ params }: { params: { id: string } }) {
  const supabase = await createServerSupabaseClient()

  const { data: product } = await supabase
    .from('products')
    .select(`
      *,
      categories (
        id,
        name
      )
    `)
    .eq('id', params.id)
    .single()

  if (!product) {
    notFound()
  }

  return (
    <main>
      <Navbar />
      <ProductDetails product={product} />
      <Footer />
    </main>
  )
}