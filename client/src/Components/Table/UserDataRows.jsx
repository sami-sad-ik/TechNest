import PropTypes from "prop-types";
import UpdateUserModal from "../Modal/UpdateUserModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";
const UserDataRows = ({ user, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      const { data } = await axiosSecure.patch(
        `/update-user/${user?.email}`,
        updateData
      );
      return data;
    },
  });

  const modalHandler = async (selected) => {
    const updateData = { role: selected };
    try {
      await mutateAsync(updateData);
      setIsOpen(false);
      toast.success(`${user?.email} is now ${selected}`);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.email}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{user?.role}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
          <span className="relative">Update Role</span>
        </span>
        {/* Update User Modal */}
        <UpdateUserModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          user={user}
          modalHandler={modalHandler}
          refetch={refetch}
        />
      </td>
    </tr>
  );
};

UserDataRows.propTypes = {
  user: PropTypes.object,
  refetch: PropTypes.func,
};

export default UserDataRows;
