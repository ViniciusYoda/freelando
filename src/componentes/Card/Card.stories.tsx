import type { Meta, StoryObj } from '@storybook/react'
import { Tipografia } from '../Tipografia/Tipografia'
import { Card } from './Card'

const meta = {
  title: 'Componentes/Card',
  component: Card,
  tags: ['autodocs'],
  args: { children: null, comBorda: true, variante: 'primaria' },
  argTypes: { variante: { control: 'select', options: ['primaria', 'secundaria'] } },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

const Conteudo = () => <><Tipografia componente='h3' variante='h3'>Projeto em destaque</Tipografia><Tipografia componente='body2' variante='body2'>Desenvolvimento de uma aplicação React.</Tipografia></>
export const Primario: Story = { render: args => <Card {...args}><Conteudo /></Card> }
export const Secundario: Story = { args: { variante: 'secundaria' }, render: args => <Card {...args}><Conteudo /></Card> }
export const SemBorda: Story = { args: { comBorda: false }, render: args => <Card {...args}><Conteudo /></Card> }
