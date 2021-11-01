import { EventService } from './event.service';
import { Event } from './../models/event.model';
import { ContractCF } from './../models/contractCF.model';
import { ContractWC } from './../models/contractWC.model';
import { Timesheet } from './../models/timesheet.model';
import { ContractPNC } from './../models/contractPNC.model';
import { Injectable } from '@angular/core';
import {Decimal} from 'decimal.js';

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
   * 2020/2021
   * 
  *************************************************************************************/
   calculatePncEvent2020(event: Event, contract: ContractPNC, timesheets: Timesheet[]) {
     // cast values to Decimal
    var zeroNum = new Decimal(0);
    var totalPayout = zeroNum;
    var pncFoodCommissionAfterIncrease = contract.pncFoodCommissionAfterIncrease != null ? new Decimal(contract.pncFoodCommissionAfterIncrease) : zeroNum;
    var pncFoodCommision = contract.pncFoodCommission != null ? new Decimal(contract.pncFoodCommission) : zeroNum;
    var pncAlcoholCommissionAfterIncrease = contract.pncAlcoholCommissionAfterIncrease != null ? new Decimal(contract.pncAlcoholCommissionAfterIncrease) : zeroNum;
    var pncAlcoholCommission = contract.pncAlcoholCommission != null ? new Decimal(contract.pncAlcoholCommission) : zeroNum;
    var itemSales1 = event.itemSales1 != null ? new Decimal(event.itemSales1) : zeroNum;
    var itemSales2 = event.itemSales2 != null ? new Decimal(event.itemSales2) : zeroNum;
    var itemSales3 = event.itemSales3 != null ? new Decimal(event.itemSales3) : zeroNum;
    var itemSales4 = event.itemSales4 != null ? new Decimal(event.itemSales4) : zeroNum;
    var itemSales5 = event.itemSales5 != null ? new Decimal(event.itemSales5) : zeroNum;
    var itemSales6 = event.itemSales6 != null ? new Decimal(event.itemSales6) : zeroNum;
    var alcSales1 = event.alcSales1 != null ? new Decimal(event.alcSales1) : zeroNum;
    var alcSales2 = event.alcSales2 != null ? new Decimal(event.alcSales2) : zeroNum;
    var alcSales3 = event.alcSales3 != null ? new Decimal(event.alcSales3) : zeroNum;
    var alcSales4 = event.alcSales4 != null ? new Decimal(event.alcSales4) : zeroNum;
    var alcSales5 = event.alcSales5 != null ? new Decimal(event.alcSales5) : zeroNum;
    var alcSales6 = event.alcSales6 != null ? new Decimal(event.alcSales6) : zeroNum;
    var discounts1 = event.discounts1 != null ? new Decimal(event.discounts1) : zeroNum;
    var discounts2 = event.discounts2 != null ? new Decimal(event.discounts2) : zeroNum;
    var discounts3 = event.discounts3 != null ? new Decimal(event.discounts3) : zeroNum;
    var discounts4 = event.discounts4 != null ? new Decimal(event.discounts4) : zeroNum;
    var discounts5 = event.discounts5 != null ? new Decimal(event.discounts5) : zeroNum;
    var discounts6 = event.discounts6 != null ? new Decimal(event.discounts6) : zeroNum;
    var oneNum = new Decimal(1);
    var pncFoodTaxRate = contract.pncFoodTaxRate != null ? new Decimal(contract.pncFoodTaxRate) : zeroNum;
    var pncAlcoholTaxRate = contract.pncAlcoholTaxRate != null ? new Decimal(contract.pncAlcoholTaxRate) : zeroNum;
    var pncMemberGuarantee = contract.pncMemberGuarantee != null ? new Decimal(contract.pncMemberGuarantee) : zeroNum;
    var venueBonus = event.venueBonus != null ? new Decimal(event.venueBonus) : zeroNum; 
    var ccTips = event.ccTips != null ? new Decimal(event.ccTips) : zeroNum;
    var pncPay = zeroNum;
    var estimatedProfit = zeroNum;
    var coordinatorAdminAmt = event.coordinatorAdminAmt != null ? new Decimal(event.coordinatorAdminAmt) : zeroNum;
    var tacPct = event.tacPct != null ? new Decimal(event.tacPct) : zeroNum;
    var actualCheck = event.actualCheck != null ? new Decimal(event.actualCheck) : zeroNum;
    var tacCut = zeroNum;
    var drCut = zeroNum;
    var actualProfit = zeroNum;
    var discrepancy = zeroNum;

    // calculate totalPayout
    if(timesheets) {
      timesheets.forEach(timesheet => {
        var creditAmount = timesheet.creditAmount != null ? new Decimal(timesheet.creditAmount) : zeroNum;
        totalPayout = totalPayout.add(creditAmount);
      });
    }

    // get commission rates
    var commFoodRate = event.metCommissionBonus ? pncFoodCommissionAfterIncrease : pncFoodCommision;
    var commAlcRate = event.metCommissionBonus ? pncAlcoholCommissionAfterIncrease : pncAlcoholCommission;
  
    // get food and alcohol sales amounts
    var itemSales = itemSales1.add(itemSales2).add(itemSales3).add(itemSales4).add(itemSales5).add(itemSales6);
    var alcSales = alcSales1.add(alcSales2).add(alcSales3).add(alcSales4).add(alcSales5).add(alcSales6);
    var discounts = discounts1.add(discounts2).add(discounts3).add(discounts4).add(discounts5).add(discounts6);
    var foodSales = itemSales.add(alcSales).add(discounts);

    // calculate tax
    var taxOnFood = pncFoodTaxRate.minus(oneNum).times(itemSales);
    var taxOnAlc = pncAlcoholTaxRate.minus(oneNum).times(alcSales);

    // get total sales amounts
    var totalFoodSales = itemSales.minus(taxOnFood);
    var totalAlcSales = alcSales.minus(taxOnAlc);
  
    // estimated check
    var estFoodCheck = totalFoodSales.times(commFoodRate);
    var estAlcCheck = totalAlcSales.times(commAlcRate);
    var estCheck = estFoodCheck.add(estAlcCheck);

        // guarantee is only checked if there is a payout and timesheets available
        // guarantee applies to cashiers only
    if(event.guarantee && timesheets && (Number(totalPayout) > 0)) {
      var guarCount = 0;
      for(var i = 0; i < timesheets.length; i++) {
        if(timesheets[i].isGuarantee) {
          guarCount++;
        }
      }
      // var guar = contract.pncMemberGuarantee * guarCount;
      var guar = pncMemberGuarantee.times(guarCount);
      if(Number(guar) > Number(estCheck)) {
        estCheck = guar;
      }
    }

    // add on extra money from PNC
    estCheck = estCheck.add(venueBonus).add(ccTips);

      // add other positions to estimate 
      // applies to Stand Leader and Cooks
    if(timesheets) {
      for(var i = 0; i < timesheets.length; i++) {
        var venuePay = timesheets[i].venuePay != null ? new Decimal(timesheets[i].venuePay) : zeroNum;
        pncPay = pncPay.add(venuePay);
      }
    }
    estCheck = estCheck.add(pncPay);
    
    // if we have a payout, we can calculate estimated profit, actual profit, and discrepancy
    if(Number(totalPayout) > 0) { 
      var tempTacCut = estCheck.minus(ccTips).times(tacPct);
      var tempDrCut = estCheck.minus(tempTacCut)
      estimatedProfit = tempDrCut.minus(totalPayout).minus(coordinatorAdminAmt);

      // get actual profit and discrepancy if check has been received
      if(Number(actualCheck) > 0) { 
        tacCut = actualCheck.minus(ccTips).times(tacPct);
        drCut = actualCheck.minus(tacCut);
        actualProfit = drCut.minus(totalPayout).minus(coordinatorAdminAmt);
        discrepancy = actualCheck.minus(estCheck);
         
      }
      else {
        tacCut = estCheck.minus(ccTips).times(tacPct);
        drCut = estCheck.minus(tacCut);
      }
    } 


    // cast values back to Number format
    event.payout = Number(totalPayout);
    event.totalSalesPnc = Number(itemSales);
    event.alcSales = Number(alcSales);
    event.totalDiscounts = Number(discounts);
    event.estimatedCheck = Number(estCheck);
    event.estimatedProfit = Number(estimatedProfit);
    event.tacCut = Number(tacCut);
    event.drCut = Number(drCut);
    event.actualProfit = Number(actualProfit);
    event.discrepancy = Number(discrepancy);

    return event;
  }

  /*************************************************************************************
   * 
   * PNC Events
   * 2021/2022 and later
   * 
  *************************************************************************************/
   calculatePncEvent2021(event: Event, contract: ContractPNC, timesheets: Timesheet[]) {
    // cast values to Decimal
   var zeroNum = new Decimal(0);
   var totalPayout = zeroNum;
   var totalSalesPnc = event.totalSalesPnc != null ? new Decimal(event.totalSalesPnc) : zeroNum;
   var oneNum = new Decimal(1);
   var pncMemberGuarantee = contract.pncMemberGuarantee != null ? new Decimal(contract.pncMemberGuarantee) : zeroNum;
   var venueBonus = event.venueBonus != null ? new Decimal(event.venueBonus) : zeroNum; 
   var ccTips = event.ccTips != null ? new Decimal(event.ccTips) : zeroNum;
   var pncPay = zeroNum;
   var estimatedProfit = zeroNum;
   var coordinatorAdminAmt = event.coordinatorAdminAmt != null ? new Decimal(event.coordinatorAdminAmt) : zeroNum;
   var tacPct = event.tacPct != null ? new Decimal(event.tacPct) : zeroNum;
   var actualCheck = event.actualCheck != null ? new Decimal(event.actualCheck) : zeroNum;
   var tacCut = zeroNum;
   var drCut = zeroNum;
   var actualProfit = zeroNum;
   var discrepancy = zeroNum;

   // calculate totalPayout
   if(timesheets) {
     timesheets.forEach(timesheet => {
       var creditAmount = timesheet.creditAmount != null ? new Decimal(timesheet.creditAmount) : zeroNum;
       totalPayout = totalPayout.add(creditAmount);
     });
   }
 
   // estimated check
   var estCheck = totalSalesPnc;

       // guarantee is only checked if there is a payout and timesheets available
       // guarantee applies to cashiers only
   if(event.guarantee && timesheets && (Number(totalPayout) > 0)) {
     var guarCount = 0;
     for(var i = 0; i < timesheets.length; i++) {
       if(timesheets[i].isGuarantee) {
         guarCount++;
       }
     }

     var guar = pncMemberGuarantee.times(guarCount);
     if(Number(guar) > Number(estCheck)) {
       estCheck = guar;
     }
   }

   // add on extra money from PNC
   estCheck = estCheck.add(venueBonus).add(ccTips);

     // add other positions to estimate 
     // applies to Stand Leader and Cooks
  //  if(timesheets) {
  //    for(var i = 0; i < timesheets.length; i++) {
  //      var venuePay = timesheets[i].venuePay != null ? new Decimal(timesheets[i].venuePay) : zeroNum;
  //      pncPay = pncPay.add(venuePay);
  //    }
  //  }
   // estCheck = estCheck.add(pncPay);
   
   // Calculate estimated profit
  var tempTacCut = estCheck.minus(ccTips).times(tacPct);
  var tempDrCut = estCheck.minus(tempTacCut);
  estimatedProfit = tempDrCut.minus(totalPayout).minus(coordinatorAdminAmt);

  // get actual profit and discrepancy if check has been received
  if(Number(actualCheck) > 0) { 
    tacCut = actualCheck.minus(ccTips).times(tacPct);
    drCut = actualCheck.minus(tacCut);
    actualProfit = drCut.minus(totalPayout).minus(coordinatorAdminAmt);
    discrepancy = actualCheck.minus(estCheck);
    
  }
  else {
    tacCut = tempTacCut;
    drCut = tempDrCut;
  }

   // cast values back to Number format
   event.payout = Number(totalPayout);
   event.totalSalesPnc = Number(totalSalesPnc);
   event.estimatedCheck = Number(estCheck);
   event.estimatedProfit = Number(estimatedProfit);
   event.tacCut = Number(tacCut);
   event.drCut = Number(drCut);
   event.actualProfit = Number(actualProfit);
   event.discrepancy = Number(discrepancy);

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
     // cast values to Decimal format
    var zeroNum = new Decimal(0);
    var oneNum = new Decimal(1);
    var tipAmountPerPerson = zeroNum;
    var totNumberOfWorkers = timesheets != null ? new Decimal(timesheets.length) : zeroNum;
    var creditCardTips = event.creditCardTips != null ? new Decimal(event.creditCardTips) : zeroNum;
    var maxCreditCardTipAmount = event.maxCreditCardTipAmount != null ? new Decimal(event.maxCreditCardTipAmount) : zeroNum;
    var totalPayout = zeroNum;
    var totalSalesWc = event.totalSalesWc != null ? new Decimal(event.totalSalesWc) : zeroNum;
    var creditCardTips = event.creditCardTips != null ? new Decimal(event.creditCardTips) : zeroNum;
    var venueBonus = event.venueBonus != null ? new Decimal(event.venueBonus) : zeroNum;
    var tacPct = event.tacPct != null ? new Decimal(event.tacPct) : zeroNum;
    var coordinatorAdminAmt = event.coordinatorAdminAmt != null ? new Decimal(event.coordinatorAdminAmt) : zeroNum;
    var actualCheck = event.actualCheck != null ? new Decimal(event.actualCheck) : zeroNum;  
    var discrepancy = zeroNum;  
    var tacCut = zeroNum;
    var drCut = zeroNum;
    var actualProfit = zeroNum;

    // calculate tips per person
    if(Number(totNumberOfWorkers) > 0 && Number(creditCardTips) > 0) {
      tipAmountPerPerson = creditCardTips.div(totNumberOfWorkers);
      if(Number(tipAmountPerPerson) > Number(maxCreditCardTipAmount)) {
        tipAmountPerPerson = maxCreditCardTipAmount;
      }
    }

    // update Timesheets
    if(timesheets) {
      timesheets.forEach(ts => {
        var eventBonus = ts.eventBonus != null ? new Decimal(ts.eventBonus) : zeroNum;
        var shuttleBonus = ts.shuttleBonus != null ? new Decimal(ts.shuttleBonus) : zeroNum;
        var hourlyRate = ts.hourlyRate != null ? new Decimal(ts.hourlyRate) : zeroNum;
        var hourlyBonus = ts.hourlyBonus != null ? new Decimal(ts.hourlyBonus) : zeroNum;
        var hoursWorked = ts. hoursWorked != null ? new Decimal(ts.hoursWorked) : zeroNum;
        var tsCreditCardTips = ts.creditCardTips != null ? new Decimal(ts.creditCardTips) : zeroNum;

        // cc tip amount
        ts.creditCardTips = Number(tipAmountPerPerson);
  
        // update credit amount
        var creditAmount = hourlyRate.add(hourlyBonus).times(hoursWorked).add(eventBonus).add(shuttleBonus).add(tsCreditCardTips);
        ts.creditAmount = Math.ceil(Number(creditAmount));
                    
        totalPayout = totalPayout.add(creditAmount);
      });
      this.eventService.setTimesheets(timesheets);
      this.timesheets = timesheets;
    }

    // checks, cuts, and profit
    var estimatedCheck = totalSalesWc.add(creditCardTips).add(venueBonus);
    var sub1 = oneNum.minus(tacPct).times(totalSalesWc);
    var sub2 = oneNum.minus(tacPct).times(venueBonus);
    if(Number(sub1) > 0 || Number(sub2) > 0 || Number(creditCardTips) > 0 || Number(totalPayout) > 0)
      var estimatedProfit = sub1.add(sub2).add(creditCardTips).minus(totalPayout).minus(coordinatorAdminAmt);
    
    if(Number(actualCheck) <= 0) {
      tacCut = estimatedCheck.minus(creditCardTips).times(tacPct);
      drCut = estimatedCheck.minus(tacCut);
    }
    if(event.actualCheck > 0) {
      tacCut = actualCheck.minus(creditCardTips).times(tacPct);
      drCut = actualCheck.minus(tacCut);
      actualProfit = drCut.minus(totalPayout).minus(coordinatorAdminAmt);
      discrepancy = estimatedCheck.minus(actualCheck);
    }

    // convert back to Number format
    event.payout = Number(totalPayout);
    event.estimatedCheck = Number(estimatedCheck);
    event.estimatedProfit = Number(estimatedProfit);
    event.discrepancy = Number(discrepancy);
    event.tacCut = Number(tacCut);
    event.drCut = Number(drCut);
    event.actualProfit = Number(actualProfit);

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
      var totNumberOfWorkers = 0;
      if(timesheets)
        var totNumberOfWorkers = timesheets.length;
      if(totNumberOfWorkers > 0 && event.creditCardTipsCf > 0) {
        var ccTipsToDistribute = event.creditCardTipsCf;
        tipAmountPerPerson = ccTipsToDistribute / totNumberOfWorkers;
        tipAmountPerPerson = Math.min(event.maxCreditCardTipAmountCf, tipAmountPerPerson);
      }

      // update Timesheets
      var totalPayout = 0;
      if(timesheets) {
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
      } 
      // total Payout
      event.payout = totalPayout;

      // get sales amounts

      // cast values to Decimal string
      var zeroNum = new Decimal(0);
      var totalSalesCf = event.totalSalesCf != null ? new Decimal(event.totalSalesCf) : zeroNum;
      var creditCardTipsCf = event.creditCardTipsCf != null ? new Decimal(event.creditCardTipsCf) : zeroNum;
      var venueBonus = event.venueBonus != null ? new Decimal(event.venueBonus) : zeroNum;
      var payout = event.payout != null ? new Decimal(event.payout) : zeroNum;
      var actualCheck = event.actualCheck != null ? new Decimal(event.actualCheck) : zeroNum;
      var cfTaxRate = contract.cfTaxRate != null ? new Decimal(contract.cfTaxRate) : new Decimal(1);
      var cfCommission = contract.cfCommission != null ? new Decimal(contract.cfCommission) : zeroNum;;
      var tacPct = event.tacPct != null ? new Decimal(event.tacPct) : new Decimal(1);
      var coordinatorAdminAmt = event.coordinatorAdminAmt != null ? new Decimal(event.coordinatorAdminAmt) : zeroNum;
      var oneNum = new Decimal(1);
      var tacCut = zeroNum;
      var drCut = zeroNum;
      var actualProfit = zeroNum;
      var discrepancy = zeroNum;
      var estimatedProfit = zeroNum;

      // calculate tax
      var tax = cfTaxRate.minus(1).times(totalSalesCf);
  
      // get total sales amounts
      var totalSales = totalSalesCf.minus(tax);
    
      // estimated check
      var estimatedCheck = totalSales.times(cfCommission).add(venueBonus).add(creditCardTipsCf);
      var tempTacCut = estimatedCheck.minus(creditCardTipsCf).times(tacPct);
      var tempDrCut = estimatedCheck.minus(tempTacCut);
      estimatedProfit = tempDrCut.minus(payout).minus(coordinatorAdminAmt);

      if(Number(actualCheck) <= 0) {
        tacCut = estimatedCheck.minus(creditCardTipsCf).times(tacPct);
        drCut = estimatedCheck.minus(tacCut); 
      }
      else if(Number(actualCheck) > 0) {
        tacCut = actualCheck.minus(creditCardTipsCf).times(tacPct);
        drCut = actualCheck.minus(tacCut);
        actualProfit = drCut.minus(payout).minus(coordinatorAdminAmt);
        discrepancy = actualCheck.minus(estimatedCheck);
      }
  
      // cast values back to Number
      event.estimatedCheck = Number(estimatedCheck);
      event.estimatedProfit = Number(estimatedProfit);
      event.discrepancy = Number(discrepancy);
      event.tacCut = Number(tacCut);
      event.drCut = Number(drCut);
      event.actualProfit = Number(actualProfit);

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


