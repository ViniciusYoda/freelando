import { RouterProvider } from 'react-router-dom'
import { router } from "./router/router";
import { ProvedorTema } from './componentes/ProvedorTema/ProvedorTema';
import { Estilos } from './componentes/EstilosGlobais/Estilos';

export default function App() {
  return (
    <ProvedorTema>
      <Estilos/>
      <RouterProvider router={router} />
    </ProvedorTema>
  )
}

