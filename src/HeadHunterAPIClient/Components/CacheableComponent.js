export default class CacheableComponent{
	/**
	 * @type {object}
	 * @private
	 */
	static __cache={};

	/**
	 * @param {string} cacheKey
	 * @param {function} [callable]
	 *
	 * @return {*|null}
	 *
	 * @protected
	 */
	static getFromCacheOrExecuteAndCache(cacheKey,callable){
		const container=this.getCacheContainer();
		if(cacheKey in container)
			return container[cacheKey];

		if(callable)
			return container[cacheKey]=callable();

		return null;
	}

	/**
	 * @return {Object}
	 * @protected
	 */
	static getCacheContainer(){
		return this.__cache;
	}
}