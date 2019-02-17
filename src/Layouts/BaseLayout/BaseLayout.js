import React,{Component} from 'react';
import './BaseLayout.css';

export default class BaseLayout extends Component{
	/**
	 * @return {string}
	 */
	render(){
		return <div className="container pt-5">
			{this.props.children}
		</div>;
	}
}