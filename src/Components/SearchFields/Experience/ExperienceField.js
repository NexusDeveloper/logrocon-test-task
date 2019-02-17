import React from 'react';
import APIClient from "../../../HeadHunterAPIClient/APIClient";
import SearchService from "../SearchService";
import SelectFilter from "../SelectFilter";
import SidebarFilter from "../SidebarFilter";

export default class ExperienceField extends SelectFilter{
	/**
	 * @param props
	 */
	constructor(props){
		super(props);

		this.selectPlaceholder='Опыт работы';
	}
	/**
	 * @param {*} [selectedOption]
	 */
	dispatch(selectedOption=null){
		SearchService.saveExperience(
			selectedOption?
				selectedOption.value:
				selectedOption
		);
	}

	/**
	 * @param {object|null} value
	 */
	selectedOptionChanged(value){
		super.selectedOptionChanged(value);

		this.dispatch(value);
	}

	/**
	 * @return {void}
	 */
	componentDidMount(){
		APIClient.dictionary.experience().then(list=>{
			this.setState({
				list:SelectFilter.dictionaryItemsToOptionsList(list)
			});
		});
	}

	/**
	 * @return {string}
	 */
	render(){
		return <SidebarFilter title={this.selectPlaceholder}>
			{super.render()}
		</SidebarFilter>;
	}
}