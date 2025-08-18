import { useParams } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import { BsTags } from "react-icons/bs";
import { BiUpArrow } from "react-icons/bi";
import { LuDot } from "react-icons/lu";

const RoomDetails = () => {
  const { id } = useParams();
  const axiosPublic = useAxiosPublic();

  const { data: product = {} } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/product/${id}`);
      return data;
    },
  });

  return (
    <div className="px-8">
      {product && (
        <div className="max-w-screen-lg mx-auto">
          {/* Header */}
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="my-5 md:text-5xl text-3xl font-semibold">
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
              <div className="flex justify-between items-center">
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
                      className="rounded-full"
                      height="30"
                      width="30"
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
                      <div
                        key={idx}
                        className=" flex items-center font-semibold">
                        {tag?.text}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="px-4 py-2 flex items-center justify-center gap-1 text-white bg-cyan-400 rounded-full">
                  <BiUpArrow />
                  <p className="flex items-center font-semibold text-xl">
                    Upvote <LuDot /> {product?.vote}
                  </p>
                </div>
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
      )}
    </div>
  );
};

export default RoomDetails;
