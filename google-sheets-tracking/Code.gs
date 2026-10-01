const SPREADSHEET_ID = '1ZnZvt4ofxm4Nl1tDOD9wqFXALR7x8Ou6791kQ_EnHWQ';
const VISITS_SHEET = 'Visits';

function doGet(e) {
  const params = e && e.parameter ? e.parameter : {};
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);

  let sheet = ss.getSheetByName(VISITS_SHEET);

  if (!sheet) {
    sheet = ss.insertSheet(VISITS_SHEET);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Name',
      'Location',
      'Date',
      'Time',
      'Event',
      'Visitor Type',
      'Source',
      'Device'
    ]);
    sheet.setFrozenRows(1);
  }

  const now = new Date();
  const timezone = ss.getSpreadsheetTimeZone() || 'Asia/Kolkata';

  sheet.appendRow([
    clean_(params.name),
    clean_(params.location),
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
