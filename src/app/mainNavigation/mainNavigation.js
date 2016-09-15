export const mainNavigation = {
	template: require('./mainNavigation.html'),
	controller: function($state){
		const cleanStates = _.filter($state.router.stateRegistry.states, function(state){ return !_.isUndefined(state.data) });
		this.linkList = _.map(cleanStates, function(item) { 
			return (_.isUndefined(item.data))? false : {
				label: item.data.label,
				order: item.data.order,
				state: item.name,
			}
		});
	}
}