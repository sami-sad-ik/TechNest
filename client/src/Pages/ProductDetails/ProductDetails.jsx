import { Navigate, useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useMutation, useQuery } from "@tanstack/react-query";
import { BsTags } from "react-icons/bs";
import { BiSolidUpArrow, BiUpArrow } from "react-icons/bi";
import { LuDot } from "react-icons/lu";
import { useState } from "react";
import "@smastrom/react-rating/style.css";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useRole from "../../Hooks/useRole";
import AddReviews from "./AddReviews";
import Reviews from "./Reviews";

const ProductDetails = () => {
  const { user } = useAuth();
  const { role } = useRole();
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const axiosPublic = useAxiosPublic();

  const { data: product = {}, refetch } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/product/${id}`);
      return data;
    },
  });

  const [localVoter, setLocalVoter] = useState(product?.voters || []);
  const voted = localVoter?.includes(user?.email);
  //upvoting
  const { mutateAsync: mutateVote } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/vote/${id}`, {
        email: user?.email,
      });
      return data;
    },
    onSuccess: () => {
      refetch();
    },
  });
  const upvoteHandler = async () => {
    try {
      if (!user) return Navigate("/login");
      if (role !== "guest") return toast.error("only guest can upvote");
      if (voted) {
        setLocalVoter((prev) => prev.filter((email) => email !== user?.email));
      } else {
        setLocalVoter((prev) => [...prev, user?.email]);
      }
      await mutateVote(id);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="px-8">
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-6">
          <div>
            <h2 className="my-5 md:text-5xl text-3xl  font-lilita">
              {product?.productName}
            </h2>
            <div className="w-full md:h-[65vh] overflow-hidden rounded-xl">
              <img
                className="object-cover w-full"
                src={product?.productImage}
                alt="header image"
              />
            </div>
          </div>
        </div>
        <div className=" md:gap-10 mt-6">
          {/* Room Info */}
          <div className="col-span-4 flex flex-col gap-8">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-2">
                <div
                  className="
                text-xl 
                font-semibold 
                flex 
                flex-row 
                items-center
                gap-2
              ">
                  <div>Added by {product?.owner?.name}</div>

                  <img
                    className="md:w-10 md:h-10 w-9 h-9 object-cover rounded-full"
                    alt="Avatar"
                    src={product?.owner?.image}
                  />
                </div>
                <div
                  className="
                flex 
                flex-row 
                items-center 
                gap-4 
                font-light
                text-neutral-500
              ">
                  <p className="pt-1">
                    <BsTags />
                  </p>
                  {product?.tags?.map((tag, idx) => (
                    <div key={idx} className=" flex items-center font-semibold">
                      {tag?.text}
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={upvoteHandler}
                className={`md:px-4 md:py-2 px-2 py-1 flex cursor-pointer items-center justify-center gap-1  ${
                  voted ? "border-cyan-500 text-cyan-500" : ""
                } md:border-2 border hover:border-cyan-500 transition-all duration-300 rounded-full`}>
                {voted ? <BiSolidUpArrow /> : <BiUpArrow />}
                <p className="flex items-center font-semibold md:text-xl text-base">
                  Upvote <LuDot /> {product?.vote}
                </p>
              </button>
            </div>
            <hr />
            <div
              className="
          text-lg font-light text-neutral-500">
              {product?.description}
            </div>
            <hr />
          </div>
        </div>
      </div>
      <Reviews id={id} />
      <AddReviews />
    </div>
  );
};

export default ProductDetails;
