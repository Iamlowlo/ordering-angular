export const plainList = {
  template: require('./plainList.html'),
  controller: function ($state) {
  	console.log($state);
  	this.title = $state.current.data.label;
  },
  bindings: {
    elements: '<'
  }
};
