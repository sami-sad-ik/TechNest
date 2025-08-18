import { MdReviews } from "react-icons/md";
import MenuItem from "./MenuItem";

const ModeratorItems = () => {
  return (
    <div>
      <MenuItem
        icon={MdReviews}
        address={"/dashboard/review-queue"}
        label={"Review Queue"}
      />
    </div>
  );
};

export default ModeratorItems;
