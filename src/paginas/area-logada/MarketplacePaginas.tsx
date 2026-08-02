import styled from '@emotion/styled'
import { FormEvent, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Botao } from '../../componentes/Botao/Botao'
import { CampoTexto } from '../../componentes/CampoTexto/CampoTexto'
import { Card } from '../../componentes/Card/Card'
import { useMarketplace } from '../../contexto/Marketplace'
import { useSessaoUsuarioContext } from '../../contexto/SessaoUsuario'

const Pagina = styled.main`max-width: 1120px; margin: 48px auto; padding: 0 24px; color: ${p => p.theme.cores.neutras.a};`
const Grade = styled.div`display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 20px; margin: 24px 0;`
const Linha = styled.div`display: flex; gap: 12px; align-items: center; justify-content: space-between; flex-wrap: wrap;`
const Etiqueta = styled.span`display: inline-block; background: ${p => p.theme.cores.secundarias.b}; border-radius: 16px; padding: 6px 12px; margin: 3px;`
const Entrada = styled.input`width: 100%; box-sizing: border-box; padding: 12px; border: 1px solid #777; border-radius: 12px; margin: 6px 0 16px;`
const Area = styled.textarea`width: 100%; min-height: 100px; box-sizing: border-box; padding: 12px; border: 1px solid #777; border-radius: 12px; margin: 6px 0 16px;`
const Select = styled.select`width: 100%; padding: 12px; border-radius: 12px; margin: 6px 0 16px;`
const Mensagem = styled.p`padding: 12px; background: ${p => p.theme.cores.secundarias.c}; border-radius: 8px;`

export const Dashboard = () => {
  const { usuario } = useSessaoUsuarioContext(); const { projetos, propostas } = useMarketplace()
  return <Pagina><h1>Olá, {usuario?.nome}</h1><p>Acompanhe sua atividade no Freelando.</p><Grade>
    <Card><h2>{projetos.length}</h2><p>projetos disponíveis</p><Link to="/projetos">Ver projetos</Link></Card>
    <Card><h2>{propostas.length}</h2><p>propostas enviadas</p><Link to="/minhas-propostas">Acompanhar</Link></Card>
    <Card><h2>{usuario?.favoritoIds.length || 0}</h2><p>profissionais favoritos</p><Link to="/favoritos">Ver favoritos</Link></Card>
  </Grade></Pagina>
}

export const Profissionais = ({ somenteFavoritos = false }: { somenteFavoritos?: boolean }) => {
  const { profissionais } = useMarketplace(); const { usuario, alternarFavorito } = useSessaoUsuarioContext(); const [busca, setBusca] = useState('')
  const lista = profissionais.filter(p => (!somenteFavoritos || usuario?.favoritoIds.includes(p.id)) && `${p.nome} ${p.titulo} ${p.habilidades.join(' ')}`.toLowerCase().includes(busca.toLowerCase()))
  return <Pagina><h1>{somenteFavoritos ? 'Meus favoritos' : 'Encontre profissionais'}</h1>{!somenteFavoritos && <Entrada aria-label="Buscar profissionais" placeholder="Busque por nome, especialidade ou habilidade" value={busca} onChange={e => setBusca(e.target.value)} />}
    <Grade>{lista.map(p => <Card key={p.id}><Linha><h2>{p.nome}</h2><button aria-label="Favoritar" onClick={() => alternarFavorito(p.id)}>{usuario?.favoritoIds.includes(p.id) ? '★' : '☆'}</button></Linha><strong>{p.titulo}</strong><p>{p.cidade} · ⭐ {p.avaliacao}</p><p>{p.bio}</p><div>{p.habilidades.map(h => <Etiqueta key={h}>{h}</Etiqueta>)}</div><p><Link to={`/profissionais/${p.id}`}>Ver perfil e avaliações</Link></p></Card>)}</Grade>
    {!lista.length && <Mensagem>Nenhum profissional encontrado.</Mensagem>}</Pagina>
}

export const DetalheProfissional = () => {
  const { id } = useParams(); const { profissionais, avaliacoes, avaliar } = useMarketplace(); const { usuario } = useSessaoUsuarioContext(); const profissional = profissionais.find(p => p.id === id)
  const [nota, setNota] = useState(5); const [comentario, setComentario] = useState(''); const [ok, setOk] = useState(false)
  if (!profissional) return <Pagina><h1>Profissional não encontrado</h1></Pagina>
  const enviar = (e: FormEvent) => { e.preventDefault(); avaliar(profissional.id, usuario?.nome || 'Cliente', nota, comentario); setComentario(''); setOk(true) }
  return <Pagina><Card><h1>{profissional.nome}</h1><h2>{profissional.titulo}</h2><p>{profissional.bio}</p><p>{profissional.cidade} · ⭐ {profissional.avaliacao}</p></Card><h2>Avaliações</h2>
    {avaliacoes.filter(a => a.profissionalId === id).map(a => <Card key={a.id}><strong>{a.autor} · {'★'.repeat(a.nota)}</strong><p>{a.comentario}</p></Card>)}
    <form onSubmit={enviar}><h2>Deixe uma avaliação</h2><label>Nota<Select value={nota} onChange={e => setNota(Number(e.target.value))}>{[5,4,3,2,1].map(n => <option key={n}>{n}</option>)}</Select></label><label>Comentário<Area required value={comentario} onChange={e => setComentario(e.target.value)} /></label><Botao>Publicar avaliação</Botao>{ok && <Mensagem>Avaliação publicada.</Mensagem>}</form></Pagina>
}

