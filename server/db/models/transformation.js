'use strict';
var mongoose = require('mongoose');
var beautify = require('js-beautify');

var schema = new mongoose.Schema({
    name: {
      type: String
    },
    input: {
        type: String
    },
    transformer: {
        type: String
    },
    description: {
        type: String
    },
    shared: {
      type: Boolean, default: false 
    }, 
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});
schema.method('toFunction', function () {
  return beautify(['var transformer = function(input){', this.transformer, '}'].join(''));
});

mongoose.model('Transformation', schema);
