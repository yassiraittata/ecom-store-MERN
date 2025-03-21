import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.css";

import RootLayout from "./pages/layouts/RootLayout";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

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
