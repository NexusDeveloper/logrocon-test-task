import Area from "./Area";

export default class Country extends Area{
	/**
	 * @param {string} url
	 * @param {number} id
	 * @param {string} name
	 */
	constructor({url,id,name}){
		super({
			url,
			id,
			name,
			parent_id:0
		});
	}
}