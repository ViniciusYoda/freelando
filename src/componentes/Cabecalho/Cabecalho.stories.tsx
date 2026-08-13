import type { Meta, StoryObj } from '@storybook/react'
import { FreelandoLogo } from '../Icones/FreelandoLogo'
import { Cabecalho } from './Cabecalho'

const meta = {
  title: 'Componentes/Cabecalho',
  component: Cabecalho,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Contêiner semântico do cabeçalho com o fundo e o espaçamento padrão da marca.' } } },
} satisfies Meta<typeof Cabecalho>

export default meta
type Story = StoryObj<typeof meta>

export const Padrao: Story = {
  render: () => <Cabecalho><FreelandoLogo width={176} height={40} /></Cabecalho>,
}
