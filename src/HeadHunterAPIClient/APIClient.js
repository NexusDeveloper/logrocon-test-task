import Vacancies from "./Components/Vacancies/Vacancies";
import Dictionaries from "./Components/Dictionaries/Dictionaries";
import AreasDictionary from "./Components/AreasDictionary/AreasDictionary";

export default class APIClient{
	static BASE_URL='https://api.hh.ru/';

	/**
	 * @return {Vacancies}
	 */
	static get vacancies(){
		return new Vacancies();
	}

	/**
	 * @return {Dictionaries}
	 */
	static get dictionary(){
		return new Dictionaries();
	}

	/**
	 * @return {AreasDictionary}
	 */
	static get areas(){
		return new AreasDictionary();
	}

	/**
	 * @param {string} path
	 * @return {string}
	 */
	static getEndpointUrl(...path){
		let pathParts=[].slice.call(arguments);
		pathParts.unshift(APIClient.BASE_URL);

		return pathParts.map(path=>{
			return path.replace(/^\/+?/,'').replace(/\/+?$/,'');
		}).join('/');
	}

	/**
	 * @param {string} endpointUrl
	 * @param {object} [options]
	 * @return {Promise<Response>}
	 */
	static makeRequest(endpointUrl,options){
		options=options||{};
		options.method=options.method||'get';
		const headers=options.headers||new Headers();
		headers.append('HH-User-Agent','NexusDeveloperReactTestTask/0.1 (artem.nexus94@gmail.com)');
		options.headers=headers;


		return fetch(
			APIClient.getEndpointUrl(endpointUrl),
			options
		);
	}
}