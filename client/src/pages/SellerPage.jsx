import OwnerCard from "./OwnerCard";
import { useParams } from 'react-router-dom'
import FilterSection from "../components/FilterSection";

function SellerPage(props) {
  const { sellerId } = useParams();

  return (
    <div className="flex flex-col  lg:flex-row gap-4 max-w-[1500px] m-auto ">
      <div className="max-h-[650px] lg:max-w-[400px] flex-1">
        <OwnerCard userId={sellerId}/>
      </div>
      <div className=" lg:mt-1">
        <div className="lg:overflow-hidden lg:flex-1 overflow: -webkit-scrollbar:none no-scrollbar">
          <FilterSection seller={true} title={"Listing by seller"} sellerId = {sellerId} />
        </div>
      </div>
    </div>
  );
}
export default SellerPage;
