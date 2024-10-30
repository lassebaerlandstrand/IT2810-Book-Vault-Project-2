import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import Book from './pages/Book.page';
import { BookList } from './pages/BookList.page';
import { HomePage } from './pages/Home.page';
import { ReviewsList } from './pages/ReviewsList.page';
import Testing from './pages/Testing.page';

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
        {
          path: 'testing',
          element: <Testing />,
        },
        {
          path: '/myReviews',
          element: <ReviewsList />,
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
