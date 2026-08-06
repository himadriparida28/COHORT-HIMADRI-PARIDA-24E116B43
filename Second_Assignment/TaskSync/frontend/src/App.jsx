import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import ProjectBoard from './pages/ProjectBoard'
import ForgotPassword from './pages/ForgotPassword'
import UpdateProfile from './pages/UpdateProfile'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Login />
    },
    {
      path: '/dashboard',
      element: <Dashboard />
    },
    {
      path: '/project/:projectId',
      element: <ProjectBoard />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/update-profile',
      element: <UpdateProfile />
    }
  ])

  return <RouterProvider router={router} />
}

export default App