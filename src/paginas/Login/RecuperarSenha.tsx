import { FormEvent, useState } from 'react'
import { Col, Container, Row } from 'react-grid-system'
import { Link } from 'react-router-dom'
import { Botao } from '../../componentes/Botao/Botao'
import { CampoTexto } from '../../componentes/CampoTexto/CampoTexto'
import { Card } from '../../componentes/Card/Card'
import { useSessaoUsuarioContext } from '../../contexto/SessaoUsuario'

export default function RecuperarSenha() {
  const [email, setEmail] = useState(''); const [mensagem, setMensagem] = useState(''); const { recuperarSenha } = useSessaoUsuarioContext()
  const enviar = async (e: FormEvent) => { e.preventDefault(); try { await recuperarSenha(email); setMensagem('Se o e-mail estiver cadastrado, as instruções foram enviadas.') } catch (erro) { setMensagem((erro as Error).message) } }
  return <Container><Row justify="center"><Col md={7} style={{ margin: '80px 0' }}><Card><h1>Recuperar senha</h1><p>Informe seu e-mail para receber as instruções.</p><form onSubmit={enviar}><CampoTexto titulo="E-mail" tipo="email" valor={email} onChange={setEmail} /><Botao>Enviar instruções</Botao></form>{mensagem && <p role="status">{mensagem}</p>}<p><Link to="/login">Voltar ao login</Link></p></Card></Col></Row></Container>
}
