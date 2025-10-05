import { createServerSupabaseClient } from '@/lib/supabase/server'
import CategoriesContent from '@/components/admin/CategoriesContent'

export default async function CategoriesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('name')

  return <CategoriesContent initialCategories={categories || []} />
}