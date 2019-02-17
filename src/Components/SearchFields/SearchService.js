import SearchServiceEmitter from './SearchServiceEmitter';
import SearchParams from "../../HeadHunterAPIClient/Components/Vacancies/SearchParams";
import APIClient from "../../HeadHunterAPIClient/APIClient";

export default class SearchService extends SearchServiceEmitter{

	/**
	 * @param {int} [page]
	 * @param {int} [perPage]
	 * @return {Promise<VacanciesCollection>}
	 */
	static async getVacancies(page,perPage){
		const params=this.getSearchParams();
		if(page)
			params.page=page;

		if(perPage)
			params.per_page=perPage;


		return APIClient.vacancies.search(params);
	}

	/**
	 * @return {SearchParams}
	 */
	static getSearchParams(){
		const params=new SearchParams();

		['countryId','regionId','cityId'].forEach(key=>{
			if(this.state[key])
				params.area=this.state[key];
		});

		if(this.state.queryText){
			params.text=this.state.queryText;
			params.no_magic=false;
		}

		if(this.state.experience)
			params.experience=this.state.experience;

		if(this.state.vacancyLabels)
			params.label=this.state.vacancyLabels;


		return params;
	}
}