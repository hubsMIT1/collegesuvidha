import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userData/userReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;
