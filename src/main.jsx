import './image-slot.js'
import './styles.css'
import './case-study.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import DeflosjPage from './pages/DeflosjPage'
import WildwinesPage from './pages/WildwinesPage'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/work/deflosj" element={<DeflosjPage />} />
      <Route path="/work/wildwines" element={<WildwinesPage />} />
    </Routes>
  </BrowserRouter>
)
