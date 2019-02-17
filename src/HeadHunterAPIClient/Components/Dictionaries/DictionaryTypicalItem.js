import AbstractModel from "../../AbstractModel";

export default class DictionaryTypicalItem extends AbstractModel{
	id;
	name;

	/**
	 * @param {string} id
	 * @param {string} name
	 */
	constructor({id,name}){
		super({
			id,
			name
		});
	}
}