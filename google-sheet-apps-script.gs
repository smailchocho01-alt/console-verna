/**
 * Verna — Webhook qui enregistre chaque commande dans Google Sheets.
 * يستقبل الطلبات من صفحات console_verna*.html ويضيفها إلى الورقة.
 *
 * SETUP:
 *  1. افتح Google Sheet الموجود (نفس الملف)
 *  2. انسخ ID الورقة من رابطها: docs.google.com/spreadsheets/d/<ID>/edit
 *  3. الصق ID في الثابت SHEET_ID أدناه
 *  4. Extensions → Apps Script → الصق كل هذا الملف
 *  5. Deploy → New deployment → Type: Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  6. انسخ الرابط (Web app URL) والصقه في GS_WEBHOOK_URL داخل console_verna.html محلياً
 */

const SHEET_ID = ''; // ضع ID الورقة هنا

const ORDERS_SHEET_NAME = 'Orders';

const ORDERS_HEADERS = [
  'N° ORDER',
  'Date',
  'Langue',
  'Nom',
  'Tel',
  'Wilaya',
  'Commune',
  'delivery_type',
  'Produit+variante'
];

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();

    let sheet = ss.getSheetByName(ORDERS_SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(ORDERS_SHEET_NAME);
    }

    if (sheet.getLastRow() === 0) {
      sheet.appendRow(ORDERS_HEADERS);
      sheet.getRange(1, 1, 1, ORDERS_HEADERS.length).setFontWeight('bold').setBackground('#f0f0f0');
      sheet.setFrozenRows(1);
    }

    const orderNum = sheet.getLastRow(); // row 1 = headers → first order = 1
    const theme = (data.theme || '');
    const themeCap = theme.charAt(0).toUpperCase() + theme.slice(1);
    const produitVariante = 'Console ' + themeCap + ' — ' + (data.finition || '');

    sheet.appendRow([
      orderNum,
      new Date(),
      data.lang || '',
      data.prenom || '',
      "'" + (data.phone || ''),
      data.wilaya || '',
      '',              // Commune — à remplir manuellement
      '',              // delivery_type — home / stop-desk (manuel)
      produitVariante
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
    .createTextOutput('Verna Orders webhook is alive.')
    .setMimeType(ContentService.MimeType.TEXT);
}
