# OneAtlas AI Generation Pipeline

## Setup

npm install

## Environment Variables

OPENAI_API_KEY=
GEMINI_API_KEY=
GROQ_API_KEY=
OPENROUTER_API_KEY=

## Run

npm run dev

## Architecture

Intent Extraction
↓
Schema Generation
↓
AppSpec Generation
↓
Workflow Generation
↓
Validation
↓
Repair Engine

## Integrations

Implemented:
- WhatsApp
- Slack
- Gmail
- Stripe
- Webhook

Stubbed:
- Jira
- HubSpot
- Salesforce
- Airtable
- Zapier

## Evaluation

See evaluation-log.json