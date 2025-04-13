import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import PlayerListPage from '../pages/PlayerListPage'
import PlayerDetailPage from '../pages/PlayerDetailPage'
import PlayerCreatePage from '../pages/PlayerCreatePage'
import PlayerEditPage from '../pages/PlayerEditPage'
import NotFoundPage from '../pages/NotFoundPage'

const AppRoutes = () => {
  const routes = [
    { path: '/', element: <HomePage /> },
    { path: '/players', element: <PlayerListPage /> },
    { path: '/players/:id', element: <PlayerDetailPage /> },
    { path: '/players/create', element: <PlayerCreatePage /> },
    { path: '/players/:id/edit', element: <PlayerEditPage /> },
    { path: '/404', element: <NotFoundPage /> },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]

  return (
    <Routes>
      {routes.map((route, i) => (
        <Route key={i} path={route.path} element={route.element} />
      ))}
    </Routes>
  )
}

export default AppRoutes
