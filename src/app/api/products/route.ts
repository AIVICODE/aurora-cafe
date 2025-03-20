import { google } from "googleapis";
import { NextResponse } from "next/server";

export async function GET() {
  console.log("🔍 Iniciando conexión con Google Sheets API...");

  try {
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
      },
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    console.log("✅ Autenticación configurada");

    const sheets = google.sheets({ version: "v4", auth });

    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "A1:E10"; // Ajusta según tus columnas

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
    return NextResponse.json({ error: "No se pudo leer el sheet"}, { status: 500 });
  }
}
