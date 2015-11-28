'use strict';
var mongoose = require('mongoose');

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
    user: {
      type: mongoose.Schema.Types.ObjectId, ref: 'User'
    }
});

mongoose.model('Transformation', schema);
