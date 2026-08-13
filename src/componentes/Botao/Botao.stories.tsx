import type { Meta, StoryObj } from '@storybook/react'

import { Botao } from './Botao'

const meta = {
  title: 'Componentes/Botao',
  component: Botao,
  tags: ['autodocs'],
  args: {
    children: 'Continuar',
    fluido: false,
  },
  argTypes: {
    variante: {
      control: 'select',
      options: ['primaria', 'secundaria'],
    },
  },
} satisfies Meta<typeof Botao>

export default meta
type Story = StoryObj<typeof meta>

export const Primario: Story = {
  args: {
    variante: 'primaria',
  },
}

export const Secundario: Story = {
  args: {
    variante: 'secundaria',
  },
}

export const Fluido: Story = {
  args: {
    variante: 'primaria',
    fluido: true,
  },
}
