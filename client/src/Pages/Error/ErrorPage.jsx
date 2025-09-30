import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-5">
      <h2 className="md:text-7xl text-5xl  text-center font-bold">
        404 not found !
      </h2>
      <div className="flex justify-center items-center gap-3">
        <Link
          to={"/"}
          className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-5 py-1 rounded-full md:text-xl text-white font-semibold">
          Back to Home
        </Link>
        <Link
          to={-1}
          className="bg-cyan-500 hover:bg-cyan-600 transition-colors duration-200 px-5 py-1 rounded-full md:text-xl text-white font-semibold">
          Back to previous page
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
