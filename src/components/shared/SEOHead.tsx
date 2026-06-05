import { Helmet } from 'react-helmet-async'
import { useTranslation } from '@/hooks/useTranslation'
import { profile } from '@/data/profile'

export function SEOHead() {
  const { lang } = useTranslation()

  const title =
    'Mayerlin Rueda · Psicóloga Organizacional | MR Desarrollo Humano'
  const description =
    lang === 'es'
      ? 'Psicóloga Organizacional con Maestría en Desarrollo Humano Organizacional. Servicios 100% online para empresas en Colombia y Latinoamérica.'
      : 'Organizational Psychologist with a Master in Organizational Human Development. 100% online services for companies across Colombia and Latin America.'

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={profile.siteUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:title" content="Mayerlin Rueda · Psicóloga Organizacional" />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={profile.siteUrl} />
      <meta property="og:image" content={profile.siteUrl.replace(/\/$/, '') + profile.ogImage} />
      <meta property="og:locale" content={lang === 'es' ? 'es_CO' : 'en_US'} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mayerlin Rueda · Psicóloga Organizacional" />
      <meta name="twitter:description" content={description} />
    </Helmet>
  )
}
