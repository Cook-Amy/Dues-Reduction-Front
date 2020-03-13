import { Event } from './../models/event.model';
import { ContractCF } from './../models/contractCF.model';
import { EventCF } from './../models/eventCF.model';
import { ContractWC } from './../models/contractWC.model';
import { EventWC } from './../models/eventWC.model';
import { Timesheet } from './../models/timesheet.model';
import { ContractPNC } from './../models/contractPNC.model';
import { EventPNC } from './../models/eventPNC.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  constructor() { }

  calculatePncEvent(event: Event, contract: ContractPNC, timesheets: Timesheet[]) {
    // calculate totalPayout
    var totalPayout = 0;
    if(timesheets) {
      timesheets.forEach(timesheet => {
 
        totalPayout += timesheet.creditAmount;
      });
    }
    event.payout = totalPayout;

    // get commission rates
    var commFoodRate = event.metCommissionBonus ? contract.pncFoodCommissionAfterIncrease : contract.pncFoodCommission;
    var commAlcRate = event.metCommissionBonus ? contract.pncAlcoholCommissionAfterIncrease : contract.pncAlcoholCommission;
  
    // get food and alcohol sales amounts
    var alcSales = event.alcSales;
    var foodSales = event.totalSalesPnc - event.alcSales;

    // calculate tax
    var taxOnFood = foodSales * (contract.pncFoodTaxRate - 1);
    var taxOnAlc = alcSales * (contract.pncAlcoholTaxRate - 1);

    // get total sales amounts
    var totalFoodSales = foodSales - taxOnFood;
    var totalAlcSales = alcSales - taxOnAlc;
  
    // estimated check
    var estCheck = (totalFoodSales * commFoodRate) + (totalAlcSales * commAlcRate);

        // guarantee is only checked if there is a payout
        // guarantee applies to cashiers only
    if(event.guarantee && (event.payout > 0)) {
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

  calculateWcEvent(event: Event, contract: ContractWC, timesheets: Timesheet[]) {
    return event;
  }

  calculateCfEvent(event: Event, contract: ContractCF, timesheets: Timesheet[]) {
     // calculate totalPayout
     var totalPayout = 0;
     if(timesheets) {
      timesheets.forEach(timesheet => {
  
        totalPayout += timesheet.creditAmount;
      });
     }
     event.payout = totalPayout;
   
     // get sales amounts
     var sales = event.totalSalesCf;
 
     // calculate tax
     var tax = sales * (contract.cfTaxRate - 1);
 
     // get total sales amounts
     var totalSales = sales - tax;
   
     // estimated check
     var estCheck = totalSales * contract.cfCommission;
 
     estCheck += event.venueBonus;
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

  calculateTimeSheets(timesheets: Timesheet[]) {
    // calculate individual timesheets
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
    });
  }

  calculateOneTimeSheet(timesheet: Timesheet) {
    
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

      // TODO: Round total credit up to nearest dollar amount

      return timesheet;
  }
}


