import { useTheme } from '@emotion/react'
import type { Meta, StoryObj } from '@storybook/react'

const AmostraTema = () => {
  const tema = useTheme()
  const cores = {
    'Primária A': tema.cores.primarias.a, 'Primária B': tema.cores.primarias.b, 'Primária C': tema.cores.primarias.c,
    'Secundária A': tema.cores.secundarias.a, 'Secundária B': tema.cores.secundarias.b, 'Secundária C': tema.cores.secundarias.c,
    'Neutra A': tema.cores.neutras.a, 'Neutra C': tema.cores.neutras.c, Foco: tema.cores.focus, Branco: tema.cores.branco,
  }
  return <div><h2>Cores</h2><div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 16 }}>{Object.entries(cores).map(([nome, cor]) => <div key={nome}><div style={{ height: 72, borderRadius: 8, background: cor, border: '1px solid #ddd' }} /><strong>{nome}</strong><div>{cor}</div></div>)}</div><h2>Espaçamentos</h2><div style={{ display: 'flex', alignItems: 'flex-end', gap: 16 }}>{Object.entries(tema.espacamentos).map(([nome, valor]) => <div key={nome} style={{ textAlign: 'center' }}><div style={{ width: valor, height: valor, background: tema.cores.primarias.a, margin: 'auto' }} /><div>{nome}: {valor}</div></div>)}</div></div>
}

const meta = {
  title: 'Fundacoes/Tema',
  component: AmostraTema,
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Tokens disponibilizados pelo ProvedorTema. Os estilos globais aplicam a fonte Montserrat, removem a margem do body e padronizam links.' } } },
} satisfies Meta<typeof AmostraTema>

export default meta
type Story = StoryObj<typeof meta>
export const Tokens: Story = {}
