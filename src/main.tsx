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
import { GoogleOAuthProvider } from '@react-oauth/google'
import { NotificationProvider } from './components/MyNotification'
const queryClient = new QueryClient();
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <AuthProvider >
        <Provider store={store}>
          <QueryClientProvider client={queryClient}>
            <AntdConfigProvider>
              <NotificationProvider>
                <RouterProvider router={router} />
              </NotificationProvider>
            </AntdConfigProvider>
          </QueryClientProvider>
        </Provider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </StrictMode>,
)
