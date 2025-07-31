import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { tokenCheck } from "./utils/helper";

const PrivateRoute = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      const result = await tokenCheck();
      setIsAuthorized(result === true);
      setIsChecking(false); // Only after check is done
    };
    verify();
  }, []);

  // 🛑 Prevent rendering anything (including protected page) while checking
  if (isChecking) return null; // Avoid flashing protected content

  return isAuthorized ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
