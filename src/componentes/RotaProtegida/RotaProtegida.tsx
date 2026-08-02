import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useSessaoUsuarioContext } from '../../contexto/SessaoUsuario'

export const RotaProtegida = () => {
  const { usuarioEstaLogado } = useSessaoUsuarioContext()
  const location = useLocation()
  return usuarioEstaLogado ? <Outlet /> : <Navigate to="/login" replace state={{ de: location.pathname }} />
}
