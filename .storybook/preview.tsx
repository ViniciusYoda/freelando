import type { Preview } from '@storybook/react'

import { Estilos } from '../src/componentes/EstilosGlobais/Estilos'
import { ProvedorTema } from '../src/componentes/ProvedorTema/ProvedorTema'

const preview: Preview = {
  decorators: [
    (Story) => (
      <ProvedorTema>
        <Estilos />
        <Story />
      </ProvedorTema>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
