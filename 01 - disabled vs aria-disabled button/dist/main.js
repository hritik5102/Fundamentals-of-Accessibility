const elForm = document.querySelector(".js-form");
const elBtnSubmit = document.querySelector(".js-btnSubmit");
const elTickets = document.querySelector(".js-tickets");
const elFeedback = document.querySelector(".js-feedback");
const elTooltip = document.querySelector(".js-tooltip");

let ticketsCount = 0;
let isSubmitting = false;

const checkTicketsValidation = () => ticketsCount >= 1 && ticketsCount <= 9;

elBtnSubmit.addEventListener("click", handleBtnClick);

elTickets.addEventListener("keyup", handleCountChange);
elTickets.addEventListener("change", handleCountChange);

elForm.addEventListener("submit", handleFormSubmit);

function handleCountChange(event) {
  ticketsCount = Number(event.target.value);
  const hasValidTickets = checkTicketsValidation();

  if (hasValidTickets) {
    /* [DIFF] 1/2 - change attribute from disabled to aria-disabled */
    elBtnSubmit.setAttribute("aria-disabled", "false");
    elTooltip.classList.remove("isActive");
  } else {
    elBtnSubmit.setAttribute("aria-disabled", "true");
    elTooltip.classList.add("isActive");
  }

  elFeedback.innerText = "";
}

function handleBtnClick(event) {
  // Do nothing. the submit happens on the form submit
}

async function handleFormSubmit(event) {
  event.preventDefault(); // avoid native form submit (page refresh)

  /* [DIFF] 2/2 - verify if button has aria-disabled="true" */
  const isBtnDisabled = elBtnSubmit.getAttribute("aria-disabled") === "true";

  if (isBtnDisabled) {
    console.log("Disabled submit prevented");
    return;
  }

  if (isSubmitting) {
    console.log("Double submit prevented");
    return;
  }

  isSubmitting = true;

  elFeedback.innerText = "";
  elBtnSubmit.setAttribute("data-loading", "true");
  // Explicit set the button loading action for screen readers
  const elLoadingStatus = elBtnSubmit.querySelector(".js-loadingMsg");
  elLoadingStatus.innerText = elLoadingStatus.getAttribute("data-loading-msg");

  await fakeWaitTime(1500);

  elLoadingStatus.innerText = "";
  elFeedback.innerText = `Added ${ticketsCount} tickets!`;
  elBtnSubmit.setAttribute("data-loading", "false");

  isSubmitting = false;
}

function fakeWaitTime(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
