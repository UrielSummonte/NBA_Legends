import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  const location = useLocation()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-blue-700 text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-4xl font-bold font-nba tracking-wide">
            NBA Legends
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/')
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-600'
              }`}
            >
              Inicio
            </Link>

            <Link
              to="/players"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/players')
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-600'
              }`}
            >
              Jugadores
            </Link>

            <Link
              to="/players/create"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                isActive('/players/create')
                  ? 'bg-blue-800 text-white'
                  : 'text-blue-100 hover:bg-blue-600'
              }`}
            >
              Añadir Jugador
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
