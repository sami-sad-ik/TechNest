import { FcGoogle } from "react-icons/fc";
import useAuth from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useAuth();
  const navigate = useNavigate();
  const handleGoogle = async () => {
    try {
      await googleSignIn();
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <div
      onClick={handleGoogle}
      className="flex justify-center items-center space-x-2 m-3 p-2 rounded-md hover:bg-zinc-200
      duration-200 active:shadow-none shadow-md cursor-pointer">
      <FcGoogle size={32} />

      <p>Continue with Google</p>
    </div>
  );
};

export default SocialLogin;
