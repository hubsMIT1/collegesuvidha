import { useState, useEffect } from "react";
import { PencilIcon } from "@heroicons/react/24/solid";
// import { Switch, FormControlLabel, Select, MenuItem } from '@material-ui/core';

import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  Option,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Avatar,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import {
  getProductsByUserId,
  updateProduct,
  updateProductStatus,
} from "../../services/product_service";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../Pagination";
import { formatDistanceToNow, format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";

const TABLE_HEAD = [
  "S NO.",
  "Product Name",
  "Expiration Data",
  "Uploaded Date",
  "Status",
  "Featured",
  "Edit",
  "Delete",
];

export function AdminProductList() {
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [err, setError] = useState(null);
  const [page, setPage] = useState(1);

  const { userData } = useSelector((state) => state.user);
  const { isAuthenticated, accessToken, refreshToken, userId } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  console.log(userData)
  const itemsPerPage = 18;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  // const totalPages = props?.totalPages
  // console.log(totalPages)
  const handlePageChange = (page) => {
    setPage(page);
  };
  useEffect(() => {
    setCurrentPage(currentPage);
  }, [currentPage]);
  const handleGetProducts = async () => {
    setLoading(true);
    // console.log("getProduts called")
    try {
      let data;

      data = await getProductsByUserId(
        currentPage,
        userId,
        accessToken,
        refreshToken,
        dispatch
      );

      if (data.status === 200) {
        console.table(data.data.products);
        setProductList(data.data.products);
        // console.log(data.data.totalPages);
        setTotalPage(data.data.totalPages);
        // setProductStore(data.data.products, dispatch);
      } else setError(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, [currentPage]); //selectedCategories,currentPage
  const navigate = useNavigate();

  const handleEditProduct = (product) => {
    const editUrl = `/addproduct?edit=${product?._id}`;
    navigate(editUrl, { state: { product } });
  };

  const [editedProduct, setEditedProduct] = useState({
    isPublish: 0,
    isFeatured: false,
  });

  const handlePublishStatusChange = async (e, id) => {
    // const newPublishStatus = parseInt(event.target.value, 10);
    console.log(e, editedProduct, id);
    await updateProductStatus(
      id,
      "status",
      e,
      userId,
      accessToken,
      refreshToken,
      dispatch
    )
      .then((res) => {
        if (res.status === 200) {
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            isPublish: res?.data?.status,
          }));
          console.log("Status changed successfully");
        } else {
          console.log(res?.message);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error?.message);
      });
  };

  const handleFeaturedChange = async (event, id, index) => {
    const newIsFeatured = event.target.checked;
    // console.log(e,editedProduct,id)
    await updateProductStatus(
      id,
      "featured",
      newIsFeatured,
      userId,
      accessToken,
      refreshToken,
      dispatch
    )
      .then((res) => {
        // console.log(res)
        if (res.status === 200) {
          setEditedProduct((prevProduct) => ({
            ...prevProduct,
            isFeatured: res?.data?.status,
          }));
          setProductList((prevProd) => {
            const updatedProductList = [...prevProd];
            const updatedProduct = {
              ...updatedProductList[index],
              isFeatured: res?.data?.status,
            };
            updatedProductList[index] = updatedProduct;
            return updatedProductList;
          });

          console.log("Feature changed successfully");
        } else {
          console.log(res?.message);
        }
      })
      .catch((error) => {
        console.error("Error updating product:", error?.message);
      });

    console.log(newIsFeatured, editedProduct);

    // Call your update function or dispatch action here
    // e.g., updateProductIsFeatured(newIsFeatured);
  };
  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Your Listing Products
            </Typography>
            {/* <Typography color="gray" className="mt-1 font-normal">
              These are details about the last transactions
            </Typography> */}
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, key) => (
                <th
                  key={key}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {productList?.map((product, index) => {
              const isLast = index === productList?.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={index + "1"}>
                  <td className={classes}>{index+1}</td>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      {/* <Avatar
                          src={img}
                          alt={name}
                          size="md"
                          className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
                        /> */}
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-bold"
                      >
                        <Link
                          to={`/product-details/${product?._id}?index${index}`}
                          target="_blank"
                        >
                          {" "}
                          {product?.title?.slice(0, 10)}{" "}
                          {product?.title?.length > 10 ? "..." : ""}
                        </Link>
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {format(new Date(product?.createdAt), "d/MM/yyyy")}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {format(new Date(product?.updatedAt), "d/MM/yyyy")}
                    </Typography>
                  </td>
                  <td className="p-1">
                    <div className="w-min">
                      <Select
                        value={product?.isPublish}
                        onChange={(e) =>
                          handlePublishStatusChange(e, product?._id)
                        }
                        size="md"
                      >
                        <Option value={0}>Pending</Option>
                        <Option value={1}>Published</Option>
                        <Option value={-1}>Cancelled</Option>
                      </Select>
                    </div>
                  </td>

                  <td>
                    <Switch
                      checked={product?.isFeatured}
                      onChange={(e) =>
                        handleFeaturedChange(e, product?._id, index)
                      }
                      color="secondary"
                    />
                  </td>
                  <td className={classes}>
                    <Tooltip content="Edit Product">
                      <Link
                        to={`/addproduct?edit=${product?._id}`}
                        state={{ editProduct: product }}
                      >
                        <IconButton variant="text">
                          <PencilIcon className="h-4 w-4" />
                        </IconButton>{" "}
                      </Link>
                    </Tooltip>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete Product">
                      <IconButton variant="text">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                          />
                        </svg>
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </Card>
  );
}
