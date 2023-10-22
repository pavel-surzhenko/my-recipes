import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import Root from './pages/Root';
import { ContextProvider } from './lib/context';
import NewRecipe from './pages/NewRecipe';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/new-recipe', element: <NewRecipe /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <RouterProvider router={router} />
        </ContextProvider>
    </React.StrictMode>
);
