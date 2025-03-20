import { ToastContainer } from "react-toastify";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "react-toastify/ReactToastify.css";

import RootLayout from "./pages/layouts/RootLayout";
import Login from "./pages/Auth/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
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
