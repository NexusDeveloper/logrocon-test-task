import LocationFilter from "../LocationFilter";
import SearchService from "../SearchService";

export default class CityField extends LocationFilter{
	/**
	 * @param {object} props
	 */
	constructor(props){
		super(props);

		this.selectPlaceholder='Город';
		this.dependOnLocation='Region';
	}

	/**
	 * @param {number|null} [selectedOption]
	 */
	dispatch(selectedOption=null){
		SearchService.saveCityId(
			selectedOption?
				+selectedOption:
				selectedOption
		);
	}
}