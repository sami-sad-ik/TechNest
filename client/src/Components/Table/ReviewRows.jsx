import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MultiModal from "../Modal/MultiModal";
import { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ReviewRows = ({ product, refetch }) => {
  const [isModalInfo, setIsModalInfo] = useState({ open: false, status: "" });
  const axiosSecure = useAxiosSecure();
  const { mutateAsync } = useMutation({
    mutationFn: async (updateData) => {
      const { data } = await axiosSecure.patch(
        `/product/action/${product?._id}`,
        updateData
      );
      return data;
    },
  });
  const openModal = (status) => {
    setIsModalInfo({ open: true, status });
  };

  const closeModal = () => {
    setIsModalInfo({ open: false, status: "" });
  };

  const handleAction = async () => {
    const updateData = { status: isModalInfo?.status };
    try {
      await mutateAsync(updateData);
      closeModal();
      if (isModalInfo?.status === "featured")
        toast.success(`successfully added to featured`);
      if (isModalInfo?.status === "accepted")
        toast.success(`successfully accepted the product`);
      if (isModalInfo?.status === "rejected")
        toast.success(`Rejected the product `);
      refetch();
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <>
      <tr>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <p className="text-gray-900 font-semibold whitespace-no-wrap">
            {product?.productName}
          </p>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <Link
            to={`/product/${product?._id}`}
            className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight whitespace-nowrap">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-amber-500 opacity-50 rounded-full"></span>
            <span className="relative inset-0">View Details</span>
          </Link>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <button
            onClick={() => openModal("featured")}
            disabled={product?.status === "featured"}
            className="relative cursor-pointer group disabled:cursor-not-allowed inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-emerald-300 opacity-50 group-disabled:bg-zinc-500 rounded-full"></span>
            <span className="relative">
              {product?.status === "featured" ? "Featured" : "Feature"}
            </span>
          </button>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <button
            onClick={() => openModal("accepted")}
            disabled={product?.status === "accepted"}
            className="relative cursor-pointer group disabled:cursor-not-allowed inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-green-400 opacity-50 group-disabled:bg-zinc-500 rounded-full"></span>
            <span className="relative">
              {product?.status === "accepted" ? "Accepted" : "Accept"}
            </span>
          </button>
        </td>
        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center">
          <button
            onClick={() => openModal("rejected")}
            disabled={product?.status === "rejected"}
            className="relative cursor-pointer group disabled:cursor-not-allowed inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-red-200 opacity-50 group-disabled:bg-zinc-500 rounded-full"></span>
            <span className="relative">
              {product?.status === "rejected" ? "Rejected" : "Reject"}
            </span>
          </button>
          {/* multi functional modal */}
          <MultiModal
            handleAction={handleAction}
            isOpen={isModalInfo?.open}
            closeModal={closeModal}
            status={isModalInfo?.status}
          />
        </td>
      </tr>
    </>
  );
};

ReviewRows.propTypes = {
  product: PropTypes.object,
  refetch: PropTypes.func,
};

export default ReviewRows;
