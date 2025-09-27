import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BsTags } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";

const Products = () => {
  const axiosPublic = useAxiosPublic();
  const { data: products = [] } = useQuery({
    queryKey: ["all-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/all-products");
      return data;
    },
  });
  return (
    <div className="w-11/12 mx-auto my-8 grid md:grid-cols-3 grid-cols-1 gap-1">
      {products.map(({ _id, productImage, productName, tags, description }) => (
        <Link
          to={`/product/${_id}`}
          key={_id}
          className="w-10/12 mx-auto p-3 space-y-3 flex flex-col shadow-md rounded-md">
          <div className="flex justify-center items-center ">
            <img
              src={productImage}
              alt="product image"
              className="w-sm h-56 object-cover rounded-md"
            />
          </div>
          <h2 className="text-2xl font-semibold">{productName}</h2>
          <div className="mt-2 flex flex-wrap justify-start items-center md:gap-2 gap-1">
            <BsTags />
            {tags.map((tag, idx) => (
              <p key={idx} className="text-xs flex items-center font-semibold">
                <LuDot /> {tag?.text}
              </p>
            ))}
          </div>
          <p className="font-medium text-zinc-600">
            {description.slice(0, 100) + "..."}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Products;
