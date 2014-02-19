
var Mongoose = require('mongoose');


var CommentSchema = new Mongoose.Schema({
	text: { type: String}
});

var ProjectSchema = new Mongoose.Schema({
  title: { type: String},
  date: { type: Date },
  summary: { type: String },
  image: { type: String },
  comments: [CommentSchema]
});



exports.Project = Mongoose.model('Project', ProjectSchema);
exports.Comment = Mongoose.model('Comment', CommentSchema);


