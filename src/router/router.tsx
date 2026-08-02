import { createBrowserRouter } from 'react-router-dom'
import { RotaProtegida } from '../componentes/RotaProtegida/RotaProtegida'
import Concluido from '../paginas/cadastro/Concluido'
import DadosPessoais from '../paginas/cadastro/DadosPessoais'
import Interesses from '../paginas/cadastro/Interesses'
import LayoutBaseCadastro from '../paginas/cadastro/LayoutBaseCadastro'
import SelecaoCliente from '../paginas/cadastro/SelecaoCliente'
import LayoutBase from '../paginas/LayoutBase'
import Login from '../paginas/Login/Login'
import RecuperarSenha from '../paginas/Login/RecuperarSenha'
import PaginaInicial from '../paginas/PaginaInicial/PaginaInicial'
import Perfil from '../paginas/area-logada/Perfil'
import { Dashboard, DetalheProfissional, DetalheProjeto, MinhasPropostas, NovoProjeto, Profissionais, Projetos } from '../paginas/area-logada/MarketplacePaginas'
import Pagina404 from '../paginas/erros/Pagina404'

export const router = createBrowserRouter([{ path: '/', element: <LayoutBase />, ErrorBoundary: Pagina404, children: [
  { index: true, element: <PaginaInicial /> },
  { path: 'login', element: <Login /> },
  { path: 'recuperar-senha', element: <RecuperarSenha /> },
  { path: 'profissionais', element: <Profissionais /> },
  { path: 'projetos', element: <Projetos /> },
  { path: 'cadastro', element: <LayoutBaseCadastro />, children: [
    { index: true, element: <SelecaoCliente /> }, { path: 'interesses', element: <Interesses /> },
    { path: 'dados-pessoais', element: <DadosPessoais /> }, { path: 'concluido', element: <Concluido /> },
  ] },
  { element: <RotaProtegida />, children: [
    { path: 'dashboard', element: <Dashboard /> },
    { path: 'area-logada/perfil', element: <Perfil /> },
    { path: 'favoritos', element: <Profissionais somenteFavoritos /> },
    { path: 'profissionais/:id', element: <DetalheProfissional /> },
    { path: 'projetos/novo', element: <NovoProjeto /> },
    { path: 'projetos/:id', element: <DetalheProjeto /> },
    { path: 'minhas-propostas', element: <MinhasPropostas /> },
  ] },
] }])
