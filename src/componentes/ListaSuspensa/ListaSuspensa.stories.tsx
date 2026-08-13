import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { ListaSupensa } from './ListaSuspensa'

const opcoes = [
  { value: 'design', text: 'Design' },
  { value: 'desenvolvimento', text: 'Desenvolvimento' },
  { value: 'marketing', text: 'Marketing' },
]

const meta = {
  title: 'Componentes/ListaSuspensa',
  component: ListaSupensa,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Seletor customizado com suporte a mouse e às teclas de seta, Enter, Escape e Tab.' } } },
  args: { titulo: 'Área de interesse', opcoes, valor: null, onChange: () => undefined },
} satisfies Meta<typeof ListaSupensa>

export default meta
type Story = StoryObj<typeof meta>

const ListaControlada = args => {
  const [valor, setValor] = useState(args.valor)
  return <div style={{ minHeight: 240, maxWidth: 480 }}><ListaSupensa {...args} valor={valor} onChange={setValor} /></div>
}

export const SemSelecao: Story = { render: ListaControlada }
export const ComSelecao: Story = { args: { valor: opcoes[1] }, render: ListaControlada }
