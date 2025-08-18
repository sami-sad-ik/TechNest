import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

const Root = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-[71.3px]">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
