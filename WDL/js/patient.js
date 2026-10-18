/* ==========================================================================
   patient.js - Patient object for registration-receipt.html
   The registration page saves the validated details; this file turns them
   into a patient object with properties and methods (using "this").
   Included in <head>; the methods print with document.write(), so they must
   be called from a <script> placed where the output should appear.
   ========================================================================== */

let savedText = sessionStorage.getItem("patientRecord");
let record = savedText ? JSON.parse(savedText) : null;

// Print one table row on the page and the same line in the console
function printRow(label, value, cssClass) {
  console.log(label + ": " + value);
  if (cssClass) {
    value = "<span class='" + cssClass + "'>" + value + "</span>";
  }
  document.write("<tr><th>" + label + "</th><td>" + value + "</td></tr>");
}

function priorityClass(priority) {
  if (priority === "Emergency Consultation Required") {
    return "badge priority-emergency";
  } else if (priority === "High Priority Consultation") {
    return "badge priority-high";
  } else if (priority === "Priority Consultation") {
    return "badge priority-medium";
  } else {
    return "badge priority-regular";
  }
}

let patient = null;

if (record !== null) {
  patient = {
    patientName: record.patientName,
    patientId: record.patientId,
    age: record.age,
    gender: record.gender,
    bloodGroup: record.bloodGroup,
    mobile: record.mobile,
    department: record.department,
    appointmentType: record.appointmentType,
    registrationStatus: record.status,
    testName: record.testName,
    appointmentDate: record.appointmentDate,
    priority: record.priority,

    // 1. Display complete patient information
    displayPatient: function () {
      document.write("<table class='detail-table'>");
      printRow("Patient Name", this.patientName);
      printRow("Patient ID", this.patientId);
      printRow("Age", this.age + " years (" + this.getAgeCategory() + ")");
      printRow("Gender", this.gender);
      printRow("Blood Group", this.bloodGroup);
      printRow("Mobile", this.mobile);
      printRow("Department", this.department);
      printRow("Registration Status", this.registrationStatus);
      document.write("</table>");
    },

    // 2. Display appointment information
    displayAppointment: function () {
      document.write("<table class='detail-table'>");
      printRow("Department", this.department);
      printRow("Test", this.testName);
      printRow("Appointment Type", this.appointmentType);
      printRow("Appointment Date", this.appointmentDate);
      printRow("Priority", this.priority, priorityClass(this.priority));
      document.write("</table>");
    },

    // 3. Adult or senior citizen based on age (Minor added for under 18)
    getAgeCategory: function () {
      if (this.age >= 60) {
        return "Senior Citizen";
      } else if (this.age >= 18) {
        return "Adult";
      } else {
        return "Minor";
      }
    }
  };
}
