'use strict';

const mongoose = require('mongoose');

let ButtonSchema = new mongoose.Schema({
  color: String,
}, {
  timestamps: true
}).index({
  createdAt: 1, color: 1
});

module.exports = mongoose.model('Button', ButtonSchema);
