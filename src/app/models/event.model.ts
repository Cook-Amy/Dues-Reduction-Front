

export class Event {
  public name: string;
  public season: string;
  public venue: string;
  public date: string;
  public location: string;
  public estimatedCheck: number;
  public actualCheck: number;
  public estimatedProfit: number;
  public actualProfit: number;

  constructor(
      name: string,
      season: string,
      venue: string,
      date: string,
      location: string,
      estimatedCheck: number,
      actualCheck: number,
      estimatedProfit: number,
      actualProfit: number 
      ){
    this.name = name;
    this.season = season;
    this.venue = venue;
    this.date = date;
    this.location = location;
    this.estimatedCheck = estimatedCheck;
    this.actualCheck = actualCheck;
    this.estimatedProfit = estimatedProfit;
    this.actualProfit = actualProfit;
  }
}