import { createContext, useContext, useState } from 'react'
import { ArmazenadorToken } from '../utils/ArmazenadorToken'
import http from '../http'
import type { Usuario } from '../tipos'

const usuarioDemo: Usuario = { id: 'demo', nome: 'Usuário Freelando', email: 'demo@freelando.com', perfil: 'freela', cidade: 'São Paulo', uf: 'SP', bio: 'Profissional disponível para novos projetos.', habilidades: ['React', 'TypeScript'], favoritoIds: [] }
const lerUsuario = () => { try { return JSON.parse(localStorage.getItem('freelando_usuario') || 'null') as Usuario | null } catch { return null } }

interface SessaoContexto {
  usuario: Usuario | null; usuarioEstaLogado: boolean; carregando: boolean
  login: (email: string, senha: string) => Promise<void>; logout: () => void
  atualizarPerfil: (dados: Partial<Usuario>) => void; alternarFavorito: (id: string) => void
  recuperarSenha: (email: string) => Promise<void>
}
const SessaoUsuarioContext = createContext<SessaoContexto | null>(null)

export const SessaoUsuarioProvider = ({ children }: { children: React.ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(lerUsuario)
  const [carregando, setCarregando] = useState(false)
  const salvar = (novo: Usuario | null) => { setUsuario(novo); novo ? localStorage.setItem('freelando_usuario', JSON.stringify(novo)) : localStorage.removeItem('freelando_usuario') }

  const login = async (email: string, senha: string) => {
    if (!email || !senha) throw new Error('Informe e-mail e senha.')
    setCarregando(true)
    try {
      const resposta = await http.post('auth/login', { email, senha })
      ArmazenadorToken.definirTokens(resposta.data.access_token, resposta.data.refresh_token)
      salvar({ ...usuarioDemo, email, nome: resposta.data.nome || usuarioDemo.nome })
    } catch {
      if (email === 'demo@freelando.com' && senha === '123456') {
        ArmazenadorToken.definirTokens('demo-token', 'demo-refresh'); salvar(usuarioDemo)
      } else throw new Error('Não foi possível entrar. Use demo@freelando.com / 123456 sem o servidor local.')
    } finally { setCarregando(false) }
  }
  const logout = () => { ArmazenadorToken.efetuarLogout(); salvar(null) }
  const atualizarPerfil = (dados: Partial<Usuario>) => { if (usuario) salvar({ ...usuario, ...dados }) }
  const alternarFavorito = (id: string) => { if (usuario) atualizarPerfil({ favoritoIds: usuario.favoritoIds.includes(id) ? usuario.favoritoIds.filter(item => item !== id) : [...usuario.favoritoIds, id] }) }
  const recuperarSenha = async (email: string) => { if (!email.includes('@')) throw new Error('Informe um e-mail válido.'); await new Promise(resolve => setTimeout(resolve, 400)) }

  return <SessaoUsuarioContext.Provider value={{ usuario, usuarioEstaLogado: !!usuario, carregando, login, logout, atualizarPerfil, alternarFavorito, recuperarSenha }}>{children}</SessaoUsuarioContext.Provider>
}

export const useSessaoUsuarioContext = () => {
  const contexto = useContext(SessaoUsuarioContext)
  if (!contexto) throw new Error('Contexto de sessão não encontrado')
  return contexto
}
