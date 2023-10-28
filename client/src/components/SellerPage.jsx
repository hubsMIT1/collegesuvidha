import React,{useState,useEffect} from 'react'
import OwnerCard from './OwnerCard'
import HomePageCard from './HomePageCard'
import product1 from '../assets/product1.jpg'
import { useParams } from 'react-router-dom'
import { callApi } from '../utils/CallApi';
import ProductList from './ProductList'
import FilterSection from './FilterSection2'

function SellerPage() {

    const {seller_id} = useParams();
    const [products, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);
    const [err,setError] = useState(null)

    const getProduct = async () => {
        setLoading(true)
        // let err;
        try {

            const productResults = await callApi(`product`, { params: {  sort: 'rating' } })
            console.log(productResults)
            if (productResults.message === undefined)
                setProduct(productResults.products)
            else setError(productResults)
            // })
        } catch (err) {
            // setProduct(err)
            setError(err)
            // console.log(err)
        } finally{
            setLoading(false)
        }
    }
    useEffect(() => {
        getProduct();
        // setProduct(props?.productss?.products[id])
    }, [])



    return (
        <div className='flex flex-col  lg:flex-row gap-4 max-w-[1500px] m-auto '>
        <div className='max-h-[650px] lg:max-w-[400px] flex-1' >

            <OwnerCard  />
        </div>


            <div className=' lg:mt-1' >
              {/* <h1 className='text-black text-[2rem] font-bold items-center'>  _ Listing By Owner</h1> */}
                <div className="lg:overflow-hidden lg:flex-1 overflow: -webkit-scrollbar:none no-scrollbar">
                    {/* <div className="lg:max-h-[700px] lg:overflow-y-scroll hide-scrollbar overflow: -webkit-scrollbar:none no-scrollbar">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-2 gap-4 mt-8 overflow: -webkit-scrollbar:none no-scrollbar"> */}
                            
                              {/* { products!==null? <ProductList filteredProductList={products} loading={loading} pagi={true} /> : loading ? (<h1> Loading </h1>) :<h1 className='text-red-600'> Somthing wrong!! </h1>} */}

                            <FilterSection seller={true} title = {"Listing by seller"} />
                        {/* </div>
                    </div> */}
                </div>
            </div>


        </div>
    )
}

export default SellerPage