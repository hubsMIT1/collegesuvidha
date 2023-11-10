import { CarouselCategory } from '../components'
import FeaturedSection from "../components/FeaturedProductSection";
import HomePageProducts from "../components/HomeProducts";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
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
      <Link to={`/addproduct`}><Button className="fixed left-[50%] bottom-4 bg-cs-textHdClr text-white px-4 py-2 rounded shadow hover:bg-purple-300 cursor-pointer z-10">SELL</Button></Link>
    </div>
  )
}
export default HomePage;

