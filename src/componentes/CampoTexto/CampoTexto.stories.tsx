import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { CampoTexto } from './CampoTexto'

const meta = {
  title: 'Componentes/CampoTexto',
  component: CampoTexto,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Campo controlado que entrega o novo texto diretamente pelo callback onChange.' } } },
  args: {
    titulo: 'Nome completo',
    tipo: 'text',
  },
} satisfies Meta<typeof CampoTexto>

export default meta
type Story = StoryObj<typeof meta>

const CampoControlado = (args: React.ComponentProps<typeof CampoTexto>) => {
  const [valor, setValor] = useState(args.valor ?? '')
  return <CampoTexto {...args} valor={valor} onChange={setValor} />
}

export const Padrao: Story = { render: CampoControlado }
export const Email: Story = { args: { titulo: 'E-mail', tipo: 'email', valor: 'contato@freelando.com' }, render: CampoControlado }
export const Senha: Story = { args: { titulo: 'Senha', tipo: 'password', valor: '123456' }, render: CampoControlado }
