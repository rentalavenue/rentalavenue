import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ProductsContent from '@/components/products/ProductsContent'

export const metadata = {
  title: 'Our Products - RENTAL AVENUE',
  description: 'Browse our comprehensive catalog of IT equipment available for rent',
}

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <ProductsContent />
      <Footer />
    </main>
  )
}


