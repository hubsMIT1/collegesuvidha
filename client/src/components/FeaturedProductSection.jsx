import React, { useState, useEffect } from 'react';
// import { useParams } from 'react-router-dom';
import { callApi } from '../utils/CallApi';
import ProductList from './ProductList';

function FeaturedSection() {
    // const { seller_id } = useParams();
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(true); // Initialize loading to true
    const [err, setError] = useState(null);

    const getProduct = async () => {
        try {
            // changed the when api get if featured then fetch  with some limit.... 
            const productResults = await callApi('product', { params: { limit: 6, sort: '-rating' } });
            if (productResults.message === undefined) {
                setProduct(productResults.products);
            } else {
                setError(productResults);
            }
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    return (
        <div>
            <div className="flex justify-center  mb-5">
                <h1 className="text-cs-textHdClr text-[2rem] font-bold">Featured Products</h1>
            </div>

            {loading ? (
                <h1>Loading...</h1>
            ) : err ? (
                <h1 className="text-red-600">{err.message}</h1>
            ) : (
                <ProductList filteredProductList={products} loading={loading} isFeatured={true} pagi={false}/>
            )}
        </div>
    );
}

export default FeaturedSection;
