import Navbar from "./Homepage/Navbar";
import Body from "./Homepage/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Signin from "./Signin/Signin.jsx";
import Signup from "./Signup/Signup.jsx";
import CreateProject from "./Project/CreateProject.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "signin",
        element: <Signin />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "create-project",
        element: <CreateProject />
      }
    ],
  },
]);

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
function App() {
  return <RouterProvider router={router} />;
}

export default App;