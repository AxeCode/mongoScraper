var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
	author:{
		type: String
	},
	content: {
		type: String
	}
});

var comment = mongoose.model('comment', commentSchema);

module.exports = comment;