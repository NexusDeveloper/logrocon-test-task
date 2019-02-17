export default class SearchParams{
	search_field;
	employment;
	experience;
	schedule;
	area;
	label;

	period;
	date_from;
	date_to;

	per_page=5;
	page=0;

	order_by;

	text;
	no_magic=true;

	/**
	 * @param {object} [parameters]
	 */
	constructor(parameters){
		Object.keys(parameters||{}).forEach(key=>{
			if(key in this)
				this[key]=parameters[key];
		});
	}

	/**
	 * @param {object} [node]
	 * @param {string} [parent]
	 * @return {string|string[]}
	 */
	toQueryString(node,parent=''){
		node=node||this;
		const params=[];

		for(let prop in node){
			if(!node.hasOwnProperty(prop))
				continue;

			const value=node[prop];
			const isScalar=['boolean','null','undefined','number','string','symbol'].indexOf(typeof value)>=0;

			if(parent)
				prop=`${parent}[${prop}]`;

			if(isScalar){
				params.push(`${prop}=${value+''}`);

				continue;
			}

			if(value instanceof Array){
				/*
				 * https://github.com/hhru/api/blob/master/docs/vacancies.md#search
				 * Multiple values format: key=value&key=value
				 */
				value.forEach(
					value=>params.push(`${prop}=${value}`)
				);

				continue;
			}

			this.toQueryString(value,prop).forEach(params.push);
		}
		if(parent)
			return params;


		return params.join('&');
	}
}