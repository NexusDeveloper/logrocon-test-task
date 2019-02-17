import APIClient from "../../APIClient";
import DictionaryTypicalItem from "./DictionaryTypicalItem";
import CacheableComponent from "../CacheableComponent";
import AreasDictionary from "../AreasDictionary/AreasDictionary";

export default class Dictionaries extends CacheableComponent{
	/**
	 * @type {Promise|boolean}
	 * @private
	 */
	static __cached=false;

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async employment(){
		return this.getArrayOfTypicalItems('employment');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async experience(){
		return this.getArrayOfTypicalItems('experience');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async schedule(){
		return this.getArrayOfTypicalItems('schedule');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async gender(){
		return this.getArrayOfTypicalItems('gender');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async vacancySearchFields(){
		return this.getArrayOfTypicalItems('vacancy_search_fields');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async vacancySearchOrder(){
		return this.getArrayOfTypicalItems('vacancy_search_order');
	}

	/**
	 * @return {Promise<DictionaryTypicalItem[]>}
	 */
	async vacancyLabel(){
		return this.getArrayOfTypicalItems('vacancy_label');
	}

	/**
	 * @return {AreasDictionary}
	 */
	areas(){
		return new AreasDictionary();
	}

	/**
	 * @return {Promise<void>}
	 * @protected
	 */
	static async loadDictionaries(){
		const cache=this.getCacheContainer();
		if(this.__cached===true)
			return;

		if(this.__cached instanceof Promise){
			await this.__cached;

			return;
		}

		this.__cached=APIClient.makeRequest('dictionaries').then(
			res=>res.json()
		).then(dictionaries=>{
			this.__cached=true;

			Object.keys(dictionaries).forEach(key=>{
				cache[key]=dictionaries[key];
			});
		});

		await this.__cached;
	}

	/**
	 * @param {string} cacheItem
	 * @param {function} [dataGetter]
	 * @return {Promise<DictionaryTypicalItem[]>}
	 * @protected
	 */
	async getArrayOfTypicalItems(cacheItem,dataGetter){
		await Dictionaries.loadDictionaries();
		const dictionary=await Dictionaries.getFromCacheOrExecuteAndCache(cacheItem,dataGetter);


		return (dictionary||[]).map(
			item=>new DictionaryTypicalItem(item)
		);
	}
}