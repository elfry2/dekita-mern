import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import routes from './routes.ts';
import './index.css';
// import { store } from './store.ts';
// import { Provider } from 'react-redux';
// import { AuthenticationContextProvider } from './contexts/Authentication.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
      {/* Couldn't get Redux to work with React Router */}
      {/* <Provider store={store}> */}
      {/* Couldn't use context in a React Router middleware either */ }
      {/* <AuthenticationContextProvider> */}
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={routes} />
      </QueryClientProvider>
      {/* </AuthenticationContextProvider> */}  
      {/* </Provider> */}
  </StrictMode>,
)
