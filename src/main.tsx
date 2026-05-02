import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './app/providers/i18n'
import { AppProviders } from './app/providers/AppProviders'
import './styles/globals.css'

const rootElement = document.getElementById('root')

if (rootElement === null) {
  throw new Error('Root element not found')
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
)
