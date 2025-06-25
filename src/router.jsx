import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "./RootLayout"; // RootLayout that wraps around child components
import Signin from "./pages/Auth/Signin";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";
import Schedule from "./pages/Schedule/Schedule";
import Export from "./pages/Export/Export";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // RootLayout wraps the routes
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }, // Default redirect to dashboard
      { path: "dashboard", element: <Dashboard /> },
      { path: "employee", element: <Employee /> },
      { path: "schedule", element: <Schedule /> },
      { path: "export", element: <Export /> },
    ],
  },
  {
    path: "/signin",
    element: <Signin />, // SignIn page
  },
  {
    path: "/signup",
    element: <SignUp />, // SignUp page
  },
]);

// Main App Component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
