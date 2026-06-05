import {
  Search,
  ThermometerSun,
  HeartHandshake,
  ClipboardList,
  GraduationCap,
} from 'lucide-react'
import type { Translations } from '@/i18n'

type ServiceKey = keyof Translations['services']['items']

export const services: { num: string; Icon: typeof Search; key: ServiceKey }[] = [
  { num: '01', Icon: Search, key: 'selection' },
  { num: '02', Icon: ThermometerSun, key: 'climate' },
  { num: '03', Icon: HeartHandshake, key: 'wellbeing' },
  { num: '04', Icon: ClipboardList, key: 'assessment' },
  { num: '05', Icon: GraduationCap, key: 'training' },
]
