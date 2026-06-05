# OneAtlas AI Generation Pipeline

An AI-powered application generation platform that transforms user requirements into structured application specifications, workflows, integrations, and deployment-ready outputs through a multi-stage AI pipeline.

## Live Deployment

### Frontend

https://oneatlas-frontend.onrender.com/

### Backend API

https://oneatlas-backend.onrender.com/

### GitHub Repository

https://github.com/SIDDHIDATRI/OneAtlas-Complete

---

## Project Overview

OneAtlas converts natural language requirements into application blueprints using a structured AI workflow consisting of intent extraction, schema generation, application specification generation, workflow creation, validation, and repair.

---

## Architecture

```text
User Prompt
    ↓
Intent Extraction
    ↓
Schema Generation
    ↓
Application Specification Generation
    ↓
Workflow Generation
    ↓
Validation Engine
    ↓
Repair Engine
    ↓
Final Structured Output
```

---

## Features

* Intent Extraction
* Schema Generation
* Application Specification Generation
* Workflow Generation
* Validation Pipeline
* Automated Repair Engine
* Integration Planning
* REST API Endpoints
* End-to-End AI Processing Pipeline

---

## Tech Stack

### Frontend

* Next.js
* React
* TypeScript

### Backend

* Node.js
* Express.js
* TypeScript

### AI Providers

* Gemini
* Groq
* OpenRouter
* OpenAI

---

## Supported Integrations

### Implemented

* WhatsApp
* Slack
* Gmail
* Stripe
* Webhook

### Stubbed

* Jira
* HubSpot
* Salesforce
* Airtable
* Zapier

---

## Environment Variables

Create a `.env` file inside the backend directory.

```env
OPENAI_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=
```

---

## Local Setup

### Backend

```bash
cd backend
npm install
npm run build
npm run start
```

Development Mode:

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## API Health Check

```http
GET /api/test
```

Response:

```json
{
  "message": "API route working"
}
```

---

## Evaluation Artifacts

* evaluation-log.json
* evaluation-summary.txt
* Deployment URLs
* Source Code Repository

---

## Assignment Submission

This repository contains:

* Complete source code
* Deployed frontend application
* Live backend API
* Evaluation logs
* AI workflow implementation
* Integration framework

Developed as part of the OneAtlas AI Personal Studio assignment.
