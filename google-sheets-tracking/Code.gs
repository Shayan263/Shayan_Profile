const SPREADSHEET_ID = 'PASTE_YOUR_GOOGLE_SHEET_ID_HERE';
const VISITS_SHEET = 'Visits';
const DASHBOARD_SHEET = 'Dashboard';

function doGet(e) {
  const params = (e && e.parameter) ? e.parameter : {};
  const lock = LockService.getScriptLock();
  lock.waitLock(5000);
  try {
    const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
    const visits = getVisitsSheet_(ss);
    visits.appendRow([
      new Date(),
      clean_(params.event),
      clean_(params.visitor_type),
      clean_(params.source),
      clean_(params.medium),
      clean_(params.campaign),
      clean_(params.device),
      clean_(params.page),
      clean_(params.referrer),
      clean_(params.screen_width),
      clean_(params.visit_id)
    ]);
    ensureDashboard_(ss);
    return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
  } finally {
    lock.releaseLock();
  }
}

function getVisitsSheet_(ss) {
  let sheet = ss.getSheetByName(VISITS_SHEET);
  if (!sheet) sheet = ss.insertSheet(VISITS_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      'Timestamp',
      'Event',
      'Visitor Type',
      'Source',
      'Medium',
      'Campaign',
      'Device',
      'Page',
      'Referrer',
      'Screen Width',
      'Visit ID'
    ]);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function ensureDashboard_(ss) {
  let sheet = ss.getSheetByName(DASHBOARD_SHEET);
  if (!sheet) sheet = ss.insertSheet(DASHBOARD_SHEET);
  if (sheet.getLastRow() === 0) {
    sheet.getRange('A1:B7').setValues([
      ['Portfolio Analytics', ''],
      ['Total Page Views', ''],
      ['Recruiter Selections', ''],
      ['Referral Selections', ''],
      ['Just Exploring Selections', ''],
      ['LinkedIn Page Views', ''],
      ['Last Updated', '']
    ]);
    sheet.getRange('B2').setFormula('=COUNTIF(Visits!B:B,"page_view")');
    sheet.getRange('B3').setFormula('=COUNTIFS(Visits!B:B,"visitor_type",Visits!C:C,"Recruiter")');
    sheet.getRange('B4').setFormula('=COUNTIFS(Visits!B:B,"visitor_type",Visits!C:C,"Referral")');
    sheet.getRange('B5').setFormula('=COUNTIFS(Visits!B:B,"visitor_type",Visits!C:C,"Exploring")');
    sheet.getRange('B6').setFormula('=COUNTIFS(Visits!B:B,"page_view",Visits!D:D,"linkedin")');
    sheet.getRange('B7').setFormula('=NOW()');
    sheet.getRange('A1:B7').setFontFamily('Arial');
    sheet.getRange('A1:B1').setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
}

function clean_(value) {
  if (value === undefined || value === null) return '';
  return String(value).slice(0, 500);
}
