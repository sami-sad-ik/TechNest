import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Root = () => {
  return (
    <div className="">
      <Navbar />
      <div className="pt-[71.3px]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Root;
