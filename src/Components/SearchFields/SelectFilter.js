import React,{Component} from 'react';
import Select from "react-select";

export default class SelectFilter extends Component{
	selectPlaceholder;

	/**
	 * @param {object} props
	 */
	constructor(props){
		super(props);

		this.state={
			selectedOption:props.selectedOption||null,
			list:[]
		};
	}

	/**
	 * Load options list
	 *
	 * @return {void}
	 * @abstract
	 */
	componentDidMount(){}

	/**
	 * @param {object} selectedOption
	 */
	selectedOptionChanged(selectedOption){
		this.setState({selectedOption});
	}

	/**
	 * @return {array}
	 */
	getDefaultOptionList(){
		return [];
	}

	/**
	 * @param {array} items
	 * @param {bool|string|object} prependDefaultOption
	 * @return {{label:string,value:*}[]}
	 */
	static dictionaryItemsToOptionsList(items,prependDefaultOption='Не важно'){
		const list=items.map(item=>({
			label:item.name,
			value:item.id
		}));
		if(!prependDefaultOption)
			return list;

		if(typeof prependDefaultOption==='object')
			list.unshift(prependDefaultOption);
		else
			list.unshift(
				this.createSelectOptionItem(prependDefaultOption,null)
			);


		return list;
	}

	/**
	 * @param {string} label
	 * @param {*} value
	 * @return {{label:string, value:*}}
	 */
	static createSelectOptionItem(label,value){
		return {label,value};
	}

	/**
	 * @return {string}
	 */
	render(){
		return <Select value={this.state.selectedOption||null}
		               placeholder={this.selectPlaceholder}
		               onChange={this.selectedOptionChanged.bind(this)}
		               options={this.state.list||this.getDefaultOptionList()}/>;
	}
}