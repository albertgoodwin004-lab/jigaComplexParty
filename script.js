// Jiggah Complex Party - works on GitHub Pages (no server needed)

const memberButton = document.getElementById("memberButton");
const sponsorButton = document.getElementById("sponsorButton");
const paymentFormSection = document.getElementById("paymentForm");
const formTitle = document.getElementById("formTitle");
const messageDiv = document.getElementById("message");

const transactionForm = document.getElementById("transactionForm");
const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const amountInput = document.getElementById("amount");
const formMessage = document.getElementById("formMessage");
const cancelButton = document.getElementById("cancelButton");

let currentType = "member";

function showForm(type, title, defaultAmount) {
  currentType = type;
  if (formTitle) formTitle.textContent = title;
  if (paymentFormSection) paymentFormSection.hidden = false;
  if (amountInput) {
    amountInput.value = defaultAmount;
    if (type === "member") {
      amountInput.max = 10000;
    } else {
      amountInput.removeAttribute("max");
    }
  }
  if (messageDiv) messageDiv.textContent = "";
  if (formMessage) formMessage.textContent = "";
  if (fullNameInput) fullNameInput.focus();
  if (paymentFormSection) paymentFormSection.scrollIntoView({ behavior: "smooth" });
}

if (memberButton) {
  memberButton.addEventListener("click", function() {
    showForm("member", "Member Contribution - MK10,000", 10000);
  });
}

if (sponsorButton) {
  sponsorButton.addEventListener("click", function() {
    showForm("sponsor", "Sponsor the Party", "");
  });
}

if (transactionForm) {
  transactionForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const fullName = fullNameInput ? fullNameInput.value.trim() : "";
    const phone = phoneInput ? phoneInput.value.trim() : "";
    const amount = amountInput ? Number(amountInput.value) : 0;

    if (!fullName || !phone || !Number.isSafeInteger(amount) || amount <= 0) {
      if (formMessage) formMessage.textContent = "Please enter valid details and an amount.";
      return;
    }

    if (currentType === "member" && amount > 10000) {
      if (formMessage) formMessage.textContent = "A member contribution cannot exceed MK10,000.";
      return;
    }

    if (formMessage) {
      formMessage.textContent = "Thank you " + fullName + "! Your " + currentType + " payment of MK" + amount + " has been recorded. We will confirm on " + phone + ".";
    }
    transactionForm.reset();
  });
}

if (cancelButton) {
  cancelButton.addEventListener("click", function() {
    if (transactionForm) transactionForm.reset();
    if (formMessage) formMessage.textContent = "";
    if (paymentFormSection) paymentFormSection.hidden = true;
    if (messageDiv) messageDiv.textContent = "Form cancelled.";
  });
}
