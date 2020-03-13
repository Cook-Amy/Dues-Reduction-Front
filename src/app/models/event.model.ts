
export class Event {
  // all events
  public idevent: number;
  public seasonID: number;
  public venueID: number;
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
  public coordinatorAdminAmt: number;

  // pnc events
  public totalSalesPnc: number;
  public metCommissionBonus: Boolean;
  public guarantee: Boolean;
  public alcSales: number;
  public eventCountsTowardsTotal: Boolean;

  // wc events
  public creditCardTips: number;
  public maxCreditCardTips: number;
  public shuttleBonusBoolWc: Boolean;
  public shuttleBonusAmountWc: number;

  // cf events
  public totalSalesCf: number;
  public shuttleBonusBoolCf: Boolean;
  public shuttleBonusAmountCf: number;
  public shuttleLocation: string;

  constructor(
     idevent: number,
     seasonID: number,
     venueID: number,
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
     coordinatorAdminAmt: number,

     totalSalesPnc: number,
     metCommissionBonus: Boolean,
     guarantee: Boolean,
     alcSales: number,
     eventCountsTowardsTotal: Boolean,

     creditCardTips: number,
     maxCreditCardTips: number,
     shuttleBonusBoolWc: Boolean,
     shuttleBonusAmountWc: number,

     totalSalesCf: number,
     shuttleBonusBoolCf: Boolean,
     shuttleBonusAmountCf: number,
     shuttleLocation: string

  ) {
    this.idevent = idevent;
    this.seasonID = seasonID;
    this.venueID = venueID;
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
    this.coordinatorAdminAmt = coordinatorAdminAmt;

    this.totalSalesPnc = totalSalesPnc;
    this.metCommissionBonus = metCommissionBonus;
    this.guarantee = guarantee;
    this.alcSales = alcSales;
    this.eventCountsTowardsTotal = eventCountsTowardsTotal;

    this.creditCardTips = creditCardTips;
    this.maxCreditCardTips = maxCreditCardTips;
    this.shuttleBonusBoolWc = shuttleBonusBoolWc;
    this.shuttleBonusAmountWc = shuttleBonusAmountWc;

    this.totalSalesCf = totalSalesCf;
    this.shuttleBonusBoolCf = shuttleBonusBoolCf;
    this.shuttleBonusAmountCf = shuttleBonusAmountCf;
    this.shuttleLocation = shuttleLocation;
  }
}
