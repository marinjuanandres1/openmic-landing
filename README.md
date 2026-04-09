# SIENTE OPEN MIC — Landing Page

Landing page for the SIENTE OPEN MIC event. Built with React + Vite + Tailwind CSS.

---

## Setup

```bash
npm install
npm run dev
```

---

## Google Sheets Integration — Step by Step

Form submissions are sent to a Google Apps Script Web App, which writes rows into a Google Sheet.

### 1. Create the Google Sheet

1. Go to [sheets.google.com](https://sheets.google.com) and create a new spreadsheet.
2. Name the sheet (e.g. **SIENTE OPEN MIC — Inscripciones**).
3. In Row 1, add these headers in columns A–E:

   | A | B | C | D | E |
   |---|---|---|---|---|
   | Timestamp | Nombre | WhatsApp | Canciones | Formato |

### 2. Create the Apps Script

1. In your Google Sheet, click **Extensions → Apps Script**.
2. Delete all existing code and paste the following:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const params = e.parameter;

  sheet.appendRow([
    new Date(),
    params.nombre    || '',
    params.whatsapp  || '',
    params.canciones || '',
    params.formato   || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ result: 'success' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Handles preflight/GET requests (keeps deployment alive)
function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

3. Click **Save** (give the project any name, e.g. *OpenMic Form Handler*).

### 3. Deploy as Web App

1. Click **Deploy → New deployment**.
2. Click the gear icon ⚙️ next to "Select type" and choose **Web app**.
3. Set the fields:
   - **Description**: OpenMic Form Handler
   - **Execute as**: Me
   - **Who has access**: **Anyone**
4. Click **Deploy**.
5. Authorize the script when prompted (click **Allow**).
6. Copy the **Web app URL** — it looks like:
   ```
   https://script.google.com/macros/s/AKfyc.../exec
   ```

### 4. Add the URL to your environment

**For local development**, create a `.env` file in the project root:

```
VITE_APPS_SCRIPT_URL=xxx
```

**For Vercel (production)**, add it in the Vercel dashboard:
- Project Settings → Environment Variables
- Name: `VITE_APPS_SCRIPT_URL`
- Value: your Apps Script URL
- Environments: Production, Preview

---

## Add the Siente Logo

Place `siente-logo.png` in the `/public` folder. It will appear in the footer and as the favicon.

---

## Deploy to Vercel via GitHub

1. **Push this project to a new GitHub repo:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USER/openmic-landing.git
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com) → **Add New Project**
   - Import your GitHub repo
   - Vercel auto-detects Vite — no config needed
   - Add the env variable `VITE_APPS_SCRIPT_URL` before deploying

3. **Deploy** — your site will be live at `your-project.vercel.app`

> **Tip:** Every `git push` to `main` will auto-deploy to Vercel.

---

## Project Structure

```
OpenMic_Landing/
├── public/
│   └── siente-logo.png       ← Add your logo here
├── src/
│   ├── App.tsx               ← Step state + layout
│   ├── main.tsx
│   ├── index.css             ← Global styles + Tailwind
│   ├── vite-env.d.ts         ← Env variable types
│   └── components/
│       ├── Hero.tsx          ← Event hero section
│       ├── PreguardaStep.tsx ← Preguarda flow
│       └── RegistrationForm.tsx ← Form + submission
├── .env.example
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```
