
export class Job {
  public jobID: number;
  public jobName: string;
  public hourlyRate: number;
  public isGuarantee: boolean;
  public minutesBeforeOpen: number;
  public venuePay: number;

  constructor(
    jobID: number,
     jobName: string,
     hourlyRate: number,
     isGuarantee: boolean,
     minutesBeforeOpen: number,
     venuePay: number
  ) {
    this.jobID = jobID;
    this.jobName = jobName;
    this.hourlyRate = hourlyRate;
    this.isGuarantee = isGuarantee;
    this.minutesBeforeOpen = minutesBeforeOpen;
    this.venuePay = venuePay;
  }
}