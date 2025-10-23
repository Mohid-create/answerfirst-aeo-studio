import { config } from 'dotenv';
config();

import '@/ai/flows/rewrite-content.ts';
import '@/ai/flows/predict-aeo-score.ts';
import '@/ai/flows/generate-concise-answer.ts';