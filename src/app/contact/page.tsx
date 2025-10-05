import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ContactContent from '@/components/contact/ContactContent'

export const metadata = {
  title: 'Contact Us - RENTAL AVENUE',
  description: 'Get in touch with us for your IT equipment rental needs',
}

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <ContactContent />
      <Footer />
    </main>
  )
}