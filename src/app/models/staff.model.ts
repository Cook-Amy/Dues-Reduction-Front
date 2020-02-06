

export class Staff {
  public name: string;
  public email: string;
  public phone: string;
  public tuAccout: string;
  public pncActive: boolean;
  public pncExperienced: boolean;

  constructor(
    name: string, 
    email: string, 
    phone: string, 
    tuAccout: string, 
    pncActive: boolean,
    pncExperienced: boolean
  ) {
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.tuAccout = tuAccout;
    this.pncActive = pncActive;
    this.pncExperienced = pncExperienced;
  }
}