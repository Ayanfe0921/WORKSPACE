const billInput = document.getElementById("bill");
const tipInput = document.getElementById("tip");
const peopleInput = document.getElementById("people");

const tipAmountEl = document.getElementById("tip-amount");
const totalAmountEl = document.getElementById("total-amount");

function calculateTip() {
  const bill = parseFloat(billInput.value) || 0;
  const tipPercent = parseFloat(tipInput.value) || 0;
  const people = parseInt(peopleInput.value) || 1;

  if (bill <= 0 || people <= 0) {
    tipAmountEl.textContent = "$0.00";
    totalAmountEl.textContent = "$0.00";
    return;
  }

  const totalTip = bill * (tipPercent / 100);
  const totalBill = bill + totalTip;

  const tipPerPerson = totalTip / people;
  const totalPerPerson = totalBill / people;

  tipAmountEl.textContent = `$${tipPerPerson.toFixed(2)}`;
  totalAmountEl.textContent = `$${totalPerPerson.toFixed(2)}`;
}

billInput.addEventListener("input", calculateTip);
tipInput.addEventListener("input", calculateTip);
peopleInput.addEventListener("input", calculateTip);