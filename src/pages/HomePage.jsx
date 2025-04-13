import { Link } from 'react-router-dom'
import fondo from '../assets/img/fondo.jpg'

const HomePage = () => {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <img
        src={fondo}
        alt="NBA Legends"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="relative z-20 flex flex-col items-center px-4 text-center text-white pt-36">
        <h1 className="text-3xl md:text-6xl font-bold mb-6 font-nba">
          Bienvenido a NBA Legends
        </h1>
        <p className="text-lg mb-8 max-w-2xl">
          Una página dedicada a las leyendas de la NBA.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/players"
            className="px-4 py-2 rounded-md font-medium transition-colors bg-blue-600 hover:bg-blue-700 transform hover:scale-105 duration-200"
          >
            Ver Todos los Jugadores
          </Link>
          <Link
            to="/players/create"
            className="px-4 py-2 rounded-md font-medium transition-colors bg-red-600 hover:bg-red-700 transform hover:scale-105 duration-200"
          >
            Añadir Nuevo Jugador
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HomePage
