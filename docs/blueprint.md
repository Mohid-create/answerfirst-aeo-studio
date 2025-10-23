# **App Name**: AnswerFirst AEO Optimizer

## Core Features:

- AEO Score Prediction: Predicts the likelihood of content being used as an answer by AI based on factors like length, structure, schema, and intent match. Includes a breakdown of these factors to show areas for improvement.
- SERP & Featured Snippet Preview: Displays a live preview of how the optimized content will appear in Google's search results, including desktop and mobile views and featured snippet display.
- AI-Powered Rewriting Assistant: Generates concise, canonical answer rewrites optimized for answer engines and voice search, with configurable max length, readability, and tone of voice. Includes deterministic LLM prompts as a tool.
- Schema Generator: Creates schema markup (JSON-LD) tailored to the content (FAQPage, HowTo, QAPage, Article) with a copy-to-clipboard function.
- Competitor Answer Modeling: Extracts the top 3 competitor answers for a given query (snippets or text) with an analysis of their structure and content using SERP APIs.
- Export Optimized Snippets: Provides options to copy optimized snippets and schema, download JSON-LD, or export the snippet as an HTML fragment.
- Privacy-First Design: Uses client-side simulation for snippet previews and scoring to minimize server-side processing and data collection. All LLM prompts must be deterministic.

## Style Guidelines:

- Primary color: Vivid blue (#4285F4) to convey trust and intelligence.
- Background color: Light gray (#F5F5F5) to ensure readability and a clean user interface.
- Accent color: Vibrant orange (#FF5722) for calls to action and highlights, providing a strong visual contrast.
- Body and headline font: 'Inter' sans-serif, for a modern and readable aesthetic.
- Use clear and intuitive icons to represent different features and actions, aiding user navigation.
- Two-column layout (editor + preview) on desktop, top-to-bottom on mobile for optimal usability.
- Subtle animations to provide feedback and enhance user interaction (e.g., loading states, transitions).