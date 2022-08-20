import { combineReducers } from "redux";
// import productReducers from "./productReducers";
import cartReducers from "./cartReducers";
import reducer from "./instrumentsReducers";
import adminsReducer from "./adminsReducer"

const rootReducers = combineReducers({
    reducer,
    favorites: favoritesReducers,
    cart: cartReducers,
    admins: adminsReducer,
    admins: adminsReducer,
    historyshops:historyshopsReducer
});

export default rootReducers