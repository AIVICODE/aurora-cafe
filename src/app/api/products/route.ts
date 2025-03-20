import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔍 Iniciando conexión con Google Sheets API...");

  try {
    // 1️⃣ Decodificamos directamente el JSON string (no base64)
    const credentialsString = process.env.GOOGLE_CREDENTIALS_JSON;
    if (!credentialsString) throw new Error("❌ Falta la variable GOOGLE_CREDENTIALS_JSON");

    const credentials = JSON.parse(credentialsString);

    console.log("✅ Credenciales parseadas");

    // 2️⃣ Configuramos GoogleAuth
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    console.log("✅ Autenticación configurada");

    // 3️⃣ Google Sheets API
    const sheets = google.sheets({ version: "v4", auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "A1:E10";

    console.log("📄 Leyendo sheet con ID:", spreadsheetId);

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    console.log("✅ Respuesta obtenida:", JSON.stringify(response.data, null, 2));

    const rows = response.data.values;
    return NextResponse.json({ data: rows || [] });
  } catch (err) {
    console.error("❌ Error leyendo el sheet:", err);
    return NextResponse.json({ error: "No se pudo leer el sheet" }, { status: 500 });
  }
}
