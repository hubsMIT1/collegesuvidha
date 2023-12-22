import { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
// Changed it, after the api of products....
const ProductList = (props) => {
  // console.log(props)
  const [currentPage, setCurrentPage] = useState(props?.currentPage || 1);
  const itemsPerPage = 18;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const { productData } = useSelector((state) => state.productData);
  const [currentItems, setCurrentItems] = useState();

  useEffect(() => {
    setCurrentItems(productData);
  }, [productData]);

  // console.log(useSelector((state) => state.productData))
  // console.log(productData);
  // useEffect(() => {
  //   if (props?.pagi === true)
  //   setCurrentItems(productData?.slice(
  //     indexOfFirstItem,
  //     indexOfLastItem
  //   ));
  // else setCurrentItems(productData);

  // }, [props?.filteredProductList, currentPage,indexOfFirstItem,indexOfLastItem,props?.pagi,productData]);

  const totalPages = props?.totalPages;
  console.log(totalPages, productData);
  const handlePageChange = (page) => {
    props.setPage(page);
  };
  useEffect(() => {
    setCurrentPage(props?.currentPage);
  }, [props?.currentPage]);
  if (props?.loading) return <>Loading</>;
  // console.log(currentItems,props?.filteredProductList)
  return (
    <>
      <div className="bg-white pb-4">
        <div className="mx-auto max-w-2xl px-2 py-8 sm:px-0 sm:py-3 lg:max-w-7xl lg:px-2">
          <div className="mt-1 grid  grid-cols-1 gap-x-4 gap-y-10  sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 relative">
            {currentItems?.length > 0 &&
              currentItems?.map((product, index) => (
                <div
                  key={index + 1}
                  className="group min-h-[150px] relative max-h-[300px] xl:min-w-[200px] xm:flex xm:justify-cneter"
                >
                  <Link
                    to={`/productDetails/${product?._id}/${index}`}
                    target="_blank"
                  >
                    <div className="aspect-h-1 aspect-w-1  flex justify-center overflow-hidden min-h-[200px] bg-gray-200 lg:aspect-none group-hover:opacity-75  border border-gray-400 rounded-t-md">
                      <img
                        src={product?.images[0]}
                        alt="{product.imageAlt}"
                        className="h-[200px] md:h-[150px] object-cover object-center lg:h-[200px] "
                      />
                    </div>
                  </Link>
                  <Link
                    to={`/productDetails/${product?.title}?id=${product?._id}`}
                  >
                    <div className=" flex justify-between border border-gray-400 rounded-b-md border-t-0 p-2 ">
                      <div>
                        <h3 className="text-sm text-gray-700">
                          <span
                            aria-hidden="true"
                            className="text-lg font-bold text-black truncate block"
                          >
                            {product?.title.length > 20
                              ? product?.title.substring(0, 20) + ".."
                              : product?.title}
                          </span>
                        </h3>
                        <p className=" text-sm text-gray-500">
                          {product?.category}
                        </p>
                      </div>
                      <p className="text-md font-bold  text-green-600">
                        ₹ {product?.price}
                      </p>
                    </div>
                  </Link>
                  {props?.isFeatured && (
                    <span className="absolute top-0 left-0 bg-yellow-100 px-2 py-1 m-2 rounded z-10">
                      Featured
                    </span>
                  )}
                </div>
              ))}
          </div>
          {props.viewBtn && (
            <Link to={`/allproducts`}>
              <div className="flex justify-center mt-5">
                <Button className="ml-1 text-xs text-white xl:text-sm font-bold bg-cs-textHdClr ">
                  Click to View More...
                </Button>
              </div>
            </Link>
          )}
          {props?.pagi && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
