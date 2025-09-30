import { Link } from "react-router-dom";

const Banner = ({ bannerImg, title, description }) => {
  return (
    <div
      className={`w-full h-full bg-cover bg-center flex justify-start items-center`}
      style={{ backgroundImage: `url(${bannerImg})` }}>
      <div className="md:pl-20 pl-5 md:w-3/5 w-10/12">
        <h2 className="md:text-6xl text-4xl text-white font-semibold capitalize ">
          {title}
        </h2>
        <p className="md:pr-28 my-3 font-sans text-gray-200 md:text-sm text-xs font-semibold tracking-wider">
          {description}
        </p>
        <Link
          to={"/products"}
          className="px-4 md:py-2 py-1 bg-cyan-300 hover:bg-cyan-500 transform duration-300 active:scale-[98%] rounded-full md:text-lg text-base font-semibold ">
          See Products
        </Link>
      </div>
      <div></div>
    </div>
  );
};

export default Banner;
