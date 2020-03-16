
export class CalendarEvent {
  // all events
  public idevent: number;
  public venueID: number;
  public date: string;
  public title: string;
  public color: string;

  constructor(
     idevent: number,
     venueID: number,
     date: string,
     title: string,
     
  ) {
    this.idevent = idevent;
    this.venueID = venueID;
    this.date = date;
    this.title = title;
    this.color = '';
  }
}
