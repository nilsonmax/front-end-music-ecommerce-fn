import { combineReducers } from "redux";
// import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import reducer from "./instrumentsReducers";
import adminsReducer from "./adminsReducer"
import historyshopsReducer from "./Historyshops";

const rootReducers = combineReducers({
    reducer,
    cart: cartReducers,
    admins: adminsReducer,
    admins: adminsReducer,
    historyshops:historyshopsReducer
});

export default rootReducers