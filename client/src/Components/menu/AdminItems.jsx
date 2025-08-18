import MenuItem from "./MenuItem";
import { FaUsers } from "react-icons/fa";

const AdminItems = () => {
  return (
    <div>
      <MenuItem
        icon={FaUsers}
        address={"/dashboard/manage-users"}
        label={"Manage Users"}
      />
    </div>
  );
};

export default AdminItems;
