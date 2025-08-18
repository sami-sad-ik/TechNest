import { Link, useLocation, useNavigate } from "react-router-dom";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import useAuth from "../../Hooks/useAuth";
import SocialLogin from "../../Components/SocialLogin";
import { ImSpinner8 } from "react-icons/im";
import toast from "react-hot-toast";
import { useState } from "react";

const Login = () => {
  const [showPass, setShowPass] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { loginUser } = useAuth();
  const location = useLocation();
  const from = location.state?.from?.pathname || location.state?.from || "/";
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    try {
      await loginUser(email, password);
      toast.success("Successfully logged in");
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col max-w-md p-6 rounded-md sm:p-10 bg-gray-100 text-gray-900">
        <div className="mb-8 text-center">
          <h1 className="my-3 text-4xl font-bold">Log In</h1>
          <p className="text-sm text-gray-400">
            Sign in to access your account
          </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="space-y-6 ng-untouched ng-pristine ng-valid">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm">
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                required
                placeholder="Enter Your Email Here"
                className="w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-200 text-gray-900"
                data-temp-mail-org="0"
              />
            </div>
            <div>
              <div className="flex justify-between">
                <label htmlFor="password" className="text-sm mb-2">
                  Password
                </label>
              </div>
              <div className="relative">
                <input
                  type={showPass ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  id="password"
                  required
                  placeholder="*******"
                  className=" w-full px-3 py-2 border rounded-md border-gray-300 focus:outline-cyan-500 bg-gray-200 text-gray-900"
                />
                <span
                  onClick={() => setShowPass(!showPass)}
                  className="absolute top-3 right-2">
                  {showPass ? <VscEye /> : <VscEyeClosed />}
                </span>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="bg-cyan-500 w-full rounded-md py-3 text-white">
              {isLoading ? (
                <ImSpinner8 className="animate-spin m-auto" />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        <div className="space-y-1">
          <button className="text-xs hover:underline hover:text-rose-500 text-gray-400">
            Forgot password?
          </button>
        </div>
        <div className="flex items-center pt-4 space-x-1">
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
          <p className="px-3 text-sm dark:text-gray-400">
            Login with social accounts
          </p>
          <div className="flex-1 h-px sm:w-16 dark:bg-gray-700"></div>
        </div>
        <SocialLogin />
        <p className="px-6 text-sm text-center text-gray-400">
          Don&apos;t have an account yet?{" "}
          <Link
            to="/signup"
            className="hover:underline hover:text-rose-500 text-gray-600">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
