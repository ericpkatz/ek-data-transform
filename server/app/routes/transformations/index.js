'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Transformation = mongoose.model('Transformation');
var GitHubApi = require('node-github');
module.exports = router;

var yoursOrShared = function(req, res, next){
  Transformation.findById(req.params.id)
    .then(function(transformation){
      if(transformation.shared || (req.user && transformation.user.toString() == req.user._id.toString()))
        next();
      else{
        res.status(401).end();
      }
    });
};
var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.post('/postToGist', function (req, res) {
  Transformation.findById(req.body._id)
    .then(function(transform){
    var github = new GitHubApi({
      // required
      version: "3.0.0",
      // optional
      debug: true,
      protocol: "https",
      host: "api.github.com", // should be api.github.com for GitHub
      pathPrefix: "/api/v3", // for some GHEs; none for GitHub
      timeout: 5000,
      headers: {
          "user-agent": "My-Cool-GitHub-App" // GitHub is happy with a unique user agent
      }
    });
    github.gists.create({'public': true, 'files': {'transform.js' : {'content': transform.toFunction()}}}, function(err, result){
      res.send(result);
  });
    
    });
  /*
  github.user.getFollowingFromUser({
    // optional:
    // headers: {
    //     "cookie": "blahblah"
    // },
    user: "mikedeboer"
}, function(err, result) {
    //res.send(req.body);
    res.send(result);
    //console.log(JSON.stringify(res));
});
*/
});

router.get('/shared', function (req, res) {
  Transformation.find({ shared: true })
    .then(function(transformations){
      res.send(transformations);
    });
});

router.get('/:id', yoursOrShared, function (req, res) {
  Transformation.findById(req.params.id)
    .then(function(transformation){
      res.send(transformation);
    });
});

router.delete('/:id', function (req, res) {
  Transformation.findById(req.params.id)
    .then(function(transformation){
      return transformation.remove();
    })
    .then(function(){
      return res.send(204); 
    });
});

router.put('/:id', function (req, res) {
  Transformation.findById(req.params.id)
    .then(function(transformation){
      transformation.name = req.body.name;
      transformation.input = req.body.input;
      transformation.transformer = req.body.transformer;
      transformation.description = req.body.description;
      return transformation.save();
    })
    .then(function(transformation){
      return res.send(transformation); 
    });
});

router.get('/', ensureAuthenticated, function (req, res) {
  Transformation.find({ $or: [{user: req.user._id}, { shared: true}]})
    .sort('shared')
    .then(function(transformations){
      res.send(transformations);
    });
});

router.post('/', ensureAuthenticated, function (req, res) {
  var transformation = new Transformation({user: req.user._id});
  transformation.input = req.body.input;
  transformation.transformer = req.body.transformer;
  transformation.name = req.body.name;
  transformation.description = req.body.description;
  transformation.save()
    .then(function(transformation){
      res.send(transformation);
    });
});
