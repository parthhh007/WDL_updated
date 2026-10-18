/* ==========================================================================
   Experiment 6: jQuery for the Healthcare Patient Registration form
   Task 1: jQuery setup, selectors and events
   Task 2: Form validation using jQuery
   Task 3: jQuery effects (slide / fade)
   Task 4: DOM manipulation (text, append, remove)
   ========================================================================== */

$(document).ready(function () {

  /* ---------------- Task 1: selectors and events ---------------- */
  // When a field gets focus, colour its label; remove it when focus is lost
  $("input, select, textarea").on("focus", function () {
    $(this).closest(".field").find("label").addClass("active-label");
  });
  $("input, select, textarea").on("blur", function () {
    $(this).closest(".field").find("label").removeClass("active-label");
  });

  // Date of Birth cannot be in the future (set on the date picker itself)
  var today = new Date().toISOString().split("T")[0];
  $("#dob").attr("max", today);


  /* ---------------- Task 2: validation with jQuery ---------------- */
  var namePattern   = /^[A-Za-z]+( [A-Za-z]+)*$/;
  var mobilePattern = /^[6-9][0-9]{9}$/;
  var emailPattern  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // show an error beside a field and highlight it
  function showError(id, message) {
    $("#" + id + "Error").text(message);
    $("#" + id).addClass("invalid");
    return false;
  }

  // clear the error of a field
  function clearError(id) {
    $("#" + id + "Error").text("");
    $("#" + id).removeClass("invalid");
    return true;
  }

  function checkName() {
    var v = $("#pname").val().trim();
    $("#pname").val(v);
    if (v === "") return showError("pname", "Patient Name must be filled out.");
    if (!namePattern.test(v)) return showError("pname", "Name can contain only letters and spaces.");
    return clearError("pname");
  }

  function checkMobile() {
    var v = $("#mobile").val().trim();
    if (v === "") return showError("mobile", "Mobile Number must be filled out.");
    if (!mobilePattern.test(v)) return showError("mobile", "Enter a valid 10-digit mobile number starting with 6-9.");
    return clearError("mobile");
  }

  function checkEmail() {
    var v = $("#email").val().trim();
    if (v === "") return showError("email", "Email must be filled out.");
    if (!emailPattern.test(v)) return showError("email", "Enter a valid email address.");
    return clearError("email");
  }

  function checkDob() {
    var v = $("#dob").val();
    if (v === "") return showError("dob", "Date of Birth must be entered.");
    if (v > today) return showError("dob", "Date of Birth cannot be in the future.");
    return clearError("dob");
  }

  function checkSelect(id, label) {
    if ($("#" + id).val() === "") return showError(id, "Please select " + label + ".");
    return clearError(id);
  }

  function checkAddress() {
    var v = $("#address").val().trim();
    $("#address").val(v);
    if (v === "") return showError("address", "Address must be filled out.");
    if (v.length < 10) return showError("address", "Address must be at least 10 characters.");
    return clearError("address");
  }

  // emergency contact is checked only when the emergency box is ticked
  function checkEmergency() {
    if (!$("#emergency").is(":checked")) return true;
    var v = $("#emergencyMobile").val().trim();
    if (!mobilePattern.test(v)) return showError("emergencyMobile", "Enter a valid 10-digit emergency contact number.");
    return clearError("emergencyMobile");
  }

  // re-check a field as soon as the user leaves it
  $("#pname").on("blur", checkName);
  $("#mobile").on("blur", checkMobile);
  $("#email").on("blur", checkEmail);
  $("#dob").on("change", checkDob);
  $("#address").on("blur", checkAddress);
  $("#gender").on("change", function () { checkSelect("gender", "a gender"); });
  $("#bloodgroup").on("change", function () { checkSelect("bloodgroup", "a blood group"); });
  $("#department").on("change", function () { checkSelect("department", "a department"); });


  /* ---------------- Task 3: effects ---------------- */
  // Emergency checkbox: slide the emergency contact box open / closed
  $("#emergency").on("change", function () {
    if ($(this).is(":checked")) {
      $("#emergencyBox").slideDown();
    } else {
      $("#emergencyBox").slideUp();
      clearError("emergencyMobile");
    }
  });


  /* ---------------- Task 4: DOM manipulation ---------------- */
  // Age shown automatically from Date of Birth
  function calcAge(dobString) {
    var dob = new Date(dobString);
    var now = new Date();
    var age = now.getFullYear() - dob.getFullYear();
    if (now.getMonth() < dob.getMonth() ||
        (now.getMonth() === dob.getMonth() && now.getDate() < dob.getDate())) {
      age--;
    }
    return age;
  }

  $("#dob").on("change", function () {
    var v = $(this).val();
    if (v !== "" && v <= today) {
      var age = calcAge(v);
      $("#ageText").text("Age: " + age + " years" + (age >= 60 ? " (Senior Citizen)" : ""));
    } else {
      $("#ageText").text("");
    }
  });

  // Live character counter for the address
  $("#address").on("input", function () {
    $("#addressCount").text($(this).val().length + " characters");
  });

  // Consultation fee shown when a department is chosen
  var fees = { Pathology: 300, Radiology: 800, Cardiology: 700, General: 500 };
  $("#department").on("change", function () {
    var dept = $(this).val();
    if (dept === "") {
      $("#feeText").text("");
    } else {
      $("#feeText").text("Consultation Fee: Rs. " + fees[dept]);
    }
  });

  // Reset button: also clear the messages
  $("#regForm").on("reset", function () {
    $(".error-msg").text("");
    $("#regForm .invalid").removeClass("invalid");
    $("#ageText, #addressCount, #feeText").text("");
    $("#emergencyBox").slideUp();
    $("#successBox").hide();
  });


  /* ---------------- Submit: validate, then add a row ---------------- */
  var counter = 1000;

  $("#regForm").on("submit", function (event) {
    event.preventDefault();                 // never reload the page

    // run every check so that all errors are shown together
    var results = [
      checkName(), checkMobile(), checkEmail(), checkDob(),
      checkSelect("gender", "a gender"),
      checkSelect("bloodgroup", "a blood group"),
      checkAddress(),
      checkSelect("department", "a department"),
      checkEmergency()
    ];

    if (results.indexOf(false) !== -1) {
      $("#successBox").hide();
      $("#regForm .invalid").first().focus();
      return;
    }

    // all valid: add the patient to the table (append)
    counter++;
    var patientName = $("#pname").val();
    var row = "<tr>" +
      "<td>PAT-" + counter + "</td>" +
      "<td>" + patientName + "</td>" +
      "<td>" + $("#ageText").text().replace("Age: ", "").replace(" years", "") + "</td>" +
      "<td>" + $("#department").val() + "</td>" +
      "<td>" + $("#mobile").val() + "</td>" +
      "<td><button type='button' class='remove-btn'>Remove</button></td>" +
      "</tr>";
    $("#patientTable tbody").append(row);
    updateCount();

    $("#regForm")[0].reset();               // clear the form for the next patient

    // success message fades in
    $("#successText").text("Registration successful for " + patientName + " (PAT-" + counter + ").");
    $("#successBox").hide().fadeIn(600);
  });


  /* ---------------- Remove a row and update the count ---------------- */
  // delegated event, so it also works for rows added later
  $("#patientTable").on("click", ".remove-btn", function () {
    $(this).closest("tr").fadeOut(300, function () {
      $(this).remove();
      updateCount();
    });
  });

  function updateCount() {
    $("#patientCount").text($("#patientTable tbody tr").length);
  }

});
