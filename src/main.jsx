// [TechGuild Update: 30-09-2026] CSS load order: Bootstrap first so app styles win without repaint flash (no visual change).
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Vendor CSS first so app styles always win the cascade without a
// post-paint override flash.
import "bootstrap/dist/css/bootstrap.min.css";
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
