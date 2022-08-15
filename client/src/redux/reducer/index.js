import { combineReducers } from "redux";
// import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import reducer from "./instrumentsReducers";
import adminsReducer from "./adminsReducer"

const rootReducers = combineReducers({
    reducer,
    cart: cartReducers,
    admins: adminsReducer
    // products: productReducers,
});

export default rootReducers