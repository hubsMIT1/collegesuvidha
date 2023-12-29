import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from '../services/product_service';

export default function TestGetProduct(){
    const dispatch = useDispatch();
    const { isAuthenticated, accessToken, refreshToken,userId } = useSelector(
        (state) => state.auth
      );
      const [products,setProduct] = useState(null);
    useEffect(() => {
      // Fetch products when the component mounts
      if (isAuthenticated){
        getProducts(userId,accessToken,refreshToken,dispatch,1)
          .then((products) => {
            // Dispatch an action to store products in the Redux store
            // You can create a separate product action for this if needed
            // console.log(products);
            setProduct(products.data.products);
          })
          .catch((error) => {
            console.error("Error fetching products:", error);
          });
      }
    }, []);
    return(
        <div>
      <h1>Product Page</h1>
      {products?.map((product) => (
        <div key={product._id} style={{ border: '1px solid #ccc', padding: '10px', margin: '10px' }}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <p>Category: {product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Quantity: {product.quantity}</p>
          <p>Address: {product.address}</p>
          <p>Zip Code: {product.zipCode}</p>
          <p>Available: {product.isAvailable ? 'Yes' : 'No'}</p>
          {/* Render images if available */}
          {product.images.length > 0 && (
            <div>
              <p>Images:</p>
              <div style={{ display: 'flex' }}>
                {product.images.map((image, index) => (
                  <img key={index} src={image} alt={`Product ${index}`} style={{ maxWidth: '100px', marginRight: '10px' }} />
                ))}
              </div>
            </div>
          )}
          <p>Created At: {new Date(product.createdAt).toLocaleString()}</p>
          <p>Updated At: {new Date(product.updatedAt).toLocaleString()}</p>
        </div>
      ))}
    </div>
    )
  };
