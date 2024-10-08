import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HeaderSimple } from './components/HeaderSimple/HeaderSimple'; // Import HeaderSimple
import { HomePage } from './pages/Home.page';
import { HomePage2 } from './pages/Home2.page';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: (
        <>
          <HeaderSimple />
          <HomePage />
        </>
      ),
    },
    {
      path: '/HomePage2',
      element: (
        <>
          <HeaderSimple />
          <HomePage2 />
        </>
      ),
    },
  ],
  {
    basename: '/project2',
  }
);

export function Router() {
  return <RouterProvider router={router} />;
}
