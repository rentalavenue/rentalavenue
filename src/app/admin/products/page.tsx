import { createServerSupabaseClient } from '@/lib/supabase/server'
import ProductsContent from '@/components/admin/ProductsContent'

export default async function ProductsPage() {
  const supabase = await createServerSupabaseClient()
  
  const [{ data: products }, { data: categories }] = await Promise.all([
    supabase.from('products').select(`
      *,
      categories (
        id,
        name
      )
    `).order('created_at', { ascending: false }),
    supabase.from('categories').select('*').order('name')
  ])

  return <ProductsContent initialProducts={products || []} categories={categories || []} />
}