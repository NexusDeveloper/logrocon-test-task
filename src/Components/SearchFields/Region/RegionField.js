import LocationFilter from "../LocationFilter";
import SearchService from "../SearchService";

export default class RegionField extends LocationFilter{
	/**
	 * @param {object} props
	 */
	constructor(props){
		super(props);

		this.selectPlaceholder='Область';
		this.dependOnLocation='Country';
	}

	/**
	 * @param {number|null} [selectedOption]
	 */
	dispatch(selectedOption=null){
		SearchService.saveRegionId(
			selectedOption?
				+selectedOption:
				selectedOption
		);
	}
}