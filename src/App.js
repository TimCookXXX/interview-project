import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { SignUp } from './components/sign-up'
import { Main } from './routes/main';
import { Protected } from './routes/protected';
import { Authentication } from './routes/authentication';
import { User } from './routes/user';
import './app.scss';

export const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Protected><Main /></Protected>,
    },
    {
      path: '/user/:id',
      element: <Protected><User /></Protected>
    },
    {
      path: '/auth',
      element: <Authentication />,
      children: [
        {
          path: 'sign-up',
          element: <SignUp />
        }
      ]
    }
  ])
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}