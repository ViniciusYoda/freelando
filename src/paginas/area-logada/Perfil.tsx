import { FormEvent, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Botao } from '../../componentes/Botao/Botao'
import { CampoTexto } from '../../componentes/CampoTexto/CampoTexto'
import { Card } from '../../componentes/Card/Card'
import { useSessaoUsuarioContext } from '../../contexto/SessaoUsuario'

export default function Perfil() {
  const { usuario, atualizarPerfil } = useSessaoUsuarioContext()
  const [form, setForm] = useState({ nome: usuario?.nome || '', cidade: usuario?.cidade || '', uf: usuario?.uf || '', bio: usuario?.bio || '', habilidades: usuario?.habilidades.join(', ') || '' }); const [salvo, setSalvo] = useState(false)
  const enviar = (e: FormEvent) => { e.preventDefault(); atualizarPerfil({ ...form, habilidades: form.habilidades.split(',').map(h => h.trim()).filter(Boolean) }); setSalvo(true) }
  return <Container><Row justify="center"><Col md={8} style={{ margin: '48px 0' }}><Card><h1>Editar perfil</h1><form onSubmit={enviar}><CampoTexto titulo="Nome" valor={form.nome} onChange={nome => setForm({ ...form, nome })} /><CampoTexto titulo="Cidade" valor={form.cidade} onChange={cidade => setForm({ ...form, cidade })} /><CampoTexto titulo="UF" valor={form.uf} onChange={uf => setForm({ ...form, uf })} /><CampoTexto titulo="Apresentação" valor={form.bio} onChange={bio => setForm({ ...form, bio })} /><CampoTexto titulo="Habilidades (separadas por vírgula)" valor={form.habilidades} onChange={habilidades => setForm({ ...form, habilidades })} /><Botao>Salvar perfil</Botao>{salvo && <p role="status">Perfil salvo com sucesso.</p>}</form></Card></Col></Row></Container>
}
