/*
===============================
CLASSES
===============================
*/

module.exports = class Order {
  constructor(customerName, procTotal, kilo) {
    this.procTotal = procTotal;
    this.kilo = kilo;
    this.customerName = customerName;
  }

  getCustomerName() {
    return this.customerName;
  }

  getCustomerTotal() {
    return this.procTotal;
  }

  getKilometers() {
    return this.kilo;
  }

  getCustomerTotalTaxed(taxRate) {
    return this.calculateSalesTax(taxRate) + this.procTotal;
  }

  calculateDeliveryPrice(kiloCost) {
    return kiloCost * this.kilo;
  }

  calculateSalesTax(taxRate) {
    return this.procTotal * taxRate;
  }

  calculateTotal(taxRate, kiloCost) {
    return (
      this.calculateDeliveryPrice(kiloCost) +
      this.getCustomerTotal() +
      this.calculateSalesTax(taxRate)
    );
  }
};
