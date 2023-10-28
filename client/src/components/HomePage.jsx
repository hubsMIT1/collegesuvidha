import React,{useState}from "react";
import { Carousel, CarouselCategory } from './'
import HomePageCard from "./HomePageCard";
// import 
import product1 from '../assets/product1.jpg'
import Pagination from "./Pagination";
import ProductList from "./ProductList";
import FeaturedSection from "./FeaturedSection";
import HomePageProducts from "./HomeProducts";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const HomePage = () => {
  const cardData = [
    { title: 'Card 1', img: product1, link: '/card1' },
    { title: 'Card 2', img: product1, link: '/card2' },
    { title: 'Card 11', img: product1, link: '/card1' },
    { title: 'Card 21', img: product1, link: '/card2' },
    { title: 'Card 12', img: product1, link: '/card1' },
    { title: 'Card 22', img: product1, link: '/card2' },
    { title: 'Card 13', img: product1, link: '/card1' },
    { title: 'Card 23', img: product1, link: '/card2' },
    { title: 'Card 1', img: product1, link: '/card1' },
    { title: 'Card 2', img: product1, link: '/card2' },
    { title: 'Card 1', img: product1, link: '/card1' },
    { title: 'Card 2', img: product1, link: '/card2' },
    { title: 'Card 1', img: product1, link: '/card1' },
    { title: 'Card 2', img: product1, link: '/card2' },
    { title: 'Card 14', img: product1, link: '/card1' },
    { title: 'Card 24', img: product1, link: '/card2' },
    { title: 'Card 15', img: product1, link: '/card1' },
    { title: 'Card 25', img: product1, link: '/card2' },
    { title: 'Card 15', img: product1, link: '/card1' },
    { title: 'Card 24', img: product1, link: '/card2' },
    { title: 'Card 16', img: product1, link: '/card1' },
    { title: 'Card 23', img: product1, link: '/card2' },
    { title: 'Card 17', img: product1, link: '/card1' },
    { title: 'Card 22', img: product1, link: '/card2' },
    { title: 'Card 18', img: product1, link: '/card1' },
    { title: 'Card 21', img: product1, link: '/card2' },
    { title: 'Card 19', img: product1, link: '/card1' },
    { title: 'Card 20', img: product1, link: '/card2' },
    // Add more card data here
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = cardData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

    return (
        <div className="bg-cs-background">
            <div className=" max-w-[1500px] m-auto ">

                {/* <Carousel />
                 */}
                 <CarouselCategory />
                <div className="mt-10">
                  <FeaturedSection />
                </div>
                <div className="mt-10">
                  <HomePageProducts />
                </div>

                {/* <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-screen-xl mx-auto p-4'>
        {currentItems.map((card, index) => (
          <HomePageCard key={index} {...card} />
        ))}
      </div>
      <div className='col-span-full flex justify-center mt-4'>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div> */}
    {/* </div> */}
                    <div className="m-3 pt-8">
                        {/* <img className="xl:hidden" src={product1} /> */}
                    </div>
                {/* </div> */}
              
            </div>
            <Link to={`/addproduct`}><Button className="fixed left-[50%] bottom-4 bg-cs-textHdClr text-white px-4 py-2 rounded shadow hover:bg-purple-300 cursor-pointer z-10">SELL</Button></Link>
        </div>
    )
}
export default HomePage;

