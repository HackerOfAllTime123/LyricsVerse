import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '5mb' }));

// Lazy initialization of Gemini AI
let aiClient: GoogleGenAI | null = null;
function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is not configured');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

// Translation API endpoint
app.post('/api/translate-lyrics', async (req, res) => {
  try {
    const {
      lyrics,
      targetLanguage,
      sourceLanguage = 'Auto-detect',
      genre = 'Unspecified',
      tempo = 'Moderate',
      translationStyle = 'balanced',
      includePhonetic = true,
      songTitle,
      artist,
    } = req.body;

    if (!lyrics || typeof lyrics !== 'string' || !lyrics.trim()) {
      return res.status(400).json({ error: 'Lyrics text is required' });
    }

    if (!targetLanguage || typeof targetLanguage !== 'string') {
      return res.status(400).json({ error: 'Target language is required' });
    }

    const ai = getGenAI();

    let styleDirective = '';
    if (translationStyle === 'singable') {
      styleDirective = `
Priority: SINGABLE & METRICALLY FIT.
The translated lyrics must match the melodic meter and syllable counts of the original song as closely as possible so a singer can perform it to the original music. Prioritize rhythmic cadence, stress patterns, and natural rhyming in the target language while never translating idioms literally.`;
    } else if (translationStyle === 'poetic_fidelity') {
      styleDirective = `
Priority: DEEP POETIC FIDELITY & EMOTIONAL IMAGERY.
Focus on profound lyricism, evocative metaphors, and deep cultural resonance in the target language. Re-imagine idioms into poetic figures of speech that capture the raw emotional truth, heartbreak, desire, or triumph of the song.`;
    } else {
      styleDirective = `
Priority: BALANCED LITERARY EQUIVALENCE.
Harmonize singable rhythmic cadence with sophisticated poetic adaptation. Transform all idioms into culturally resonant expressions while keeping the song's musical flow, rhyme feeling, and emotional impact.`;
    }

    const systemInstruction = `You are an expert literary translator and linguist specializing in music lyrics.
Translate the provided lyrics into the target language. Do not translate idioms literally; instead, find an equivalent poetic expression in the target language that preserves the original emotion, rhythm, and meaning.

You are also a vocal coach and musicologist. Your task is to provide:
1. A sublime, emotionally resonant poetic translation of the lyrics.
2. A line-by-line / stanza-by-stanza breakdown matching the original lines to the translated lines.
3. Idiomatic and metaphor adaptation breakdown: explicitly identifying every idiom, slang, or cultural metaphor, explaining what a clunky literal translation would be, why that fails musically/poetically, and explaining the chosen poetic equivalent in the target language.
4. Rhythmic cadence and metric analysis (approximate syllables per line, rhythm/meter description, rhyme scheme).
5. Vocal delivery guidance for a vocalist singing this translation.
${includePhonetic ? '6. Provide phonetic pronunciation/romanization for the translated lines if the target language uses non-Latin scripts (e.g. Japanese Romaji, Mandarin Pinyin, Korean Revised Romanization, Arabic/Russian transliteration, Hindi transcription) or if helpful for vocalists.' : ''}`;

    const prompt = `Song Title: ${songTitle || 'Unknown Title'}
Artist: ${artist || 'Unknown Artist'}
Source Language: ${sourceLanguage}
Target Language: ${targetLanguage}
Genre: ${genre}
Tempo / Feel: ${tempo}
Translation Priority: ${styleDirective}

LYRICS TO TRANSLATE:
${lyrics}

Translate these lyrics according to your expert music translation rules. Return your analysis in the structured JSON format specified.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            songTitle: { type: Type.STRING },
            detectedSourceLanguage: { type: Type.STRING },
            targetLanguage: { type: Type.STRING },
            summaryOverview: {
              type: Type.STRING,
              description: 'Executive linguist note explaining the poetic approach, emotional core, and rhythmic choices made.',
            },
            fullPoeticTranslation: {
              type: Type.STRING,
              description: 'The complete translated lyrics ready to read or perform, with stanza line breaks.',
            },
            stanzas: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  stanzaNumber: { type: Type.INTEGER },
                  stanzaType: {
                    type: Type.STRING,
                    description: 'e.g., Verse 1, Chorus, Bridge, Outro',
                  },
                  lines: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        original: { type: Type.STRING },
                        translated: { type: Type.STRING },
                        phonetic: {
                          type: Type.STRING,
                          description: 'Pronunciation or romanization guide if applicable',
                        },
                        syllableOriginal: { type: Type.INTEGER },
                        syllableTranslated: { type: Type.INTEGER },
                        rhythmNote: {
                          type: Type.STRING,
                          description: 'Short note on stress/accent or cadence',
                        },
                        rhymeTag: {
                          type: Type.STRING,
                          description: 'Rhyme marker e.g. A, B, C',
                        },
                      },
                      required: ['original', 'translated'],
                    },
                  },
                },
                required: ['stanzaNumber', 'lines'],
              },
            },
            idiomAdaptations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  originalIdiom: { type: Type.STRING },
                  literalMeaning: { type: Type.STRING },
                  whyLiteralFails: { type: Type.STRING },
                  poeticEquivalent: { type: Type.STRING },
                  linguisticNuance: { type: Type.STRING },
                  emotionalResonance: { type: Type.STRING },
                },
                required: [
                  'originalIdiom',
                  'literalMeaning',
                  'whyLiteralFails',
                  'poeticEquivalent',
                  'linguisticNuance',
                  'emotionalResonance',
                ],
              },
            },
            metricAndCadence: {
              type: Type.OBJECT,
              properties: {
                meterDescription: { type: Type.STRING },
                rhymeSchemeSummary: { type: Type.STRING },
                singabilityScore: {
                  type: Type.INTEGER,
                  description: 'Estimated singability score from 1 to 100',
                },
                vocalDeliveryTips: {
                  type: Type.ARRAY,
                  items: { type: Type.STRING },
                },
              },
              required: [
                'meterDescription',
                'rhymeSchemeSummary',
                'singabilityScore',
                'vocalDeliveryTips',
              ],
            },
          },
          required: [
            'detectedSourceLanguage',
            'targetLanguage',
            'summaryOverview',
            'fullPoeticTranslation',
            'stanzas',
            'idiomAdaptations',
            'metricAndCadence',
          ],
        },
      },
    });

    const outputText = response.text?.trim();
    if (!outputText) {
      throw new Error('Received empty response from translation model');
    }

    const parsed = JSON.parse(outputText);
    return res.json(parsed);
  } catch (error: any) {
    console.error('Translation error:', error);
    const message = error?.message || 'Failed to translate lyrics';
    return res.status(500).json({ error: message });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`LyricPoet server running on port ${PORT}`);
  });
}

startServer();
