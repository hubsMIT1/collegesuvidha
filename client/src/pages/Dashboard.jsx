import React, { useEffect, useState } from "react";
import { ListedProduct } from "../components/Dashboard/ListedProduct";
import ProfileForm from "../components/Dashboard/ProfileDashboard";
import ChatList from "../components/Dashboard/ChatList";
// import { useParams,Link, BrowserRouter } from 'react-router-dom';
import { HashLink } from "react-router-hash-link";

function Dashboard(props) {
  // const {sec} = useParams()

  const [hashId1, setHashId] = useState("profile");
  const hashId = window.location.hash.slice(1);

  useEffect(() => {
    setHashId(hashId);
  }, []);

  console.log(hashId1);
  const [activeSection, setActiveSection] = useState(hashId1 || "profile"); // Initial active section
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
  const menuItems = [
    {
      id: "profile",
      label: "Profile",
      to: "#profile",
    },
    {
      id: "productListing",
      label: "Product Listing",
      to: "#productListing",
    },
    {
      id: "chats",
      label: "Chats",
      to: "#chats",
    },
    {
      id: "logout",
      label: "Logout",
      to: "#logout",
    },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 max-w-[1500px] m-auto">
      <aside
        className={`w-64 bg-gray-900 text-white p-4 ${
          isMenuOpen ? "block" : "hidden"
        } lg:block`}
      >
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <ul className="mt-6 gap-5">
          {menuItems.map((item) => (
            <li className="mb-2" key={item.id}>
              <button
                onClick={() => handleMenuClick(item.id)}
                className={`w-full text-left font-semibold ${
                  activeSection === item.id ? "text-blue-500" : "text-gray-300"
                }`}
              >
                <HashLink to={item.to}>{item.label}</HashLink>
              </button>
            </li>
          ))}
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
            {isMenuOpen ? "Close" : "Menu"}
          </button>
        </div>

        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Dashboard Sections</h2>
          <ul className="flex space-x-4">
            {menuItems.map((item) => (
              <li key={item.id}>
                <HashLink to={item.to}>
                  <button
                    onClick={() => handleMenuClick(item.id)}
                    className={`text-lg font-semibold ${
                      activeSection === item.id
                        ? "text-blue-500"
                        : "text-gray-500"
                    }`}
                  >
                    {item.label}
                  </button>
                </HashLink>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">{sections[activeSection]}</section>
      </main>
    </div>
  );
}

function ProfileSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Profile Section</h2>
      <ProfileForm />
    </div>
  );
}

function ProductListingSection() {
  return (
    <div id="productListing">
      <ListedProduct />
    </div>
  );
}
function ChatsSection() {
  return (
    <div>
      <ChatList />
    </div>
  );
}

export default Dashboard;
