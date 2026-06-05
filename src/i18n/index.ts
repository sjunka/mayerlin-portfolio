import { es } from './es'
import { en } from './en'

export type Translations = typeof es
export type Lang = 'en' | 'es'

export const translations: Record<Lang, Translations> = { es, en }
