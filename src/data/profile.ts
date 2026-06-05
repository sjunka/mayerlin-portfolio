// Public assets live in /public and are served from the Vite base
// ("/" in dev, "/mayerlin-portfolio/" on GitHub Pages). Prefix on-page asset
// URLs with BASE_URL so they resolve correctly under the project subpath.
const base = import.meta.env.BASE_URL

export const profile = {
  name: 'Mayerlin Rueda',
  brand: 'MR Desarrollo Humano Organizacional',
  role: 'Psicóloga Organizacional & Laboral',
  email: 'mayerlinrueda@gmail.com',
  whatsapp: '', // ⏳ pending real number, e.g. '57XXXXXXXXXX'
  location: 'Medellín, Colombia',
  coverage: 'Colombia y Latinoamérica · Online',
  logo: `${base}logo-mr.png`,
  photo: `${base}foto-mayerlin.jpg`,
  siteUrl: 'https://sjunka.github.io/mayerlin-portfolio/',
  ogImage: '/og-image.jpg', // joined to siteUrl in SEOHead → absolute URL
  formspreeId: '', // ⏳ paste Formspree form id (https://formspree.io/f/XXXX)
} as const
