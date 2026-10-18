/* ==========================================================================
   priority.js - Appointment priority decision
   Concepts: relational operators, logical operators, if-else-if.
   ========================================================================== */

function decidePriority(age, temperature, severity, emergency) {
  let recommendation;

  if (emergency === "Yes") {
    recommendation = "Emergency Consultation Required";
  } else if (temperature >= 39) {
    recommendation = "High Priority Consultation";
  } else if (severity === "Severe") {
    recommendation = "High Priority Consultation";
  } else if (age >= 60 && severity === "Moderate") {
    recommendation = "Priority Consultation";
  } else {
    recommendation = "Regular Consultation";
  }

  return recommendation;
}
