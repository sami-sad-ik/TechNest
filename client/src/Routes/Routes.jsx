import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../Pages/Home/Home";
import Products from "../Pages/Products/Products";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/Signup/Signup";
import Dashboard from "../Pages/Dashboard/Dashboard";
import AddProduct from "../Pages/Guest/AddProduct";
import MyProducts from "../Pages/Guest/MyProducts";
import ManageUsers from "../Pages/Admin/ManageUsers";
import ReviewQueue from "../Pages/Moderator/ReviewQueue";
import MyProfile from "../Pages/Guest/MyProfile";
import PrivateRoute from "./PrivateRoute";
import DashboardRedirect from "../Pages/Dashboard/DashboardRedirect";
import GuestRoute from "./GuestRoute";
import ModeratorRoute from "./ModeratorRoute";
import AdminRoute from "./AdminRoute";
import ProductDetails from "../Pages/ProductDetails/ProductDetails";

export const Routes = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "/",
        Component: Home,
      },
      {
        path: "/products",
        Component: Products,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardRedirect />,
      },
      {
        path: "my-profile",
        element: (
          <PrivateRoute>
            <GuestRoute>
              <MyProfile />
            </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "add-product",
        element: (
          <PrivateRoute>
            <GuestRoute>
              <AddProduct />
            </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "my-products",
        element: (
          <PrivateRoute>
            <GuestRoute>
              <MyProducts />
            </GuestRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "review-queue",
        element: (
          <PrivateRoute>
            <ModeratorRoute>
              <ReviewQueue />
            </ModeratorRoute>
          </PrivateRoute>
        ),
      },
      {
        path: "manage-users",
        element: (
          <PrivateRoute>
            <AdminRoute>
              <ManageUsers />
            </AdminRoute>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
]);
