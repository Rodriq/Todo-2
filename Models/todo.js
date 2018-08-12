
var mongoose = require('mongoose');
// var milisec = Date.now();
// var today = new Date(milisec).toDateString()

var Todo = mongoose.model('Todo', {
	name: {
		type: String,
		required: true,
		trim: true,
		minlength: 1
	},
	description: {
		type: String,
		trim: true,
		minlength: 1
	} ,
	realdate: {
		type: String,
		// default: today
	},
	time: String,
	done:{
		type: Boolean,
		default: false
	}
	
});

module.exports = {Todo};