import spinner from "../assets/spinner.gif";

const Loading = () => {
  return (
    <div className="min-h-screen w-full flex justify-center items-center">
      <img className="w-24 h-24" src={spinner} alt="" />
    </div>
  );
};

export default Loading;
