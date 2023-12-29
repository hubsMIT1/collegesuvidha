import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
function Search() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState();
  const handleSearch = () => {
    navigate(`/allproducts?search=${searchInput}`);
  };
  return (
    <div className="w-[100%] m-2">
      <div className="flex items-center h-10 bg-purple-400 rounded" type="text">
        <select className="p-2 bg-gray-300 text-black border text-xs xl:text-sm w-12 xl:w-15 lg:w-15">
          <option value="">All</option>
          <option value="">Cycle</option>
          <option value="">Mattress</option>
          <option value="">Kettle</option>
          <option value="">Lab Dress</option>
          <option value="">Lab Shoes</option>
          <option value="">Calculator</option>
        </select>
        <input
          className="flex grow items-center h-[100%] rounded-l text-black"
          type="text"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button className="w-[45px]" onClick={handleSearch}>
          <FaSearch className="h-[27px] m-auto stroke-slate-900" />
        </button>
      </div>
    </div>
  );
}

export default Search;
