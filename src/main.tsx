import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import AntdConfigProvider from './configs/ConfigAntd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AntdConfigProvider>
        <RouterProvider router={router} />
      </AntdConfigProvider>
    </QueryClientProvider>
  </StrictMode>,
)
