import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// import AppLayout from "./ui/appLayout";
const AppLayout = lazy(() => import("./ui/appLayout"));
// import ErrorPage from "./routes/errorpage";
const ErrorPage = lazy(() => import("./routes/errorpage"));
// import HomePage from "./routes/home";
const HomePage = lazy(() => import("./routes/home"));
// import ArtWork from "./routes/artwork";
const ArtWork = lazy(() => import("./routes/artwork"));
// import User from "./routes/user";
const User = lazy(() => import("./routes/user"));
// import Cart from "./routes/cart";
const Cart = lazy(() => import("./routes/cart"));
// import ArtWorks from "./routes/artworks";
const ArtWorks = lazy(() => import("./routes/artworks"));
import { FiltersProvider } from "./contexts/filtersContext";
// import SignUp from "./routes/signUp";
const SignUp = lazy(() => import("./routes/signUp"));
// import LogIn from "./routes/logIn";
const LogIn = lazy(() => import("./routes/logIn"));
// import AdminDashboard from "./routes/adminDashboard";
const AdminDashboard = lazy(() => import("./routes/adminDashboard"));
// import Delete from "./routes/delete";
const Delete = lazy(() => import("./routes/delete"));
// import Upload from "./routes/upload";
const Upload = lazy(() => import("./routes/upload"));
// import Edit from "./routes/edit";
const Edit = lazy(() => import("./routes/edit"));
import { CartProvider } from "./contexts/cartContext";
import Spinner from "./ui/spinner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <HomePage /> },
          {
            path: "artWorks",
            element: <ArtWorks />,
          },
          {
            path: "artworks/:id",
            element: <ArtWork />,
          },
          {
            path: "user",
            element: <User />,
          },
          {
            path: "login",
            element: <LogIn />,
          },

          {
            path: "signup",
            element: <SignUp />,
          },
          {
            path: "cart",
            element: <Cart />,
          },
          {
            path: "admin/dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "admin/dashboard/delete/:id",
            element: <Delete />,
          },
          {
            path: "admin/dashboard/edit/:id",
            element: <Edit />,
          },
          {
            path: "admin/dashboard/upload/new",
            element: <Upload />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <FiltersProvider>
      <CartProvider>
        <Suspense fallback={<Spinner />}>
          <RouterProvider router={router}></RouterProvider>
        </Suspense>
      </CartProvider>
    </FiltersProvider>
  );
}

export default App;
