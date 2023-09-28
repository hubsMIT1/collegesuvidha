import React, { useState } from 'react';
import { FaBars,FaSignInAlt,FaPlus } from 'react-icons/fa'; // Make sure you have imported FaBars from the appropriate package
import  './Header.css'
import SearchBox from '../searchbox/SearchBox';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="header-navbar">
        {/* ... (other header content) */}
        <div className="header-navbar__start">
          <div className="header-logo">
            <div className="header-logo-name">
              <a href="https://collegesuvidha.in/" className="custom-logo-link" rel="home" aria-current="page">
                <img
                  width="40"
                  height="40"
                  src="https://collegesuvidha.in/wp-content/uploads/2022/11/WhatsApp-Image-2022-11-12-at-18.-1.png"
                  className="custom-logo"
                  alt="cs-logo"
                  decoding="async"
                />
              </a>&nbsp;
              <p style={{ fontSize: '20px', fontWeight: 'bold' }}>Collegeसुविधा</p>
            </div>
          </div>
        </div>
        
        <div className="header-navbar__end">
        <div className={`header-navbar__burger`} data-component="burger">
          <a href="#" onClick={toggleMenu}>
            <span className="burger-icon">
              {isMenuOpen ? (
                <span className="close-button" onClick={closeMenu}>
                  X
                </span>
              ) : (
                <FaBars  />
              )}
            </span>
          </a>
          <ul id="menu-header" className='menu' style={{ display: isMenuOpen ? 'block' : 'none' }} >
            {/* ... (menu items) */}
            <SearchBox />
            <li
                id="menu-item-202"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-181 current_page_item menu-item-202"
              >
                <a href="https://collegesuvidha.in/" aria-current="page">
                  Home
                </a>
              </li>
              <li
                id="menu-item-203"
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-203"
              >
                <a href="https://collegesuvidha.in/listings/">All Products</a>
              </li>
          </ul>
        </div>
        <nav className={`header-navbar__menu`} data-component="menu" >
            <ul id="menu-header-1" className="menu">
        <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home  page_item page-item-181  menu-item-202">
              <SearchBox />
        </li>
            
              <li
                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-181 current_page_item menu-item-202"
              >
                <a href="https://collegesuvidha.in/" aria-current="page">
                  Home
                </a>
              </li>
              <li className="menu-item menu-item-type-post_type menu-item-object-page menu-item-203">
                <a href="https://collegesuvidha.in/listings/">All Products</a>
              </li>
            </ul>
          </nav>
          <div className="header-navbar__actions">
            <div className="hp-menu hp-menu--site-header hp-menu--main">
              <a href="#user_login_modal" className="hp-menu__item hp-menu__item--user-login hp-link">
                {/* <i className="hp-icon fas fa-sign-in-alt"></i> */}
                <FaSignInAlt />
                <span>Sign In</span>
              </a>
              <button
                type="button"
                className="hp-menu__item hp-menu__item--listing-submit button button--secondary"
                data-component="link"
                data-url="https://collegesuvidha.in/submit-listing/"
              >
                {/* <i className="hp-icon fas fa-plus"></i> */}
                <FaPlus />
                <span>SELL</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState } from 'react';
// import SearchBox from '../searchbox/SearchBox';

// const Navigation = () => {
//   const [showMenu, setShowMenu] = useState(false);

//   const toggleMenu = () => {
//     setShowMenu(!showMenu);
//   };

//   return (
//     <>
//       <nav className="bg-white shadow-lg">
//         <div className="max-w-8xl mx-auto px-4">
//           <div className="flex justify-between">
//             <div className="flex space-x-7">
//               <div>
//                 <a href="#" className="flex items-center py-4 px-2">
//                   <img src="logo.png" alt="Logo" className="h-8 w-8 mr-2" />
//                   <span className="font-semibold text-gray-500 text-lg">Navigation</span>
//                 </a>
//               </div>
//               </div>
//               <div className=" hidden md:flex items-center space-x-1">
//                 <SearchBox />
//                 <a href="" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">
//                   Home
//                 </a>
//                 <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
//                   Services
//                 </a>
//                 <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
//                   About
//                 </a>
//                 <a href="" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">
//                   Contact Us
//                 </a>
//                 {/* <a> */}
                
//                 {/* </a> */}
//               </div>
              
           
//             <div className="hidden md:flex items-center space-x-3">
//               <a href="" className="py-2 px-2 font-medium text-gray-500 rounded hover:bg-green-500 hover:text-white transition duration-300">
//                 Log In
//               </a>
//               <a href="" className="py-2 px-2 font-medium text-white bg-green-500 rounded hover:bg-green-400 transition duration-300">
//                 Sign Up
//               </a>
//             </div>
//             <div className="md:hidden flex items-center">
//               <button className="outline-none mobile-menu-button" onClick={toggleMenu}>
//                 <svg
//                   className={`w-6 h-6 text-gray-500 ${showMenu ? 'hover:text-green-500' : ''}`}
//                   fill="none"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth="2"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path d="M4 6h16M4 12h16M4 18h16"></path>
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className={`mobile-menu ${showMenu ? '' : 'hidden'}`}>
//           <ul>
//             <li className="active">
//               <a href="index.html" className="block text-sm px-2 py-4 text-white bg-green-500 font-semibold">
//                 Home
//               </a>
//             </li>
//             <li>
//               <a href="#services" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">
//                 Services
//               </a>
//             </li>
//             <li>
//               <a href="#about" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">
//                 About
//               </a>
//             </li>
//             <li>
//               <a href="#contact" className="block text-sm px-2 py-4 hover:bg-green-500 transition duration-300">
//                 Contact Us
//               </a>
//             </li>
//             <li>
//             <SearchBox />
//             </li>
//           </ul>

//         </div>
//       </nav>
      
//       <h1 className="text-green-500 text-2xl md:text-3xl lg:text-4xl font-bold p-4">
//         Tailwind Navigation Toolbar
//       </h1>
//     </>
//   );
// };

// export default Navigation;
