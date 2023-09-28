import React, { useEffect, useState } from 'react';
import { ListedProduct } from './Dashboard/ListedProduct';
import ProfileForm from './Dashboard/ProfileDashboard';
import ChatList from './Dashboard/ChatList';
import { useParams,Link, BrowserRouter } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';


function Dashboard(props) {
  const {sec} = useParams()

  const [hashId1,setHashId] = useState('profile')
  const hashId = window.location.hash.slice(1);
  useEffect(()=>{
    setHashId(hashId)
  })
  // oad.window(()=>{setHashId(hashId)})
  
  
  console.log(hashId1)
  const [activeSection, setActiveSection] = useState(hashId1 || 'profile'); // Initial active section
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const sections = {
    profile: <ProfileSection />,
    productListing: <ProductListingSection />,
    chats: <ChatsSection />,
  };

  const handleMenuClick = (section) => {
    setActiveSection(section);
  };
  return (
    // <BrowserRouter>
    <div className="flex min-h-screen bg-gray-100 max-w-[1500px] m-auto">
      {/* Sidebar */}
      <aside className={`w-64 bg-gray-900 text-white p-4 ${isMenuOpen ? 'block' : 'hidden'} lg:block`}>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="mt-6 gap-5">
          <li className="mb-2">
            <button
              onClick={() => handleMenuClick('profile')}
              className={`w-full text-left font-semibold ${
                activeSection === 'profile' ? 'text-blue-500' : 'text-gray-300'
              }`}
            >
             <HashLink to={'#profile'}> Profile</HashLink>
            </button>
          </li>
          <li className="mb-2">
          
            <button
              onClick={() => handleMenuClick('productListing')}
              className={`w-full text-left font-semibold ${
                activeSection === 'productListing' ? 'text-blue-500' : 'text-gray-300'
              }`}

            >
            <HashLink to={'#productListing'}> Product Listing </HashLink>
            </button>
          </li>
          <li className='mb-2'>
          <HashLink to={'#chats'}>
            <button
              onClick={() => handleMenuClick('chats')}
              className={`w-full text-left font-semibold ${
                activeSection === 'chats' ? 'text-blue-500' : 'text-gray-300'
              }`}
            >
              Chats
            </button>
            </HashLink>
          </li>
          <li className='mb-2'>
              <button className={`w-full text-left font-semibold ${
                activeSection === 'logout' ? 'text-blue-500' : 'text-gray-300'
              }`}>
                Logout
              </button>
            </li>
        </ul>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-4">
        {/* Content sections */}
        <div className="lg:hidden">
          <button
            className="bg-blue-500 text-white px-2 py-1 rounded-lg"
            onClick={toggleMenu}
          >
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Sections</h2>
          <ul className="flex space-x-4">
            <li>
            <HashLink to={'#profile'}>
              <button
                onClick={() => handleMenuClick('profile')}
                className={`text-lg font-semibold ${
                  activeSection === 'profile' ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                Profile
              </button>
              </HashLink>
            </li>
            <li>
            <HashLink to={'#productListing'}>
              <button
                onClick={() => handleMenuClick('productListing')}
                className={`text-lg font-semibold ${
                  activeSection === 'productListing' ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                Product Listing
              </button>
              </HashLink>
            </li>
            <li>
            <HashLink to={'#chats'}>
              <button
                onClick={() => handleMenuClick('chats')}
                className={`text-lg font-semibold ${
                  activeSection === 'chats' ? 'text-blue-500' : 'text-gray-500'
                }`}
              >
                Chats
              </button>
              </HashLink>
            </li>
            
          </ul>
        </section>

        {/* Main content section */}
        <section className="mb-8">

          {sections[activeSection]}
        </section>
      </main>
    </div>
 
  );
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile Section</h2>
      {/* Profile section content */}
      <ProfileForm />
    </div>
  );
}

function ProductListingSection() {
  return (
    <div id='productListing'>
      {/* <h2 className="text-2xl font-semibold mb-4">Product Listing Section</h2> */}
      {/* Product listing section content */}
      <ListedProduct />
    </div>
  );
}

function ChatsSection() {
  return (
    <div>
      
      {/* Chats section content */}
      <ChatList />
    </div>
  );
}

export default Dashboard;
