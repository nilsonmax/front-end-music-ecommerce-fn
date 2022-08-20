import { combineReducers } from "redux";
// import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import reducer from "./instrumentsReducers";
import adminsReducer from "./adminsReducer"
import favoritesReducers from "./favoritesReducers"
import historyshopsReducer from "./Historyshops"

const rootReducers = combineReducers({
    reducer,
    favorites: favoritesReducers,
    cart: cartReducers,
    admins: adminsReducer,
    historyshops: historyshopsReducer
});

export default rootReducers