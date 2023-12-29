import React, { Fragment, useEffect, useState } from "react";
import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import ProductList from "./ProductList";
import { callApi } from "../utils/CallApi";
import { getProducts, getProductsByUserId } from "../services/product_service";
import { useDispatch, useSelector } from "react-redux";
import { setProductData } from "../redux/productData/productAction";
import { categories } from "../utils/constants";
import { Link, useParams } from "react-router-dom";
import { setProductStore } from "../redux/allAction";
import { useNavigate, useLocation } from "react-router-dom";

const sortOptions = [
  //   { name: 'Most Popular', href: '#', current: true },
  {
    name: "Featured",
    href: "featured",
    current: false,
    id: "isFeatured",
    order: -1,
  },

  {
    name: "Best-Rating",
    href: "best-rating",
    current: false,
    id: "rating",
    order: -1,
  },

  {
    name: "Newest",
    href: "newest",
    current: false,
    id: "createdAt",
    order: -1,
  },
  {
    name: "Price: Low to High",
    href: "low-to-high",
    current: false,
    id: "price",
    order: 1,
  },
  {
    name: "Price: High to Low",
    href: "high-to-high",
    current: false,
    id: "price",
    order: -1,
  },
];
const subCategories = [
  //   { name: 'Totes', href: '#' },
  //   { name: 'Backpacks', href: '#' },
  //   { name: 'Travel Bags', href: '#' },
  //   { name: 'Hip Bags', href: '#' },
  //   { name: 'Laptop Sleeves', href: '#' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FilterSection = React.memo(function FilterSection(props) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryParam = params.get("category");
  const sortParam = params.get("sort");
  const pageParam = params.get("page");
  const searchParam = params.get("search");
  const order = params.get("order");
  // const sellerId = params.get("sellerId")
  console.log(searchParam, sortParam);
  let tempsearchtext;
  const { sellerId } = useParams();
  let updatedSortOptions;
  if (sortParam) {
    updatedSortOptions = sortOptions?.map((option) => {
      // Check if the current option matches the sortParam and order
      if (option.href === sortParam) {
        if (order) {
          if (parseInt(order) === option.order) return option;
        } else return option;
      }
    });
  }
  const { isAuthenticated, accessToken, refreshToken, userId } = useSelector(
    (state) => state.auth
  ); 
  console.log(updatedSortOptions);
  const [selectedCategories, setSelectedCategories] = useState(
    categoryParam ? categoryParam.split(",") : []
  );
  const [sorts, setSorts] = useState(updatedSortOptions || sortOptions[0]);

  const [currentPage, setCurrentPage] = useState(pageParam || 1);
  const [searchText, setSearchText] = useState(searchParam);
  tempsearchtext = searchText;
  const [totalPage, setTotalPage] = useState(1);
  // console.log(categoryParam,sortParam,pageParam)
  const initialCategoryFilter = {
    id: "category",
    name: "Category",
    options: [],
  };
  const [filters, setFilters] = useState([initialCategoryFilter]);

  const dispatch = useDispatch();
  //category filter

  const categoryHandler = (check, ind, secId) => {
    const cat = filters[0].options[ind].label;
    if (check) {
      if (selectedCategories.includes(cat)) {
        const removedList = selectedCategories.filter((item) => item !== cat);
        setSelectedCategories(removedList);
      }
    } else {
      if (!selectedCategories.includes(cat)) {
        setSelectedCategories((prev) => [...prev, cat]);
      }
    }
    filters[0].options[ind].checked = !check;
    setCurrentPage(1);
  };
  const resetCategory = () => {
    setSelectedCategories([]);
  };

  const getCategories = async () => {
    const data = categories;
    // setCategories(data);
    const categoryOptions = data.map((cat) => ({
      value: cat,
      label: cat,
      checked: selectedCategories?.includes(cat) ? true : false,
    }));
    // Update the filters state with category options

    setFilters([
      { id: "category", name: "Category", options: categoryOptions },
    ]);
    setSearchText(searchParam || tempsearchtext);
  };

  useEffect(() => {
    getCategories();
  }, []);

  const [err, setError] = useState(null);

  const handleGetProducts = async () => {
    setLoading(true);
    // console.log("getProduts called")
    console.log(selectedCategories);
    try {
      let data;
      if (props?.seller) {
        if(!isAuthenticated)navigate('/allproducts');
        data = await getProductsByUserId(
          currentPage,
          sellerId,
          accessToken,
          refreshToken,
          dispatch,
          selectedCategories,
          sorts,
          searchParam
        );
      } else {
        data = await getProducts(
          currentPage,
          selectedCategories,
          sorts,
          searchParam
        );
      }
      if (data.status === 200) {
        // console.table(data.data.products)
        setProductList(data.data.products);
        console.log(data.data.totalPages);
        setTotalPage(data.data.totalPages);
        setProductStore(data.data.products, dispatch);
        const queryParams = {};

        if (selectedCategories.length > 0) {
          queryParams.category = selectedCategories.join(",");
        }

        if (sorts.id) {
          queryParams.sort = sorts.id;
          queryParams.order = sorts.order;
        }

        if (currentPage) {
          queryParams.page = currentPage;
        }
        if (searchParam || tempsearchtext) {
          queryParams.search = searchParam || tempsearchtext || undefined;
        }

        // Only include non-empty parameters in the URL
        const nonEmptyQueryParams = Object.fromEntries(
          Object.entries(queryParams).filter(
            ([_, value]) =>
              value !== undefined && value !== null && value !== ""
          )
        );

        const queryString = new URLSearchParams(nonEmptyQueryParams).toString();

        // Only update the URL if there are non-empty parameters
        if (queryString) {
          if (!props?.seller) navigate(`/allproducts?${queryString}`);
          else navigate(`/dashboard/your-products/${sellerId}?${queryString}`);

          getCategories();
        }
        // navigate(`/allproduct?category=${selectedCategories.join(',')}&sort=${sorts.id}&page=${currentPage}`);
      } else setError(data?.message);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };
  console.log(currentPage);

  useEffect(() => {
    handleGetProducts();
    // categoryHandler(check, ind, secId)
  }, [currentPage, selectedCategories, sorts, searchText, searchParam]); //selectedCategories,currentPage

  // useEffect(() => {

  //   const queryParams = {};

  //   if (selectedCategories.length > 0) {
  //     queryParams.category = selectedCategories.join(',');
  //   }

  //   if (sorts.id) {
  //     queryParams.sort = sorts.id;
  //   }

  //   if (currentPage) {
  //     queryParams.page = currentPage;
  //   }

  //   const queryString = new URLSearchParams(queryParams).toString();

  //   // Only update the URL if there are non-null parameters
  //   if (queryString) {
  //     navigate(`/allproducts?${queryString}`,{ replace: true });
  //   }
  // }, [location.search, selectedCategories, sorts.id, currentPage]);

  // console.log(fileredProductList)
  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            as="div"
            className={`relative z-40 lg:hidden `}
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                 as={Fragment}
                 enter="transition ease-in-out duration-300 transform"
                 enterFrom="translate-x-full"  // Slide in from the right
                 enterTo="translate-x-0"      // Slide to the left
                 leave="transition ease-in-out duration-300 transform"
                 leaveFrom="translate-x-0"    // Slide out to the left
                 leaveTo="translate-x-full"    // Slide out to the right
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4  border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        as="div"
                        key={section.id}
                        className="border border-gray-200 px-4 py-6"
                      >
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">
                                  {section.name}
                                </span>
                                <span className="ml-6 flex items-center">
                                  {!open ? (
                                    <PlusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  ) : (
                                    <MinusIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div
                                    key={option.value}
                                    className="flex items-center"
                                  >
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={() => {
                                        categoryHandler(
                                          option.checked,
                                          optionIdx,
                                          section.id
                                        );
                                      }}
                                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                    />
                                    <label
                                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                      className="ml-3 min-w-0 flex-1 text-gray-500"
                                    >
                                      {option.label}
                                    </label>
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="mx-auto  px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-2">
            <h1 className="md:text-3xl lg:text-3xl xl:text-3xl text-[1rem] font-bold tracking-tight text-cs-textHdClr ">
              {" "}
              {props.title}
            </h1>
            <div className="flex items-center">
              <Menu
                as="div"
                className="relative inline-block text-left border border-gray-200 pl-1 pr-1"
              >
                <div>
                  <Menu.Button className="group inline-flex justify-center text-xs font-medium text-gray-900 hover:text-gray-700">
                    <p>Sort by: <span className="pl-1 text-xs">{sorts?.name || "Featured"}</span></p>
                    
                    <ChevronDownIcon
                      className="-mr-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      {sortOptions.map((option) => (
                        <Menu.Item key={option.name}>
                          {({ active }) => (
                            <Link
                              href={`?sorts=${option.href}`}
                              className={classNames(
                                option.current
                                  ? "font-medium text-gray-900"
                                  : "text-gray-500",
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm"
                              )}
                              onClick={() => {
                                setSorts({
                                  order: option?.order,
                                  id: option?.id,
                                  name: option?.name,
                                });
                                setCurrentPage(1);
                              }}
                            >
                              {option.name}
                            </Link>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button
                type="button"
                className={`-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 ${
                  !props.seller ? "lg:hidden" : "lg:visible"
                }`}
                onClick={() => setMobileFiltersOpen(true)}
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div
              className={`grid grid-cols-1 gap-x-2 gap-y-10 ${
                props.seller ? "lg:grid-cols-3" : "lg:grid-cols-4"
              }`}
            >
              {/* Filters */}
              {!props?.seller && (
                <form className="hidden lg:block w-fit">
                  <h3 className="sr-only">Categories</h3>
                  <ul
                    role="list"
                    className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                  >
                    {subCategories.map((category) => (
                      <li key={category.name}>
                        <a href={category.href}>{category.name}</a>
                      </li>
                    ))}
                  </ul>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6 max-w-fit"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    onChange={() => {
                                      categoryHandler(
                                        option.checked,
                                        optionIdx,
                                        section.id
                                      );
                                    }}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>
              )}

              {/* Product grid */}
              <div
                className={`${
                  props.seller ? "xl:-ml-[40px]" : "xl:-ml-[90px]"
                } lg:col-span-3`}
              >
                <ProductList
                  totalPages={totalPage}
                  loading={loading}
                  pagi={true}
                  currentPage={currentPage}
                  setPage={setCurrentPage}
                  category={setSelectedCategories}
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
});
export default FilterSection;
