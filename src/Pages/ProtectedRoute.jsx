import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = useSelector((store) => store.user);

  useEffect(() => {}, [user]);

  return user ? <Outlet /> : <Navigate to={"/login"}></Navigate>;
};

export default ProtectedRoute;
