import APIClient from "../../../HeadHunterAPIClient/APIClient";
import LocationFilter from "../LocationFilter";
import SearchService from "../SearchService";

export default class CountryField extends LocationFilter{
	/**
	 * @param {object} props
	 */
	constructor(props){
		super(props);

		this.selectPlaceholder='Страна';
	}

	/**
	 * @param {number|null} [selectedOption]
	 */
	dispatch(selectedOption=null){
		SearchService.saveCountryId(
			selectedOption?
				+selectedOption:
				selectedOption
		);
	}

	/**
	 * @return {void}
	 */
	componentDidMount(){
		APIClient.areas.countries().then(list=>{
			this.setState({
				list:CountryField.dictionaryItemsToOptionsList(list)
			});
		});
	}
}