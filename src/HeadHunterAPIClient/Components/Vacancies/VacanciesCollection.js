import AbstractModel from "../../AbstractModel";
import Vacancy from "./Vacancy";

export default class VacanciesCollection extends AbstractModel{
	/** @type {Vacancy[]} */
	items;
	pages;
	perPage;
	curPage;
	foundVacancies;

	/**
	 * @param {object} props
	 */
	constructor(props){
		super({
			curPage:props.page,
			perPage:props.per_page,
			pages:props.pages,
			foundVacancies:props.found,
			items:props.items.map(item=>new Vacancy(item))
		});
	}
}