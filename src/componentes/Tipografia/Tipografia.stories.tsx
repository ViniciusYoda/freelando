import type { Meta, StoryObj } from '@storybook/react'
import { Tipografia } from './Tipografia'

const variantes = ['h1', 'h2', 'h3', 'body', 'bodyBold', 'body2', 'body2Bold', 'legenda']
const meta = {
  title: 'Componentes/Tipografia',
  component: Tipografia,
  tags: ['autodocs'],
  args: { variante: 'body', componente: 'body', children: 'Conectando talentos aos melhores projetos.' },
  argTypes: {
    variante: { control: 'select', options: variantes },
    componente: { control: 'select', options: variantes },
  },
} satisfies Meta<typeof Tipografia>

export default meta
type Story = StoryObj<typeof meta>
export const Playground: Story = {}
export const EscalaTipografica: Story = { render: () => <div>{variantes.map(variante => <Tipografia key={variante} variante={variante} componente={variante}>{variante} — Freelando</Tipografia>)}</div> }