export const Projetos = () => {
  const { projetos } = useMarketplace(); const [busca, setBusca] = useState('')
  const filtrados = projetos.filter(p => `${p.titulo} ${p.categoria}`.toLowerCase().includes(busca.toLowerCase()))
  return <Pagina><Linha><h1>Projetos</h1><Link to="/projetos/novo">Publicar projeto</Link></Linha><Entrada placeholder="Buscar projeto ou categoria" value={busca} onChange={e => setBusca(e.target.value)} /><Grade>{filtrados.map(p => <Card key={p.id}><h2>{p.titulo}</h2><Etiqueta>{p.categoria}</Etiqueta><p>{p.descricao}</p><strong>{p.orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong><p>Prazo: {new Date(p.prazo).toLocaleDateString('pt-BR')}</p><Link to={`/projetos/${p.id}`}>Ver detalhes</Link></Card>)}</Grade></Pagina>
}

export const NovoProjeto = () => {
  const { criarProjeto } = useMarketplace(); const navegar = useNavigate(); const [form, setForm] = useState({ titulo: '', descricao: '', categoria: 'Desenvolvimento', orcamento: 1000, prazo: '' })
  const enviar = (e: FormEvent) => { e.preventDefault(); const p = criarProjeto(form); navegar(`/projetos/${p.id}`) }
  return <Pagina><h1>Publicar projeto</h1><form onSubmit={enviar}><CampoTexto titulo="Título" valor={form.titulo} onChange={titulo => setForm({ ...form, titulo })} /><label>Descrição<Area required value={form.descricao} onChange={e => setForm({ ...form, descricao: e.target.value })} /></label><CampoTexto titulo="Categoria" valor={form.categoria} onChange={categoria => setForm({ ...form, categoria })} /><label>Orçamento<Entrada required min="1" type="number" value={form.orcamento} onChange={e => setForm({ ...form, orcamento: Number(e.target.value) })} /></label><label>Prazo<Entrada required type="date" value={form.prazo} onChange={e => setForm({ ...form, prazo: e.target.value })} /></label><Botao>Publicar</Botao></form></Pagina>
}

export const DetalheProjeto = () => {
  const { id } = useParams(); const { projetos, propostas, enviarProposta, alterarProposta } = useMarketplace(); const { usuario } = useSessaoUsuarioContext(); const projeto = projetos.find(p => p.id === id)
  const [valor, setValor] = useState(projeto?.orcamento || 0); const [prazoDias, setPrazo] = useState(10); const [mensagem, setMensagem] = useState(''); const [ok, setOk] = useState(false)
  if (!projeto) return <Pagina><h1>Projeto não encontrado</h1></Pagina>
  const enviar = (e: FormEvent) => { e.preventDefault(); enviarProposta({ projetoId: projeto.id, valor, prazoDias, mensagem }, usuario?.nome || 'Profissional'); setOk(true) }
  const recebidas = propostas.filter(p => p.projetoId === projeto.id)
  return <Pagina><Card><h1>{projeto.titulo}</h1><Etiqueta>{projeto.status}</Etiqueta><p>{projeto.descricao}</p><h2>{projeto.orcamento.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h2></Card>
    <form onSubmit={enviar}><h2>Enviar proposta</h2><label>Valor<Entrada type="number" min="1" value={valor} onChange={e => setValor(Number(e.target.value))} /></label><label>Prazo em dias<Entrada type="number" min="1" value={prazoDias} onChange={e => setPrazo(Number(e.target.value))} /></label><label>Mensagem<Area required value={mensagem} onChange={e => setMensagem(e.target.value)} /></label><Botao>Enviar proposta</Botao>{ok && <Mensagem>Proposta enviada.</Mensagem>}</form>
    {!!recebidas.length && <><h2>Propostas recebidas</h2>{recebidas.map(p => <Card key={p.id}><strong>{p.profissionalNome}: {p.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</strong><p>{p.mensagem}</p><p>Status: {p.status}</p>{p.status === 'pendente' && <Linha><button onClick={() => alterarProposta(p.id, 'aceita')}>Aceitar</button><button onClick={() => alterarProposta(p.id, 'recusada')}>Recusar</button></Linha>}</Card>)}</>}</Pagina>
}

export const MinhasPropostas = () => {
  const { propostas, projetos } = useMarketplace()
  return <Pagina><h1>Minhas propostas</h1><Grade>{propostas.map(p => <Card key={p.id}><h2>{projetos.find(item => item.id === p.projetoId)?.titulo}</h2><p>{p.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} · {p.prazoDias} dias</p><Etiqueta>{p.status}</Etiqueta></Card>)}</Grade>{!propostas.length && <Mensagem>Você ainda não enviou propostas.</Mensagem>}</Pagina>
}
