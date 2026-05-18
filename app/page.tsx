import Navbar        from '@/components/Navbar'
import Hero          from '@/components/Hero'
import AuthorityBar  from '@/components/AuthorityBar'
import EmotionalHook from '@/components/EmotionalHook'
import Stats         from '@/components/Stats'
import Method        from '@/components/Method'
import Programs      from '@/components/Programs'
import HowItWorks    from '@/components/HowItWorks'
import LeadMagnet    from '@/components/LeadMagnet'
import Features      from '@/components/Features'
import Testimonials  from '@/components/Testimonials'
import Shop          from '@/components/Shop'
import About         from '@/components/About'
import FAQ           from '@/components/FAQ'
import CTA           from '@/components/CTA'
import Footer        from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AuthorityBar />    {/* 47 años · +20 exp · +288K seguidoras */}
        <EmotionalHook />   {/* Mensaje emocional de conexión */}
        <Stats />
        <Method />
        <Programs />
        <HowItWorks />
        <LeadMagnet />      {/* Guía gratis + 10% descuento */}
        <Features />
        <Testimonials />
        <Shop />            {/* Tienda de productos digitales */}
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
