import type { Meta, StoryObj } from '@storybook/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { SessaoUsuarioProvider } from '../../contexto/SessaoUsuario'
import { RotaProtegida } from './RotaProtegida'

const meta = {
  title: 'Componentes/RotaProtegida',
  component: RotaProtegida,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Protege rotas privadas: libera o Outlet para usuários autenticados e redireciona visitantes para /login.' } } },
} satisfies Meta<typeof RotaProtegida>

export default meta
type Story = StoryObj<typeof meta>

const usuario = { id: 'demo', nome: 'Usuário Freelando', email: 'demo@freelando.com', perfil: 'freela', cidade: 'São Paulo', uf: 'SP', bio: '', habilidades: [], favoritoIds: [] }
const Cenario = ({ autenticado }: { autenticado: boolean }) => {
  autenticado ? localStorage.setItem('freelando_usuario', JSON.stringify(usuario)) : localStorage.removeItem('freelando_usuario')
  return <MemoryRouter initialEntries={['/privado']}><SessaoUsuarioProvider><Routes><Route path="/login" element={<div>Login — visitante redirecionado</div>} /><Route element={<RotaProtegida />}><Route path="/privado" element={<div>Conteúdo privado liberado</div>} /></Route></Routes></SessaoUsuarioProvider></MemoryRouter>
}

export const Visitante: Story = { render: () => <Cenario autenticado={false} /> }
export const UsuarioAutenticado: Story = { render: () => <Cenario autenticado /> }
