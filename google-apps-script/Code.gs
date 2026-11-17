const HEADERS = [
  "Submitted At",
  "Full Name",
  "WhatsApp Number",
  "Email Address",
  "Learning Pathway",
  "Preferred Contact Time",
  "Source",
];

const LEARNING_PATHWAYS = [
  "AI for Real Estate Professional",
  "AI for Real Estate Manager",
  "AI for Real Estate Expert",
];

const CONTACT_TIMES = [
  "Morning (9 AM – 12 PM)",
  "Afternoon (12 PM – 4 PM)",
  "Evening (4 PM – 8 PM)",
];

function doPost(event) {
  const parameters = event && event.parameter ? event.parameter : {};
  const requestId = safeRequestId_(parameters.requestId);

  try {
    if (parameters.website) {
      return respond_(requestId, false, "Unable to submit this request.");
    }

    const name = cleanText_(parameters.name, 120);
    const countryCode = cleanText_(parameters.countryCode, 8);
    const phone = cleanText_(parameters.phone, 32);
    const email = cleanText_(parameters.email, 254);
    const pathway = cleanText_(parameters.pathway || parameters.track, 100);
    const preferredTime = cleanText_(parameters.preferredTime, 40);
    const source = cleanText_(parameters.source, 40);
    const isPopupSubmission = source === "lead-popup";
    const isShowInterestSubmission = source === "show-interest-form";

    if (
      !name ||
      !phone ||
      !email ||
      !pathway ||
      (!isPopupSubmission && !isShowInterestSubmission) ||
      (isPopupSubmission && (!countryCode || !preferredTime))
    ) {
      return respond_(requestId, false, "Please complete all fields and try again.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return respond_(requestId, false, "Please enter a valid email address.");
    }
    if (
      !LEARNING_PATHWAYS.includes(pathway) ||
      (preferredTime && !CONTACT_TIMES.includes(preferredTime))
    ) {
      return respond_(requestId, false, "Please choose a valid learning pathway and contact time.");
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    if (!spreadsheet) {
      throw new Error("This Apps Script must be bound to the Real Estate leads spreadsheet.");
    }
    const sheet = spreadsheet.getSheets()[0];
    if (!sheet) {
      throw new Error("The spreadsheet does not contain a worksheet.");
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
    }

    sheet.appendRow([
      new Date(),
      asLiteral_(name),
      asLiteral_(countryCode ? `${countryCode} ${phone}` : phone),
      asLiteral_(email),
      asLiteral_(pathway),
      asLiteral_(preferredTime),
      isPopupSubmission ? "Lead popup" : "Show Interest form",
    ]);

    return respond_(requestId, true, "Your enquiry was received.");
  } catch (error) {
    console.error("Unable to save lead to spreadsheet", error);
    return respond_(requestId, false, "We couldn't save your details. Please try again later.");
  }
}

function cleanText_(value, maxLength) {
  return String(value || "").trim().slice(0, maxLength);
}

function safeRequestId_(value) {
  const requestId = String(value || "");
  return /^[a-zA-Z0-9-]{1,80}$/.test(requestId) ? requestId : "";
}

function asLiteral_(value) {
  const text = String(value);
  return /^[=+\-@]/.test(text) ? `'${text}` : text;
}

function respond_(requestId, ok, message) {
  const payload = JSON.stringify({
    type: "REAL_ESTATE_LEAD_SUBMISSION",
    requestId,
    ok,
    message,
  }).replace(/</g, "\\u003c");
  const safeMessage = ok ? "Enquiry received." : "Unable to submit enquiry.";
  return HtmlService.createHtmlOutput(
    `<script>window.top.postMessage(${payload}, "*");</script><p>${safeMessage}</p>`,
  ).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
