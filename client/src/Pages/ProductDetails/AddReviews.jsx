import toast from "react-hot-toast";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { ImSpinner8 } from "react-icons/im";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";

const AddReviews = ({ id, ownerEmail }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();
  const { mutateAsync: mutateReview } = useMutation({
    mutationFn: async (review) => {
      const { data } = await axiosSecure.post("/review", review);
      return data;
    },
    onSuccess: () => {
      toast.success("Review submitted successfully");
      queryClient.invalidateQueries("reviews");
    },
  });

  const handleReview = async (e) => {
    e.preventDefault();
    if (rating === 0) return toast.error("Please rate product first!");
    setLoading(true);
    const form = e.target;
    const comment = form.comment.value;
    const reviewerEmail = user?.email;
    const reviewer = user?.displayName;
    const reviewerImage = user?.photoURL;
    const productId = id;
    const reviewData = {
      comment,
      rating,
      reviewerEmail,
      reviewer,
      reviewerImage,
      productId,
    };
    try {
      if (ownerEmail === reviewerEmail) {
        return toast.error(`Can't review own product`);
      }
      await mutateReview(reviewData);
      form.reset();
      setRating(0);
    } catch (err) {
      setLoading(false);
      console.log(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-5 max-w-screen-lg mx-auto">
      <h2 className="text-center text-3xl font-semibold">
        Review this product
      </h2>
      <form onSubmit={handleReview}>
        <Rating
          className="w-fit mx-auto my-3"
          style={{ maxWidth: 150 }}
          value={rating}
          onChange={setRating}
          itemStyles={{
            itemShapes: ThinRoundedStar,
            itemStrokeWidth: 0,
            activeFillColor: "#facc15",
            inactiveFillColor: "#e5e7eb",
          }}
          isRequired
        />
        <div className="relative space-y-1 text-sm">
          <textarea
            placeholder="Add a comment"
            className="block rounded-md w-full h-24 px-4 py-3 text-gray-800 text-md border"
            name="comment"
          />

          <button
            type="submit"
            className="absolute bottom-2 right-2 flex justify-center items-center px-3 py-1 font-semibold bg-zinc-200
                    transform duration-300 hover:scale-[102%] rounded-md">
            {loading ? (
              <ImSpinner8 className="animate-spin m-auto mx-2" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddReviews;
