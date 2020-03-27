
export class SiteUser {
  public userID: number;
  public userName: string;
  public firstName: string;
  public lastName: string;
  public phone: string;
  public permission: number;
  public personalEmail: string;
  public titansEmail: string;

  constructor( 
     userID: number,
     userName: string,
     firstName: string,
     lastName: string,
     phone: string,
     permission: number,
     personalEmail: string,
     titansEmail: string
  ) {
    this.userID = userID;
    this.userName = userName;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.permission = permission;
    this.personalEmail = personalEmail;
    this.titansEmail = titansEmail;
  }
}