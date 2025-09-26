import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";

const Reviews = ({ id }) => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(`/reviews/${id}`);
      return data;
    },
  });

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
              <div className="flex flex-col justify-start items-start">
                <h2
                  className="text-lg 
                font-semibold ">
                  {review?.reviewer}{" "}
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
            </div>
          </div>
        ))}
      </div>
    );
};

export default Reviews;
