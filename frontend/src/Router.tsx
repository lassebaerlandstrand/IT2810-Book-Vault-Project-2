import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
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
