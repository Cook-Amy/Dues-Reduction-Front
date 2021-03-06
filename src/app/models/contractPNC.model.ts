export class ContractPNC {
  public idcontract_pnc: number;
  public seasonID: number;
  public pncFoodCommission: number;
  public pncFoodCommissionAfterIncrease: number;
  public pncAlcoholCommission: number;
  public pncAlcoholCommissionAfterIncrease: number;
  public pncFoodTaxRate: number;
  public pncAlcoholTaxRate: number;
  public pncMemberGuarantee: number;
  public pncEventCountForCommissionIncrease: number;

  constructor(
     idcontract_pnc: number,
     seasonID: number,
     pncFoodCommission: number,     
     pncFoodCommissionAfterIncrease: number,
     pncAlcoholCommission: number,
     pncAlcoholCommissionAfterIncrease: number,
     pncFoodTaxRate: number,
     pncAlcoholTaxRate: number,
     pncMemberGuarantee: number,
     pncEventCountForCommissionIncrease: number
  ) {
    this.idcontract_pnc = idcontract_pnc;
    this.seasonID = seasonID;
    this.pncFoodCommission = pncFoodCommission;
    this.pncFoodCommissionAfterIncrease = pncFoodCommissionAfterIncrease;
    this.pncAlcoholCommission = pncAlcoholCommission;
    this.pncAlcoholCommissionAfterIncrease = pncAlcoholCommissionAfterIncrease;
    this.pncFoodTaxRate = pncFoodTaxRate;
    this.pncAlcoholTaxRate = pncAlcoholTaxRate;
    this.pncMemberGuarantee = pncMemberGuarantee;
    this.pncEventCountForCommissionIncrease = pncEventCountForCommissionIncrease;
  }

}