/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './pages/Root';
import { ContextProvider } from './lib/context';

import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css';

const Home = React.lazy(() => import('./pages/Home'));
const Soups = React.lazy(() => import('./pages/Soups'));
const NewRecipe = React.lazy(() => import('./pages/NewRecipe'));
const Main = React.lazy(() => import('./pages/Main'));
const Salads = React.lazy(() => import('./pages/Salads'));
const Desserts = React.lazy(() => import('./pages/Desserts'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/new-recipe', element: <NewRecipe /> },
            { path: '/soups', element: <Soups /> },
            { path: '/main', element: <Main /> },
            { path: '/salads', element: <Salads /> },
            { path: '/desserts', element: <Desserts /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ContextProvider>
            <Suspense>
                <RouterProvider router={router} />
            </Suspense>
        </ContextProvider>
    </React.StrictMode>
);
