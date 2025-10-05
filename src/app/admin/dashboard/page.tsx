import { createServerSupabaseClient } from '@/lib/supabase/server'
import { Card } from '@/components/ui/card'
import { Package, FolderTree, MessageSquare, TrendingUp } from 'lucide-react'

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  const [
    { count: categoriesCount },
    { count: productsCount },
    { count: enquiriesCount },
  ] = await Promise.all([
    supabase.from('categories').select('*', { count: 'exact', head: true }),
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('enquiries').select('*', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      title: 'Total Categories',
      value: categoriesCount || 0,
      icon: FolderTree,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Products',
      value: productsCount || 0,
      icon: Package,
      color: 'bg-green-500',
    },
    {
      title: 'Total Enquiries',
      value: enquiriesCount || 0,
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      title: 'Growth',
      value: '+12%',
      icon: TrendingUp,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-2">Welcome to RENTAL AVENUE Admin Panel</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-600 mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} w-12 h-12 rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}