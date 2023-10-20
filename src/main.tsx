import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import { ContextProvider } from './lib/context';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [{ path: '/', element: <Home /> }],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
