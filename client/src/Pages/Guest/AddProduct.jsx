import { ImSpinner8 } from "react-icons/im";
import { imageUpload } from "../../utils/imageUpload";
import useAuth from "../../Hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useState } from "react";
import { WithContext as ReactTags, SEPARATORS } from "react-tag-input";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [imgPreview, setImgPreview] = useState(null);
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);
  const [imgText, setImgText] = useState("Upload Image");
  const [loading, setLoading] = useState(false);
  const { mutateAsync } = useMutation({
    mutationFn: async (product) => {
      const { data } = await axiosSecure.post("/product", product);
      return data;
    },
    onSuccess: () => {
      toast.success("Product added successfully");
      setLoading(false);
    },
  });

  const handleImage = (image) => {
    setImgPreview(URL.createObjectURL(image));
    setImgText(image.name);
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    const form = e.target;
    const productName = form.productname.value;
    const image = form.image.files[0];
    const productImage = await imageUpload(image);
    const vote = 0;
    const status = "pending";
    const description = form.description.value;
    const timeStamp = new Date();
    const owner = {
      name: user?.displayName,
      email: user?.email,
      image: user?.photoURL,
    };
    if (tags.length === 0) {
      setLoading(false);
      return setTagError(true);
    }
    const product = {
      productName,
      productImage,
      vote,
      status,
      description,
      tags,
      owner,
      timeStamp,
    };
    try {
      await mutateAsync(product);
      navigate("/dashboard/my-products");
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      {/* <Helmet>
        <title>Add Room | Dashboard</title>
      </Helmet> */}
      <div className="md:w-full w-10/12 mx-auto min-h-[calc(100vh-40px)] py-3 flex flex-col justify-center items-center text-gray-800 rounded-xl">
        <form onSubmit={handleAddProduct} className="md:w-3/5 mx-auto">
          <div className="w-full flex flex-col md:flex-row gap-3 space-y-6">
            <div className="w-full space-y-1 text-sm">
              <label htmlFor="productname" className="block text-gray-600">
                Product Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-cyan-200 focus:outline-cyan-300 rounded-md "
                name="productname"
                id="productname"
                type="text"
                placeholder="Product Name"
                required
              />
            </div>
          </div>
          <div className="space-y-6">
            <div className=" py-4 bg-white w-full  m-auto rounded-lg">
              <div className="file_upload flex justify-between items-center px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) => handleImage(e.target.files[0])}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      required
                      hidden
                    />
                    <div className="bg-cyan-800 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-cyan-900">
                      {imgText.length > 12
                        ? imgText.split(".")[0].slice(0, 12) +
                          "... ." +
                          imgText.split(".")[1]
                        : imgText}
                    </div>
                  </label>
                </div>
                <div className="w-10 h-10 object-cover overflow-hidden flex items-center">
                  {imgPreview && <img src={imgPreview} />}
                </div>
              </div>
            </div>

            <div className="w-full flex flex-col md:flex-row gap-3 space-y-6">
              <div className="w-full space-y-1 text-sm">
                <label htmlFor="productname" className="block text-gray-600">
                  Tags
                </label>
                <ReactTags
                  tags={tags}
                  placeholder="tags"
                  separators={[SEPARATORS.ENTER, SEPARATORS.COMMA]}
                  handleAddition={(tag) => setTags([...tags, tag])}
                  handleDelete={(i) =>
                    setTags(tags.filter((_, tag) => tag !== i))
                  }
                  inputFieldPosition="top"
                  maxTags={3}
                  classNames={{
                    tag: "react-tags__tag inline-flex items-center gap-1 bg-cyan-200 text-cyan-800 rounded px-2 py-1",
                    tagInputField:
                      "border border-cyan-200 rounded-md px-4 py-3 text-gray-800 w-full focus:outline-cyan-300 w-full",
                  }}
                />
                {tagError && <p className="text-red-500">Please input a tag</p>}
              </div>
            </div>
            <div>
              <label className="block my-2 text-gray-600">Owner Info :</label>
              <div className="w-full flex justify-between gap-2">
                <div className="w-full space-y-1 text-sm">
                  <label htmlFor="name" className="block text-gray-600">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-cyan-200 focus:outline-cyan-300 rounded-md "
                    name="username"
                    id="name"
                    defaultValue={user?.displayName}
                    readOnly
                    type="text"
                    placeholder="Name"
                  />
                </div>

                <div className="w-full space-y-1 text-sm">
                  <label htmlFor="email" className="block text-gray-600">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 text-gray-800 border border-cyan-200 focus:outline-cyan-300 rounded-md "
                    name="email"
                    id="email"
                    defaultValue={user?.email}
                    readOnly
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>

              <textarea
                id="description"
                className="block rounded-md focus:cyan-border-cyan-200 w-full h-32 px-4 py-3 text-gray-800  border border-cyan-200 focus:outline-cyan-300 "
                name="description"></textarea>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="disabled:cursor-not-allowed w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-cyan-800 hover:bg-cyan-900">
            {loading ? (
              <ImSpinner8 className="animate-spin m-auto" />
            ) : (
              "Save & Continue"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddProduct;
