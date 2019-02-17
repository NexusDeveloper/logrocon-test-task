import React,{Component} from 'react';
import './BlockContainer.css';

export default class BlockContainer extends Component{
	render(){
		return <div className="block-container">
			{this.props.children}
		</div>
	}
}