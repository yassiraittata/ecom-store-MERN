import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.css";

import RootLayout from "./pages/layouts/RootLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PrivetRoute from "./components/PrivetRoute";
import Profile from "./pages/User/Profile";
import AdminRoutes from "./components/AdminRoutes";
import UsersList from "./pages/Admin/usersList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [ 
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/",
        element: <PrivetRoute />,
        children: [
          { 
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminRoutes />,
        children: [
          {
            path: "users",
            element: <UsersList />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ToastContainer />

      <RouterProvider router={router} />
    </>
  );
}

export default App;
