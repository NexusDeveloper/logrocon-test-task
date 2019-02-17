import React,{Component} from 'react';
import propTypes from 'prop-types';
import APIClient from "../../HeadHunterAPIClient/APIClient";
import BlockContainer from "../../Components/BlockContainer/BlockContainer";
import ListOfVacancies from "../ListOfVacancies/ListOfVacancies";
import {Link} from "react-router-dom";
import SidebarFilter from "../../Components/SearchFields/SidebarFilter";

export default class VacancyDetails extends Component{
	static routePath='/detail/:vacancyId';

	static propTypes={
		match:propTypes.shape({
			params:propTypes.shape({
				vacancyId:propTypes.string.isRequired
			}).isRequired
		}).isRequired
	};

	constructor(props){
		super(props);

		this.state={
			vacancy:undefined
		};
	}

	/**
	 * @param {number} itemId
	 * @return {string}
	 */
	static getURL(itemId){
		return this.routePath.replace(/:\w+/i,itemId);
	}

	/**
	 * @return {void}
	 */
	componentDidMount(){
		APIClient.vacancies.getById(
			+this.props.match.params.vacancyId
		).then(
			vacancy=>this.setState({vacancy})
		);
	}

	/**
	 * @return {string}
	 */
	render(){
		/** @type {Vacancy} vacancy */
		const vacancy=this.state.vacancy;
		if(!vacancy)
			return <div className="text-center text-muted">
				Загрузка...
			</div>;


		return <div className="row">
			<div className="col-12 col-md-3 sidebar">
				<BlockContainer>
					<SidebarFilter title="Работодатель">
						<div>
							<img src={vacancy.employer.logo_urls[90]}
							     alt={vacancy.employer.name}
							     className="pull-left mr-3"
							     style={{maxWidth:70}}/>
							{vacancy.employer.name}
						</div>
					</SidebarFilter>
					{!vacancy.salary?
						null:
						<SidebarFilter title="Зар. плата">
							<div>
								<strong>
									от {vacancy.salary.from} до {vacancy.salary.to} {vacancy.salary.currency}
								</strong>
							</div>
						</SidebarFilter>
					}
					<SidebarFilter title="Ключевые навыки">
						<div>
							{(vacancy.key_skills||[]).map(({name:title})=>{
								return <span className="badge badge-sm badge-info mr-1" key={title}>{title}</span>;
							})}
						</div>
					</SidebarFilter>
				</BlockContainer>
			</div>
			<div className="col content">
				<BlockContainer>
					<div className="row">
						<div className="col-4 col-sm-2">
							<Link to={ListOfVacancies.routePath}
							      className="btn btn-block btn-info">
								&laquo; Назад
							</Link>
						</div>
						<div className="col">
							<input type="text"
							       readOnly={true}
							       className="form-control"
							       defaultValue={vacancy.alternate_url}
							       onClick={e=>e.target.select()}/>
						</div>
						<div className="col-4 col-sm-2">
							<a href={vacancy.alternate_url}
							   target="_blank"
							   rel="noopener noreferrer"
							   className="btn btn-block btn-secondary">
								К hh.ru
							</a>
						</div>
					</div>
				</BlockContainer>
				<BlockContainer>
					<div className="title mb-2">
						<h1 className="h2 mb-0">{vacancy.name}</h1>
						<span className="badge badge-sm badge-secondary">
							{vacancy.type.name}
						</span>
					</div>
					<div className="info mb-3">
						<div>Занятность: {vacancy.employment.name}, {vacancy.schedule.name}</div>
						<div>Требуемый опыт работы: {vacancy.experience.name}</div>
					</div>
					<div className="description"
					     dangerouslySetInnerHTML={{
					     	__html:vacancy.description
					     }}/>
				</BlockContainer>
			</div>
		</div>;
	}
}