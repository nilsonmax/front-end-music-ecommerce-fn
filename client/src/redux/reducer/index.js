import { combineReducers } from "redux";
// import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import reducer from "./instrumentsReducers";

const rootReducers = combineReducers({
    reducer,
    cart: cartReducers,
    // products: productReducers,
});

export default rootReducers