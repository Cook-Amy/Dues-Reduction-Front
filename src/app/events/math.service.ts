import { EventService } from './event.service';
import { Event } from './../models/event.model';
import { ContractCF } from './../models/contractCF.model';
import { ContractWC } from './../models/contractWC.model';
import { Timesheet } from './../models/timesheet.model';
import { ContractPNC } from './../models/contractPNC.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MathService {

  timesheets: Timesheet[] = [];

  constructor(private eventService: EventService) { }

  /*************************************************************************************
   * 
   * PNC Events
   * 2019/2020 Season and earlier
   * 
  *************************************************************************************/
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
    if(timesheets) {
      for(var i = 0; i < timesheets.length; i++) {
        pncPay += timesheets[i].venuePay;
      }
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

  /*************************************************************************************
   * 
   * PNC Events
   * 2020/2021 Season and later
   * 
  *************************************************************************************/
   calculatePncEvent2020(event: Event, contract: ContractPNC, timesheets: Timesheet[]) {
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
    var itemSales = event.itemSales1 + event.itemSales2 + event.itemSales3 + event.itemSales4 + event.itemSales5 + event.itemSales6;
    var alcSales = event.alcSales1 + event.alcSales2 + event.alcSales3 + event.alcSales4 + event.alcSales5 + event.alcSales6;
    var discounts = event.discounts1 + event.discounts2 + event.discounts3 + event.discounts4 + event.discounts5 + event.discounts6;
    var foodSales = itemSales - alcSales - discounts;

    event.totalSalesPnc = itemSales;
    event.alcSales = alcSales;
    event.totalDiscounts = discounts;

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

    // add on extra money from PNC
    estCheck += event.venueBonus;
    estCheck += event.ccTips;

      // add other positions to estimate 
      // applies to Stand Leader and Cooks
    var pncPay = 0;
    if(timesheets) {
      for(var i = 0; i < timesheets.length; i++) {
        pncPay += timesheets[i].venuePay;
      }
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

  /*************************************************************************************
   * 
   * WC Events
   * 2019/2020 Season and earlier
   * 
  *************************************************************************************/
  calculateWcEvent(event: Event, contract: ContractWC, timesheets: Timesheet[]) {
    // calculate tips per person
    var tipAmountPerPerson = 0;
    var totNumberOfWorkers = timesheets.length;
    if(totNumberOfWorkers > 0 && event.creditCardTips > 0) {
      var ccTipsToDistribute = event.creditCardTips * (1 - event.tacPct);
      tipAmountPerPerson = ccTipsToDistribute / totNumberOfWorkers;
      tipAmountPerPerson = Math.min(event.maxCreditCardTipAmount, tipAmountPerPerson);
    }

    // update Timesheets
    var totalPayout = 0;
    timesheets.forEach(ts => {

      // cc tip amount
      ts.creditCardTips = tipAmountPerPerson;

      // update credit amount
      ts.creditAmount = Math.ceil(ts.eventBonus + 
                          ts.shuttleBonus +
                          ((ts.hourlyRate + ts.hourlyBonus) * ts.hoursWorked) +
                          ts.creditCardTips);
                  
      totalPayout += ts.creditAmount;
    });
    // this.eventService.setTimesheets(timesheets);
    this.timesheets = timesheets;

    // total Payout
    event.payout = totalPayout;

    // estimated check and actual check both entered by coordinator
    event.discrepancy = event.estimatedCheck - event.actualCheck;

    event.estimatedProfit = (event.estimatedCheck * (1 - event.tacPct)) - event.payout - event.coordinatorAdminAmt;
    event.tacCut = event.actualCheck * event.tacPct;
    event.drCut = event.actualCheck * (1 - event.tacPct);
    event.actualProfit = (event.actualCheck * (1 - event.tacPct)) - event.payout - event.coordinatorAdminAmt;

    return event;
  }

  /*************************************************************************************
   * 
   * WC Events
   * 2020/2021 Season and later
   * 
  *************************************************************************************/
   calculateWcEvent2020(event: Event, contract: ContractWC, timesheets: Timesheet[]) {
    // calculate tips per person
    var tipAmountPerPerson = 0;
    var totNumberOfWorkers = timesheets.length;
    if(totNumberOfWorkers > 0 && event.creditCardTips > 0) {
      var ccTipsToDistribute = event.creditCardTips;
      tipAmountPerPerson = ccTipsToDistribute / totNumberOfWorkers;
      tipAmountPerPerson = Math.min(event.maxCreditCardTipAmount, tipAmountPerPerson);
    }

    // update Timesheets
    var totalPayout = 0;
    timesheets.forEach(ts => {

      // cc tip amount
      ts.creditCardTips = tipAmountPerPerson;

      // update credit amount
      ts.creditAmount = Math.ceil(ts.eventBonus + 
                          ts.shuttleBonus +
                          ((ts.hourlyRate + ts.hourlyBonus) * ts.hoursWorked) +
                          ts.creditCardTips);
                  
      totalPayout += ts.creditAmount;
    });
    this.eventService.setTimesheets(timesheets);
    this.timesheets = timesheets;

    // total Payout
    event.payout = totalPayout;

    // checks, cuts, and profit
    event.estimatedCheck = event.totalSalesWc + event.creditCardTips + event.venueBonus;
    event.estimatedProfit = (event.totalSalesWc * (1 - event.tacPct)) + event.creditCardTips + (event.venueBonus * (1 - event.tacPct)) - event.payout - event.coordinatorAdminAmt;
    event.discrepancy = event.estimatedCheck - event.actualCheck;
    if(event.actualCheck <= 0) {
      event.tacCut = (event.estimatedCheck - event.creditCardTips) * event.tacPct;
      event.drCut = event.estimatedCheck - event.tacCut;
      event.actualProfit = 0;
    }
    if(event.actualCheck > 0) {
      event.tacCut = (event.actualCheck - event.creditCardTips) * event.tacPct;
      event.drCut = event.actualCheck - event.tacCut;
      event.actualProfit = event.drCut - event.payout - event.coordinatorAdminAmt;
    }

    return event;
  }

  /*************************************************************************************
   * 
   * CF Events
   * 2020/2021 Season and earlier
   * 
  *************************************************************************************/
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

   /*************************************************************************************
   * 
   * CF Events
   * 2021/2022 Season and later
   * 
  *************************************************************************************/
    calculateCfEvent2020(event: Event, contract: ContractCF, timesheets: Timesheet[]) {
      // calculate tips per person
      var tipAmountPerPerson = 0;
      var totNumberOfWorkers = timesheets.length;
      if(totNumberOfWorkers > 0 && event.creditCardTipsCf > 0) {
        var ccTipsToDistribute = event.creditCardTipsCf;
        tipAmountPerPerson = ccTipsToDistribute / totNumberOfWorkers;
        tipAmountPerPerson = Math.min(event.maxCreditCardTipAmountCf, tipAmountPerPerson);
      }

      // update Timesheets
      var totalPayout = 0;
      timesheets.forEach(ts => {

        // cc tip amount
        ts.creditCardTips = tipAmountPerPerson;

        // update credit amount
        ts.creditAmount = Math.ceil(ts.eventBonus + 
                            ts.shuttleBonus +
                            ((ts.hourlyRate + ts.hourlyBonus) * ts.hoursWorked) +
                            ts.creditCardTips);
                    
        totalPayout += ts.creditAmount;
      });
      this.eventService.setTimesheets(timesheets);
      this.timesheets = timesheets;

      // total Payout
      event.payout = totalPayout;

      // get sales amounts
      var sales = event.totalSalesCf;

      // calculate tax
      var tax = sales * (contract.cfTaxRate - 1);
  
      // get total sales amounts
      var totalSales = sales - tax;
    
      // estimated check
      var estCheck = (totalSales * contract.cfCommission) + event.venueBonus + event.creditCardTipsCf;
      event.estimatedCheck = estCheck;

      event.estimatedProfit = (event.totalSalesCf * (1 - event.tacPct)) + event.creditCardTipsCf + (event.venueBonus * (1 - event.tacPct)) - event.payout - event.coordinatorAdminAmt;
      event.discrepancy = event.estimatedCheck - event.actualCheck;
      if(event.actualCheck <= 0) {
        event.tacCut = (event.estimatedCheck - event.creditCardTipsCf) * event.tacPct;
        event.drCut = event.estimatedCheck - event.tacCut;
        event.actualProfit = 0;
      }
      if(event.actualCheck > 0) {
        event.tacCut = (event.actualCheck - event.creditCardTipsCf) * event.tacPct;
        event.drCut = event.actualCheck - event.tacCut;
        event.actualProfit = event.drCut - event.payout - event.coordinatorAdminAmt;
      }
  
      return event;
   }

  /*************************************************************************************
   * 
   * Calculate All Timesheets
   * 
  *************************************************************************************/
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
      timesheet.creditAmount = Math.ceil(totalCredit);
    });
  }

  /*************************************************************************************
   * 
   * Calculate One Timesheets
   * 
  *************************************************************************************/
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
      // timesheet.creditAmount = totalCredit;
      timesheet.creditAmount = Math.ceil(totalCredit);


      return timesheet;
  }
}


