// Snippet de Google Apps Script para deduplicar por client_submit_id
// Pegar en tu proyecto de Apps Script y usar como handler doPost(e)

function doPost(e) {
  try {
    const SHEET_ID = 'TU_SHEET_ID'; // <- reemplaza por el ID de tu hoja
    const ss = SpreadsheetApp.openById(SHEET_ID);
    const sheet = ss.getSheetByName('Sheet1') || ss.getSheets()[0];
    const params = e.parameter || {};
    const clientId = (params.client_submit_id || '').toString().trim();

    // Simple dedupe: buscar en las últimas N filas
    const CHECK_LAST = 400;
    const lastRow = sheet.getLastRow();
    const rowsToCheck = Math.min(CHECK_LAST, lastRow);
    if (clientId && rowsToCheck > 0) {
      const range = sheet.getRange(lastRow - rowsToCheck + 1, 1, rowsToCheck, sheet.getLastColumn());
      const data = range.getValues();
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < data[i].length; j++) {
          if (String(data[i][j]) === clientId) {
            return ContentService
              .createTextOutput(JSON.stringify({ status: 'duplicate' }))
              .setMimeType(ContentService.MimeType.JSON);
          }
        }
      }
    }

    // Insertar la nueva fila (ajusta columnas según tu hoja)
    const now = new Date();
    const name = params.name || '';
    const email = params.email || '';
    const message = params.message || '';

    sheet.appendRow([now, name, email, message, clientId]);

    // Enviar notificación por correo (opcional)
    try {
      MailApp.sendEmail('angelsierralopez@icloud.com', 'Nuevo contacto (web)', `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`);
    } catch (mailErr) {
      // no bloquear el flujo si el envío de correo falla
      Logger.log('Mail error: ' + mailErr.message);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
