import { BsTags } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { BiSolidUpArrow, BiUpArrow } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import useAuth from "../Hooks/useAuth";
import { useState } from "react";

const Card = ({ product }) => {
  const { user } = useAuth();
  const { _id, productImage, productName, tags, voters } = product;
  const [localVoter, setLocalVoter] = useState(voters || []);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const voted = localVoter?.includes(user?.email);
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.patch(`/vote/${id}`, {
        email: user?.email,
      });
      return data;
    },
  });
  const upvoteHandler = async () => {
    try {
      if (!user) return navigate("/login");
      if (voted) {
        setLocalVoter((prev) => prev.filter((email) => email !== user?.email));
      } else {
        setLocalVoter((prev) => [...prev, user?.email]);
      }
      await mutateAsync(_id);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Link
      to={`/product/${_id}`}
      className="p-3 flex justify-start items-center gap-6 shadow-lg rounded-2xl">
      <img
        src={productImage}
        alt="product image"
        className="w-24 h-24 rounded-lg object-cover"
      />
      <div className="flex-1">
        <h2 className="text-2xl font-semibold">{productName}</h2>
        <div className="mt-2 flex flex-wrap justify-start items-center md:gap-2 gap-1">
          <BsTags />
          {tags.map((tag, idx) => (
            <p key={idx} className="text-xs flex items-center font-semibold">
              <LuDot /> {tag?.text}
            </p>
          ))}
        </div>
      </div>
      <div
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          upvoteHandler();
        }}
        className="">
        <button
          className={`flex items-center justify-center border-2 hover:border-cyan-500 ${
            voted ? "border-cyan-500 text-cyan-500" : ""
          } transition-all duration-300 w-10 h-10 rounded-md`}>
          {voted ? <BiSolidUpArrow /> : <BiUpArrow />}
        </button>
      </div>
    </Link>
  );
};

export default Card;
