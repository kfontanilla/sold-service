const EventEmitter = require('events');
const define = Object.defineProperty;

export class Operation extends EventEmitter {
  static setEvents(events: any) {
    define(this.prototype, 'events', {
      value: createevents(events)
    });
  }

  on(event: any, handler: any) {
    if(this.events[event]) {
      return this.addListener(event, handler);
    }

    throw new Error(`Invalid event "${event}" to operation ${this.constructor.name}.`);
  }
}

const createevents = (eventsArray: any) => {
  return eventsArray.reduce((obj: any, output: any) => {
    obj[output] = output;
    return obj;
  }, Object.create(null));
};
