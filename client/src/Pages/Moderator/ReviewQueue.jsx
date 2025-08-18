import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Components/Loading";
import ReviewRows from "../../Components/Table/ReviewRows";

const ReviewQueue = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: products = [],
    refetch,
    isPending,
    isFetching,
  } = useQuery({
    queryKey: ["products", user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const { data } = await axiosSecure.get("/products");
      return data;
    },
  });

  if (loading || isPending || isFetching) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen text-4xl text-zinc-400 font-semibold flex justify-center items-center">
        No products to review
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-medium">
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-medium">
                    Details
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-medium">
                    Feature
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-medium">
                    Accept
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-center text-sm uppercase font-medium">
                    Reject
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Table Row Data */}
                {products.map((product) => (
                  <ReviewRows
                    key={product._id}
                    product={product}
                    refetch={refetch}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewQueue;
