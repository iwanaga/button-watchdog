'use strict';

import mongoose from 'mongoose';
import {registerEvents} from './button.events';

let ButtonSchema = new mongoose.Schema({
  color: String,
}, {
  timestamps: true
}).index({
  createdAt: 1
});
registerEvents(ButtonSchema);
export default mongoose.model('Button', ButtonSchema);
