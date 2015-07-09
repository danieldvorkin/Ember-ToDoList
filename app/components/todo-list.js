import Ember from 'ember';

export default Ember.Component.extend({
	actions: {
		createTodo: function(newTitle){
			this.set('newTitle', '');
			this.sendAction('createTodo', newTitle);
		}
	},
	remaining: (function () {
		var model = this.get('model');
		return model.filterBy('isCompleted', false).get('length');
	}).property('model.@each.isCompleted'),
	
	inflection: Ember.computed('remaining', function(){
		var remaining = this.get('remaining');
		return (remaining === 1) ? 'item' : 'items';
	})
});
