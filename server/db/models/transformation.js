'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
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
