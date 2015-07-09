import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		createTodo: function(newTitle){
			this.set('newTitle', '');
			this.sendAction('createTodo', newTitle);
		},
		clearCompleted: function(){
			var completed = this.get('model').filterBy('isCompleted', true);
			completed.invoke('destroyRecord');
			console.log("Task has been deleted");
		}
	},
	remaining: (function () {
		var model = this.get('model');
		return model.filterBy('isCompleted', false).get('length');
	}).property('model.@each.isCompleted'),

	inflection: (function() {
		var remaining = this.get('remaining');
		return (remaining === 1) ? 'item' : 'items';
	}).property('remaining'),

	hasCompleted: (function() {
		return this.get('completed') > 0;
	}).property('completed'),

	completed: (function() {
		var model = this.get('model');
		return model.filterBy('isCompleted', true).get('length');
	}).property('model.@each.isCompleted'),

	allAreDone: (function(key, value){
		var model = this.get('model');
		console.log(key + ': ' + value);
		if(value === undefined){
			return model.get('length') > 0 && model.isEvery('isCompleted', true);
		} else {
			model.setEach('isCompleted', value);
			model.invoke('save');
			return value;
		}
	}).property('@each.isCompleted')
});
