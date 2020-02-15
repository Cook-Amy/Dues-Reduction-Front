
export class Event {
  public idevent: number;
  public seasonID: number;
  public venue: string;
  public dateTime: string;
  public title: string;
  public compensated: Boolean;
  public location: string;
  public venueBonus: number;
  public estimatedCheck: number;
  public estimatedProfit: number;
  public actualCheck: number;
  public payout: number;
  public discrepancy: number;
  public actualProfit: number;
  public tacPct: number;
  public tacCut: number;
  public drCut: number;
  public eventNotes: string;
  public closed: Boolean;
  public eventcol: number;

  constructor(
    idevent: number,
    seasonID: number,
    venue: string,
    dateTime: string,
    title: string,
    compensated: Boolean,
    location: string,
    venueBonus: number,
    estimatedCheck: number,
    estimatedProfit: number,
    actualCheck: number,
    payout: number,
    discrepancy: number,
    actualProfit: number,
    tacPct: number,
    tacCut: number,
    drCut: number,
    eventNotes: string,
    closed: Boolean,
    eventcol: number,
      ){
    this.idevent = idevent;
    this.seasonID = seasonID;
    this.venue = venue;
    this.dateTime = dateTime;
    this.title = title;
    this.compensated = compensated;
    this.location = location;
    this.venueBonus = venueBonus;
    this.estimatedCheck = estimatedCheck;
    this.estimatedProfit = estimatedProfit;
    this.actualCheck = actualCheck;
    this.payout = payout;
    this.discrepancy = discrepancy;
    this.actualProfit = actualProfit;
    this.tacPct = tacPct;
    this.tacCut = tacCut;
    this.drCut = drCut;
    this.eventNotes = eventNotes;
    this.closed = closed;
    this.eventcol = eventcol;
  }

}