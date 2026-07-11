// functions/login.js (Oder wie auch immer Ihre Datei heißt)

export async function onRequestPost(context) {
  const { request } = context;

  // CORS-Header für alle Responses
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  // OPTIONS-Preflight Request beantworten
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }

  // Den Request-Body bei Cloudflare richtig auslesen
  const { email, password } = await request.json();

  // Sicherheits-Check
  if (email === "a628885544@gmail.com" && password === "Abdulla123!") {
    return new Response(
      JSON.stringify({ success: true, message: "Login erfolgreich" }), 
      { status: 200, headers }
    );
  }

  // Fehlgeschlagener Login
  return new Response(
    JSON.stringify({ success: false, message: "Falsche Zugangsdaten" }), 
    { status: 401, headers }
  );
}

// Falls die Route auch per normalem "onRequest" oder OPTIONS aufgerufen wird
export async function onRequest(context) {
  const { request } = context;
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 200, headers });
  }
  return new Response(JSON.stringify({ success: false, message: "Method not allowed" }), { status: 405, headers });
}
