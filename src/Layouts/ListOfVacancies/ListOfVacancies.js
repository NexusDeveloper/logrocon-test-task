import React,{Component} from 'react';
import propTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import BlockContainer from "../../Components/BlockContainer/BlockContainer";
import CountryField from "../../Components/SearchFields/Country/CountryField";
import CityField from "../../Components/SearchFields/City/CityField";
import RegionField from "../../Components/SearchFields/Region/RegionField";
import ExperienceField from "../../Components/SearchFields/Experience/ExperienceField";
import LabelsField from "../../Components/SearchFields/Labels/LabelsField";
import TextField from "../../Components/SearchFields/Text/TextField";
import SearchService from "../../Components/SearchFields/SearchService";
import VacancyListItem from "../../Components/VacancyListItem/VacancyListItem";

export default class ListOfVacancies extends Component{
	listenerIndex;

	static routePath='/';

	static propTypes={
		params:propTypes.shape({
			startPage:propTypes.number.isRequired
		}).isRequired
	};

	static defaultProps={
		params:{
			startPage:1
		}
	};

	/**
	 * @param {object} props
	 */
	constructor(props){
		super(props);

		this.state={
			initialized:false,
			pages:0,
			perPage:5,
			page:props.params.startPage,
			vacancies:[]
		}
	}

	/**
	 * @return {void}
	 */
	componentDidMount(){
		let timer=0,
			inProcess=false;

		this.listenerIndex=SearchService.onChange((someParameter)=>{
			if(inProcess)
				return;

			clearTimeout(timer);
			timer=setTimeout(()=>{
				inProcess=true;

				SearchService.getVacancies(
					this.state.page-1,
					this.state.perPage
				).then(collection=>{
					inProcess=false;

					this.setState({
						initialized:true,
						pages:collection.pages,
						vacancies:collection.items
					});
				});
			},someParameter===undefined?0:1000);
		});

		SearchService.change();
	}

	/**
	 * @return {void}
	 */
	componentWillUnmount(){
		SearchService.unsubscribe(
			SearchService.EVENTS.ANY,
			this.listenerIndex
		);
	}

	/**
	 * @return {Array}
	 */
	getVacanciesList(){
		return this.state.vacancies.map((item,i)=>{
			return <VacancyListItem vacancy={item} key={i}/>;
		});
	}

	/**
	 * @return {string|null}
	 */
	renderPagination(){
		if(this.state.pages<=1)
			return null;

		return <div className="pagination-wrapper">
			<ReactPaginate pageCount={this.state.pages}
			               pageRangeDisplayed={5}
			               marginPagesDisplayed={1}

			               previousLabel={'Назад'}
			               nextLabel={'Вперед'}
			               breakLabel={'...'}

			               onPageChange={({selected:pageIndex})=>{
				               this.setState({
					               page:++pageIndex
				               });

				               SearchService.change();
			               }}
			               hrefBuilder={num=>'#'+num}

			               containerClassName={'pagination'}
			               subContainerClassName={'pages pagination'}


			               pageClassName={'page-item'}
			               breakClassName={'page-item disabled'}
			               previousClassName={'page-item'}
			               nextClassName={'page-item'}

			               pageLinkClassName={'page-link'}
			               breakLinkClassName={'page-link'}
			               previousLinkClassName={'page-link'}
			               nextLinkClassName={'page-link'}

			               activeClassName={'active'}/>
		</div>;
	}

	/**
	 * @return {string}
	 */
	render(){
		let list=this.getVacanciesList();
		if(!list.length)
			list=<div className="text-center text-muted">
				{this.state.initialized?'Ничего не найдено':'Загрузка...'}
			</div>;


		return <div className="row">
			<div className="col-12 col-md-3 sidebar">
				<BlockContainer>
					<CountryField/>
					<RegionField/>
					<CityField/>
					<ExperienceField/>
					<LabelsField/>
				</BlockContainer>
			</div>
			<div className="col content">
				<BlockContainer>
					<TextField/>
				</BlockContainer>
				<BlockContainer>
					{list}
					{this.renderPagination()}
				</BlockContainer>
			</div>
		</div>;
	}
}