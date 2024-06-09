import React from "react";
import Header from './components/Header';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';
import store from './store';
import Tabs, { TabType } from './components/Tabs';

export default class App extends React.Component {
	constructor() {
		super();
		
		this.state = {
			searchKeyword: "",
			searchResult: "",
			submitted: false,
			selectedTab: TabType.KEYWORD,
		}
	}
	
	handleChangeInput(searchKeyword) {
		if (searchKeyword.length <= 0) {
			this.handleReset();
		}
		this.setState({ searchKeyword });
	}
	
	search(searchKeyword) {
		const searchResult = store.search(searchKeyword);
		
		this.setState({
			searchResult,
			submitted: true,
		})
	}
	
	handleReset() {
		this.setState({
			searchKeyword: "",
			submitted: false,
			searchResult: [],
		})
	}
	
	render() {
		const { searchKeyword, searchResult, submitted, selectedTab } = this.state;
		
		return (
			<>
				<Header title="검색"/>
				<div className='container'>
					<SearchForm 
						value={searchKeyword}
						onChange={(value) => this.handleChangeInput(value)}
						onSubmit={(searchKeyword) => this.search(searchKeyword)} 
						onReset={() => this.handleReset()}
					/>
					<div className='content'>
						{submitted ? (
								<SearchResult data={searchResult} /> 
							) : (
								<>
									<Tabs 
										selectedTab={selectedTab} 
										onChange={(selectedTab) => this.setState({ selectedTab })} 
									/>
									{selectedTab === TabType.KEYWORD && <>TODO: 추천검색어 목록</>}
									{selectedTab === TabType.HISTORY && <>TODO: 최근검색어 목록</>}
								</>
							)
						}
					</div>
				</div>
			</>
		);
	}
}