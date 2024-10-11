import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { HomePage } from './pages/Home.page';
import { HomePage2 } from './pages/Home2.page';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <HomePage2 />,
        },
        {
          path: '/home',
          element: <HomePage />,
        },
      ],
    },
  ],
  {
    basename: '/project2',
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
