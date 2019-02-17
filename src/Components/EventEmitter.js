export default class EventEmitter{
	static listeners={};

	/**
	 * @param {string} event
	 * @param {function} listener
	 * @return {int}
	 * @protected
	 */
	static subscribe(event,listener){
		if(!this.listeners[event])
			this.listeners[event]={};

		const index=Object.keys(this.listeners[event]).length;
		this.listeners[event][index]=listener;


		return index;
	}

	/**
	 * @param {string} event
	 * @param {array} [parameters]
	 * @protected
	 */
	static emit(event,parameters){
		if(!this.listeners[event])
			return;

		Object.values(this.listeners[event]).forEach(listener=>{
			listener(...(parameters||[]));
		});
	}

	/**
	 * @param {string} event
	 * @param {int} index
	 */
	static unsubscribe(event,index){
		if(!this.listeners[event])
			return;

		delete this.listeners[event][index];
	}
}