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
  public totalDiscounts: number;
  public eventCountsTowardsTotal: Boolean;
  public itemSales1: number;
  public alcSales1: number;
  public discounts1: number;
  public itemSales2: number;
  public alcSales2: number;
  public discounts2: number;
  public itemSales3: number;
  public alcSales3: number;
  public discounts3: number;
  public itemSales4: number;
  public alcSales4: number;
  public discounts4: number;
  public itemSales5: number;
  public alcSales5: number;
  public discounts5: number;
  public itemSales6: number;
  public alcSales6: number;
  public discounts6: number;
  public ccTips: number;

  // wc events
  public totalSalesWc: number;
  public creditCardTips: number;
  public maxCreditCardTipAmount: number;
  public shuttleBonusAmountWc: number;

  // cf events
  public totalSalesCf: number;
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
     totalDiscounts: number,
     eventCountsTowardsTotal: Boolean,
     itemSales1: number,
     alcSales1: number,
     discounts1: number,
     itemSales2: number,
     alcSales2: number,
     discounts2: number,
     itemSales3: number,
     alcSales3: number,
     discounts3: number,
     itemSales4: number,
     alcSales4: number,
     discounts4: number,
     itemSales5: number,
     alcSales5: number,
     discounts5: number,
     itemSales6: number,
     alcSales6: number,
     discounts6: number,
     ccTips: number,

     totalSalesWc: number,
     creditCardTips: number,
     maxCreditCardTipAmount: number,
     shuttleBonusAmountWc: number,

     totalSalesCf: number,
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
    this.totalDiscounts = totalDiscounts;
    this.eventCountsTowardsTotal = eventCountsTowardsTotal;
    this.itemSales1 = itemSales1;
    this.alcSales1 = alcSales1;
    this.discounts1 = discounts1;
    this.itemSales2 = itemSales2;
    this.alcSales2 = alcSales2;
    this.discounts2 = discounts2;
    this.itemSales3 = itemSales3;
    this.alcSales3 = alcSales3;
    this.discounts3 = discounts3;
    this.itemSales4 = itemSales4;
    this.alcSales4 = alcSales4;
    this.discounts4 = discounts4;
    this.itemSales5 = itemSales5;
    this.alcSales5 = alcSales5;
    this.discounts5 = discounts5;
    this.itemSales6 = itemSales6;
    this.alcSales6 = alcSales6;
    this.discounts6 = discounts6;
    this.ccTips = ccTips;

    this.totalSalesWc = totalSalesWc;
    this.creditCardTips = creditCardTips;
    this.maxCreditCardTipAmount = maxCreditCardTipAmount;
    this.shuttleBonusAmountWc = shuttleBonusAmountWc;

    this.totalSalesCf = totalSalesCf;
    this.shuttleBonusAmountCf = shuttleBonusAmountCf;
    this.shuttleLocation = shuttleLocation;
  }
}
