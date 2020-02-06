import { Event } from './../models/event.model';
import { Subject } from 'rxjs';

export class EventService {

  private events: Event[] = [
    new Event('Event 1', '2019-2020', 'PNC', '09-15-19', 'S109', 2000.55, 1995.35, 300.22, 289.89),
    new Event('Event 2', '2019-2020', 'PNC', '10-20-19', 'S109', 4525.88, 4503.33, 554.99, 545.68)
  ]; 

  getEvents() {
    return this.events.slice();
  }

  getEvent(index: number) {
    return this.events[index];
  }
  
}