export const mainNavigation = {
  template: require('./mainNavigation.html'),
  controller($state) {
    const cleanStates = _.filter($state.router.stateRegistry.states, function (state) {
      return state.data && state.data.mainNav;
    });

    this.linkList = _.map(cleanStates, function (item) {
      return {
        label: item.data.label,
        order: item.data.order,
        state: item.name
      };
    });
  }
};
