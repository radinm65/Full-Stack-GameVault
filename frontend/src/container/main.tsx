import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from '../app/app'
import '../assets/styles/global.css'
import '../assets/styles/resets.css'
import '../assets/styles/themes.css'
import '../assets/styles/variables.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
