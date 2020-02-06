import { Staff } from './../models/staff.model';
import { Subject } from 'rxjs';

export class StaffService {
  staffChanged = new Subject<Staff[]>();

  private allStaff: Staff[] = [
    new Staff('Amy Cook', 'cookabc@hotmail.com', '919-280-1828', 'Cook-Amy', true, true),
    new Staff('Sarah Alexander', 'sarah.alexander@townofcary.org', '919-219-5750', 'Alexander-Sarah', true, true),
    new Staff('Manit Suphavadeprasit', 'ManitS@gmail.com', '919-345-2615', 'Suphavadeprasit-Manit', true, true)
  ]; 

  getAllStaff() {
    return this.allStaff.slice();
  }

  addStaff(staff: Staff) {
    this.allStaff.push(staff);
    this.staffChanged.next(this.allStaff.slice());
  }

  getStaff(index: number) {
    return this.allStaff[index];
  }
}