

export class Staff {
  public idperson: number;
  public firstName: string;
  public lastName: string;
  public Name: string;
  public Email: string;
  public Phone: string;
  public tuAccout: string;

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

  public wcTeamTraining: string;

  public cfAlcoholTraining: string;

  constructor(
    idperson: number,
    firstName: string,
    lastName: string,
    Name: string,
    Email: string,
    Phone: string,
    tuAccout: string,

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
    pncWaiver: boolean,

    wcTeamTraining: string,

    cfAlcoholTraining: string,
  ) {
    this.idperson = idperson;
    this.firstName = firstName;
    this.lastName = lastName;
    this.Name = Name;
    this.Email = Email;
    this.Phone = Phone;
    this.tuAccout = tuAccout;

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
    this.pncWaiver = pncWaiver;
    
    this.wcTeamTraining = wcTeamTraining;

    this.cfAlcoholTraining = cfAlcoholTraining;
  }
}