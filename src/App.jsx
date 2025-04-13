import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { PlayerProvider } from './context/PlayerContext'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/layout/Navbar'

function App() {
  return (
    <PlayerProvider>
      <Router>
        <div className="min-h-screen bg-gray-900 text-white">
          <Navbar />
          <main className="mx-auto px-4 py-4">
            <AppRoutes />
          </main>
          <ToastContainer 
            position="bottom-right" 
            theme='dark'
          />
        </div>
      </Router>
    </PlayerProvider>
  )
}

export default App
