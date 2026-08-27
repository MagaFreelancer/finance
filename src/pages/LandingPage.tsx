import { useState } from 'react'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Reveal } from '../components/ui/Reveal'
import { Hero } from '../components/landing/Hero'
import { Benefits } from '../components/landing/Benefits'
import { HowItWorks } from '../components/landing/HowItWorks'
import { VideoSection } from '../components/landing/VideoSection'
import { Principles } from '../components/landing/Principles'
import { Products } from '../components/landing/Products'
import { Calculator, type ProductPrefill } from '../components/calculator/Calculator'
import { FAQ } from '../components/landing/FAQ'
import styles from './LandingPage.module.css'

export function LandingPage() {
  const [productPrefill, setProductPrefill] = useState<ProductPrefill | null>(null)

  return (
    <>
      <Header />
      <main>
        <div className={styles.heroReveal}>
          <Hero />
        </div>

        <Reveal>
          <Benefits />
        </Reveal>

        <Reveal delay={40}>
          <HowItWorks />
        </Reveal>

        <Reveal delay={40}>
          <VideoSection />
        </Reveal>

        <Reveal delay={40}>
          <Principles />
        </Reveal>

        <Reveal delay={40}>
          <Products
            onApply={(title) =>
              setProductPrefill({ title, nonce: Date.now() })
            }
          />
        </Reveal>

        <Reveal delay={40}>
          <Calculator productPrefill={productPrefill} />
        </Reveal>

        <Reveal delay={40}>
          <FAQ />
        </Reveal>
      </main>
      <Reveal as="div" delay={20}>
        <Footer />
      </Reveal>
    </>
  )
}
