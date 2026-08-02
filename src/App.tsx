import { RouterProvider } from "react-router-dom"
import { Estilos } from "./componentes/EstilosGlobais/Estilos"
import { ProvedorTema } from "./componentes/ProvedorTema/ProvedorTema"
import { router } from "./router/router"
import { SessaoUsuarioProvider } from "./contexto/SessaoUsuario"
import { MarketplaceProvider } from "./contexto/Marketplace"

function App () {
  return (<ProvedorTema>
    <Estilos />
    <SessaoUsuarioProvider>
      <MarketplaceProvider>
        <RouterProvider router={router} />
      </MarketplaceProvider>
    </SessaoUsuarioProvider>
  </ProvedorTema>)
} 

export default App
