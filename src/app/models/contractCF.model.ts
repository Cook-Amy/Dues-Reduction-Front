export class ContractCF {
  public idcontract_cf: number;
  public seasonID: number;
  public cfTaxRate: number;
  public cfCommission: number;

  constructor(
     idcontract_cf: number,
     seasonID: number,
     cfTaxRate: number,
     cfCommission: number
  ) {
    this.idcontract_cf = idcontract_cf;
    this.seasonID = seasonID;
    this.cfTaxRate = cfTaxRate;
    this.cfCommission = cfCommission;
  }

}