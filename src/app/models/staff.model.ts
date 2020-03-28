

export class Staff {
  public idperson: number;
  public firstName: string;
  public lastName: string;
  public Name: string;
  public Email: string;
  public Phone: string;
  public tuAccount: string;

  public pncActive: boolean;
  public pncInactive: boolean;
  public pncInterested: boolean;
  public wcActive: boolean;
  public wcInactive: boolean;
  public wcInterested: boolean;
  public cfActive: boolean;
  public cfInactive: boolean;
  public cfInterested: boolean;

  public pncHealthForm: boolean;
  public pncExperienced: boolean;
  public pncBars: string;
  public pncBarsRefresher: boolean;
  public pncWaiver: boolean;
  public pncStandLeader: boolean;
  public pncGroupLeader: boolean;
  public pncHeadCook: boolean;
  public pncRegister: boolean;
  public pncAssistantCook: boolean;
  public pncBeerCart: boolean;

  public wcTeamTraining: string;
  public wcStandLeader: boolean;
  public wcMoveStockOut: boolean;
  public wcContainerBarLead: boolean;
  public wcFinalStandPrep: boolean;
  public wcSales: boolean;

  public cfAlcoholTraining: string;
  public cfLeader: boolean;
  public cfAssistantLeader: boolean;
  public cfStaff: boolean;

  constructor(
    idperson: number,
    firstName: string,
    lastName: string,
    Name: string,
    Email: string,
    Phone: string,
    tuAccount: string,

    pncActive: boolean,
    pncInactive: boolean,
    pncInterested: boolean,
    wcActive: boolean,
    wcInactive: boolean,
    wcInterested: boolean,
    cfActive: boolean,
    cfInactive: boolean,
    cfInterested: boolean,

    pncHealthForm: boolean,
    pncExperienced: boolean,
    pncBars: string,
    pncBarsRefresher: boolean,
    pncWaiver: boolean,
    pncStandLeader: boolean,
    pncGroupLeader: boolean,
    pncHeadCook: boolean,
    pncRegister: boolean,
    pncAssistantCook: boolean,
    pncBeerCart: boolean,

    wcTeamTraining: string,
    wcStandLeader: boolean,
    wcMoveStockOut: boolean,
    wcContainerBarLead: boolean,
    wcFinalStandPrep: boolean,
    wcSales: boolean,

    cfAlcoholTraining: string,
    cfLeader: boolean,
    cfAssistantLeader: boolean,
    cfStaff: boolean,
  ) {
    this.idperson = idperson;
    this.firstName = firstName;
    this.lastName = lastName;
    this.Name = Name;
    this.Email = Email;
    this.Phone = Phone;
    this.tuAccount = tuAccount;

    this.pncActive = pncActive;
    this.pncInactive = pncInactive;
    this.pncInterested = pncInterested;
    this.wcActive = wcActive;
    this.wcInactive = wcInactive;
    this.wcInterested = wcInterested;
    this.cfActive = cfActive;
    this.cfInactive = cfInactive;
    this.cfInterested = cfInterested;

    this.pncHealthForm = pncHealthForm;
    this.pncExperienced = pncExperienced;
    this.pncBars = pncBars;
    this.pncBarsRefresher = pncBarsRefresher;
    this.pncWaiver = pncWaiver;
    this.pncStandLeader = pncStandLeader;
    this.pncGroupLeader = pncGroupLeader;
    this.pncHeadCook = pncHeadCook;
    this.pncRegister = pncRegister;
    this.pncAssistantCook = pncAssistantCook;
    this.pncBeerCart = pncBeerCart;

    this.wcTeamTraining = wcTeamTraining;
    this.wcStandLeader = wcStandLeader;
    this.wcMoveStockOut = wcMoveStockOut;
    this.wcContainerBarLead = wcContainerBarLead;
    this.wcFinalStandPrep = wcFinalStandPrep;
    this.wcSales = wcSales;

    this.cfAlcoholTraining = cfAlcoholTraining;
    this.cfLeader = cfLeader;
    this.cfAssistantLeader = cfAssistantLeader;
    this.cfStaff = cfStaff;
  }
}