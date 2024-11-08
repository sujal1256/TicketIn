import Navbar from "./Homepage/Navbar";
import Body from "./Homepage/Body";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Signin from "./Signin/Signin.jsx";
import Signup from "./Signup/Signup.jsx";
import CreateProject from "./Project/CreateProject.jsx";
import ProjectPage from "./Project/ProjectPage.jsx";
import InviteUserToProject from "./Project/InviteUserToProject.jsx";
import { ToastContainer } from "react-toastify";
import { Provider } from 'react-redux'
import store from "./redux/store.js";
import PricingHomePage from "./Pricing/PricingHomePage.jsx";



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
        element: <CreateProject />,
      },
      {
        path: "project",
        element: <ProjectPage />
      },
      {
        path: "invite",
        element: <InviteUserToProject />
      },
      {
        path: "pricing",
        element: <PricingHomePage />
      },
    ],
  },
]);

function Layout() {
  return (
    <Provider store={store}>
      <ToastContainer />
      <Navbar />
      <Outlet />
    </Provider>
  );
}
function App() {
  return <RouterProvider router={router} />;
}

export default App;
