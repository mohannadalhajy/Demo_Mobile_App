import {combineReducers} from 'redux';
import UserReducer from '../redux/auth/reducer';
import offerReducer from '../redux/offers/reducer';

const allReducers = combineReducers({
   User : UserReducer,
   Offers : offerReducer
});
export default allReducers;
 