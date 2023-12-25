import { CarouselCategory } from '../components'
import FeaturedSection from "../components/FeaturedProductSection";
import HomePageProducts from "../components/HomeProducts";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    // <>
    <div className="bg-cs-background">
      <div className=" max-w-[1500px] m-auto ">
        <CarouselCategory />
        <div className="mt-10">
          <FeaturedSection />
        </div>
        <div className="mt-10">
          <HomePageProducts />
        </div>
      </div>
    </div>
      // {/* <Link to={`/addproduct`} className="fixed left-[50%] bottom-10  px-4 py-2  z-40 "><Button className=" bg-cs-textHdClr text-white rounded shadow cursor-pointer z-40 hover:bg-purple-300 ">SELL</Button></Link> */}
      // {/* </> */}
  )
}

export default HomePage;

