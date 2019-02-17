/**
 * @interface
 */
class StoreInterface{
	/**
	 * @return {any}
	 */
	getState(){}

	/**
	 * @param {function} Listener
	 */
	subscribe(Listener){}

	/**
	 * @param {ActionInterface} Action
	 */
	dispatch(Action){}

	/**
	 * @param {ReducerInterface} nextReducer
	 */
	replaceReducer(nextReducer){}
}