import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import '@holmesdev/widgets/style.css'

// Start each docs visit with the demo's default layout.
try {
  for (const key of ['panel-width', 'panel-height', 'panel-widget-order']) {
    localStorage.removeItem(key)
  }
} catch {
  // The demo can still render when browser storage is unavailable.
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
