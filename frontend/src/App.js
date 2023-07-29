import React, { useEffect } from "react";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import Protected from "./authentication/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLogginUser, selectUserChecked } from "./features/auth/authSlice";
import { checkUserAsync } from "./features/auth/authSlice";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import ProductOverviewPage from "./pages/ProductOverviewPage";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <Home></Home>,
      </Protected>
    ),
  },
  {
    path: "/productOverview/:id",
    element: (
      <Protected>
        <ProductOverviewPage />
      </Protected>
    ),
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
]);
const options = {
  timeout: 5000,
  position: positions.BOTTOM_LEFT,
};
function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectLogginUser);
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);
  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync());
  }, [dispatch, user]);
  return (
    <div className="App">
      {userChecked && (
        <Provider template={AlertTemplate} {...options}>
          <RouterProvider router={router} />
        </Provider>
      )}
    </div>
  );
}

export default App;
