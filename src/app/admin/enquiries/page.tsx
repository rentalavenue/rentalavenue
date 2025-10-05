import { createServerSupabaseClient } from '@/lib/supabase/server'
import EnquiriesContent from '@/components/admin/EnquiriesContent'

export default async function EnquiriesPage() {
  const supabase = await createServerSupabaseClient()
  const { data: enquiries } = await supabase
    .from('enquiries')
    .select('*')
    .order('created_at', { ascending: false })

  return <EnquiriesContent initialEnquiries={enquiries || []} />
}