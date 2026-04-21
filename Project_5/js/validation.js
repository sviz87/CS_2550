/*
Project: Project 5 - Personal Web Site - Visitor Form Validation - Refactor JS
Name: Stefan Vizante
Submitted: 2026-04-20

I declare that the following source code was written by me, or provided
by the instructor for this project. I understand that copying source
code from any other source, providing source code to another student,
or leaving my code on a public web site constitutes cheating.
I acknowledge that If I am found in violation of this policy this may result
in a zero grade, a permanent record on file and possibly immediate failure of the class.

Reflection: I learned how useful it is to turn the validation template into a
working library instead of leaving the logic spread around the page. Building the required
functions by hand made it much clearer how `setCustomValidity`, `checkValidity`, and
CSS validation states work together.

The harder part was adapting the reference logic to a more polished form layout with checkbox
groups, and a hidden thank-you flow. I also had to make sure the behavior
still followed the assignment rules for change based validation and full form submit validation.
*/

const phoneRegex = /^(?:\+1\s*)?(?:\(\d{3}\)|\d{3})[\s.-]?\d{3}[\s.-]?\d{4}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const zipCodeRegex = /^\d{5}(?:-\d{4})?$/;

const stateAbbreviations = [
  "AL", "AK", "AS", "AZ", "AR", "CA", "CO", "CT", "DE", "DC", "FM", "FL", "GA",
  "GU", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MH", "MD", "MA",
  "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND",
  "MP", "OH", "OK", "OR", "PW", "PA", "PR", "RI", "SC", "SD", "TN", "TX", "UT",
  "VT", "VI", "VA", "WA", "WV", "WI", "WY"
];

let form = null;
let successMsg = null;
let visitAnotherBtn = null;

function normalizeFormId(formId) {
  return formId.startsWith("#") ? formId.slice(1) : formId;
}

function getErrorContainer(el) {
  const field = el.closest(".form-field");
  return field ? field.querySelector(".errorMsg") : null;
}

function initValidation(formId, successId = "visit-thankyou") {
  form = document.getElementById(normalizeFormId(formId));
  successMsg = document.getElementById(successId);
  visitAnotherBtn = document.getElementById("visit-another-btn");
  if (!(form instanceof HTMLFormElement)) return;

  const fields = form.querySelectorAll("input, select, textarea");
  fields.forEach((input) => {
    input.addEventListener("change", inputChanged);
  });

  form.addEventListener("submit", submitForm);
  form.addEventListener("reset", () => {
    window.setTimeout(() => {
      resetValidationUi();
    }, 0);
  });

  if (visitAnotherBtn instanceof HTMLButtonElement) {
    visitAnotherBtn.addEventListener("click", () => {
      form.reset();
      resetValidationUi();
      const firstName = document.getElementById("first-name");
      if (firstName instanceof HTMLElement) {
        firstName.focus();
      }
    });
  }
}

function initVisitorForm() {
  initValidation("myform", "visit-thankyou");
}

function inputChanged(ev) {
  const el = ev.currentTarget;
  validateForm();

  if (el.type === "checkbox" || el.type === "radio") {
    form.querySelectorAll(`[name="${el.name}"]`).forEach((input) => input.classList.add("was-validated"));
  } else {
    el.classList.add("was-validated");
  }
}

function submitForm(ev) {
  const currentForm = ev.currentTarget;
  ev.preventDefault();
  ev.stopPropagation();

  validateForm();
  currentForm.querySelectorAll("input, select, textarea").forEach((input) => {
    input.classList.add("was-validated");
  });

  if (!currentForm.checkValidity()) {
    return;
  }

  currentForm.hidden = true;
  if (successMsg) {
    successMsg.hidden = false;
  }
}

function validateForm() {
  checkRequired("first-name", "First name is required");
  checkRequired("last-name", "Last name is required");
  checkRequired("address", "Address is required");
  checkRequired("city", "City is required");

  if (checkRequired("state", "State is required")) {
    validateState("state", "Enter a valid two-letter state code such as UT");
  }

  if (checkRequired("zip", "Zip code is required")) {
    checkFormat("zip", "Use either ##### or #####-#### for the zip code", zipCodeRegex);
  }

  if (checkRequired("phone", "Cell phone is required")) {
    checkFormat("phone", "Enter a valid phone number", phoneRegex);
  }

  if (checkRequired("email", "Email address is required")) {
    checkFormat("email", "Enter a valid email address", emailRegex);
  }

  checkRequired("google", "Select at least one checkbox source");
}

function validateState(id, msg) {
  const el = document.getElementById(id);
  if (!el) return false;

  const value = el.value.trim().toUpperCase();
  el.value = value;
  const valid = value.length === 2 && stateAbbreviations.includes(value);
  setElementValidity(id, valid, msg);
  return valid;
}

function checkFormat(id, msg, regex) {
  const el = document.getElementById(id);
  if (!el) return false;

  const valid = regex.test(el.value.trim());
  setElementValidity(id, valid, msg);
  return valid;
}

function checkRequired(id, message) {
  const el = document.getElementById(id);
  if (!el) return false;

  let valid = false;
  const type = el.type;
  const tagName = el.tagName.toLowerCase();

  switch (type) {
    case "text":
    case "password":
    case "email":
    case "tel":
      valid = el.value.trim() !== "";
      break;
    case "checkbox":
    case "radio": {
      const group = form.querySelectorAll(`input[name="${el.name}"]`);
      valid = Array.from(group).some((input) => input.checked);
      break;
    }
    default:
      if (tagName === "textarea" || tagName === "select") {
        valid = el.value.trim() !== "";
      } else {
        valid = el.value.trim() !== "";
      }
  }

  setElementValidity(id, valid, message);
  return valid;
}

function setElementValidity(id, valid, message) {
  const el = document.getElementById(id);
  if (!el) return;

  const errorDiv = getErrorContainer(el);

  if (valid) {
    el.setCustomValidity("");
    if (errorDiv) {
      errorDiv.textContent = "";
      errorDiv.style.display = "none";
    }
  } else {
    el.setCustomValidity(message);
    if (errorDiv) {
      errorDiv.textContent = message;
      errorDiv.style.display = "block";
    }
  }
}

function resetValidationUi() {
  if (!form) return;

  form.querySelectorAll(".was-validated").forEach((el) => el.classList.remove("was-validated"));
  form.querySelectorAll(".errorMsg").forEach((el) => {
    el.textContent = "";
    el.style.display = "none";
  });
  form.querySelectorAll("input, select, textarea").forEach((el) => {
    el.setCustomValidity("");
  });

  form.hidden = false;
  if (successMsg) {
    successMsg.hidden = true;
  }
}

window.RoadbookValidation = {
  initValidation,
  initVisitorForm
};
