import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import ChatWidget from '@/components/ChatWidget'
import Analytics from '@/components/Analytics'
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

const BASE_URL = 'https://www.mvf.coach'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  title: {
    default:  'Mi Vida en Forma | Coaching Online para Mujeres +35 | Yerlina',
    template: '%s | Mi Vida en Forma',
  },
  description:
    'Coaching online especializado en mujeres +35 y +40. Pierde grasa, reduce la inflamación abdominal y recupera tu energía con el método 360° de Yerlina. Sin dietas extremas. Sin horas en el gym. Vive más joven por más tiempo.',

  keywords: [
    'coaching online mujeres',
    'coaching mujeres 40',
    'coaching mujeres mayores 35',
    'perder peso mujer 40',
    'perder grasa mujer madura',
    'nutrición antiinflamatoria mujeres',
    'inflamación abdominal mujer',
    'menopausia entrenamiento',
    'entrenamiento mujer 40',
    'hábitos saludables mujeres',
    'programa transformación corporal mujer',
    'coach fitness online mujer',
    'método 360 mujer',
    'Mi Vida en Forma',
    'Yerlina coach',
    'mivida_enforma',
    'coaching fitness online',
    'perder peso sin dietas',
    'entrenamiento en casa mujer',
  ],

  authors:   [{ name: 'Yerlina', url: BASE_URL }],
  creator:   'Yerlina',
  publisher: 'Mi Vida en Forma',

  alternates: {
    canonical: '/',
  },

  openGraph: {
    title:       'Mi Vida en Forma | Vive más joven por más tiempo',
    description: 'Coaching online para mujeres +35. Pierde grasa, reduce la inflamación y recupera tu energía con el método 360° de Yerlina. Sin dietas extremas.',
    url:         BASE_URL,
    siteName:    'Mi Vida en Forma',
    locale:      'es_ES',
    type:        'website',
    images: [
      {
        url:    '/og-image.jpg',
        width:  1200,
        height: 630,
        alt:    'Yerlina — Mi Vida en Forma, Coaching Online para Mujeres +35',
      },
    ],
  },

  twitter: {
    card:        'summary_large_image',
    title:       'Mi Vida en Forma | Coaching Online para Mujeres +35',
    description: 'Vive más joven por más tiempo. Pierde grasa, reduce la inflamación y recupera tu energía con el método 360° de Yerlina.',
    images:      ['/og-image.jpg'],
    creator:     '@mivida_enforma',
  },

  robots: {
    index:                  true,
    follow:                 true,
    googleBot: {
      index:               true,
      follow:              true,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  icons: {
    icon:       '/logo-mvef.png',
    shortcut:   '/logo-mvef.png',
    apple:      '/logo-mvef.png',
  },

  category: 'health',
}

/* ─── Structured Data (JSON-LD) ───────────────────────────────── */

const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: '¿Este programa es solo para perder peso?', acceptedAnswer: { '@type': 'Answer', text: 'No. El objetivo es ayudarte a sentirte fuerte, con energía, desinflamada y más segura de ti misma. Muchas mujeres pierden grasa y medidas, pero también mejoran su fuerza, hábitos, autoestima y bienestar.' } },
    { '@type': 'Question', name: '¿Funciona aunque tenga más de 40 años?', acceptedAnswer: { '@type': 'Answer', text: 'Sí, de hecho gran parte de las alumnas tienen más de 40. El entrenamiento y la alimentación están enfocados en los cambios hormonales, metabolismo más lento, inflamación y pérdida de masa muscular que aparecen con los años.' } },
    { '@type': 'Question', name: '¿Necesito experiencia entrenando?', acceptedAnswer: { '@type': 'Answer', text: 'Para nada. Adaptamos el plan a tu nivel, desde cero hasta avanzado.' } },
    { '@type': 'Question', name: '¿Tengo que pasar hambre?', acceptedAnswer: { '@type': 'Answer', text: 'No. Aprendemos a comer para nutrir el cuerpo, tener energía y mejorar la composición corporal sin vivir obsesionada con las calorías.' } },
    { '@type': 'Question', name: '¿Cuánto tiempo necesito entrenar?', acceptedAnswer: { '@type': 'Answer', text: 'Con 30-50 minutos bien hechos es más que suficiente.' } },
    { '@type': 'Question', name: '¿También ayudas con inflamación abdominal y menopausia?', acceptedAnswer: { '@type': 'Answer', text: 'Sí. Trabajo muchísimo con mujeres que sienten hinchazón, cambios hormonales, fatiga, aumento de grasa abdominal o metabolismo lento.' } },
    { '@type': 'Question', name: '¿En cuánto tiempo puedo notar cambios?', acceptedAnswer: { '@type': 'Answer', text: 'Cada cuerpo es distinto, pero muchas mujeres empiezan a sentirse con más energía y menos inflamación en pocas semanas.' } },
    { '@type': 'Question', name: '¿Por qué este método es diferente?', acceptedAnswer: { '@type': 'Answer', text: 'Porque no se basa en matarte a cardio ni comer poquísimo. Después de los 40 el cuerpo necesita estrategia, fuerza, buena alimentación y hábitos que puedas mantener de verdad.' } },
    { '@type': 'Question', name: '¿Cómo empiezo?', acceptedAnswer: { '@type': 'Answer', text: 'Solo tienes que rellenar el formulario y Yerlina te contactará personalmente.' } },
  ],
}

const personSchema = {
  '@context':  'https://schema.org',
  '@type':     'Person',
  name:        'Yerlina',
  jobTitle:    'Coach de Nutrición y Entrenamiento Femenino',
  description: 'Coach online especializada en mujeres +35 y +40. Más de 20 años de experiencia.',
  url:         'https://www.mvf.coach',
  image:       'https://www.mvf.coach/about-yerlina.jpg',
  sameAs:      ['https://www.instagram.com/mivida_enforma/'],
}

const businessSchema = {
  '@context':  'https://schema.org',
  '@type':     ['HealthAndBeautyBusiness', 'ProfessionalService'],
  name:        'Mi Vida en Forma',
  description: 'Coaching online especializado en mujeres +35. Nutrición antiinflamatoria, entrenamiento personalizado y coaching de hábitos.',
  url:         'https://www.mvf.coach/',
  logo:        'https://www.mvf.coach/logo-mvef.png',
  image:       'https://www.mvf.coach/foto-yerlina-principal.png',
  email:       'hola@mvf.coach',
  founder:     { '@type': 'Person', name: 'Yerlina' },
  areaServed:  { '@type': 'Place', name: 'Worldwide' },
  sameAs:      ['https://www.instagram.com/mivida_enforma/'],
}

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type':    'WebSite',
  name:       'Mi Vida en Forma',
  url:        'https://www.mvf.coach',
  inLanguage: 'es',
}

/* ─── Root Layout ────────────────────────────────────────────────── */

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <head>
        {[businessSchema, personSchema, faqSchema, websiteSchema].map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body>
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
