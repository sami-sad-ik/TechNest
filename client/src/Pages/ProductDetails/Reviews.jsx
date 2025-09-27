import { useMutation, useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { toast } from "react-hot-toast";

const Reviews = ({ id }) => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/reviews/${id}`);
      return data;
    },
  });

  //delete review
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/review/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Review deleted successfully");
      refetch();
    },
  });
  const handleDeleteReview = async (id) => {
    try {
      await mutateAsync(id);
    } catch (err) {
      console.log(err.message);
      toast.error(err.message);
    }
  };

  if (reviews?.length > 0)
    return (
      <div className="my-5 max-w-screen-lg mx-auto">
        <h2 className="text-left text-2xl font-semibold">Reviews</h2>
        {reviews?.map((review) => (
          <div key={review?._id}>
            <div className=" flex flex-row items-start gap-5 my-3">
              <img
                className="md:w-11 md:h-11 w-10 h-10 my-1 object-cover rounded-full"
                alt="Avatar"
                src={review?.reviewerImage}
              />
              <div className="flex flex-col justify-start items-start flex-1">
                <h2
                  className="text-lg 
                font-semibold ">
                  {review?.reviewer}
                </h2>
                <div>
                  <Rating
                    className="w-fit mx-auto my-1"
                    style={{ maxWidth: 80 }}
                    value={review?.rating}
                    itemStyles={{
                      itemShapes: ThinRoundedStar,
                      itemStrokeWidth: 0,
                      activeFillColor: "#facc15",
                      inactiveFillColor: "#e5e7eb",
                    }}
                    readOnly
                  />
                </div>
                <p className="text-zinc-700">{review?.comment}</p>
              </div>
              {user?.email === review?.reviewerEmail && (
                <div tabIndex={0} className="relative inline-block group">
                  <button className="cursor-pointer hover:bg-zinc-200 p-1 rounded-full focus:outline-none">
                    <PiDotsThreeVerticalBold />
                  </button>

                  {/* Dropdown */}
                  <div
                    className=" hidden absolute right-0 mt-1 w-28 rounded-lg
                     bg-white shadow-lg group-focus-within:block">
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="block w-full text-left px-3 py-2 hover:bg-zinc-100 rounded-lg">
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
};

export default Reviews;
