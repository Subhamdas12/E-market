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
import { selectUserChecked } from "./features/auth/authSlice";
import { checkUserAsync } from "./features/auth/authSlice";
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
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
]);
function App() {
  const dispatch = useDispatch();
  const userChecked = useSelector(selectUserChecked);
  useEffect(() => {
    dispatch(checkUserAsync());
  }, [dispatch]);
  return (
    <div className="App">
      {userChecked && <RouterProvider router={router} />}
    </div>
  );
}

export default App;
