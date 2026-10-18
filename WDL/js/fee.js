/* ==========================================================================
   fee.js - Registration fee calculation
   Used by patient-registration.html after the form is validated.
   Concepts: variables, data types, operators, expressions, basic if.
   ========================================================================== */

const REGISTRATION_FEE = 100;          // fixed fee for every patient (Rs.)
const SENIOR_AGE = 60;                 // age from which a patient is a senior citizen
const SENIOR_DISCOUNT_PERCENT = 10;    // discount given to senior citizens

// Consultation fee depends on the department chosen in the form
function getConsultationFee(department) {
  if (department === "Pathology") {
    return 300;
  } else if (department === "Radiology") {
    return 500;
  } else if (department === "Cardiology") {
    return 600;
  } else if (department === "Home Sample Collection") {
    return 150;
  } else {
    return 400;                        // Health Package Checkup
  }
}

function calculateRegistration(patientName, patientId, patientAge, department) {
  let consultationFee = getConsultationFee(department);   // number
  let registrationFee = REGISTRATION_FEE;                 // number
  let subtotal = consultationFee + registrationFee;       // arithmetic expression
  let seniorEligible = false;                             // boolean
  let discount = 0;

  // Senior-citizen discount decided from age
  if (patientAge >= SENIOR_AGE) {
    seniorEligible = true;
    discount = subtotal * SENIOR_DISCOUNT_PERCENT / 100;
  }

  let total = subtotal - discount;
  let status = "Confirmed";

  console.log("Data types -> name: " + typeof patientName + ", id: " + typeof patientId +
              ", age: " + typeof patientAge + ", senior: " + typeof seniorEligible);

  return {
    consultationFee: consultationFee,
    registrationFee: registrationFee,
    seniorEligible: seniorEligible,
    discount: discount,
    total: total,
    status: status
  };
}
