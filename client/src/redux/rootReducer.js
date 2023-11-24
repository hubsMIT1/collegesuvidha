import { combineReducers } from 'redux';
import authReducer from './authData/authReducer';
import userReducer from './userData/userReducer';
import productReducer from './productData/productReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  productData:productReducer,
});

export default rootReducer;
