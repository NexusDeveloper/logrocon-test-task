import React,{Component} from 'react';
import propTypes from 'prop-types';

export default class SidebarFilter extends Component{
	static propTypes={
		title:propTypes.string.isRequired
	};

	/**
	 * @return {string}
	 */
	render(){
		return <div className="form-group mb-4">
			<label>{this.props.title}</label>
			{this.props.children}
		</div>;
	}
}