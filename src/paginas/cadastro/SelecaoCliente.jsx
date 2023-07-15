import { Col, Row } from "react-grid-system";
import { Tipografia } from "../../componentes/Tipografia/Tipografia";
import cliente from './assets/cliente.png'
import freela from './assets/freela.png'
import { Link } from "../../componentes/Link/Link";
import { Link as RouterLink } from "react-router-dom"

const SelecaoCliente = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <Tipografia variante="h1" componente="h1">
                Crie seu cadastro
            </Tipografia>
            <Tipografia variante="h3" componente="h2">
                Como podemos te ajudar
            </Tipografia>
            <Row>
                <Col md={6} sm={12}> 
                    <RouterLink to='interesses'>

                    <img src={cliente} alt="cliente" />
                    <Tipografia variante="body" componente="body">
                        Sou cliente e preciso de freela
                    </Tipografia>
                    </RouterLink>
                </Col>
                <Col>
                    <img src={freela} alt="freela" />
                    <Tipografia variante="body" componente="body">
                        Sou freela e preciso de cliente
                    </Tipografia>
                </Col>
            </Row>
            <div>
                <Tipografia variante="body2" componente="body2">
                    Já tem conta?
                </Tipografia>
            </div>
            <p>
                <Link variante="secundaria">
                    Faça login
                </Link>
            </p>
        </div>
    )
}

export default SelecaoCliente;