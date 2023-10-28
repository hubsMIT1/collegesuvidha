import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { callApi } from '../utils/CallApi';
import ProductList from './ProductList';
import { Button } from '@material-tailwind/react';

function HomePageProducts() {
    const { seller_id } = useParams();
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading to true
    const [err, setError] = useState(null);

    const getProduct = async () => {
        try {
            const productResults = await callApi('product', { params: { limit: 9, sort: '-rating' } });
            if (productResults.message === undefined) {
                setProduct(productResults.products);
            } else {
                setError(productResults);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false); // Set loading to false when the response is received
        }
    };

    useEffect(() => {
        getProduct();
    }, []); // Run this effect only once when the component mounts

    return (
        <div>
            <div className="flex justify-center  mb-5">
                <h1 className="text-cs-textHdClr text-[2rem] font-bold">Products: You may like</h1>
            </div>

            {loading ? (
                <h1>Loading...</h1>
            ) : err ? (
                <h1 className="text-red-600">{err.message}</h1>
            ) : (
                <ProductList filteredProductList={products} loading={loading} pagi={false} viewBtn={true} />
            )}
            
           
        </div>
    );
}

export default HomePageProducts;
