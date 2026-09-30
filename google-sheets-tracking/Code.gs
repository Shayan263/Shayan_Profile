const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const VISITS_SHEET = 'Visits';

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName(VISITS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(VISITS_SHEET);
    sheet.appendRow([
      'Date',
      'Time',
      'Event',
      'Visitor Type',
      'Source',
      'Device'
    ]);
    sheet.setFrozenRows(1);
  }

  // Keep only the six fields needed for portfolio analytics.
  const now = new Date();
  const timezone = ss.getSpreadsheetTimeZone() || Session.getScriptTimeZone() || 'Asia/Kolkata';

  sheet.appendRow([
    Utilities.formatDate(now, timezone, 'M/d/yyyy'),
    Utilities.formatDate(now, timezone, 'HH:mm:ss'),
    clean_(params.event),
    clean_(params.visitor_type),
    clean_(params.source),
    clean_(params.device)
  ]);

  return ContentService
    .createTextOutput('OK')
    .setMimeType(ContentService.MimeType.TEXT);
}

function clean_(value) {
  if (value === undefined || value === null) return '';
  return String(value).slice(0, 200);
}
