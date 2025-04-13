const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-center text-white">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-400 border-t-transparent shadow-md mb-4"></div>
      <p className="text-blue-300 font-semibold text-lg font-nba">
        Cargando jugadores...
      </p>
    </div>
  )
}

export default LoadingSpinner
