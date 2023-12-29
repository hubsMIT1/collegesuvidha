import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProduct, updateProduct } from "../services/product_service";
import { useLocation, useNavigate } from "react-router-dom";
import { categories } from "../utils/constants";

function ProductForm(props) {
  const location = useLocation();
  let { editProduct } = location?.state || {};
  // console.log(editProduct);

  const initialValues = {
    title: editProduct?.title || "",
    description: editProduct?.description || "",
    category: editProduct?.category || "",
    price: editProduct?.price || "",
    quantity: editProduct?.quantity || "",
    address: editProduct?.address || "",
    zipCode: editProduct?.zipCode || "",
    images: editProduct?.images || [],
  };

  const [productData, setProductData] = useState(initialValues);

  const [uploadedImages, setUploadedImages] = useState(productData?.images);
  // const { userData } = useSelector((state) => state.user);
  const { accessToken, refreshToken, userId } = useSelector(
    (state) => state.auth
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };
  const dispatch = useDispatch();
  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setProductData((prevData) => ({ ...prevData, category }));
  };

  const handleImageUpload = (e) => {
    const selectedImages = Array.from(e.target.files);
    Promise.all(selectedImages.map(fileToBase64))
      .then((base64Images) => {
        setProductData((prevData) => ({
          ...prevData,
          images: [...prevData.images, ...base64Images],
        }));
      })
      .catch((error) => {
        console.error("Error converting images to base64:", error);
      });
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = (error) => {
        reject(error);
      };

      reader.readAsDataURL(file);
    });
  };
  const handleRemoveImage = (index) => {
    const updatedImages = [...productData?.images];
    updatedImages.splice(index, 1);

    setProductData((prevData) => ({
      ...prevData,
      images: updatedImages,
    }));
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      if (key === "images") {
        // Handle images as an array of file objects
        value.forEach((image, index) => {
          formData.append(`imagess`, image);
        });
      } else if (value?.trim() !== "") {
        formData.append(key, value);
      }
    });
    // console.log(formData);

    await createProduct(formData, userId, accessToken, refreshToken, dispatch)
      .then((res) => {})
      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleProductUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(productData).forEach(([key, value]) => {
      // console.log(value);
      if (key === "images") {
        // Handle images as an array of file objects
        value.forEach((image, index) => {
          formData.append(`imagess`, image);
        });
      } else if (value && String(value)?.trim() !== "") {
        formData.append(key, value);
      }
    });

    await updateProduct(
      editProduct._id,
      formData,
      userId,
      accessToken,
      refreshToken,
      dispatch
    )
      .then((updatedProduct) => {
        if (updatedProduct.status === 200) {
          navigate(`/product-details/${updatedProduct?.data?._id}`);
          editProduct = null;
          location.state = null;
          setProductData(initialValues);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error);
      });
    setUploadedImages([]);
  };

  return (
    <div className="flex flex-col xl:p-10 font-sans-serif items-center justify-center max-w-[1500px] m-auto">
      <div className="relative h-auto bg-white rounded-lg shadow-lg w-4/5">
        <div className=" border-b-2 text-center">
          <h1 className="text-3xl m-4 font-bold text-cs-textHdClr">
            Add New Product
          </h1>
        </div>
        <div className="relative p-4">
          <form
            className="relative"
            onSubmit={editProduct?._id ? handleProductUpdate : handleSubmit}
          >
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="title"
              >
                Product Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={productData.title}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={productData.description}
                onChange={handleInputChange}
                className="border-2 rounded h-32 px-6 py-3 text-lg text-cs-textHdClr focus:outline-none focus:ring focus:border-blue-300"
                autoComplete="off"
                required
              />
            </div>

            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="category"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={productData.category}
                onChange={handleCategoryChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                required
              >
                <option value="">Select Category</option>
                {categories?.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            {/* Price */}
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="price"
              >
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={productData.price}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                required
              />
            </div>

            {/* Quantity */}
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="quantity"
              >
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={productData?.quantity}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                required
              />
            </div>

            {/* Address */}
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="address"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={productData.address}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                // required
              />
            </div>

            {/* Zip Code */}
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="zipCode"
              >
                Zip Code
              </label>
              <input
                type="text"
                id="zipCode"
                name="zipCode"
                value={productData.zipCode}
                onChange={handleInputChange}
                className="block w-full px-4 py-2 mt-2 text-cs-textHdClr bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
                autoComplete="off"
                // required
              />
            </div>
            <div className="mb-4 pt-0 flex flex-col">
              <label
                className="mb-2 text-gray-800 text-lg font-light"
                htmlFor="images"
              >
                Product Images
              </label>
              <input
                type="file"
                id="images"
                name="images"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="flex flex-col items-center justify-center border-4 border-gray-300 border-dashed rounded h-36 px-6 text-lg text-cs-textHdClr focus:outline-none focus:ring focus:border-blue-300 cursor-pointer"
              >
                Drag and Drop or upload
              </label>
              <p className="py-2 text-cs-textHdClr">Upload png or jpg only </p>
            </div>
            <div className="flex flex-wrap gap-4">
              {productData?.images?.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Product Image ${index + 1}`}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(index)}
                    className="absolute top-0 right-0 p-1 bg-red-500 rounded-full text-white cursor-pointer"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
            <div className="rel pt-0 flex flex-col p-4 w-full">
              <input
                type="submit"
                value={editProduct?._id ? `Update` : `Add`}
                className="w-full cursor-pointer px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-700 rounded-md hover:bg-purple-600 focus:outline-none focus:bg-purple-600"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ProductForm;
