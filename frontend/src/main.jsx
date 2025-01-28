import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import CreateFeedback from "./pages/CreateFeedback.jsx";
import EditFeedback from "./pages/EditFeedback.jsx";
import FeedbackDetails from "./pages/FeedbackDetails.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.jsx";
import PrivateRoute from "./components/shared/PrivateRoute.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="" element={<PrivateRoute />}>
        <Route index={true} path="/" element={<Home />} />
        <Route path="feedback/create" element={<CreateFeedback />} />
        <Route path="feedback/edit/:id" element={<EditFeedback />} />
        <Route path="feedback/details/:id" element={<FeedbackDetails />} />
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
