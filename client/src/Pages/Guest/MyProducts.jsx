import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import MyProductRows from "../../Components/Table/MyProductRows";
import Loading from "../../Components/Loading";

const MyProducts = () => {
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
      const { data } = await axiosSecure.get(`/products/${user?.email}`);
      return data;
    },
  });

  if (loading || isPending || isFetching) {
    return <Loading />;
  }

  if (products.length === 0) {
    return (
      <div className="min-h-screen text-4xl text-zinc-400 font-semibold flex justify-center items-center">
        No products added by you
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
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium">
                    Product Name
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium">
                    Votes
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium">
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium">
                    Action
                  </th>

                  <th
                    scope="col"
                    className="px-5 py-3 bg-white  border-b border-gray-200 text-gray-800  text-left text-sm uppercase font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* Table Row Data */}
                {products.map((product) => (
                  <MyProductRows
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

export default MyProducts;
