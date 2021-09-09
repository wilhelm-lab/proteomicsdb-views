import axios from 'axios';
//import parser from 'fast-xml-parser';
//import he from 'he';

const baseURL = 'https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata';

const storeState = {
	allEntities: []
};

const mutations = {
	setAllEntities(state, allEntities){
		state.allEntities = allEntities;
	}
};

const getters = {
	
};

const actions = {
	loadEntities: ({commit}) => {
		const allEntities = [];
		const urlCollection = [];
		const promises = [];
		axios.get(`${baseURL}?$format=json`)
			.then((response) => {
				const result = response.data;
				const resultArray = result.d.EntitySets;
				const prepResult = [];
				let id = 1;
				resultArray.forEach(element => {
					const newResultObject = {id: id, name: element};
					id++;
					prepResult.push(newResultObject);
					let singleURL = baseURL + "/" + element + "?$top=1&$format=json";
					urlCollection.push(singleURL);
					// ToDo - Manuell samt Hinweis hinzuzufügen in Tree-View (Sonderfälle)
					if (!element.includes('ReferenceFragmentIonParameters') && !element.includes('FragmentIon') && !element.includes('FragmentIonParameters') && !element.includes('ReferenceFragmentIon')) {
						promises.push(axios.get(singleURL));
					}
				});
				return axios.all(promises);
			}) .then(axios.spread((...responses) => {
						responses.forEach(element => {
							allEntities.push(element.data);
						});
						const allEntitiesDetailList = [];
						let incrNumber = 1;
						let overalListNumber = 0;
						allEntities.forEach(element => {
							const elementArray = element.d.results[0];
							if(typeof elementArray !== 'undefined'){
								const entityURL = element.d.results[0].__metadata.uri;
								const entityName = entityURL.substring(
									entityURL.lastIndexOf("/") + 1,
									entityURL.indexOf("(")
								);
								allEntitiesDetailList.push({id: incrNumber, name: entityName, children: [
								]});
								incrNumber++;
								const exampleListObject = {id: incrNumber, name: "GET Request Example", children:[]};
								incrNumber++;
								exampleListObject.children.push({id: incrNumber, name: entityURL});
								incrNumber++;
								allEntitiesDetailList[overalListNumber].children.push(exampleListObject);
								const columnListObject = {id: incrNumber, name: "Columns", children:[]};
								incrNumber++;
								const navigationPropertyListObject = {id: incrNumber, name: "Navigation Properties", children:[]};
								incrNumber++;

								for(const [key, value] of  Object.entries(element.d.results[0])){
									// if value is an Object, it is a Navigation Property
									if(typeof value === 'object'){
										if(key === '__metadata'){
											//do nothing
										}else{
											if(value != null){
												navigationPropertyListObject.children.push({id: incrNumber, name: key, children: [{id: incrNumber++, name: "GET Request Example: " + value.__deferred.uri}]});
												incrNumber++;
											}
										}
									// If not, it is a Column
									}else{
										columnListObject.children.push({id: incrNumber, name: key});
										incrNumber++;
									}
								}

								allEntitiesDetailList[overalListNumber].children.push(columnListObject);
								allEntitiesDetailList[overalListNumber].children.push(navigationPropertyListObject);
								overalListNumber++;
							}
						});
							
					commit('setAllEntities', allEntitiesDetailList);	
				}))
			.catch((error) => {
				console.log(error);
			});
		}
};

export default {
	namespaced: true,
	state: storeState,
	mutations,
	getters,
	actions,
};