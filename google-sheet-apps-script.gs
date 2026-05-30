/**
 * Verna — Webhook qui enregistre chaque commande dans Google Sheets.
 * يستقبل الطلبات من صفحات console_verna*.html ويضيفها إلى الورقة.
 *
 * SETUP:
 *  1. افتح Google Sheet جديد
 *  2. انسخ ID الورقة من رابطها: docs.google.com/spreadsheets/d/<ID>/edit
 *  3. الصق ID في الثابت SHEET_ID أدناه
 *  4. Extensions → Apps Script → الصق كل هذا الملف
 *  5. Deploy → New deployment → Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  6. انسخ الرابط (Web app URL) والصقه في GS_WEBHOOK_URL داخل ملفات HTML الثلاثة
 */

const SHEET_ID = ''; // ضع ID الورقة هنا

const HEADERS = [
  'Date',
  'Langue',
  'Prénom / الاسم',
  'Téléphone / الهاتف',
  'Wilaya / الولاية',
  'Finition / اللون',
  'Thème',
  'Source'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#f0f0f0');
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      data.lang || '',
      data.prenom || '',
      "'" + (data.phone || ''),
      data.wilaya || '',
      data.finition || '',
      data.theme || '',
      data.source || ''
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput('Verna webhook is alive.')
    .setMimeType(ContentService.MimeType.TEXT);
}
