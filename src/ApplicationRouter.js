import React,{Component} from 'react';
import {Route,Switch} from "react-router";
import {BrowserRouter as Router} from "react-router-dom";
import BaseLayout from "./Layouts/BaseLayout/BaseLayout";
import ListOfVacancies from "./Layouts/ListOfVacancies/ListOfVacancies";
import VacancyDetails from "./Layouts/VacancyDetails/VacancyDetails";

export default class ApplicationRouter extends Component{
	/**
	 * @return {string}
	 */
	render(){
		return <Router>
			<BaseLayout>
				<Switch>
					<Route path={ListOfVacancies.routePath} component={ListOfVacancies} exact/>
					<Route path={VacancyDetails.routePath} component={VacancyDetails}/>
				</Switch>
			</BaseLayout>
		</Router>;
	}
}