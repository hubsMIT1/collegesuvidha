import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { getProducts } from "../services/product_service";
import { useDispatch } from "react-redux";
import { setProductStore } from "../redux/allAction";

function FeaturedSection() {
  const [loading, setLoading] = useState(false); // Initialize loading to true
  const [err, setError] = useState(null);
  const [featuredProduct, setFeaturedProduct] = useState();
  const dispatch = useDispatch();
  const handleGetProduct = async () => {
    setLoading(true);
    try {
      // changed the when api get if featured then fetch  with some limit....

      const productResults = await getProducts(1,"","","",1,6);
      if (productResults.status === 200) {
        // console.log(productResults);
        // console.log(productResults)
        setFeaturedProduct(productResults.data.products);
        setProductStore(productResults.data.products, dispatch);
      } else {
        setError(productResults.message);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProduct();
  }, []);
  // console.log(products)
  return (
    <div>
      <div className="flex justify-center  mb-3">
        <h1 className="text-cs-textHdClr text-[1.5rem] font-bold">
          Featured Products
        </h1>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : err ? (
        <h1 className="text-red-600">{err.message}</h1>
      ) : (
        <ProductList
          featuredProduct={featuredProduct}
          loading={loading}
          isFeatured={true}
          pagi={false}
        />
      )}
    </div>
  );
}

export default FeaturedSection;
