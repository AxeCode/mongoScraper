var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	title:{
		type:String,
		required:true
	},
	img_url:{
		type:String,
		required:true
	},
	link:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	},
	author_url:{
		type:String,
		required:true
	}
});

var Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;