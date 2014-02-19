var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;
  models.Project.find({"_id": projectID}, afterQuery);

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }
}

exports.addProject = function(req, res) {
  var form_data = req.body;
  console.log(form_data);

  var project = new models.Project({
    title: req.param('project_title'),
    date: new Date(req.param('date')),
    summary: req.param('summary'),
    image: req.param('image_url')
  });
  project.save(function(err) {
    if(err) console.log(err);
    else res.send("success", 200);
  })
}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  models.Project.find({"_id": projectID})
  .remove()
  .exec(res.send());
}

exports.addComment = function(req, res) {
  var projectID = req.params.id;
  console.log(projectID);
  console.log(req.param('comment'));
  models.Project.find({"_id": projectID}, function(err, project) {
    if(err) {console.log(err); return;}
    var comment = new models.Comment({
      text: req.param('comment')
    });
    comment.save(function(err) {
      if(err) {console.log(err); return;}
      else {
        models.Project.update({"_id": projectID},{$push: { 'comments': comment}}, function(err, data) {
          if(err) {console.log(err); return;}
          res.send("success", 200);
        })
      }
    })
  })
  
}