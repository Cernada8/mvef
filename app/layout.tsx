import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Mi Vida en Forma | Coaching Online para Mujeres +35 | Yerlina',
  description:
    'Coaching online especializado en mujeres +35. Pierde grasa, combate la inflamación y construye hábitos duraderos con el método de Yerlina. Vive más joven por más tiempo.',
  keywords: [
    'coaching online mujeres',
    'nutrición mujer 35',
    'perder peso mujeres',
    'inflamación',
    'hábitos saludables',
    'coaching fitness online',
    'Mi Vida en Forma',
    'Yerlina',
  ],
  authors: [{ name: 'Yerlina' }],
  metadataBase: new URL('https://www.mvf.coach'),
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Mi Vida en Forma | Vive más joven por más tiempo',
    description:
      'Coaching online especializado en mujeres +35. Pierde grasa, combate la inflamación y construye hábitos duraderos.',
    url: 'https://www.mvf.coach',
    siteName: 'Mi Vida en Forma',
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mi Vida en Forma | Coaching Online para Mujeres +35',
    description: 'Vive más joven por más tiempo. Coaching online especializado en mujeres +35.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'HealthAndBeautyBusiness',
              name: 'Mi Vida en Forma',
              description:
                'Coaching online especializado en mujeres +35. Nutrición, entrenamiento y hábitos.',
              url: 'https://www.mvf.coach/',
              founder: { '@type': 'Person', name: 'Yerlina' },
              serviceType: [
                'Coaching nutricional',
                'Entrenamiento personal online',
                'Coaching de hábitos',
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
