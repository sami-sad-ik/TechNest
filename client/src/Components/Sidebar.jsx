import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { MdLogout } from "react-icons/md";
import useAuth from "../Hooks/useAuth";
import useRole from "../Hooks/useRole";
import GuestItems from "./menu/GuestItems";
import ModeratorItems from "./menu/ModeratorItems";
import AdminItems from "./menu/AdminItems";
const Sidebar = () => {
  const { signOutUser } = useAuth();
  const { role } = useRole();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOutUser();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  //   if (isAdminLoading) {
  //     return (
  //       <div className="fixed inset-0 min-h-screen w-screen mx-auto flex justify-center items-center bg-white z-50">
  //         <img className="w-32 h-auto" src={loadingGif} alt="loading gif" />
  //       </div>
  //     );
  //   }
  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div>
        <div className="flex pt-12 justify-center gap-0 text-2xl font-bold ">
          <Link to="/">
            <img
              // className='hidden md:block'
              src={logo}
              alt="logo"
              width="150"
              height="150"
            />
          </Link>
        </div>
        <div className="w-full">
          <div className="flex-1 overflow-auto">
            {role === "guest" && <GuestItems />}
            {role === "moderator" && <ModeratorItems />}
            {role === "admin" && <AdminItems />}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-gray-200 w-11/12 h-[2px] mx-auto my-2 rounded-full"></div>
        <div
          onClick={handleSignOut}
          className={`flex justify-start items-center gap-3 p-3 duration-200 hover:bg-cyan-600  `}>
          <span className="text-red-500 font-semibold">
            <MdLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
