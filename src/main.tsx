import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import AntdConfigProvider from './configs/ConfigAntd'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { AuthProvider } from './context/AuthProvider'
const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <AntdConfigProvider>
            <RouterProvider router={router} />
          </AntdConfigProvider>
        </QueryClientProvider>
      </Provider>
    </AuthProvider>
  </StrictMode>,
)
