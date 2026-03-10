import Navbar from '@/components/Navbar'
import HeroSection from '@/components/HeroSection'
import CombosSection from '@/components/CombosSection'
import ModelosDestacados from '@/components/ModelosDestacados'
import ComoFunciona from '@/components/ComoFunciona'
import VentajasMayoristas from '@/components/VentajasMayoristas'
import CtaFinal from '@/components/CtaFinal'
import Footer from '@/components/Footer'
import WhatsAppFloat from '@/components/WhatsAppFloat'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CombosSection />
        <ModelosDestacados />
        <ComoFunciona />
        <VentajasMayoristas />
        <CtaFinal />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
