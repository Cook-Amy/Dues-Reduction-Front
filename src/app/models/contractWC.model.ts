export class ContractWC {
  public idcontract_wc: number;
  public seasonID: number;
  public wcFoodCommission: number;
  public wcAlcoholCommission: number;
  public wcMaxCreditCardTipAmountDefault: number;
  public wcShuttleBonusAmountDefaults: number;

  constructor(
     idcontract_wc: number,
     seasonID: number,
     wcFoodCommission: number,
     wcAlcoholCommission: number,
     wcMaxCreditCardTipAmountDefault: number,
     wcShuttleBonusAmountDefaults: number
  ) {
    this.idcontract_wc = idcontract_wc;
    this.seasonID = seasonID;
    this.wcFoodCommission = wcFoodCommission;
    this.wcAlcoholCommission = wcAlcoholCommission;
    this.wcMaxCreditCardTipAmountDefault = wcMaxCreditCardTipAmountDefault;
    this.wcShuttleBonusAmountDefaults = wcShuttleBonusAmountDefaults;
  }

}