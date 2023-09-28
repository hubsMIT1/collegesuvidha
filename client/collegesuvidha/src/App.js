
import './App.css';
import Header from './components/Header/Header';
import SearchBox from './components/searchbox/SearchBox';
import SearchHeader from './components/slideHeader/searchHeader';
import {BrowserRouter,Router,Route,Routes} from 'react-router-dom'
import { HomePage } from './components/index'
import Navbar from './components/Navbar';
import ProductDetails from './components/productDetails';
import MapExample from './components/GoogleMap';
import SellerPage from './components/SellerPage';
import Login from './components/SignIn';
import RegisterPage from './components/Registration';
import Dashboard from './components/Dashboard';
import ProductForm from './components/ProductForm';
// import FilterSection from './components/FilterSection';
import FilterSection2 from './components/FilterSection2';
import { useEffect, useState } from 'react';
import SideBar from './components/SideBar';


function App() {
  const [fetchedData, setFetchedData] = useState(null);
  console.table(fetchedData)
  let data = null
  useEffect(()=>{
    data = fetchedData;
    console.log(data)
  },[])

  return (
   <>
   <BrowserRouter>
   <Navbar />
      <Routes className='max-w-[1500px] m-auto'>
        <Route exact path='/' element = {<HomePage />} />
        <Route exact path='/productDetails/:id' element = {<ProductDetails productss={fetchedData}/>} />
        <Route exact path='/map' element = {<MapExample />} />
        <Route exact path='/seller/:seller_id' element = {<SellerPage />} />
        {/* <Route exact path='/signin' element = {<Login signup={true} />} /> */}
        <Route path='/signup' element={<RegisterPage signup={true} />} />
        <Route path='/signin' element={<RegisterPage login={true} />} />

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/addproduct' element={<ProductForm />} />

        {/* <Route path='/filter' element={<FilterSection/>} /> */}
        <Route path='/allproducts' element={<FilterSection2 title = {"Our All Products"} />} />
        <Route path='/sidebar' element={<SideBar />} />

        



      </Routes>
   </BrowserRouter>
    {/* <h1> Hlelloo </h1> */}
    {/* <Header />
   
    <SearchHeader /> */}
    
   </>
  );
}

export default App;
