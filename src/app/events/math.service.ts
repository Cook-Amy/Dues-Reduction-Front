import { Timesheet } from './../models/timesheet.model';
import { Staff } from './../models/staff.model';
import { ContractPNC } from './../models/contractPNC.model';
import { EventPNC } from './../models/eventPNC.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  calculatePncEvent(event: EventPNC, contract: ContractPNC, timesheets: Timesheet[]) {
    // calculate individual timesheets
    var totalPayout = 0;
    timesheets.forEach(timesheet => {
      // hours worked
      var hoursWorked = 0;
      if(timesheet.timeIn != null && timesheet.timeOut != null) {
        var datein = new Date(timesheet.timeIn);
        var dateout = new Date(timesheet.timeOut);
        var timein = datein.getTime();
        var timeout = dateout.getTime();
        var diff = timeout - timein;
        hoursWorked = Math.floor(diff / (1000 * 60 * 60));
        diff -= hoursWorked * (1000 * 60 * 60);
        var mins = Math.floor(diff / (1000 * 60));
        if(mins == 15) { hoursWorked += .25; }
        else if(mins == 30) { hoursWorked  += .5; }
        else if(mins == 45) { hoursWorked += .75; }
      }
      timesheet.hoursWorked = hoursWorked;

      // bonuses
      var bonus = timesheet.eventBonus;
      var shuttleBonus = timesheet.shuttleBonus;
      var hourlyBonus = timesheet.hourlyBonus;

      // credit card tips
      var creditCardTips = 0;
      if(timesheet.creditCardTips != null) {
        creditCardTips = timesheet.creditCardTips;
      }

      // total credit amount
      var totalCredit = ((timesheet.hourlyRate + hourlyBonus) * hoursWorked) + 
                                bonus + shuttleBonus +
                                creditCardTips;
      timesheet.creditAmount = totalCredit;

      // add to totalPayout
      totalPayout += totalCredit;

    });

    // get total payout
    event.payout = totalPayout;

    // get commission rates
    var commFoodRate = event.metCommissionBonus ? contract.pncFoodCommissionAfterIncrease : contract.pncFoodCommission;
    var commAlcRate = event.metCommissionBonus ? contract.pncAlcoholCommissionAfterIncome : contract.pncAlcoholCommission;

    // get food and alcohol sales amounts
    var alcSales = event.alcSales;
    var foodSales = event.totalSales - event.alcSales;

    // calculate tax
    var taxOnFood = foodSales * (contract.pncFoodTaxRate - 1);
    var taxOnAlc = alcSales * (contract.pncAlcoholTaxRate - 1);

    // get total sales amounts
    var totalFoodSales = foodSales - taxOnFood;
    var totalAlcSales = alcSales = taxOnAlc;

    // estimated check
    var estCheck = (totalFoodSales * commFoodRate) + (totalAlcSales * commAlcRate);

        // guarantee is only checked if there is a payout
        // guarantee applies to cashiers only
    if(event.guarantee && event.payout > 0) {
      var guarCount = 0;
      for(var i = 0; i < timesheets.length; i++) {
        if(timesheets[i].isGuarantee) {
          guarCount++;
        }
      }
      var guar = contract.pncMemberGuarantee * guarCount;
      if(guar > estCheck) {
        estCheck = guar;
      }
    }

    estCheck += event.venueBonus;

      // add other positions to estimate 
      // applies to Stand Leader and Cooks
    var pncPay = 0;
    for(var i = 0; i < timesheets.length; i++) {
      pncPay += timesheets[i].venuePay;
    }
    estCheck += pncPay;
    event.estimatedCheck = estCheck;


    // if we have a payout, we can calculate estimated profit, actual profit, and discrepancy
    if(totalPayout > 0) {
      // calculate estimated profit
      var estProfit = (estCheck * (1 - event.tacPct)) - totalPayout - event.coordinatorAdminAmt;
      event.estimatedProfit = estProfit;

      // get actual profit and discrepancy if check has been received
      if(event.actualCheck > 0) {
        var tacCut = event.actualCheck * event.tacPct;
        var drCut = event.actualCheck * (1 - event.tacPct);
        var actProfit = drCut - totalPayout - event.coordinatorAdminAmt;
        var discrepancy = event.actualCheck - estCheck;

        event.tacCut = tacCut;
        event.drCut = drCut;
        event.actualProfit = actProfit;
        event.discrepancy = discrepancy;
      }
      else {
        event.tacCut = 0;
        event.drCut = 0;
        event.actualProfit = 0;
        event.discrepancy = 0;
      }
    }
    else {
      event.estimatedProfit = 0; 
      event.tacCut = 0;
      event.drCut = 0;
      event.actualProfit = 0;
      event.discrepancy = 0;
    }

    return event;
  }

}
