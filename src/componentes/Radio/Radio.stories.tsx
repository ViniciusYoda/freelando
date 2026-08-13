import type { Meta, StoryObj } from '@storybook/react'
import Radio from './Radio'

const meta = {
  title: 'Componentes/Radio',
  component: Radio,
  tags: ['autodocs'],
  args: { valor: 'freela', label: 'Quero trabalhar como freelancer', checked: false, onClick: () => undefined },
  argTypes: { onClick: { action: 'selecionado' } },
} satisfies Meta<typeof Radio>

export default meta
type Story = StoryObj<typeof meta>
export const Desmarcado: Story = {}
export const Marcado: Story = { args: { checked: true } }
