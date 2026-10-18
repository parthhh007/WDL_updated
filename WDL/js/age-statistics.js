/* ==========================================================================
   age-statistics.js - Patient age analysis for reports.html
   Concepts: arrays, loops, array methods, functions, conditionals, maths.
   ========================================================================== */

let patientAges = [22, 35, 67, 45, 29, 72, 56, 18, 64, 40];

// 2. Minimum age
function findMinimum(ages) {
  let min = ages[0];
  for (let i = 1; i < ages.length; i++) {
    if (ages[i] < min) {
      min = ages[i];
    }
  }
  return min;
}

// 3. Maximum age
function findMaximum(ages) {
  let max = ages[0];
  for (let i = 1; i < ages.length; i++) {
    if (ages[i] > max) {
      max = ages[i];
    }
  }
  return max;
}

// 4. Average age
function findAverage(ages) {
  let sum = 0;
  for (let i = 0; i < ages.length; i++) {
    sum += ages[i];
  }
  return sum / ages.length;
}

// 5. Senior citizens (60 and above)
function countSeniors(ages) {
  let count = 0;
  for (let i = 0; i < ages.length; i++) {
    if (ages[i] >= 60) {
      count++;
    }
  }
  return count;
}

// 6. Patients below 18
function countBelow18(ages) {
  let count = 0;
  for (let i = 0; i < ages.length; i++) {
    if (ages[i] < 18) {
      count++;
    }
  }
  return count;
}

// 7. Patients older than 60 (array method)
function getAbove60(ages) {
  return ages.filter(function (age) {
    return age > 60;
  });
}

// 1. Turn an array of ages into a row of boxes
function agesToChips(ages) {
  let html = "";
  for (let i = 0; i < ages.length; i++) {
    html += "<span class='age-chip'>" + ages[i] + "</span>";
  }
  return html;
}

function statCard(label, value) {
  return "<div class='stat-card'><div class='stat-value'>" + value +
         "</div><div class='stat-label'>" + label + "</div></div>";
}

function showReport() {
  let min = findMinimum(patientAges);
  let max = findMaximum(patientAges);
  let average = findAverage(patientAges).toFixed(1);
  let seniors = countSeniors(patientAges);
  let minors = countBelow18(patientAges);
  let above60 = getAbove60(patientAges);

  document.getElementById("allAges").innerHTML = agesToChips(patientAges);
  document.getElementById("above60").innerHTML = agesToChips(above60);
  document.getElementById("statGrid").innerHTML =
    statCard("Total patients", patientAges.length) +
    statCard("Youngest patient", min + " yrs") +
    statCard("Oldest patient", max + " yrs") +
    statCard("Average age", average + " yrs") +
    statCard("Senior citizens", seniors) +
    statCard("Below 18 years", minors);

  console.log("Ages: " + patientAges.join(", "));
  console.log("Min: " + min + ", Max: " + max + ", Average: " + average);
  console.log("Seniors: " + seniors + ", Below 18: " + minors + ", Above 60: " + above60.join(", "));
}

showReport();
