import type { Meta, StoryObj } from '@storybook/react'
import Chip from './Chip'

const meta = {
  title: 'Componentes/Chip',
  component: Chip,
  tags: ['autodocs'],
  args: { children: 'React' },
  parameters: { docs: { description: { component: 'Rótulo compacto para representar habilidades, categorias ou filtros.' } } },
} satisfies Meta<typeof Chip>

export default meta
type Story = StoryObj<typeof meta>
export const Padrao: Story = {}
export const Conjunto: Story = { render: () => <div><Chip>React</Chip><Chip>TypeScript</Chip><Chip>UX/UI</Chip></div> }
