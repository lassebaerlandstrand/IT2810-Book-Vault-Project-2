import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './pages/Home.page';
import SearchPage from './pages/Search.page';

const router = createBrowserRouter([
  {
    path: '/project2',
    element: <HomePage />,
  },
  {
    path: '/project2/search',
    element: <SearchPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
