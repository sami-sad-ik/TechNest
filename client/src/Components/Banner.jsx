const Banner = () => {
  return (
    <div className="w-full h-[500px] bg-img flex justify-start items-center">
      <div className="md:pl-20 pl-5 md:w-3/5 w-10/12">
        <h2 className="md:text-6xl text-4xl font-lilita text-white font-semibold capitalize ">
          Your growing Tech products platform
        </h2>
        <p className="md:pr-28 my-3 font-sans text-gray-200 md:text-sm text-xs font-semibold tracking-wider">
          A community-driven hub to discover, share, and celebrate the latest
          products, tools, and innovations. Join the nest and explore what’s new
          in tech, together.
        </p>
        <button className="px-4 md:py-2 py-1 bg-cyan-300 hover:bg-cyan-500 transform duration-300 active:scale-[98%] rounded-full md:text-lg text-base font-semibold ">
          See Products
        </button>
      </div>
      <div></div>
    </div>
  );
};

export default Banner;
