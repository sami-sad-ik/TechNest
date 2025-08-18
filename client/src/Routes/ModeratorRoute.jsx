import { Navigate } from "react-router-dom";
import Loading from "../Components/Loading";
import useRole from "../Hooks/useRole";

const ModeratorRoute = ({ children }) => {
  const { role, isLoading } = useRole();

  if (isLoading) return <Loading />;
  if (role === "moderator") return children;
  return <Navigate to={"/dashboard"} />;
};

export default ModeratorRoute;
