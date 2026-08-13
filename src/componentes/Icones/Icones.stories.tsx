import type { Meta, StoryObj } from '@storybook/react'
import { FreelandoLogo } from './FreelandoLogo'
import { IconeInstagram } from './IconeInstagram'
import { IconeTwitch } from './IconeTwitch'
import { IconeTwitter } from './IconeTwitter'
import { IconeWhatsApp } from './IconeWhatsApp'

const meta = {
  title: 'Componentes/Icones',
  component: FreelandoLogo,
  tags: ['autodocs'],
  parameters: { backgrounds: { default: 'marca', values: [{ name: 'marca', value: '#5754ED' }] }, docs: { description: { component: 'Logotipo e ícones sociais usados nas áreas institucionais da aplicação.' } } },
  args: { width: 247, height: 56 },
} satisfies Meta<typeof FreelandoLogo>

export default meta
type Story = StoryObj<typeof meta>
export const Logotipo: Story = {}
export const RedesSociais: Story = { render: () => <div style={{ display: 'flex', gap: 16 }}><IconeWhatsApp /><IconeTwitch /><IconeInstagram /><IconeTwitter /></div> }
