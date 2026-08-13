import type { Meta, StoryObj } from '@storybook/react'
import { ItemListaInline } from './ItemListaInline'
import { ListaInline } from './ListaInline'

const meta = {
  title: 'Componentes/ListaInline',
  component: ListaInline,
  subcomponents: { ItemListaInline },
  tags: ['autodocs'],
  parameters: { docs: { description: { component: 'Lista sem marcadores para organizar itens horizontalmente. Use ItemListaInline nos filhos.' } } },
} satisfies Meta<typeof ListaInline>

export default meta
type Story = StoryObj<typeof meta>
export const Padrao: Story = { render: () => <ListaInline><ItemListaInline style={{ marginRight: 16 }}>Primeiro</ItemListaInline><ItemListaInline style={{ marginRight: 16 }}>Segundo</ItemListaInline><ItemListaInline>Terceiro</ItemListaInline></ListaInline> }
