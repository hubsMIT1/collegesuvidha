import axios from "axios";
// import { BASE_URL,AUTH_API,PRODCUT_API } from "./constants";

const AUTH_API = process.env.REACT_APP_AUTH_API;
const PRODUCT_API = process.env.REACT_APP_PRODUCT_API;

const config = {
  headers: {
    "Content-Type": "application/json",
   
  },
};
const callAuthApi = axios.create({
  baseURL: AUTH_API,
  credentials: 'include',
});
const callProductApi = axios.create({
  baseURL: PRODUCT_API,
})

export  {callAuthApi,config,callProductApi}

// const callApi = async (resource, options = {}) => {
//   try {
//     const defaultOptions = {
//       params: {
//         limit: 18,
//       },
//     };

//     // Merge the default options with custom options
//     const mergedOptions = { ...defaultOptions, ...options };

//     // Create the query parameter string
//     let queryParams = new URLSearchParams(mergedOptions.params).toString();

//     console.log(queryParams);
//     if (Array.isArray(mergedOptions.params.category)) {
//       mergedOptions.params.category.forEach((category) => {
//         queryParams += `&category=${category}`;
//       });
//     }
//     if (mergedOptions.params.skip) {
//       queryParams += `&skip=${mergedOptions.params.skip}`;
//     }
//     if (mergedOptions.params.sorting) {
//       queryParams += `&sorting=${mergedOptions.params.sorting}`;
//     }
//     // Construct the full URL with query parameters
//     const apiUrl = `${BASE_URL}/${resource}?${queryParams}`;

//     const response = await axios.get(apiUrl, config);

//     if (response.status !== 200) {
//       throw new Error(`HTTP Error: ${response.status}`);
//     }

//     const { data } = response;
//     return data;
//   } catch (err) {
//     throw err;
//   }
// };

