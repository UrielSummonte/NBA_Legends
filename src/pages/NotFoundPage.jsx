import { Link } from 'react-router-dom'

const NotFoundPage = () => {
  return (
    <div className="max-w-md mx-auto text-center py-12 bg-gray-900 min-h-screen">
      <h1 className="text-4xl md:text-6xl font-bold text-blue-400 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-white mb-6 font-nba">
        Página No Encontrada
      </h2>
      <p className="text-gray-400 mb-8">
        La página que estás buscando no existe o ha sido movida.
      </p>
      <Link
        to="/"
        className="px-4 py-2 rounded-md font-medium bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105 transition-transform duration-200"
      >
        Ir a la Página de Inicio
      </Link>
    </div>
  )
}

export default NotFoundPage
