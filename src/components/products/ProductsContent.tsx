'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase/client'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import ProductCard from './ProductCard'
import type { Product, Category } from '@/lib/types'
import { Search, X, SlidersHorizontal } from 'lucide-react'

export default function ProductsContent() {
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      // Fetch categories
      const { data: categoriesData } = await supabase
        .from('categories')
        .select('*')
        .order('name')

      // Fetch products with category info
      const { data: productsData } = await supabase
        .from('products')
        .select(`
          *,
          categories (
            id,
            name
          )
        `)
        .order('created_at', { ascending: false })

      setCategories(categoriesData || [])
      setProducts(productsData || [])
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category_id === selectedCategory
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sub_description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSidebarOpen(false) // Close mobile sidebar after selection
  }

  return (
    <div className="min-h-screen bg-slate-50 pt-20 pb-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Horizontal Top Bar - Desktop */}
        <div className="hidden lg:flex items-center justify-between gap-8 mb-8 bg-white rounded-xl border border-slate-200 px-8 py-5">
          {/* Left: Title & Subtitle */}
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-slate-900 mb-1">Our Products</h1>
            <p className="text-sm text-slate-600">
              Browse our comprehensive catalog of premium IT equipment
            </p>
          </div>

          {/* Right: Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Mobile Header & Controls */}
        <div className="lg:hidden mb-6 space-y-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Our Products</h1>
            <p className="text-sm text-slate-600">
              Browse our comprehensive catalog of premium IT equipment available for rent
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
          >
            <SlidersHorizontal className="h-4 w-4" />
            <span className="font-medium text-sm">Categories</span>
          </button>
        </div>

        {/* Two Column Layout */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left Sidebar - Categories Only */}
          <aside
            className={`
              lg:w-64 lg:block
              ${sidebarOpen ? 'block' : 'hidden'}
              lg:sticky lg:top-24 lg:self-start
            `}
          >
            <div className="bg-white rounded-xl border border-slate-200 p-5">
              {/* Mobile Close Button */}
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h2 className="text-base font-semibold text-slate-900">Filter by Category</h2>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 hover:bg-slate-100 rounded transition-colors"
                >
                  <X className="h-5 w-5 text-slate-500" />
                </button>
              </div>

              {/* Desktop Title */}
              <h2 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide hidden lg:block">
                Categories
              </h2>

              {/* Category List */}
              <div className="space-y-1.5">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className={`
                    w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      selectedCategory === 'all'
                        ? 'bg-slate-900 text-white shadow-sm'
                        : 'text-slate-700 hover:bg-slate-100'
                    }
                  `}
                >
                  All Products
                </button>

                {loading ? (
                  <>
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full rounded-lg" />
                    ))}
                  </>
                ) : (
                  categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`
                        w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200
                        ${
                          selectedCategory === category.id
                            ? 'bg-slate-900 text-white shadow-sm'
                            : 'text-slate-700 hover:bg-slate-100'
                        }
                      `}
                    >
                      {category.name}
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>

          {/* Right Section - Products (Full Height) */}
          <main className="flex-1 min-w-0">
            {/* Products Grid */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-xl overflow-hidden border border-slate-200">
                    <Skeleton className="h-56 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-5/6" />
                      <Skeleton className="h-10 w-full mt-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length > 0 ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white rounded-xl border border-slate-200">
                <div className="max-w-sm mx-auto">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    No products found
                  </h3>
                  <p className="text-slate-600">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}