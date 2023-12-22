import React, { useState, useEffect } from "react";
import ProductList from "./ProductList";
import { getProducts } from "../services/product_service";
import { useDispatch } from "react-redux";
import { setProductStore } from "../redux/allAction";
function HomePageProducts() {
  const [loading, setLoading] = useState(false);
  const [err, setError] = useState(null);
  const [homeProducts, setHomeProducts] = useState();
  const dispatch = useDispatch();
  const handleGetProduct = async () => {
    setLoading(true);
    try {
      const productResults = await getProducts(1);
      if (productResults.status === 200) {
        setHomeProducts(productResults?.data?.products);
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
    // if(!loading)
    handleGetProduct();
  }, []);
  if (err?.length > 0) return <h1 className="text-red-600">{err.message}</h1>;
  return (
    <div>
      <div className="flex justify-center  mb-5">
        <h1 className="text-cs-textHdClr text-[2rem] font-bold">
          Products: You may like
        </h1>
      </div>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <ProductList
          homeProducts={homeProducts}
          loading={loading}
          pagi={false}
          viewBtn={true}
        />
      )}
    </div>
  );
}

export default HomePageProducts;
