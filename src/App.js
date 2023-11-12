import './app.scss';
import { Main } from './routes/main';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Protected } from './routes/protected';
import { Authentication } from './routes/authentication';
import { SignUp } from './components/sign-up'
import { User } from './routes/user';

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