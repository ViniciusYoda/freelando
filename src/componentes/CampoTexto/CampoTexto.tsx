import styled from "@emotion/styled"

const LabelEstilizada = styled.label`
    display: block;
    width: 100%;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
`

const InputEstilizado = styled.input`
    display: block;
    width: 100%;
    box-sizing: border-box;
    margin-top: ${props => props.theme.espacamentos.xs};
    margin-bottom: ${props => props.theme.espacamentos.s};
    background: ${props => props.theme.cores.branco};
    border: 1px solid;
    border-color: ${props => props.theme.cores.neutras.a};
    border-radius: ${props => props.theme.espacamentos.s};
    padding: 0 ${props => props.theme.espacamentos.s};
    height: 40px;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
`

interface CampoTextoProps {
    titulo: string
    valor?: string
    onChange?: (valor: string) => void
    tipo?: React.HTMLInputTypeAttribute
}

export const CampoTexto = ({ titulo, valor = '', onChange = () => undefined, tipo = 'text' }: CampoTextoProps) => {
    return (<LabelEstilizada>
        {titulo}
        <InputEstilizado 
            value={valor} 
            onChange={ evento => onChange(evento.target.value) }
            type={tipo}
        />
    </LabelEstilizada>)
}
