export type PerfilUsuario = 'cliente' | 'freela'

export interface Usuario {
  id: string
  nome: string
  email: string
  perfil: PerfilUsuario
  cidade: string
  uf: string
  bio: string
  habilidades: string[]
  favoritoIds: string[]
}

export interface Profissional {
  id: string
  nome: string
  titulo: string
  cidade: string
  habilidades: string[]
  avaliacao: number
  bio: string
}

export interface Projeto {
  id: string
  titulo: string
  descricao: string
  categoria: string
  orcamento: number
  prazo: string
  clienteId: string
  status: 'aberto' | 'em andamento' | 'concluído'
}

export interface Proposta {
  id: string
  projetoId: string
  profissionalId: string
  profissionalNome: string
  valor: number
  prazoDias: number
  mensagem: string
  status: 'pendente' | 'aceita' | 'recusada'
}

export interface Avaliacao {
  id: string
  profissionalId: string
  autor: string
  nota: number
  comentario: string
}
