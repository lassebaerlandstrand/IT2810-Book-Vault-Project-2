import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import Book from './pages/Book.page';
import { BookList } from './pages/BookList.page';
import { HomePage } from './pages/Home.page';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: <HomePage />,
        },
        {
          path: '/books',
          element: <BookList />,
        },
        {
          path: '/book/:bookId',
          element: <Book />,
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

/*
{
  path: '/myRatings',
  element: <MyRatings />,
},
*/
