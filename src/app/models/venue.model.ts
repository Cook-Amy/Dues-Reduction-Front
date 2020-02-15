

export class Venue {
  public idvenue: number;
  public name: string;
  public description: string;
  public notes: string;
  public defaultLocation: string;
  public shortName: string;

  constructor(idvenue: number, name: string, desc: string, notes: string, defaultLoc: string, shortName: string){
    this.idvenue = idvenue;
    this.name = name;
    this.description = desc;
    this.notes = notes;
    this.defaultLocation = defaultLoc;
    this.shortName = shortName;
  }
}