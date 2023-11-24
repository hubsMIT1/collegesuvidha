import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes,useNavigate,useLocation,Navigate } from "react-router-dom";
import { HomePage } from "./components/index";
import Navbar from "./components/Navbar";
import ProductDetails from "./pages/productDetails";
import SellerPage from "./pages/SellerPage";
import RegisterPage from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import ProductForm from "./pages/ProductForm";
import FilterSection from "./components/FilterSection";
import PrivateRoute from './_helpers/privateRoute';
import RemoveLoginRoute from "./_helpers/removedLoginRoute";
// import TestGetProduct from "./testApi/getProdujct";
function App() {
 

  return (
    <>
      <BrowserRouter>
        <Navbar />
        {/* <TestGetProduct /> */}
        <Routes className="max-w-[1500px] m-auto">
          <Route exact path="/" element={<HomePage />} />
          <Route
            exact
            path="/productDetails/:id/:index"
            element={<ProductDetails  />}
          />
          <Route element={<RemoveLoginRoute />}>
            <Route path="/auth/signup" element={<RegisterPage signup={true} />} />
            <Route path="/auth/login" element={<RegisterPage login={true} />} />
          </Route>
          <Route
            path="/allproducts"
            element={<FilterSection title={"Our All Products"} />}
          />
          <Route element={<PrivateRoute />}>
            <Route exact path="/seller/:sellerId" element={<SellerPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/addproduct" element={<ProductForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
