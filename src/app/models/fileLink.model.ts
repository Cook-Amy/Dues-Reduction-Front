export class FileLink {
  // all events
  public idlink: number;
  public venueID: number;
  public Name: string;
  public Link: string;
  public description: string;

  constructor(
     idlink: number,
     venueID: number,
     Name: string,
     Link: string,
     description: string
     
  ) {
    this.idlink = idlink;
    this.venueID = venueID;
    this.Name = Name;
    this.Link = Link;
    this.description = description;
  }
}
