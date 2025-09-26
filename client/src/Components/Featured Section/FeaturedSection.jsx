import SectionTitle from "../SectionTitle";
import Card from "../Card";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const FeaturedSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [], refetch } = useQuery({
    queryKey: ["featured-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/featured-products");
      return data;
    },
  });

  if (products?.length > 0)
    return (
      <div className="w-11/12 mx-auto">
        <SectionTitle
          title={"Featured Products"}
          paragraph={"See the the featured products here"}
        />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
          {products.map((product) => (
            <Card key={product._id} product={product} refetch={refetch} />
          ))}
        </div>
      </div>
    );
};

export default FeaturedSection;
