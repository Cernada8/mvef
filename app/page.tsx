import Navbar       from '@/components/Navbar'
import Hero         from '@/components/Hero'
import Stats        from '@/components/Stats'
import Method       from '@/components/Method'
import Programs     from '@/components/Programs'
import HowItWorks   from '@/components/HowItWorks'
import Features     from '@/components/Features'
import Testimonials from '@/components/Testimonials'
import About        from '@/components/About'
import FAQ          from '@/components/FAQ'
import CTA          from '@/components/CTA'
import Footer       from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Method />
        <Programs />
        <HowItWorks />
        <Features />
        <Testimonials />
        <About />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
