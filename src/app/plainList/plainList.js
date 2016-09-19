export const plainList = {
  template: require('./plainList.html'),
  controller($state) {
    this.title = $state.current.data.label;
  },
  bindings: {
    elements: '<'
  }
};
