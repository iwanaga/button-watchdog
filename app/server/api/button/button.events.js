/**
 * Button model events
 */

'use strict';

import {EventEmitter} from 'events';
var ButtonEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
ButtonEvents.setMaxListeners(0);

// Model events
var events = {
  save: 'save',
  remove: 'remove'
};

// Register the event emitter to the model events
function registerEvents(Button) {
  for(var e in events) {
    let event = events[e];
    Button.post(e, emitEvent(event));
  }
}

function emitEvent(event) {
  return function(doc) {
    ButtonEvents.emit(event + ':' + doc._id, doc);
    ButtonEvents.emit(event, doc);
  };
}

export {registerEvents};
export default ButtonEvents;
