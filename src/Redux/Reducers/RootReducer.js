import {combineReducers} from "redux";
import FiltersReducer from "./FiltersReducer";

export const RootReducer=combineReducers({
	filters:FiltersReducer
});

export default RootReducer;