import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Toaster } from '@/components/ui/sonner';
import { createBrowserRouter, RouterProvider } from 'react-router';
import { Register, Login } from './pages';

const route = createBrowserRouter([
  {
    path: '',
    element: <App />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={route} />
    <Toaster />
  </StrictMode>,
);
