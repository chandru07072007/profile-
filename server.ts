import express from "express";
import path from "path";
import dotenv from "dotenv";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { google } from "googleapis";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Store in-memory fallback log of all submissions
interface SubmissionRecord {
  id: string;
  timestamp: string;
  type: "Newsletter Subscriber" | "Consultation Inquiry";
  name: string;
  email: string;
  services: string;
  budget: string;
  idea: string;
  status: string;
}

const inMemorySubmissions: SubmissionRecord[] = [
  {
    id: "sub-init-01",
    timestamp: new Date().toISOString(),
    type: "Consultation Inquiry",
    name: "Sample Client / Startup Lead",
    email: "client@example.com",
    services: "Full-Stack Web Dev, Cloud Architecture",
    budget: "$2,000 - $5,000",
    idea: "Interactive web platform with real-time analytics and Google Sheets sync.",
    status: "Recorded & Active"
  }
];

// Initialize Google Sheets helper
let cachedSpreadsheetId: string | null = process.env.SPREADSHEET_ID || null;

async function getSheetsAndSpreadsheetId() {
  const auth = new google.auth.GoogleAuth({
    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
      "https://www.googleapis.com/auth/drive.file"
    ],
  });

  const sheets = google.sheets({ version: "v4", auth });
  const drive = google.drive({ version: "v3", auth });

  if (cachedSpreadsheetId) {
    return { sheets, spreadsheetId: cachedSpreadsheetId };
  }

  // Search drive for existing spreadsheet
  try {
    const listRes = await drive.files.list({
      q: "name = 'Chandru Dev - Subscriptions & Inquiries' and mimeType = 'application/vnd.google-apps.spreadsheet' and trashed = false",
      fields: "files(id, name)",
    });

    if (listRes.data.files && listRes.data.files.length > 0) {
      cachedSpreadsheetId = listRes.data.files[0].id!;
      return { sheets, spreadsheetId: cachedSpreadsheetId };
    }
  } catch (err) {
    console.warn("Drive search warning (proceeding to create spreadsheet):", err);
  }

  // Create new spreadsheet if not found
  const createRes = await sheets.spreadsheets.create({
    requestBody: {
      properties: {
        title: "Chandru Dev - Subscriptions & Inquiries",
      },
      sheets: [
        {
          properties: {
            title: "Submissions",
          },
        },
      ],
    },
  });

  cachedSpreadsheetId = createRes.data.spreadsheetId!;

  // Write headers
  await sheets.spreadsheets.values.update({
    spreadsheetId: cachedSpreadsheetId,
    range: "Submissions!A1:H1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          "Timestamp",
          "Type",
          "Name / Company",
          "Email",
          "Services Needed",
          "Budget Tier",
          "Idea / Notes",
          "Status"
        ]
      ]
    }
  });

  console.log("Successfully created Google Sheet ID:", cachedSpreadsheetId);
  return { sheets, spreadsheetId: cachedSpreadsheetId };
}

async function appendToGoogleSheet(rowValues: string[]) {
  try {
    const { sheets, spreadsheetId } = await getSheetsAndSpreadsheetId();
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "Submissions!A:H",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [rowValues],
      },
    });
    console.log("Successfully recorded entry to Google Sheet!");
    return { success: true, spreadsheetId };
  } catch (err: any) {
    console.error("Failed to append to Google Sheet:", err?.message || err);
    return { success: false, error: err?.message };
  }
}

// Initialize Gemini client safely
const getGeminiClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("WARNING: GEMINI_API_KEY is not defined in the environment. AI consultation will use fallback mock generation.");
    return null;
  }
  return new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });
};

// API Endpoint for Newsletter Subscription
app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ error: "Email address is required." });
  }

  const timestamp = new Date().toISOString();
  
  // Forward to user's Google Apps Script URL if available
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxE2_NW0gpb4Br5Xm2EZaUZj7dTDc4hwsxesKpyl_LcGdooRvp5Vn17eX_qZvp9HMHg/exec";
  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({ email }),
    });
  } catch (err) {
    console.log("Server Apps Script forward notice:", err);
  }

  // Record locally in memory
  inMemorySubmissions.unshift({
    id: `sub-${Date.now()}`,
    timestamp,
    type: "Newsletter Subscriber",
    name: "Subscriber",
    email,
    services: "Newsletter Blueprint",
    budget: "-",
    idea: "Subscribed via Footer Newsletter Form",
    status: "Active Subscriber"
  });

  const sheetResult = await appendToGoogleSheet([
    timestamp,
    "Newsletter Subscriber",
    "-",
    email,
    "-",
    "-",
    "Subscribed via Footer Newsletter Form",
    "Active Subscriber"
  ]);

  return res.json({
    success: true,
    message: "Subscription recorded successfully!",
    savedToSheets: sheetResult.success,
    sheetUrl: sheetResult.spreadsheetId ? `https://docs.google.com/spreadsheets/d/${sheetResult.spreadsheetId}` : "https://sheets.google.com"
  });
});

// API Endpoint to check Google Sheet info & Submissions
app.get("/api/submissions", (req, res) => {
  res.json({
    total: inMemorySubmissions.length,
    submissions: inMemorySubmissions,
    spreadsheetId: cachedSpreadsheetId,
    sheetUrl: cachedSpreadsheetId ? `https://docs.google.com/spreadsheets/d/${cachedSpreadsheetId}` : "https://sheets.google.com"
  });
});

