import React, { useEffect, useState } from "react";
import CS_logo from "../assets/header_logo.png";
import { FaBars, FaPlus, FaSignInAlt, FaUserCircle } from "react-icons/fa";
import Search from "./Search";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import authService from "../services/auth_service";

import SideBar from "./SideBar";
function Navbar() {
  const { isAuthenticated, accessToken, refreshToken, userId } = useSelector(
    (state) => state.auth
  );
  const { userData } = useSelector((state) => state.user);

  // console.log(isAuthenticated, userData);
  const dispatch = useDispatch();

  const fetchUserData = async () => {
    // console.log("api backend userdata");

    if (isAuthenticated && !userData) {
      try {
        // console.log(userData);

        await authService.userData(userId, accessToken, refreshToken, dispatch);

        // console.log(response)
      } catch (error) {
        console.log(error);
      }
    }
  };
  useEffect(() => {
    // document.addEventListener('load',fetchUserData);
    // return ()=>{
    //   document.removeEventListener('click',fetchUserData)
    // }
    if (isAuthenticated) fetchUserData();
  }, [isAuthenticated]);

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const navHeadings = [
    { name: "Home", link: "/", type: "text" },
    { name: "All Product", link: "/allproducts", type: "text" },
    {
      name: "Your Product",
      link: `/dashboard/your-products/${userId}`,
      type: "text",
    },
  ];

  return (
    <header className="">
      <div className="flex bg-cs-textHdClr text-white h-[60px] justify-between ">
        {/* left */}

        <div className="flex items-center m-4 ml-0">
          <Link to={`/`}>
            <img
              className="m-1 min-h-[30px]"
              src={CS_logo}
              alt="collegesuvidha"
            />
          </Link>
          <Link to={`/`}>
            {" "}
            <h3 className="font-bold ml-1 text-s md:text-xl lg:text-xl">
              {" "}
              College
              <span className="text-xs md:text-xl lg:text-xl">सुविधा</span>
            </h3>
          </Link>
        </div>

        {/* middle */}
        <div className="hidden grow relative items-center md:flex lg:flex xl:flex ">
          <Search />
        </div>

        {/* right */}
        <div className="flex items-center m-4 mr-1">
          <div className="hidden items-center m-4 lg:flex xl:flex">
            <div className="pr-4 pl-4">
              <Link to={`/`}>
                {" "}
                <div className="text-xs xl:text-sm cursor-pointer">Home</div>
              </Link>
            </div>
            <div className="pr-4 pl-4">
              <Link to={`/allproducts`}>
                {" "}
                <div className="text-xs xl:text-sm  cursor-pointer">
                  All Product
                </div>
              </Link>
            </div>
            {isAuthenticated && (
              <div className="pr-4 pl-4">
                <Link to={`/dashboard/your-products/${userId}`}>
                  {" "}
                  <div className="text-xs xl:text-sm  cursor-pointer">
                    Your Product
                  </div>
                </Link>
              </div>
            )}
          </div>
          <div className="pr-4 pl-1">
            {isAuthenticated ? (
              <Link
                to={`/dashboard/profile`}
                className="flex justify-center items-center gap-1"
              >
                <FaUserCircle
                  size="30"
                  // className=" border-2 border-white round"
                />
                <span>{userData?.firstName} </span>
              </Link>
            ) : (
              <Link
                to={`/auth/login`}
                className="flex justify-center items-center gap-1"
              >
                <FaSignInAlt />
                <span>Sign In</span>
              </Link>
            )}
          </div>
          <Link to={`/addproduct`} className="flex">
            <div className="flex pr-2 pl-2 items-center border border-white cursor-pointer">
              <FaPlus className="h-[30px]" />
              <div className="ml-1 text-xs xl:text-sm font-bold">SELL</div>
            </div>
          </Link>
          <div
            className="flex pr-3 pl-3 items-center cursor-pointer lg:hidden xl:hidden"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <FaBars className="h-[48px]" />
          </div>
        </div>
      </div>
      <div className=" bg-cs-textHdClr flex md:hidden lg:hidden xl:hidden">
        <Search className="m-2" />
      </div>
      {isAuthenticated && (
        <div className="flex bg-purple-400 text-white space-x-3 text-xs xl:text-sm p-2 pl-6">
          <Link to={`/dashboard/your-products/${userId}`}>Your Products</Link>
          <Link to={`/dashboard/chats`}>Chats</Link>
          {/* <Link to={`/auth/signup`}>Sign Up</Link> */}
          {userData?.isAdmin && (
            <Link to="/auth/add-new-admin"> Add Admins </Link>
          )}
          {userData?.isAdmin && (
            <Link to="/dashboard/admin/products-list"> Admin Dashboard</Link>
          )}
        </div>
      )}
      {mobileFiltersOpen && (
        <SideBar
          isMobile={mobileFiltersOpen}
          setIsMobile={setMobileFiltersOpen}
          section={navHeadings}
          openFromRight
        />
      )}
    </header>
  );
}

export default Navbar;
