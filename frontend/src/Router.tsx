import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Book from './pages/Book';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <HomePage />,
    },
    {
      path: '/book/:bookId',
      element: <Book />,
    },
  ],
  {
    basename: '/project2',
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