app.get("/api/sheets/info", async (req, res) => {
  try {
    const { spreadsheetId } = await getSheetsAndSpreadsheetId();
    res.json({
      connected: true,
      spreadsheetId,
      sheetUrl: `https://docs.google.com/spreadsheets/d/${spreadsheetId}`
    });
  } catch (err: any) {
    res.json({ connected: false, error: err?.message, fallbackSheetUrl: "https://sheets.google.com" });
  }
});

// API Endpoint for creative brief analysis
app.post("/api/consult", async (req, res) => {
  const { name, email, services, budget, idea } = req.body;

  if (!name || !email || !idea) {
    return res.status(400).json({ error: "Missing required fields: name, email, and idea are mandatory." });
  }

  const selectedServicesText = (services && services.length > 0) ? services.join(", ") : "Digital Partner Consultation";
  const timestamp = new Date().toISOString();

  // Record locally in memory
  inMemorySubmissions.unshift({
    id: `consult-${Date.now()}`,
    timestamp,
    type: "Consultation Inquiry",
    name,
    email,
    services: selectedServicesText,
    budget: budget || "Custom Project",
    idea,
    status: "Brief Synthesized"
  });

  // Save entry to Google Sheet
  const sheetResult = await appendToGoogleSheet([
    timestamp,
    "Consultation Inquiry",
    name,
    email,
    selectedServicesText,
    budget || "Custom Project",
    idea,
    "Brief Synthesized"
  ]);

  const ai = getGeminiClient();

  if (!ai) {
    // Elegant fallback mock response in case API Key is missing, maintaining brutalist design aesthetic
    const fallbackResponse = {
      theme: "DISTRIBUTED LEDGER MONOLITH",
      tagline: "WE DO NOT JUST WRITE CODE; WE ARCHITECT DIGITAL FORCE.",
      analysis: `Our engineering lead Chandru has evaluated your idea: "${idea}". For a project budget tier of ${budget || "Custom"} with focus on [${selectedServicesText}], we propose a high-integrity distributed system featuring server-rendered reactive frontends, resilient micro-caching, and auto-scaling cloud configurations.`,
      actionPlan: [
        `Phase 01: Architecture & DB Schema - Chandru will map pristine relational schemas and security blueprints for: ${selectedServicesText}.`,
        `Phase 02: Full-Stack Engineering - Constructing ultra-responsive UI layers paired with high-throughput API endpoints.`,
        `Phase 03: Deployment of Force - Dockerized delivery onto container ingress systems, verified by comprehensive unit pipelines.`
      ],
      artisticQuote: "Simplicity and performant execution are the ultimate measures of professional software engineering."
    };
    return res.json({ result: fallbackResponse, isFallback: true, savedToSheets: sheetResult.success });
  }

  try {
    const prompt = `
      You are Chandru, the Lead Software Architect at your elite digital engineering studio.
      A new prospective client has submitted an inquiry:
      - Client Name: "${name}"
      - Selected Services Needed: [${selectedServicesText}]
      - Estimated Budget Tier: "${budget || "Custom Project"}"
      - Core Concept / Idea: "${idea}"

      Draft a spectacular, elite, highly analytical, and strategically sharp Software Architectural Brief & Technical Proposal.
      The tone must be: Brutalist, high-concept, technology-obsessed, highly professional, and deeply analytical.
      
      Your response must be returned strictly in JSON matching the following structure:
      {
        "theme": "A short, 2-3 word high-concept technical theme/architecture name for their project (e.g., 'REACTIVE MONOLITH', 'NEO-RELATIONAL SHADOWS', 'KINETIC STATE PIPELINE')",
        "tagline": "A powerful, 1-sentence engineering manifesto statement or technical slogan for this architectural concept",
        "analysis": "A deep, intellectually stimulating, 3-4 sentence software engineering analysis of their concept, outlining how we will translate their idea into scalable code, performant database indices, and high-throughput deployment",
        "actionPlan": [
          "An array of exactly 3 tactical engineering phases we will take for their selected services. Each phase must start with 'Phase 01:', 'Phase 02:', and 'Phase 03:' and describe database setup, API engineering, or frontend systems"
        ],
        "artisticQuote": "A beautiful, deep, custom 1-sentence quote of software engineering and strategic tech architecture to inspire them"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["theme", "tagline", "analysis", "actionPlan", "artisticQuote"],
          properties: {
            theme: { type: Type.STRING },
            tagline: { type: Type.STRING },
            analysis: { type: Type.STRING },
            actionPlan: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            artisticQuote: { type: Type.STRING }
          }
        },
        systemInstruction: "You are Chandru, an elite full-stack developer and avant-garde software architect. Write with deep technological authority, utilizing premium software engineering concepts and strict formatting."
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from Gemini API");
    }

    const jsonResult = JSON.parse(resultText.trim());
    return res.json({ result: jsonResult, isFallback: false, savedToSheets: sheetResult.success });

  } catch (error: any) {
    console.error("Gemini API Error in /api/consult:", error);
    return res.status(500).json({ error: "Failed to synthesize brief: " + error.message });
  }
});

// Setup Vite Dev server or Serve compiled files
async function start() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Starting server in DEVELOPMENT mode with Vite Middleware...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Starting server in PRODUCTION mode...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Media Diame App running at http://localhost:${PORT}`);
  });
}

start();
