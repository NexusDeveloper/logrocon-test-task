import React,{Component} from 'react';
import propTypes from 'prop-types';
import Vacancy from "../../HeadHunterAPIClient/Components/Vacancies/Vacancy";
import './VacancyListItem.css';
import {Link} from "react-router-dom";
import VacancyDetails from "../../Layouts/VacancyDetails/VacancyDetails";

export default class VacancyListItem extends Component{
	static propTypes={
		vacancy:propTypes.instanceOf(Vacancy).isRequired
	};

	/**
	 * @return {string}
	 */
	render(){
		/** @type {Vacancy} vacancy*/
		const vacancy=this.props.vacancy;

		return <div className="vacancy-item">
			<div className="vacancy-item__title">{vacancy.name}</div>
			<div className="vacancy-item__employer-name">
				Работодатель: {vacancy.employer.name}
			</div>
			<div className="mt-3">
				<Link to={VacancyDetails.getURL(vacancy.id)} className="btn btn-primary btn-sm">Подробнее</Link>
			</div>
		</div>
	}
}