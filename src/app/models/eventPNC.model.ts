export class EventPNC {
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
  public metCommissionBonus: Boolean;
  public guarantee: Boolean;
  public totalSales: number;
  public alcSales: number;
  public coordinatorAdminAmount: number;
  public eventCountsTowardsTotal: Boolean;

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
     metCommissionBonus: Boolean,
     guarantee: Boolean,
     totalSales: number,
     alcSales: number,
     coordinatorAdminAmount: number,
     eventCountsTowardsTotal: Boolean
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
    this.metCommissionBonus = metCommissionBonus;
    this.guarantee = guarantee;
    this.totalSales = totalSales;
    this.alcSales = alcSales;
    this.coordinatorAdminAmount = coordinatorAdminAmount;
    this.eventCountsTowardsTotal = eventCountsTowardsTotal;
  }
}
