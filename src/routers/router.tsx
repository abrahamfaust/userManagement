import { createBrowserRouter } from 'react-router-dom'
import { SafeRouting } from './safeRouting'
import { Dashboard } from '../components/dashboard'
import { Login } from '../components/login'

const router = createBrowserRouter([
    {
      path: "/",
      element: <SafeRouting />, 
      children: [
        { path: "/", element: <Dashboard /> }
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ]);

export default router