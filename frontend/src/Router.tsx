import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import { BookList } from './pages/BookList.page';
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
        {
          path: '/books',
          element: <BookList />,
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
