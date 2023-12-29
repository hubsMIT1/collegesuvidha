import React, { useEffect, useState } from "react";
import { ListedProduct } from "../components/Dashboard/ListedProduct";
import ProfileForm from "../components/Dashboard/ProfileDashboard";
import ChatList from "../components/Dashboard/ChatList";
import { useDispatch } from "react-redux";
import { history } from "../_helpers/history";
import { Navigate, useParams, useNavigate } from "react-router-dom";
import { clearUserDataStore, logoutAuthStore } from "../redux/allAction";

function Dashboard(props) {
  const { section } = useParams();

  const [activeSection, setActiveSection] = useState(section || "profile"); // Initial active section
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const sections = {
    profile: <ProfileSection />,
    productListing: <ProductListingSection />,
    chats: <ChatsSection />,
    logout: <Logout />,
  };
  const navigate = useNavigate();
  const handleMenuClick = (section) => {
    setActiveSection(section);
    navigate(`/dashboard/${section}`);
  };
  const menuItems = [
    {
      label: "Profile",
      to: "profile",
    },
    {
      label: "Product Listing",
      to: "productListing",
    },
    {
      label: "Chats",
      to: "chats",
    },
    {
      label: "Logout",
      to: "logout",
    },
  ];
  useEffect(() => {
    setActiveSection(section);
  }, [section]);
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
            <li className="mb-2" key={item.to}>
              <button
                onClick={() => handleMenuClick(item.to)}
                className={`w-full text-left font-semibold ${
                  activeSection === item.to ? "text-blue-500" : "text-gray-300"
                }`}
              >
                {item.label}
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
              <li key={item.to}>
                <button
                  onClick={() => handleMenuClick(item.to)}
                  className={`text-lg font-semibold ${
                    activeSection === item.to
                      ? "text-blue-500"
                      : "text-gray-500"
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-8">{sections[section]}</section>
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
function Logout() {
  const dispatch = useDispatch();
  clearUserDataStore(dispatch);
  logoutAuthStore(dispatch);

  history.navigate = null;
  history.location = null;
  return <Navigate login={true} to="/auth/login" />;
}

export default Dashboard;
