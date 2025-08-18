import PropTypes from "prop-types";
import { useState } from "react";
import DeleteModal from "../Modal/DeleteModal";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const MyProductRows = ({ product, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosSecure.delete(`/product/delete/${id}`);
      return data;
    },
    onSuccess: () => {
      closeModal();
      refetch();
      toast.success(` Product deleted successfully`);
    },
  });
  const handleDelete = async () => {
    try {
      await mutateAsync(product?._id);
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <p className="text-gray-900 whitespace-no-wrap">
            {product?.productName}
          </p>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{product?.vote}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{product?.status}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
          <span className="relative">Update</span>
        </span>
        {/* Update Modal */}
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => setIsOpen(true)}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"></span>
          <span className="relative">Delete</span>
        </span>
        {/* Delete modal */}
        <DeleteModal
          isOpen={isOpen}
          closeModal={closeModal}
          handleDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

MyProductRows.propTypes = {
  product: PropTypes.object,
  refetch: PropTypes.func,
};

export default MyProductRows;
