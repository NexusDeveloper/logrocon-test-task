import {createStore} from "redux";
import RootReducer from "./Reducers/RootReducer";

/**
 * @type {StoreInterface}
 */
export const Store=createStore(RootReducer);
