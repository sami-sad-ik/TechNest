import { Navigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import Loading from "../../Components/Loading";

const DashboardRedirect = () => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;

  if (role === "guest")
    return <Navigate to={"/dashboard/my-profile"} replace />;
  if (role === "moderator")
    return <Navigate to={"/dashboard/review-queue"} replace />;
  if (role === "admin")
    return <Navigate to={"/dashboard/manage-users"} replace />;

  return <Navigate to={"/dashboard"} replace />;
};

export default DashboardRedirect;
