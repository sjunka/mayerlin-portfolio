import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HelmetProvider } from 'react-helmet-async'
import { LanguageProvider } from '@/context/LanguageContext'
import { Contact } from './Contact'

beforeEach(() => {
  // Force Spanish (the default content locale) regardless of jsdom navigator.
  localStorage.setItem('language', 'es')
  document.documentElement.lang = 'es'
})

function renderContact() {
  return render(
    <HelmetProvider>
      <LanguageProvider>
        <Contact />
      </LanguageProvider>
    </HelmetProvider>,
  )
}

describe('Contact', () => {
  it('renders the contact form fields', () => {
    renderContact()
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('shows validation errors on empty submit', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    await waitFor(() => {
      expect(screen.getByText(/ingresa tu nombre/i)).toBeInTheDocument()
    })
    expect(screen.getByText(/ingresa un correo válido/i)).toBeInTheDocument()
    expect(screen.getByText(/cuéntame un poco más/i)).toBeInTheDocument()
  })

  it('accepts valid input without validation errors', async () => {
    const user = userEvent.setup()
    renderContact()

    await user.type(screen.getByLabelText(/nombre/i), 'Ana Pérez')
    await user.type(screen.getByLabelText(/correo electrónico/i), 'ana@empresa.com')
    await user.type(
      screen.getByLabelText(/en qué puedo ayudarte/i),
      'Quiero mejorar el clima organizacional de mi equipo.',
    )
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    await waitFor(() => {
      expect(screen.queryByText(/ingresa tu nombre/i)).not.toBeInTheDocument()
    })
  })
})
