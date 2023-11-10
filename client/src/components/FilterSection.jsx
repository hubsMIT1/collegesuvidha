// import React, { useEffect, useState } from 'react'
// import ProductList from './ProductList';

// const FilterSection = () => {
  
//   const [loading, setLoading] = useState(false);
//   const [productList, setProductList] = useState([]);
//   const [categories, setCategories] = useState([]);
//   const [sorts,setSorts] = useState(["Low to High", "High to Low", "Newest Products"])
//   const [selectedSorts,setSelectedSort] = useState()
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [fileredProductList, setFilteredProductList] = useState([]);
//   console.table(productList)
//   const addCategory = (category) => {
//     if(!selectedCategories.includes(category)){
//         setSelectedCategories(prev => ([...prev, category]))
//     }     
//   }
//   const addSorts = (sort) => {
//     // if(!selectedSorts.includes(sort)){
//         setSelectedSort(prev => (sort))
//     // }     
//   }


//   const removeCategory = (category) => {
//     if(selectedCategories.includes(category)){
//         console.log(selectedCategories)
//         const removedList = selectedCategories.filter((item) => (item !== category));
//         setSelectedCategories(removedList);
//     }
//   }
  

//   const resetCategory = () => {
//     setSelectedCategories([]);
//   }
//   const resetSort = () => {
//     setSelectedSort([]);
//   }

//   useEffect(() => {
//     if(selectedCategories.length === 0 ){
//         setFilteredProductList(productList);
//     } else{
//         setFilteredProductList(productList.filter((item)=>(selectedCategories.includes(item.category ))));
//     }
//   }, [selectedCategories, productList])
//   useEffect(()=>{

//   },[])

//   const getCategories = async () => {
//     setLoading(true);

//     await fetch('https://dummyjson.com/products/categories')
//     .then(res => res.json())
//     .then(data => {
//         setCategories(data);
//     })
//     .catch(err => alert(err))
//     .finally(()=>{
//         setLoading(false);
//     })
//   }

//   const getProducts = async () => {
//     setLoading(true);
    
//     await fetch('https://dummyjson.com/products')
//     .then(res => res.json())
//     .then(data => {
//         setProductList(data.products);
//         setFilteredProductList(data.products);
//         getCategories(); // get the categories list
//     })
//     .catch(err => alert(err))
//     .finally(()=>{
//         setLoading(false);
//     })
//   }
// console.log(categories)
//   useEffect(() => {
//     getProducts();
//   }, [])
  
//   return (
//     <div className='w-screen h-screen px-5 bg-gray-100 flex justify-center items-center'>
//         <div className='w-full flex h-[90%] rounded-md bg-white'> 
//         <div className='relative w-[300px] h-[100%] items-center overflow-y-auto'>
//                 <span className='mx-3 ml-5 font-medium'> Categories: </span>
//                 {
//                     categories.map((category) => (
//                         <div
//                             onClick={() => {
//                                 if(selectedCategories.includes(category)){
//                                     removeCategory(category);
//                                 } else{
//                                     addCategory(category);
//                                 }
//                             }} 
//                             className={`w-fit  min-w-[200px] h-8 mx-2 px-5 py-2 flex flex-row justify-center items-center text-sm border break-keep rounded-3xl cursor-pointer transition-all duration-300 ${(selectedCategories.includes(category))?'border-blue-500 bg-blue-500 text-white':' border-gray-500 bg-white text-gray-900'} `}>
//                             {category.split("-").join(" ")}
//                         </div>
//                     ))
//                 }
//                 <div
//                     onClick={() => resetCategory()} 
//                     className={`${(selectedCategories.length>0)?'opacity-100':'opacity-0 pointer-events-none'} sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer hover:text-blue-700 transition-all duration-300`}
//                 >
//                     clear
//                 </div>
//             </div>
           
            
//             <ProductList filteredProductList={fileredProductList} loading={loading} />
//             <div className='absolute w-[200px] right-0 t-0'>
//                 <select className='mx-3 p-2 m-2 text-sm ml-5 font-medium'> <option value="sort" disabled>Sort </option>
//                 <option value="High to Low">High to Low</option>
//                 <option value="Low to High">Low to High</option>
//                 <option value="Newest">Newest</option> </select>
                
//                 {/* <div
//                     onClick={() => resetCategory()} 
//                     className={`${(selectedCategories.length>0)?'opacity-100':'opacity-0 pointer-events-none'} sticky right-0 w-fit h-full px-5 flex justify-center items-center text-blue-500 bg-white backdrop-blur-lg cursor-pointer hover:text-blue-700 transition-all duration-300`}
//                 >
//                     clear
//                 </div> */}
//             </div>
//         </div>
//     </div>
//   )
// }

// export default FilterSection