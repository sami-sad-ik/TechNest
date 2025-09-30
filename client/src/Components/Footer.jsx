import { Link } from "react-router-dom";
import logo from "/LogoImg.png";
import { TfiLinkedin } from "react-icons/tfi";
import { FaEnvelope } from "react-icons/fa";
import { ImGithub, ImLocation, ImPhone } from "react-icons/im";
// import { TfiFacebook } from "react-icons/tfi";
// import { RiTwitterXFill } from "react-icons/ri";

const Footer = () => {
  return (
    <footer className="bg-[#272b2e] text-white mt-9">
      <div className="w-10/12 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-16 p-10">
        <aside className="md:w-1/2 space-y-4">
          <Link to="/" className="flex items-center gap-1">
            <img src={logo} alt="logo" width="50" height="50" />
            <p className="text-3xl font-semibold font-lilita tracking-wider">
              TechNest
            </p>
          </Link>
          <p className="text-zinc-400 font-semibold">
            Technest is a forward-thinking technology company committed to
            delivering high quality digital solutions and services. We
            specialize in providing reliable, scalable, and customized software,
            staffing, and tech infrastructure support to help businesses operate
            more efficiently and grow sustainably.
          </p>
          <div className="flex gap-2">
            {/* <TfiFacebook />
          <RiTwitterXFill /> */}
            <a
              href="https://www.linkedin.com/in/sami-sadik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit p-3 bg-zinc-600 rounded">
              <TfiLinkedin className="text-white" />
            </a>
            <a
              href="https://github.com/sami-sad-ik"
              target="_blank"
              rel="noopener noreferrer"
              className="w-fit p-3 bg-zinc-600 rounded">
              <ImGithub className="text-white" />
            </a>
          </div>
        </aside>
        <aside className="md:w-1/2 flex flex-col justify-center items-start md:pl-3 space-y-6">
          <div className="flex gap-2 items-center">
            <p className="w-fit p-2 bg-zinc-600 rounded-full">
              <ImLocation className="text-white" />
            </p>
            <p className="font-semibold">Chattogram,Bangladesh</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="w-fit p-2 bg-zinc-600 rounded-full">
              <ImPhone className="text-white" />
            </p>
            <a
              href="tel:+8801632350530"
              className="font-semibold hover:underline hover:cursor-pointer">
              +8801632350530
            </a>
          </div>
          <div className="flex gap-2 items-center">
            <p className="w-fit p-2 bg-zinc-600 rounded-full">
              <FaEnvelope className="text-white" />
            </p>
            <p className="font-semibold">samisadik530@gmail.com</p>
          </div>
        </aside>
      </div>
      <p className="text-center text-zinc-400 font-semibold py-1">
        Copyright © {new Date().getFullYear()} - All right reserved by TechNest
      </p>
    </footer>
  );
};

export default Footer;
