import React, { useEffect, useState } from 'react';
// import ProductInfo from './ProductInfo';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import slider2 from '../assets/slider2.jpeg'
import slider3 from '../assets/slider2.jpeg'
import pro1 from '../assets/pro1.webp'
import { MdFavoriteBorder } from 'react-icons/md'

import MapImage from '../assets/map.png'
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import { useParams } from 'react-router-dom';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import OwnerCard from './OwnerCard';
import MapExample from './GoogleMap';
import { Link } from 'react-router-dom';


import { callApi } from '../utils/CallApi';

function ProductDetails(props) {
    // Sample product data
    const product = {
        name: 'Sample Product',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        price: '$99.99',
        seller: 'John Doe',
        location: 'New York, NY',
        uploadedDate: '2 days ago',
        isFavorite: false, // Set to true if the user has favorited this product
        owner: {
            name: 'Seller Name',
            sellerRating: '4.8', // Seller's rating
        },
        isFeatured: true,
    };

    // Function to toggle favorite status
    const toggleFavorite = () => {
        // Implement your favorite logic here
    };
    const toggleFeatured = () => {

    }

    // Function to open owner chat
    const openChat = () => {
        // Implement your chat logic here
    };
    const [err, setError] = useState(null)

    const { id } = useParams();
    const [products, setProduct] = useState(null);

    const getProduct = async () => {
        // let err;
        try {

            const productResults = await callApi(`product`,{ params: {} })
            if (productResults.message === undefined)
                setProduct(productResults.products[id])
            else setError(productResults)
            // })
        } catch (err) {
            // setProduct(err)
            setError(err)
            // console.log(err)
        }
    }
    useEffect(() => {
        getProduct();
        // setProduct(props?.productss?.products[id])
    }, [])
    // useEffect(()=>{
    //     console.table(products)
    // },[products])

    return (

        <div className="container mx-auto p-4">
            {err ? <h1 className='flex justify-center text-xl text-red-500'> {err?.message} </h1> :

                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Product image and favorite icon */}
                    <div className="container mx-auto p-4 ">
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                            <div className="lg:flex relative">
                                <div className="lg:w-1/2 items-center relative bg-black">
                                    {/* Display the first image as the focused image */}
                                    <Swiper
                                        // install Swiper modules
                                        modules={[Navigation, Autoplay]}
                                        spaceBetween={0}
                                        slidesPerView={1}
                                        navigation={true}

                                        autoplay={{
                                            delay: 4000,
                                        }}
                                        className='flex justify-center items-center'
                                    >
                                        {
                                            products?.images?.map((link) => (
                                                <SwiperSlide className='flex justify-center items-center h-[424px] align-middle bg-black'>
                                                    <div className="h-full object-cover  flex justify-center items-center"> {/* Center content */}
                                                        <img src={link} title="product Image" className="w-1/2 h-full " /> {/* Keep the image full width and height */}
                                                    </div>
                                                </SwiperSlide>
                                            ))
                                        }

                                    </Swiper>
                                    {
                                        product.isFeatured && <span
                                            className="absolute top-0 left-0 bg-yellow-100 px-2 py-1 m-2 rounded z-50"
                                            onClick={toggleFeatured}
                                        >
                                            Featured
                                        </span>
                                    }


                                </div>
                                <div className="lg:w-1/2 lg:p-4">

                                    <div className="p-4">
                                        <h2 className="text-2xl font-bold mb-2">{products?.title}</h2>
                                        <p className="text-gray-600 text-sm">{products?.description}
                                            {/* Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum tempora numquam, dolorem commodi obcaecati vitae ducimus rerum corrupti quidem eius dolor reprehenderit voluptatem necessitatibus accusamus perspiciatis amet asperiores inventore voluptate.
                                            Tempora, vitae quidem enim nihil maxime, ducimus tempore consequuntur cum asperiores, dicta ex consequatur magnam consectetur nostrum soluta? Cumque reprehenderit distinctio rem exercitationem enim amet delectus aliquid perspiciatis eius velit.
                                            Quasi enim mollitia unde quibusdam, facilis saepe dolor provident ratione, rem dolore sit ipsa, perspiciatis repudiandae reprehenderit eveniet voluptatum! Culpa voluptatibus quo tempora inventore sapiente dolorem cupiditate expedita quos tenetur.
                                            Dicta tempore ipsam alias deleniti doloribus inventore quod molestiae quos ducimus aspernatur obcaecati eos maiores, earum eius esse dolore at, neque aliquid voluptates saepe vel et. Cumque et quis nemo.
                                            Ullam porro maiores, unde nam labore nostrum, repudiandae tempore, consequatur consequuntur officiis quisquam! Perspiciatis ipsam est corporis hic ab fuga, veniam mollitia, repellat expedita quis distinctio a corrupti dicta eum!
                                            Quasi non saepe expedita cumque voluptatum neque, eveniet illum sit molestias similique distinctio nihil fugiat aut blanditiis beatae. Molestiae qui corrupti consequuntur beatae a. Iusto illum aperiam commodi maiores odio!
                                            Laboriosam optio asperiores ad, dolore error vero illo perferendis quae aliquam dolores, quos, debitis voluptates. Voluptas odio ea qui nam tempora libero saepe aperiam quibusdam! Facilis tenetur ab asperiores dolores!
                                            Porro animi at molestiae hic ducimus quam sint molestias suscipit adipisci, impedit assumenda culpa fuga quod in natus a consectetur quo est explicabo praesentium quisquam distinctio illum. Officia, iste eligendi?
                                            Mollitia fugiat voluptatibus nam quam veniam, delectus natus tempora, magnam dignissimos dolores, deleniti earum repudiandae eius recusandae! Molestiae aliquid beatae qui debitis. Ab consequatur magnam mollitia ipsam, illum vel quis?
                                            Repellendus distinctio, quas doloremque rem modi, maiores delectus doloribus sequi perspiciatis eaque voluptate commodi dolores consectetur nobis, necessitatibus consequuntur optio consequatur! Corrupti itaque sed laudantium consequuntur consequatur quibusdam possimus laborum? */}
                                        </p>
                                        <div className="mt-4">
                                            <div className="text-green-500 text-xl font-semibold">₹ {products?.price}</div>
                                            <div className="text-gray-500 text-sm">Seller: {product.seller}</div>
                                            <div className="text-gray-500 text-sm">Brand: {products?.brand}</div>
                                            <div className="text-gray-500 text-sm">Category: {products?.category}</div>


                                            <div className="text-gray-500 text-sm">
                                                Location: {product.location}
                                            </div>
                                            <div className="text-gray-500 text-sm">
                                                Uploaded: {product.uploadedDate}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {product.isFavorite ? (
                                    <span
                                        className="absolute top-0 right-0 bg-red-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-50"
                                        onClick={toggleFavorite}
                                    >
                                        ❤️ Favorite
                                    </span>
                                ) : (
                                    <span
                                        className="absolute top-0 right-0 bg-gray-500 text-white px-2 py-1 m-2 rounded-full cursor-pointer z-50"
                                        onClick={toggleFavorite}
                                    >
                                        ♡ Favorite
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>



                    {/* Product details */}


                    {/* Owner details, chat, and map */}
                    <div className="mt-4  md:flex">
                        {/* Owner details */}
                        <div className=" p-4 rounded-lg md:w-1/2">
                            <OwnerCard />
                        </div>

                        {/* Map section */}
                        <div className=" p-4 sm:pl-10 rounded-lg  md:ml-4 mt-4 md:mt-0  ">

                            <div className="text-gray-600 min-h-[20rem] ">
                                <Link className='flex justify-center z-1000 align-center min-h-[18rem] max-h-[400px] rounded-lg items-center max-w-[40rem] shadow-lg' to='https://www.google.com/maps/place/NIT+Trichy+:+OJAS/@10.7602422,78.8053984,16.06z/data=!4m6!3m5!1s0x3baa8d3beb869ba3:0x50c84f0724e3fa3a!8m2!3d10.7612259!4d78.8089575!16s%2Fm%2F02q8_2v?entry=ttu'>
                                    <img src={MapImage} className=' object-cover items-center cursor-pointer' />
                                </Link>
                                {/* <MapExample /> */}
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}

export default ProductDetails;
