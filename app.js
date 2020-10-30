/*
==========================================
Assignment: Program 1 – Hipster's Local Vinyl Records
Author: Devin Davis
Date: Sep 14, 2020
===========================================
*/

const readlineSync = require("readline-sync");
const chalk = require("chalk");
const questions = require("./data");
const Order = require("./classes/Order");
const Anwser = require("./classes/Anwser");

/*
===============================
FUNCTIONs
===============================
*/
// log an input error to console
function logInputErr(err) {
  console.log(chalk.red(err));
}
// prompt question
function askQuestion(question) {
  return readlineSync.question(`\n${question}`);
}

// create order summary to log to console
function logOrderSummary(anwsers) {
  // create order data variables
  let customerName, productTotal, kiloTotal;
  anwsers.forEach((an) => {
    switch (an.questionId) {
      case 1:
        customerName = an.anwser;
        break;
      case 2:
        productTotal = an.anwser;
        break;
      case 3:
        kiloTotal = an.anwser;
    }
  });

  // create new order
  let newOrder = new Order(customerName, productTotal, kiloTotal);

  // take order data and turn it into information
  let customerOrder = {};
  customerOrder.total = newOrder.calculateTotal(0.14, 15);
  customerOrder.name = newOrder.getCustomerName();
  customerOrder.deliveryCost = newOrder.calculateDeliveryPrice(15);
  customerOrder.purchaseCost = newOrder.getCustomerTotalTaxed(0.14);

  // log order info to console
  console.log(
    `\nPurchase summary for: ${customerOrder.name} \nDelivery Cost: $${customerOrder.deliveryCost} \nPurchase Cost: $${customerOrder.purchaseCost} \nTotal Cost: $${customerOrder.total}`
  );
}

// prompt question
function askQuestion(question) {
  return readlineSync.question(`\n${question}`);
}

// log an input error to console
function logInputErr(err) {
  console.log(chalk.red(err));
}

/*
===============================
USER PROMPTS
===============================
*/

let anwsers = questions.map((question) => {
  // get question anwser
  let anwser = askQuestion(question.name);
  // check question type
  switch (question.type) {
    case "number":
      // store anwser in type variable
      let numberAnwser = anwser;
      numberAnwser = parseInt(numberAnwser);
      // if anwser is not a number - ask for input until number
      if (isNaN(numberAnwser)) {
        // prompt user for different anwser
        logInputErr(`\nInput: "${anwser}" is not a number`);
        do {
          // ask question again
          numberAnwser = askQuestion(question.name);
          // capture new anwser
          let newAnwser = numberAnwser;
          // try to change to number
          numberAnwser = parseInt(numberAnwser);
          // if invalid again - prompt user for different anwser
          if (isNaN(numberAnwser)) {
            logInputErr(`\nInput: "${newAnwser}" is not a number`);
          }
        } while (isNaN(numberAnwser));
      } else {
        // if anwser is a number return anwser
        return new Anwser(numberAnwser, question.id);
      }
      return new Anwser(numberAnwser, question.id);
    case "string":
      // store anwser in type variable
      let letterAnwser = anwser;
      letterAnwser = parseInt(letterAnwser);
      // if anwser is not a letter - ask for input until letter
      if (!isNaN(letterAnwser)) {
        // prompt user for different anwser
        logInputErr(`\nInput: "${anwser}" is not a letter`);
        do {
          // ask question again
          letterAnwser = askQuestion(question.name);
          // capture new anwser
          let newAnwser = letterAnwser;
          // try to change anwser to number
          letterAnwser = parseInt(letterAnwser);

          // if invalid again - prompt user for different anwser
          if (!isNaN(letterAnwser)) {
            logInputErr(`\nInput: "${newAnwser}" is not a letter`);
          }
        } while (!isNaN(letterAnwser));
      } else {
        // if answer is letter return letter
        return new Anwser(anwser, question.id);
      }
      return new Anwser(anwser, question.id);
    default:
      console.log("err");
  }
});

// log order summary to console
logOrderSummary(anwsers);
