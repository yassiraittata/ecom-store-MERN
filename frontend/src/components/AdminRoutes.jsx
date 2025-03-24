import { Navigate, Outlet } from "react-router";
import { useSelector } from "react-redux";

export default function AdminRoutes() {
  const userInfo = useSelector((state) => state.auth.userInfo);
  return userInfo?.isAdmin ? <Outlet /> : <Navigate to="/login" />;
}
