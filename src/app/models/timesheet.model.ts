export class Timesheet {
  public idtimesheet: number;
  public firstName: string;
  public lastName: string;
  public jobName: string;
  public scheduledArrivalTime: string;
  public hourlyRate: number;
  public timeIn: string;
  public timeOut: string;
  public hoursWorked: number;
  public shuttleBonus: number;
  public eventBonus: number;
  public hourlyBonus: number;
  public creditCardTips: number;
  public creditAmount: number;

  constructor(
     idtimesheet: number,
     firstName: string,
     lastName: string,
     jobName: string,
     scheduledArrivalTime: string,
     hourlyRate: number,
     timeIn: string,
     timeOut: string,
     hoursWorked: number,
     shuttleBonus: number,
     eventBonus: number,
     hourlyBonus: number,
     creditCardTips: number,
     creditAmount: number
  ) {
    this.idtimesheet = idtimesheet;
    this.firstName = firstName;
    this.lastName = lastName;
    this.jobName = jobName;
    this.scheduledArrivalTime = scheduledArrivalTime;
    if(!this.scheduledArrivalTime) { this.scheduledArrivalTime = '0'; }
    this.hourlyRate = hourlyRate;
    if(!this.hourlyRate ) { this.hourlyRate = 0; }
    this.timeIn = timeIn;
    if(!this.timeIn ) { this.timeIn = '0'; }
    this.timeOut = timeOut;
    if(!this.timeOut ) { this.timeOut = '0'; }
    this.hoursWorked = hoursWorked;
    if(!this.hoursWorked ) { this.hoursWorked = 0; }
    this.shuttleBonus = shuttleBonus;
    if(!this.shuttleBonus ) { this.shuttleBonus = 0; }
    console.log('shuttle bonus: ' + this.shuttleBonus);
    this.eventBonus = eventBonus; 
    if(!this.eventBonus ) { this.eventBonus = 0; }
    this.hourlyBonus = hourlyBonus;
    if(!this.hourlyBonus ) { this.hourlyBonus = 0; }
    this.creditCardTips = creditCardTips;
    if(!this.creditCardTips ) { this.creditCardTips = 0; }
    this.creditAmount = creditAmount;
    if(!this.creditAmount ) { this.creditAmount = 0; }
  }
}