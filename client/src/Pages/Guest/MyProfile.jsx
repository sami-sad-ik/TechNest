import { useState } from "react";
import PaymentModal from "../../Components/PaymentModal";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import { IoDiamond } from "react-icons/io5";

const MyProfile = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  const closeModal = () => {
    setIsPaymentOpen(false);
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className=" bg-white shadow-lg rounded-2xl md:w-3/5 px-5">
        <img
          alt="profile"
          src="https://wallpapercave.com/wp/wp10077040.jpg"
          className="w-full mb-4 rounded-t-lg h-36 object-cover"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL}
              className="mx-auto object-cover rounded-full h-24 w-24  border-2 border-white "
            />
          </a>

          <p className="p-2 px-4 capitalize text-xs text-white font-bold bg-cyan-600 rounded-full">
            {role}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800 ">
            User Id: {user?.uid}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex justify-center items-center">
              <button
                onClick={() => setIsPaymentOpen(true)}
                className="flex justify-center items-center gap-1 bg-yellow-600 px-8 py-2 rounded-lg text-white cursor-pointer hover:bg-yellow-700 duration-200 transform  mb-1">
                <IoDiamond />
                Membership Subscribe
              </button>
              {/* payment modal */}
              <PaymentModal closeModal={closeModal} isOpen={isPaymentOpen} />
            </div>
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600 ">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black ">
                  {user?.displayName}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black ">{user?.email}</span>
              </p>

              <div className="my-3">
                <button className="bg-cyan-500 px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-cyan-600 duration-200 transform block mb-1">
                  Update Profile
                </button>
                <button className="bg-cyan-500 px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-cyan-600 duration-200 transform">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
