import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { BsTags } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { Link } from "react-router-dom";
import Loading from "../../Components/Loading";
import { useState } from "react";

const Products = () => {
  const [searchText, setSearchText] = useState("");
  const axiosPublic = useAxiosPublic();
  const { data: products = [], isLoading } = useQuery({
    queryKey: ["all-products", searchText],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/all-products?search=${searchText}`
      );
      return data;
    },
  });
  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.search.value;
    setSearchText(searchInput);
  };
  if (isLoading) return <Loading />;
  return (
    <div>
      <h2 className="text-3xl font-semibold text-center mt-3">
        All Products here
      </h2>
      <form onSubmit={handleSearch} className="w-fit mx-auto">
        <input
          className="rounded-l-full px-4 py-2 mt-2 bg-base-300 border border-gray-400 rounded-md focus:outline-none"
          type="text"
          placeholder="Search"
          name="search"
        />
        <input
          className="bg-cyan-500 text-white px-4 py-2 rounded-r-full hover:bg-cyan-600 transition-colors duration-200 cursor-pointer border border-cyan-500"
          type="submit"
          value="search"
        />
      </form>
      <div className="w-11/12 mx-auto my-8 grid md:grid-cols-3 grid-cols-1 gap-3">
        {products.map(
          ({ _id, productImage, productName, tags, description }) => (
            <Link
              to={`/product/${_id}`}
              key={_id}
              className="w-10/12 mx-auto p-3 space-y-3 flex flex-col shadow-md rounded-md transition-all transform duration-200 hover:scale-[102%]">
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
                  <p
                    key={idx}
                    className="text-xs flex items-center font-semibold">
                    <LuDot /> {tag?.text}
                  </p>
                ))}
              </div>
              <p className="font-medium text-zinc-600">
                {description.slice(0, 100) + "..."}
              </p>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Products;
