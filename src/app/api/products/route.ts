import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔍 Iniciando conexión con Google Sheets API...");

  try {
    // Paso 1: Decodificamos la variable en base64
    const credentialsBase64 = process.env.GOOGLE_CREDENTIALS_JSON;
    if (!credentialsBase64) throw new Error("❌ Falta la variable GOOGLE_CREDENTIALS_JSON");

    const credentialsJson = Buffer.from(credentialsBase64, 'base64').toString('utf-8');
    const credentials = JSON.parse(credentialsJson);

    console.log("✅ Credenciales decodificadas");

    // Paso 2: Configuramos auth con el JSON completo
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    console.log("✅ Autenticación configurada");

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "A1:E10";

    console.log("📄 Leyendo sheet con ID:", spreadsheetId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log("✅ Respuesta obtenida:", response.data);

    const rows = response.data.values;
    return NextResponse.json({ data: rows });
  } catch (err) {
    console.error("❌ Error leyendo el sheet:", err);
    return NextResponse.json({ error: "No se pudo leer el sheet" }, { status: 500 });
  }
}
