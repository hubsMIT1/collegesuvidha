
import React, {Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ProductList from './ProductList';
import { callApi } from '../utils/CallApi';
const sortOptions = [
  //   { name: 'Most Popular', href: '#', current: true },
  { name: 'Best Rating', href: '#', current: false },
  { name: 'Newest', href: '#', current: false },
  { name: 'Price: Low to High', href: '#', current: false },
  { name: 'Price: High to Low', href: '#', current: false },
]
const subCategories = [
  //   { name: 'Totes', href: '#' },
  //   { name: 'Backpacks', href: '#' },
  //   { name: 'Travel Bags', href: '#' },
  //   { name: 'Hip Bags', href: '#' },
  //   { name: 'Laptop Sleeves', href: '#' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const FilterSection = React.memo(function FilterSection(props) {

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  // need to add sort filter

  // const [categories, setCategories] = useState([]);
  // const [sorts, setSorts] = useState(["Low to High", "High to Low", "Newest Products"])
  // const [selectedSorts, setSelectedSort] = useState()
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [fileredProductList, setFilteredProductList] = useState([]);

  const [filters, setFilters] = useState([
    {
      id: 'category',
      name: 'Category',
      options: [

      ],
    },
  ])
  //category filter

  const categoryHandler = (check, ind, secId) => {
    const cat = filters[0].options[ind].label;
    if (check) {
      if (selectedCategories.includes(cat)) {
        const removedList = selectedCategories.filter((item) => (item !== cat));
        setSelectedCategories(removedList);
      }
    }
    else {
      if (!selectedCategories.includes(cat)) {
        setSelectedCategories(prev => ([...prev, cat]))
      }
    }
    filters[0].options[ind].checked = !check;
  }
  const resetCategory = () => {
    setSelectedCategories([]);
  }
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1)
    if (selectedCategories.length === 0) {
      setFilteredProductList(productList);
    } else {
      setFilteredProductList(productList.filter((item) => (selectedCategories.includes(item.category))));
    }
  }, [selectedCategories, productList])

  const getCategories = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      const data = await res.json();

      // setCategories(data);
      const categoryOptions = data.map((cat) => ({
        value: cat,
        label: cat,
        checked: false,
      }));
      // Update the filters state with category options
      setFilters([{ id: 'category', name: 'Category', options: categoryOptions }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);

    }
  }

  const [err, setError] = useState(null)

  const limit = 0
  const getProducts = async () => {
    setLoading(true);
    console.log("getProduts called")
    try {
      const skip = currentPage * limit;
      console.log("skip", skip)
      const data = await callApi(`product`, { params: { limit: 100, skip: skip } })
      if (data.message === undefined) {
        console.table(data.products)
        setProductList(data.products);
        setFilteredProductList(data.products);
        getCategories();
      }
      else setError(data);
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProducts()
  }, []) //selectedCategories,currentPage



  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog as="div" className={`relative z-40 lg:hidden `} onClose={setMobileFiltersOpen}>
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
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">Filters</h2>
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
                      <Disclosure as="div" key={section.id} className="border border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  {!open ? (
                                    <PlusIcon className="h-5 w-5" aria-hidden="true" />
                                  ) : (
                                    <MinusIcon className="h-5 w-5" aria-hidden="true" />
                                  )}
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-6">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center">
                                    <input
                                      id={`filter-mobile-${section.id}-${optionIdx}`}
                                      name={`${section.id}[]`}
                                      defaultValue={option.value}
                                      type="checkbox"
                                      defaultChecked={option.checked}
                                      onClick={() => { categoryHandler(option.checked, optionIdx, section.id) }}
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
            <h1 className="md:text-4xl text-[1.5rem] font-bold tracking-tight text-cs-textHdClr ">  {props.title}</h1>
            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
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
                            <a
                              href={option.href}
                              className={classNames(
                                option.current ? 'font-medium text-gray-900' : 'text-gray-500',
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm'
                              )}
                            >
                              {option.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>

              <button type="button" className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7">
                <span className="sr-only">View grid</span>
                <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                className={`-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 ${!props.seller ? 'lg:hidden' : 'lg:visible'}`}
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

            <div className={`grid grid-cols-1 gap-x-2 gap-y-10 ${props.seller ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
              {/* Filters */}
              {!props?.seller && <form className="hidden lg:block w-fit">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900">
                  {subCategories.map((category) => (
                    <li key={category.name}>
                      <a href={category.href}>{category.name}</a>
                    </li>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure as="div" key={section.id} className="border-b border-gray-200 py-6 max-w-fit">
                    {({ open }) => (
                      <>
                        <h3 className="-my-3 flow-root">
                          <Disclosure.Button className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">{section.name}</span>
                            <span className="ml-6 flex items-center">
                              {open ? (
                                <MinusIcon className="h-5 w-5" aria-hidden="true" />
                              ) : (
                                <PlusIcon className="h-5 w-5" aria-hidden="true" />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div key={option.value} className="flex items-center">
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  defaultValue={option.value}
                                  type="checkbox"
                                  defaultChecked={option.checked}
                                  onChange={() => { categoryHandler(option.checked, optionIdx, section.id) }}
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
              </form>}

              {/* Product grid */}
              <div className={`${props.seller ? 'xl:-ml-[40px]' : 'xl:-ml-[90px]'} lg:col-span-3`}>
                <ProductList filteredProductList={fileredProductList} loading={loading} pagi={true} currentPage={currentPage} setPage={setCurrentPage} category={setSelectedCategories} />

              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
})
export default FilterSection;
