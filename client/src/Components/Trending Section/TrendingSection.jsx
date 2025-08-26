import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import SectionTitle from "../SectionTitle";
import Card from "../Card";

const TrendingSection = () => {
  const axiosPublic = useAxiosPublic();

  const { data: products = [] } = useQuery({
    queryKey: ["trending-products"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/trending-products");
      return data;
    },
  });
  return (
    <div className="w-11/12 mx-auto">
      <SectionTitle
        title={"Trending Products"}
        paragraph={"See the the trending products here"}
      />
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-3">
        {products.map((product) => (
          <Card key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default TrendingSection;
