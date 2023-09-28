// import React, { useState, useEffect } from 'react'

// import { callApi } from '../utils/CallApi';
// export const getData = async (limit, sorting) => {
//     // const { seller_id } = useParams();
//     // const [products, setProduct] = useState(null);
//     // // const [loading, setLoading] = useState(false);
//     // const [err, setError] = useState(null)

//     // setLoading(true)
//     // let err;
//     try {

//         const productResults = await callApi(`product`, { params: { limit: limit, sort: sorting } })
//         console.log(productResults)

//         if (productResults.message === undefined)
//             return ({ products: productResults.products })

//         //     setProduct(productResults.products)
//         // else setError(productResults)
//         // })
//     } catch (err) {
//         // setProduct(err)
//         // setError(err)
//         return ({ err: err })
//         // console.log(err)
//     } finally {
//         // setLoading(false)
//         // return ({load:loading})
//     }
//     // return ({ products: products })
// }
// // useEffect(() => {
// //     getProduct();
// //     // setProduct(props?.productss?.products[id])
// // }, [])
