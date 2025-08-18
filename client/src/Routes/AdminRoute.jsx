import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import useRole from "../Hooks/useRole";

const AdminRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;
  if (role === "admin") return children;
  return <Navigate to={"/dashboard"} />;
};

export default AdminRoute;
