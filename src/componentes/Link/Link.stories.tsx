import type { Meta, StoryObj } from '@storybook/react'
import { Link } from './Link'

const meta = {
  title: 'Componentes/Link',
  component: Link,
  tags: ['autodocs'],
  args: { children: 'Saiba mais' },
  argTypes: { variante: { control: 'select', options: ['primario', 'secundario'] }, onClick: { action: 'clicado' } },
} satisfies Meta<typeof Link>

export default meta
type Story = StoryObj<typeof meta>
export const Primario: Story = { args: { variante: 'primario' }, decorators: [Story => <div style={{ background: '#5754ED', padding: 24 }}><Story /></div>] }
export const Secundario: Story = { args: { variante: 'secundario' } }
