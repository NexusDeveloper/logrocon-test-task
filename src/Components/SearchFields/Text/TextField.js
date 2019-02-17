import React,{Component} from 'react';
import SearchService from "../SearchService";

export default class TextField extends Component{
	/**
	 * @param {string} value
	 */
	valueChanged(value){
		SearchService.saveQueryText(value);
	}

	/**
	 * @return {string}
	 */
	render(){
		return <input type="search"
		              className="form-control"
		              placeholder="Ключевые слова"
		              onInput={e=>this.valueChanged(e.target.value)}/>;
	}
}