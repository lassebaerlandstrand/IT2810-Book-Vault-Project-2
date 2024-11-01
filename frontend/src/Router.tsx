import { createBrowserRouter, RouterProvider, ScrollRestoration } from 'react-router-dom';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import Layout from './components/Layout/Layout';
import Book from './pages/Book.page';
import { BookList } from './pages/BookList.page';
import { HomePage } from './pages/Home.page';
import { ReviewsList } from './pages/ReviewsList.page';
import Testing from './pages/Testing.page';
import UserProfile from './pages/UserProfile.page';

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/',
          element: (
            <>
              <ScrollRestoration />
              <HomePage />
            </>
          ),
        },
        {
          path: '/books',
          element: (
            <>
              <ScrollRestoration />
              <BookList />
            </>
          ),
        },
        {
          path: '/book/:bookId',
          element: (
            <>
              <ScrollRestoration />
              <Book />
            </>
          ),
        },
        {
          path: 'testing',
          element: (
            <>
              <ScrollRestoration />
              <Testing />
            </>
          ),
        },
        {
          path: '/profile',
          element: (
            <>
              <ScrollRestoration />
              <UserProfile />
            </>
          ),
        },
        {
          path: '/myReviews',
          element: (
            <>
              <ScrollRestoration />
              <ReviewsList />
            </>
          ),
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
