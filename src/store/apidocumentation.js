import axios from 'axios';
//import parser from 'fast-xml-parser';
//import he from 'he';

const baseURL = 'https://d31.proteomicsdb.in.tum.de/proteomicsdb/logic/api_v2/api.xsodata';

const storeState = {
	allEntities: [],
	allEntitiesDetails: []
};

const mutations = {
	setAllEntities(state, allEntities){
		state.allEntities = allEntities;
		console.log(state.allEntities);
	},
	setAllEntitiesDetails(state, entitiesDetails){
		state.allEntitiesDetails = entitiesDetails;
	}
};

const getters = {
	
};

const actions = {
	loadEntities: ({commit}) => {
		const allEntities = [];
		const urlCollection = [];
		const promises = [];
		//const consumableItemList = [];
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
					if (!element.includes('ReferenceFragmentIonParameters') && !element.includes('FragmentIon') && !element.includes('FragmentIonParameters') && !element.includes('ReferenceFragmentIon')) {
						promises.push(axios.get(singleURL));
					}
					//
					console.log(singleURL);
					console.log(urlCollection);
					//if (!element.includes('Fragment')) {
						
					//}
					
				});
				
				console.log('#####################################################');
				console.log(urlCollection);
				console.log(prepResult);
				console.log(allEntities);
				console.log(result.d.EntitySets);
				console.log(response.data);
				console.log(response.status);
				console.log(response.statusText);
				console.log(response.headers);
				console.log(response.config);
				console.log('#####################################################');
				console.log(promises);
				return axios.all(promises);
				
			}) .then(axios.spread((...responses) => {
					console.log('ES TUTTTTTT');
					console.log(promises);
					console.log(urlCollection);
					console.log(responses[0]);
						responses.forEach(element => {
							//console.log(element.data);
							allEntities.push(element.data);
						});
						console.log('bin hier drin');
						console.log(allEntities);
						//var runningId = 1;
						const allEntitiesDetailList = [];
						let incrNumber = 1;
						let overalListNumber = 0;
						allEntities.forEach(element => {
							const elementArray = element.d.results[0];
							console.log(elementArray);
							//const entityURL = '';
							//const entityName = '';
							//var consumableList = [];
							//var columns = [];
							//var navigationProperties = [];
							// && elementArray.length > 0
							if(typeof elementArray !== 'undefined'){
								console.log("OLOLOLOLO");
								console.log(Object.entries(element.d.results[0]));
								const entityURL = element.d.results[0].__metadata.uri;
								console.log(entityURL);
								const entityName = entityURL.substring(
									entityURL.lastIndexOf("/") + 1,
									entityURL.indexOf("(")
								);
								console.log(entityName);
								console.log(allEntitiesDetailList);
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
								console.log(allEntitiesDetailList);
								
								for(const [key, value] of  Object.entries(element.d.results[0])){
									
									console.log(typeof key);
									console.log(typeof value === 'object');
									console.log(key !== '__metadata');
									// if value is an Object, it is a Navigation Property
									if(typeof value === 'object'){
										console.log("Machen");
										console.log(key);
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
								console.log(allEntitiesDetailList);
								overalListNumber++;
							}
							//consumableItemList = {id: runningId, name: element};
							//id++;
							//prepResult.push(newResultObject);
						});
							
					commit('setAllEntities', allEntitiesDetailList);	
				}))
			.catch((error) => {
				console.log(error);
			});
		console.log('XXXXXXXX');
		},
	loadEntitiesDetailsAll: ({commit}) => {
		const prepResult = [];
		const arrayAllEntities = commit('getAllEntities');
		console.log('XXXXXXXX');
		console.log(arrayAllEntities);
		arrayAllEntities.forEach(element => {
			axios.get(`${baseURL}/${element.name}?$top=1&$format=json`)
			.then((response) => {
				const result = response.data;
				prepResult.push(result);
				commit('setAllEntitiesDetails', result);
				//console.log(JSON.stringify(jsonObj));
				//console.log(response.data);
				//console.log(response.status);
				//console.log(response.statusText);
				//console.log(response.headers);
				//console.log(response.config);
			})
			.catch((error) => {
				console.log(error);
			});
		});
		console.log(prepResult);
		
		},
	pushEntitiesInArray: (urlCollection) => {
		console.log('pushEntitiesInArray called!');
		console.log(urlCollection);
	}
};

export default {
	namespaced: true,
	state: storeState,
	mutations,
	getters,
	actions,
};