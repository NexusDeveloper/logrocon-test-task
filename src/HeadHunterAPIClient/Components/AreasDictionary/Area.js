import APIClient from "../../APIClient";
import AbstractModel from "../../AbstractModel";

export default class Area extends AbstractModel{
	url;
	id;
	parent_id;
	name;

	/**
	 * @param {string} url
	 * @param {number} id
	 * @param {string} name
	 * @param {number} parent_id
	 */
	constructor({url,id,name,parent_id}){
		super({
			url,
			id,
			name,
			parent_id
		});
	}

	/**
	 * @return {Promise<Area[]>}
	 */
	async getChildrenAreas(){
		return APIClient.areas.getAreasByParentAreaId(this.parent_id);
	}
}