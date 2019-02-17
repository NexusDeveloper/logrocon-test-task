import FiltersActions from "../Actions/FiltersActions";

const initialState={
	countryId:null,
	regionId:null,
	cityId:null
};

export default function FiltersReducer(state=initialState,action){
	if(!FiltersActions.isOwnAction(action))
		return state;

	return Object.keys(initialState).reduce((res,key)=>{
		res[key]=action[key]||initialState[key];

		return res;
	},{});
};