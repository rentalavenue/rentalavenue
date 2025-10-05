import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Hero from '@/components/home/Hero'
import About from '@/components/home/About'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import ProductCategories from '@/components/home/ProductCategories'
import HowItWorks from '@/components/home/HowItWorks'
import Stats from '@/components/home/Stats'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <WhyChooseUs />
      <ProductCategories />
      <HowItWorks />
      <Footer />
    </main>
  )
}