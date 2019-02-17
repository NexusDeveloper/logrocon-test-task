/**
 * @abstract
 */
export default class AbstractModel{
	/**
	 * @param {object} properties
	 */
	constructor(properties){
		if(properties)
			this.fill(properties);

		Object.freeze(this);
	}

	/**
	 * @param {object} properties
	 * @return {AbstractModel}
	 * @protected
	 */
	fill(properties){
		Object.keys(properties).forEach(key=>{
			//TODO: write filter of properties
			this[key]=properties[key];
		});

		return this;
	}
}