import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

const useAxiosSecure = () => {
  const { signOutUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    axiosSecure.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error) => {
        console.log("Error tracked in the interceptor");
        if (
          error?.response?.status === 401 ||
          error?.response?.status === 403
        ) {
          await signOutUser();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [signOutUser, navigate]);
  return axiosSecure;
};

export default useAxiosSecure;
