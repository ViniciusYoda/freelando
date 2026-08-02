import { createContext, useContext, useMemo, useState } from 'react'
import type { Avaliacao, Profissional, Projeto, Proposta } from '../tipos'

const profissionaisIniciais: Profissional[] = [
  { id: 'p1', nome: 'Ana Lima', titulo: 'Product Designer', cidade: 'São Paulo, SP', habilidades: ['Design', 'Figma', 'Branding'], avaliacao: 4.9, bio: 'Crio produtos digitais acessíveis e fáceis de usar.' },
  { id: 'p2', nome: 'Bruno Rocha', titulo: 'Desenvolvedor Full Stack', cidade: 'Curitiba, PR', habilidades: ['React', 'TypeScript', 'Node.js'], avaliacao: 4.8, bio: 'Aplicações web modernas, rápidas e bem testadas.' },
  { id: 'p3', nome: 'Carla Souza', titulo: 'Redatora SEO', cidade: 'Recife, PE', habilidades: ['SEO', 'Redação', 'Marketing'], avaliacao: 4.7, bio: 'Conteúdo estratégico para marcas que querem crescer.' },
  { id: 'p4', nome: 'Diego Alves', titulo: 'Desenvolvedor Mobile', cidade: 'Belo Horizonte, MG', habilidades: ['React Native', 'API', 'UX'], avaliacao: 4.6, bio: 'Transformo ideias em aplicativos simples e escaláveis.' },
]

const projetosIniciais: Projeto[] = [
  { id: 'pr1', titulo: 'Identidade visual para cafeteria', descricao: 'Precisamos de logo, paleta e guia de aplicação para uma cafeteria artesanal.', categoria: 'Design', orcamento: 2500, prazo: '2026-09-15', clienteId: 'demo', status: 'aberto' },
  { id: 'pr2', titulo: 'Landing page de lançamento', descricao: 'Landing page responsiva com formulário e integração com nossa API.', categoria: 'Desenvolvimento', orcamento: 4800, prazo: '2026-09-30', clienteId: 'cliente-2', status: 'aberto' },
]

const ler = <T,>(chave: string, inicial: T): T => {
  try { return JSON.parse(localStorage.getItem(chave) || '') as T } catch { return inicial }
}

interface MarketplaceContexto {
  profissionais: Profissional[]; projetos: Projeto[]; propostas: Proposta[]; avaliacoes: Avaliacao[]
  criarProjeto: (dados: Omit<Projeto, 'id' | 'clienteId' | 'status'>) => Projeto
  enviarProposta: (dados: Omit<Proposta, 'id' | 'status' | 'profissionalId' | 'profissionalNome'>, profissionalNome: string) => void
  avaliar: (profissionalId: string, autor: string, nota: number, comentario: string) => void
  alterarProposta: (id: string, status: Proposta['status']) => void
}

const MarketplaceContext = createContext<MarketplaceContexto | null>(null)

export const MarketplaceProvider = ({ children }: { children: React.ReactNode }) => {
  const [projetos, setProjetos] = useState(() => ler('freelando_projetos', projetosIniciais))
  const [propostas, setPropostas] = useState<Proposta[]>(() => ler('freelando_propostas', []))
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>(() => ler('freelando_avaliacoes', []))
  const persistir = <T,>(chave: string, setter: React.Dispatch<React.SetStateAction<T>>) => (valor: T) => { setter(valor); localStorage.setItem(chave, JSON.stringify(valor)) }

  const value = useMemo<MarketplaceContexto>(() => ({
    profissionais: profissionaisIniciais, projetos, propostas, avaliacoes,
    criarProjeto: dados => { const projeto = { ...dados, id: crypto.randomUUID(), clienteId: 'demo', status: 'aberto' as const }; persistir('freelando_projetos', setProjetos)([...projetos, projeto]); return projeto },
    enviarProposta: (dados, profissionalNome) => persistir('freelando_propostas', setPropostas)([...propostas, { ...dados, id: crypto.randomUUID(), status: 'pendente', profissionalId: 'demo', profissionalNome }]),
    avaliar: (profissionalId, autor, nota, comentario) => persistir('freelando_avaliacoes', setAvaliacoes)([...avaliacoes, { id: crypto.randomUUID(), profissionalId, autor, nota, comentario }]),
    alterarProposta: (id, status) => persistir('freelando_propostas', setPropostas)(propostas.map(p => p.id === id ? { ...p, status } : p)),
  }), [projetos, propostas, avaliacoes])

  return <MarketplaceContext.Provider value={value}>{children}</MarketplaceContext.Provider>
}

export const useMarketplace = () => {
  const contexto = useContext(MarketplaceContext)
  if (!contexto) throw new Error('useMarketplace deve ser usado dentro de MarketplaceProvider')
  return contexto
}
