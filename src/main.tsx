import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import AntdConfigProvider from './configs/ConfigAntd'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AntdConfigProvider>
      <RouterProvider router={router} />
    </AntdConfigProvider>
  </StrictMode>,
)
