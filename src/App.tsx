import { lazy, Suspense } from 'react'
import { LazyMotion, MotionConfig, domMax } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from '@/context/LanguageContext'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { SEOHead } from '@/components/shared/SEOHead'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from '@/components/sections/Hero'

const About = lazy(() =>
  import('@/components/sections/About').then((m) => ({ default: m.About })),
)
const Services = lazy(() =>
  import('@/components/sections/Services').then((m) => ({ default: m.Services })),
)
const Contact = lazy(() =>
  import('@/components/sections/Contact').then((m) => ({ default: m.Contact })),
)

function App() {
  return (
    <LanguageProvider>
      <LazyMotion features={domMax}>
        <MotionConfig reducedMotion="user">
          <HelmetProvider>
            <SEOHead />
            <Navbar />
            <main id="main-content">
              <Hero />
              <ErrorBoundary>
                <Suspense fallback={<div className="h-24" />}>
                  <About />
                  <Services />
                  <Contact />
                </Suspense>
              </ErrorBoundary>
            </main>
            <Footer />
          </HelmetProvider>
        </MotionConfig>
      </LazyMotion>
    </LanguageProvider>
  )
}

export default App
