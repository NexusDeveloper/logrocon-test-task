import EventEmitter from "../EventEmitter";

export default class SearchServiceEmitter extends EventEmitter{
	static EVENTS={
		ANY:'any',
		COUNTRY_CHANGED:'country-changed',
		REGION_CHANGED:'region-changed',
		CITY_CHANGED:'city-changed',
		EXPERIENCE_CHANGED:'experience-changed',
		VACANCY_LABELS_CHANGED:'vacancy-labels-changed',
		QUERY_TEXT_CHANGED:'query-text-changed',
	};

	/**
	 * @type {object}
	 */
	static state={
		countryId:null,
		regionId:null,
		cityId:null,
		experience:null,
		vacancyLabels:null,
		queryText:null,
	};


	/**
	 * @param {number} countryId
	 */
	static saveCountryId(countryId){
		this.state.countryId=countryId;
		this.emit(this.EVENTS.COUNTRY_CHANGED,[countryId]);
	}

	/**
	 * @param {number} regionId
	 */
	static saveRegionId(regionId){
		this.state.regionId=regionId;
		this.emit(this.EVENTS.REGION_CHANGED,[regionId]);
	}

	/**
	 * @param {number} cityId
	 */
	static saveCityId(cityId){
		this.state.cityId=cityId;
		this.emit(this.EVENTS.CITY_CHANGED,[cityId]);
	}

	/**
	 * @param experience
	 */
	static saveExperience(experience){
		this.state.experience=experience;
		this.emit(this.EVENTS.EXPERIENCE_CHANGED,[experience]);
	}

	/**
	 * @param vacancyLabels
	 */
	static saveVacancyLabels(vacancyLabels){
		this.state.vacancyLabels=vacancyLabels;
		this.emit(this.EVENTS.VACANCY_LABELS_CHANGED,[vacancyLabels]);
	}

	/**
	 * @param {string} queryText
	 */
	static saveQueryText(queryText){
		this.state.queryText=queryText;
		this.emit(this.EVENTS.QUERY_TEXT_CHANGED,[queryText]);
	}

	/**
	 * @return {void}
	 */
	static change(){
		this.emit(this.EVENTS.ANY);
	}


	/**
	 * @param {function} listener
	 */
	static onChange(listener){
		this.subscribe(this.EVENTS.ANY,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onCountryChanged(listener){
		this.subscribe(this.EVENTS.COUNTRY_CHANGED,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onRegionChanged(listener){
		this.subscribe(this.EVENTS.REGION_CHANGED,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onCityChanged(listener){
		this.subscribe(this.EVENTS.CITY_CHANGED,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onExperienceChanged(listener){
		this.subscribe(this.EVENTS.EXPERIENCE_CHANGED,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onVacancyLabelsChanged(listener){
		this.subscribe(this.EVENTS.VACANCY_LABELS_CHANGED,listener);
	}

	/**
	 * @param {function} listener
	 */
	static onQueryTextChanged(listener){
		this.subscribe(this.EVENTS.QUERY_TEXT_CHANGED,listener);
	}


	/**
	 * @param {string} event
	 * @param {array} [parameters]
	 * @protected
	 */
	static emit(event,parameters){
		super.emit(event,parameters);

		if(event!==this.EVENTS.ANY)
			this.emit(this.EVENTS.ANY,parameters);
	}
}