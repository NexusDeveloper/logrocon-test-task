import React,{Component} from 'react';
import {Provider} from "react-redux";
import {Store} from "./Redux/Store";
import ApplicationRouter from "./ApplicationRouter";

export default class Bootstrap extends Component{
	/**
	 * @return {string}
	 */
	render(){
		return <Provider store={Store}>
			<ApplicationRouter/>
		</Provider>;
	}
}