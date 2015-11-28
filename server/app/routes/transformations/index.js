'use strict';
var router = require('express').Router();
var mongoose = require('mongoose');
var Transformation = mongoose.model('Transformation');
module.exports = router;

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/:id', ensureAuthenticated, function (req, res) {
  Transformation.findById(req.params.id)
    .then(function(transformation){
      res.send(transformation);
    });
});

router.get('/', ensureAuthenticated, function (req, res) {
  Transformation.find({user: req.user._id})
    .then(function(transformations){
      res.send(transformations);
    });
});

router.post('/', ensureAuthenticated, function (req, res) {
  var transformation = new Transformation({user: req.user._id});
  transformation.input = req.body.input;
  transformation.transformer = req.body.transformer;
  transformation.name = req.body.name;
  transformation.save()
    .then(function(transformation){
      res.send(transformation);
    });
});
