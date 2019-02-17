import CacheableComponent from "../CacheableComponent";
import APIClient from "../../APIClient";
import Country from "./Country";
import Area from "./Area";

export default class AreasDictionary extends CacheableComponent{

	/**
	 * @return {Promise<Country[]>}
	 */
	async countries(){
		return AreasDictionary.getFromCacheOrExecuteAndCache('areas/countries',()=>{
			return APIClient.makeRequest('areas/countries').then(
				res=>res.json()
			);
		}).then(list=>{
			return (list||[]).map(item=>new Country(item));
		});
	}

	/**
	 *
	 * @param parentAreaId
	 * @return {Promise<Area[]>}
	 */
	async getAreasByParentAreaId(parentAreaId){
		return AreasDictionary.getFromCacheOrExecuteAndCache(`areas/${parentAreaId}`,()=>{
			return APIClient.makeRequest(`areas/${parentAreaId}`).then(
				res=>res.json()
			);
		}).then(list=>{
			return (list.areas||[]).map(item=>new Area(item));
		});
	}

	/**
	 * @param {number} countryId
	 * @return {Promise<Area[]>}
	 */
	async getCitiesByCountryId(countryId){
		return this.getAreasByParentAreaId(countryId);
	}
}