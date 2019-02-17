import APIClient from "../../HeadHunterAPIClient/APIClient";
import SearchService from "./SearchService";
import SelectFilter from "./SelectFilter";
import SidebarFilter from "./SidebarFilter";
import React from "react";

export default class LocationFilter extends SelectFilter{
	listenerIndex;
	selectPlaceholder;
	dependOnLocation;

	/**
	 * @return {void}
	 */
	subscribe(){
		this.listenerIndex=SearchService[`on${this.dependOnLocation}Changed`](locationId=>{
			if(!locationId){
				this.setState({
					list:[]
				});
				this.selectedOptionChanged(null);

				return;
			}

			APIClient.areas.getAreasByParentAreaId(locationId).then(list=>{
				this.setState({
					list:LocationFilter.dictionaryItemsToOptionsList(list)
				});

				this.selectedOptionChanged(null);
			});
		});
	}

	/**
	 * @return {void}
	 */
	componentDidMount(){
		this.subscribe();
	}

	/**
	 * @return {void}
	 */
	componentWillUnmount(){
		SearchService.unsubscribe(
			`on${this.dependOnLocation}Changed`,
			this.listenerIndex
		);
	}

	/**
	 * @param {object} selectedOption
	 */
	selectedOptionChanged(selectedOption){
		super.selectedOptionChanged(selectedOption);

		this.dispatch(
			selectedOption?
				selectedOption.value:
				selectedOption
		);
	}

	/**
	 * @param {number|null} [selectedOption]
	 * @abstract
	 */
	dispatch(selectedOption=null){}

	/**
	 * @return {string}
	 */
	render(){
		return <SidebarFilter title={this.selectPlaceholder}>
			{super.render()}
		</SidebarFilter>;
	}
}