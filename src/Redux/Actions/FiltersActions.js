export default class FiltersActions{
	static COUNTRY_CHANGED='country-changed';
	static REGION_CHANGED='region-changed';
	static CITY_CHANGED='city-changed';

	/**
	 * @param {number} countryId
	 * @return {object}
	 */
	static countryChanged(countryId){
		return this.makeEvent(FiltersActions.COUNTRY_CHANGED,{countryId});
	}

	/**
	 * @param {number} regionId
	 * @return {object}
	 */
	static regionChanged(regionId){
		return this.makeEvent(FiltersActions.REGION_CHANGED,{regionId});
	}

	/**
	 * @param {number} cityId
	 * @return {object}
	 */
	static cityChanged(cityId){
		return this.makeEvent(FiltersActions.CITY_CHANGED,{cityId});
	}

	/**
	 * @param {string} type
	 * @param {object} properties
	 * @return {object}
	 * @protected
	 */
	static makeEvent(type,properties){
		return {type,...properties};
	}

	/**
	 * @param {string} actionType
	 * @return {boolean}
	 */
	static isOwnAction({type:actionType}){
		return Object.keys(this).map(key=>(this[key])).indexOf(actionType)>=0;
	}
}