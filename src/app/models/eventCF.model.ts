export class EventCF {
  public idevent: number;
  public Date: string;
  public Title: string;
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
  public shuttleBonusBool: Boolean;
  public shuttleBonusAmount: number;
  public shuttleLocation: string;
  public totalSales: number;
  public coordinatorAdminAmount: number;

  constructor(
     idevent: number,
     Date: string,
     Title: string,
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
     shuttleBonusBool: Boolean,
     shuttleBonusAmount: number,
     shuttleLocation: string,
     totalSales: number,
     coordinatorAdminAmount: number
  ) {
    this.idevent = idevent;
    this.Date = Date;
    this.Title = Title;
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
    this.shuttleBonusBool = shuttleBonusBool;
    this.shuttleBonusAmount = shuttleBonusAmount;
    this.shuttleLocation = shuttleLocation;
    this.totalSales = totalSales;
    this.coordinatorAdminAmount = coordinatorAdminAmount;
  }
}