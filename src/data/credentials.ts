import { Brain, GraduationCap, ScrollText } from 'lucide-react'
import type { Translations } from '@/i18n'

type CredentialKey = keyof Translations['about']['credentials']

export const credentials: { Icon: typeof Brain; key: CredentialKey }[] = [
  { Icon: Brain, key: 'psychologist' },
  { Icon: GraduationCap, key: 'master' },
  { Icon: ScrollText, key: 'specialist' },
]
