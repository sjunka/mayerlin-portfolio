import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Mail, Clock, Globe, ArrowRight } from 'lucide-react'
import { profile } from '@/data/profile'
import { useTranslation } from '@/hooks/useTranslation'
import { WhatsAppIcon } from '@/components/shared/BrandIcons'
import { cn } from '@/lib/utils'

export function Contact() {
  const { t } = useTranslation()
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const schema = z.object({
    nombre: z.string().min(2, t.contact.form.errors.nameMin),
    empresa: z.string().optional(),
    correo: z.string().email(t.contact.form.errors.emailInvalid),
    telefono: z.string().optional(),
    mensaje: z.string().min(10, t.contact.form.errors.messageMin),
  })
  type FormData = z.infer<typeof schema>

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  const onSubmit = async (data: FormData) => {
    setStatus('idle')
    try {
      if (profile.formspreeId) {
        const res = await fetch(`https://formspree.io/f/${profile.formspreeId}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        })
        if (!res.ok) throw new Error('Request failed')
      } else {
        // No Formspree id configured yet — simulate success in dev.
        await new Promise((r) => setTimeout(r, 400))
      }
      setStatus('success')
      reset()
    } catch {
      setStatus('error')
    }
  }

  const contactItems = [
    { Icon: Mail, text: t.contact.items.email },
    { Icon: WhatsAppIcon, text: t.contact.items.whatsapp },
    { Icon: Clock, text: t.contact.items.response },
    { Icon: Globe, text: t.contact.items.coverage },
  ]

  const inputClass = cn(
    'w-full rounded-md border border-background/[0.12] bg-background/[0.07] px-4 py-3',
    'font-sans text-[0.88rem] text-background placeholder:text-background/30',
    'focus:border-accent focus:outline-none transition-colors',
  )
  const labelClass =
    'mb-1.5 block font-sans text-[0.70rem] font-medium uppercase tracking-[0.1em] text-background/70'

  return (
    <section id="contact" className="bg-primary-dark py-24 px-[6%] text-background">
      <div className="grid grid-cols-1 nav:grid-cols-2 gap-12 nav:gap-20">
        {/* Left — info */}
        <div>
          <span className="font-sans text-[0.72rem] uppercase tracking-[0.22em] text-accent">
            {t.contact.tag}
          </span>
          <h2 className="mt-3 font-serif font-light text-[clamp(1.9rem,3.5vw,2.8rem)] leading-tight text-background">
            {t.contact.titlePre}
            <em className="text-accent italic">{t.contact.titleEm}</em>
          </h2>
          <p className="mt-5 max-w-md font-sans text-[0.92rem] leading-[1.85] text-background/70">
            {t.contact.description}
          </p>

          <ul className="mt-9 flex flex-col gap-4">
            {contactItems.map(({ Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <span
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-background/[0.08] text-accent"
                  aria-hidden="true"
                >
                  <Icon size={18} />
                </span>
                <span className="font-sans text-[0.9rem] text-background/85">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right — form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="nombre" className={labelClass}>
                {t.contact.form.name}
              </label>
              <input
                id="nombre"
                type="text"
                placeholder={t.contact.form.namePlaceholder}
                className={inputClass}
                aria-invalid={!!errors.nombre}
                {...register('nombre')}
              />
              {errors.nombre && (
                <p className="mt-1 text-xs text-accent">{errors.nombre.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="empresa" className={labelClass}>
                {t.contact.form.company}
              </label>
              <input
                id="empresa"
                type="text"
                placeholder={t.contact.form.companyPlaceholder}
                className={inputClass}
                {...register('empresa')}
              />
            </div>
          </div>

          <div>
            <label htmlFor="correo" className={labelClass}>
              {t.contact.form.email}
            </label>
            <input
              id="correo"
              type="email"
              placeholder={t.contact.form.emailPlaceholder}
              className={inputClass}
              aria-invalid={!!errors.correo}
              {...register('correo')}
            />
            {errors.correo && (
              <p className="mt-1 text-xs text-accent">{errors.correo.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="telefono" className={labelClass}>
              {t.contact.form.phone}
            </label>
            <input
              id="telefono"
              type="text"
              placeholder={t.contact.form.phonePlaceholder}
              className={inputClass}
              {...register('telefono')}
            />
          </div>

          <div>
            <label htmlFor="mensaje" className={labelClass}>
              {t.contact.form.message}
            </label>
            <textarea
              id="mensaje"
              rows={4}
              placeholder={t.contact.form.messagePlaceholder}
              className={cn(inputClass, 'min-h-[110px] resize-y')}
              aria-invalid={!!errors.mensaje}
              {...register('mensaje')}
            />
            {errors.mensaje && (
              <p className="mt-1 text-xs text-accent">{errors.mensaje.message}</p>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={cn(
                'group inline-flex items-center gap-2 rounded-md bg-accent px-7 py-3.5',
                'font-sans text-[0.82rem] font-medium uppercase tracking-[0.08em] text-accent-foreground',
                'hover:bg-accent-dark transition-colors disabled:opacity-60',
              )}
            >
              {isSubmitting ? t.contact.form.sending : t.contact.form.submit}
              {!isSubmitting && (
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                  aria-hidden="true"
                />
              )}
            </button>
          </div>

          {status === 'success' && (
            <p role="status" className="text-sm text-background">
              {t.contact.form.success}
            </p>
          )}
          {status === 'error' && (
            <p role="alert" className="text-sm text-accent">
              {t.contact.form.error}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}
