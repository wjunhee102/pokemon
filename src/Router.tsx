import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import NotFound from "./pages/not-found";

const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "*", Component: NotFound },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
