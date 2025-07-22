import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import RootLayout from "./RootLayout"; // RootLayout that wraps around child components
import SignIn from "./pages/Auth/SignIn";
import SignUp from "./pages/Auth/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import Employee from "./pages/Employee/Employee";
import Schedule from "./pages/Schedule/Schedule";
import Export from "./pages/Export/Export";
import Premium from "./pages/Premium/Premium";
import MainDashboard from "./pages/Dashboard/Dashboard";
import MonthlySch from "./pages/Dashboard/MonthlySch";
// import ManageSchedule from "./components/ManageSchedule/ManageSchedule";
import ChatSchedule from "./pages/ChatSchedule/ChatSchedule";
import CancelSubscription from "./pages/Premium/CancelSubscription";
import ForgotPass from "./components/forgotPassword/ForgotPass";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />, // RootLayout wraps the routes
    children: [
      { index: true, element: <Navigate to="/signin" replace /> }, // Default redirect to dashboard
      { path: "dashboard", element: <MonthlySch /> },
      { path: "employee", element: <Employee /> },
      { path: "schedule", element: <Schedule /> },
      { path: "chat", element: <ChatSchedule /> },
      { path: "cancel", element: <CancelSubscription /> },
      { path: "premium", element: <Premium /> },
    ],
  },
  {
    path: "/signin",
    element: <SignIn />, // SignIn page
  },
  {
    path: "/signup",
    element: <SignUp />, // SignUp page
  },
  {
    path: "/forgotPassword",
    element: <ForgotPass/>
  }
]);

// Main App Component
function App() {
  return <RouterProvider router={router} />;
}

export default App;
