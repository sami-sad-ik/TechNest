import { FaUser } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { BsFillBagPlusFill } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";

const GuestItems = () => {
  return (
    <div>
      <MenuItem
        icon={FaUser}
        address={"/dashboard/my-profile"}
        label={"My Profile"}
      />
      <MenuItem
        icon={BsFillBagPlusFill}
        address={"/dashboard/add-product"}
        label={"Add Product"}
      />
      <MenuItem
        icon={CiViewList}
        address={"/dashboard/my-products"}
        label={"My Products"}
      />
    </div>
  );
};

export default GuestItems;
