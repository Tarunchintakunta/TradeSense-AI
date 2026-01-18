# TradeSense AI - Setup Instructions

## 1. Prerequisites

- **Node.js** 18+
- **PostgreSQL** (or Neon account)
- **Google AI Studio Key** (Gemini)

## 2. Installation

```bash
npm install
```

## 3. Environment Setup

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL`: Your Neon connection string (pooled).
- `GEMINI_API_KEY`: Your key from Google AI Studio.
- `NEXTAUTH_SECRET`: Generate with `openssl rand -base64 32`.

## 4. Database Setup

Push the schema to your Neon database:

```bash
npx drizzle-kit push
```

## 5. Running Locally

Start the development server:

```bash
npm run dev
```

Visit `http://localhost:3000`.

## 6. Usage (Demo Mode)

- **Login**: Enter _any_ email/password (e.g., `judge@hackathon.com` / `password`).
- **Upload**: Drag & Drop a financial chart screenshot.
- **Analyze**: Wait for Gemini to provide educational insights.
- **Chat**: Ask follow-up questions in the text box below the analysis.
- **History**: Check sidebar for past sessions.
