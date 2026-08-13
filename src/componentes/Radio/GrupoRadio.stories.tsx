import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import GrupoRadio from './GrupoRadio'

const opcoes = [
  { valor: 'freela', label: 'Quero trabalhar como freelancer' },
  { valor: 'cliente', label: 'Quero contratar profissionais' },
]

const meta = {
  title: 'Componentes/GrupoRadio',
  component: GrupoRadio,
  tags: ['autodocs'],
  args: { opcoes, valor: 'freela', onChange: () => undefined },
} satisfies Meta<typeof GrupoRadio>

export default meta
type Story = StoryObj<typeof meta>
const GrupoControlado = args => {
  const [valor, setValor] = useState(args.valor ?? 'freela')
  return <GrupoRadio {...args} valor={valor} onChange={setValor} />
}
export const Padrao: Story = { render: GrupoControlado }
