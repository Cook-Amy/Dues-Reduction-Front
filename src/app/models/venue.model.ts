

export class Venue {
  public name: string;
  public description: string;
  public notes: string;
  public defaultLocation: string;
  public shortName: string;

  constructor(name: string, desc: string, notes: string, defaultLoc: string, shortName: string){
    this.name = name;
    this.description = desc;
    this.notes = notes;
    this.defaultLocation = defaultLoc;
    this.shortName = shortName;
  }
}