import APIClient from "../../APIClient";
import VacanciesCollection from "./VacanciesCollection";
import CacheableComponent from "../CacheableComponent";
import Vacancy from "./Vacancy";

export default class Vacancies extends CacheableComponent{

	/**
	 * @param {number} vacancyId
	 * @return {Promise<Vacancy>}
	 */
	async getById(vacancyId){
		const requestURI=`vacancies/${vacancyId}`;

		return CacheableComponent.getFromCacheOrExecuteAndCache(requestURI,()=>{
			return APIClient.makeRequest(requestURI).then(
				res=>res.json()
			).then(vacancy=>{
				return new Vacancy(vacancy);
			});
		});
	}

	/**
	 * @param {SearchParams} searchParams
	 * @return {Promise<VacanciesCollection>}
	 */
	async search(searchParams){
		const requestURI=`vacancies?${searchParams.toQueryString()}`;

		return CacheableComponent.getFromCacheOrExecuteAndCache(requestURI,()=>{
			return APIClient.makeRequest(requestURI).then(
				res=>res.json()
			).then(collection=>{
				return new VacanciesCollection(collection);
			});
		});
	}

	/**
	 * @param {string} string
	 * @param {SearchParams} searchParams
	 * @return {Promise<VacanciesCollection>}
	 */
	async searchByString(string,searchParams){
		searchParams.text=string;
		searchParams.no_magic=false;

		return this.search(searchParams);
	}
}