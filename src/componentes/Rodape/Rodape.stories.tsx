import type { Meta, StoryObj } from '@storybook/react'
import { FreelandoLogo } from '../Icones/FreelandoLogo'
import { IconeInstagram } from '../Icones/IconeInstagram'
import { IconeTwitch } from '../Icones/IconeTwitch'
import { IconeTwitter } from '../Icones/IconeTwitter'
import { IconeWhatsApp } from '../Icones/IconeWhatsApp'
import { Rodape } from './Rodape'

const meta = {
  title: 'Componentes/Rodape',
  component: Rodape,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen', docs: { description: { component: 'Contêiner semântico do rodapé com as cores e espaçamentos institucionais.' } } },
} satisfies Meta<typeof Rodape>

export default meta
type Story = StoryObj<typeof meta>
export const Padrao: Story = { render: () => <Rodape><div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24 }}><div><FreelandoLogo width={176} height={40} /><p>Projeto fictício sem fins comerciais.</p></div><div><p>Acesse nossas redes:</p><div style={{ display: 'flex', gap: 8 }}><IconeWhatsApp /><IconeTwitch /><IconeInstagram /><IconeTwitter /></div></div></div></Rodape> }
