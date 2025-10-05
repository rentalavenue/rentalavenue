import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import type { Product } from '@/lib/types'
import { ArrowRight } from 'lucide-react'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.image_url
    ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product-images/${product.image_url}`
    : '/placeholder.jpg'

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden bg-slate-100">
        <Image
          src={imageUrl}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-300"
          onError={(e) => {
            const target = e.target as HTMLImageElement
            target.src = '/placeholder.jpg'
          }}
        />
      </div>
      <div className="p-6">
        {product.categories && (
          <Badge variant="secondary" className="mb-3">
            {product.categories.name}
          </Badge>
        )}
        <h3 className="text-xl font-semibold text-slate-900 mb-2 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-slate-600 mb-4 line-clamp-2">
          {product.sub_description}
        </p>
        <Link href={`/products/${product.id}`}>
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}