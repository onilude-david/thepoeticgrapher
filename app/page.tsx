import { Footer } from '@/components/layout/Footer'
import { FAQ } from '@/components/sections/FAQ'
import { Hero } from '@/components/sections/Hero'
import { Journey } from '@/components/sections/Journey'
import { Portfolio } from '@/components/sections/Portfolio'
import { Services } from '@/components/sections/Services'
import { Testimonial } from '@/components/sections/Testimonial'
import { WhatWeDo } from '@/components/sections/WhatWeDo'
import { WhyTPG } from '@/components/sections/WhyTPG'

export default function HomePage() {
  return (
    <>
      <Hero ready />
      <WhatWeDo />
      <Services />
      <WhyTPG />
      <Portfolio />
      <Journey />
      <Testimonial />
      <FAQ />
      <Footer />
    </>
  )
}
