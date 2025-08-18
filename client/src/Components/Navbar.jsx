import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useState } from "react";
import useAuth from "../Hooks/useAuth";
import avatarImg from "../assets/placeholder.jpg";

const Navbar = () => {
  const { user, signOutUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const handleSignOut = async () => {
    return await signOutUser();
  };
  const navLinks = (
    <>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          `block px-4 py-3 md:hover:bg-transparent ${
            isActive ? "text-cyan-500" : ""
          } hover:bg-neutral-100 transition font-semibold`
        }>
        Home
      </NavLink>
      <NavLink
        to={"/products"}
        className={({ isActive }) =>
          `block px-4 py-3 md:hover:bg-transparent ${
            isActive ? "text-cyan-500" : ""
          } hover:bg-neutral-100 transition font-semibold`
        }>
        Products
      </NavLink>
    </>
  );
  const links = (
    <>
      <Link
        to="/login"
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
        Login
      </Link>
      <Link
        to="/signup"
        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
        Sign Up
      </Link>
    </>
  );
  return (
    <div className="lg:px-20 md:px-10 px-6 fixed bg-white w-screen z-10 shadow-sm ">
      <div className="py-2 ">
        <div className="flex flex-row bg-opacity-40 items-center justify-between gap-3 md:gap-0">
          {/* Logo */}
          <Link to="/">
            <img
              // className='hidden md:block'
              src={logo}
              alt="logo"
              width="150"
              height="150"
            />
          </Link>
          {/* responsive navlinks  */}
          <div className="md:flex gap-3 font-semibold hidden">{navLinks}</div>
          <div className="md:flex hidden">
            {user ? (
              <div className="relative ">
                {/* Dropdown btn */}
                <div
                  onClick={() => setIsOpen(!isOpen)}
                  className="p-1 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
                  <div className=" md:block">
                    {/* Avatar */}
                    <img
                      className="rounded-full w-10 h-10 object-cover"
                      referrerPolicy="no-referrer"
                      src={user && user.photoURL ? user.photoURL : avatarImg}
                      alt="profile"
                      height="35"
                      width="35"
                    />
                  </div>
                </div>
                {isOpen && (
                  <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                    <div className="flex flex-col cursor-pointer">
                      <div className="block md:hidden  transition">
                        {navLinks}
                      </div>

                      {user && (
                        <>
                          <div className="px-4 py-3 text-center font-bold italic">
                            {user?.displayName || "Invalid name!"}
                          </div>
                          <Link
                            to="/dashboard"
                            className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                            Dashboard
                          </Link>
                          <div
                            onClick={handleSignOut}
                            className="px-4 py-3 hover:bg-neutral-100 text-red-500 transition font-semibold cursor-pointer">
                            Logout
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 bg-cyan-300 hover:bg-cyan-500 rounded-md transition font-semibold">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 ml-2 bg-black hover:bg-zinc-600 text-white rounded-md transition font-semibold">
                  Sign Up
                </Link>
              </>
            )}
          </div>
          {/* Dropdown Menu */}
          <div className="relative md:hidden">
            {/* Dropdown btn */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition">
              <AiOutlineMenu />
              <div className=" md:block">
                {/* Avatar */}
                <img
                  className="rounded-full"
                  referrerPolicy="no-referrer"
                  src={user && user.photoURL ? user.photoURL : avatarImg}
                  alt="profile"
                  height="30"
                  width="30"
                />
              </div>
            </div>
            {isOpen && (
              <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[10vw] bg-white overflow-hidden right-0 top-12 text-sm">
                {user && (
                  <div className="px-4 py-3 text-center font-bold italic">
                    {user?.displayName || "Invalid name!"}
                  </div>
                )}
                <div className="flex flex-col cursor-pointer">
                  <div className="block md:hidden  transition">{navLinks}</div>

                  {user ? (
                    <>
                      <Link
                        to="/dashboard"
                        className="px-4 py-3 hover:bg-neutral-100 transition font-semibold">
                        Dashboard
                      </Link>
                      <div
                        onClick={handleSignOut}
                        className="px-4 py-3 hover:bg-neutral-100 text-red-500 transition font-semibold cursor-pointer">
                        Logout
                      </div>
                    </>
                  ) : (
                    links
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
