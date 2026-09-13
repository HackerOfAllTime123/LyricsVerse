import { PresetSong } from '../types';

export const PRESET_SONGS: PresetSong[] = [
  {
    id: 'rolling-in-the-deep',
    title: 'Rolling in the Deep',
    artist: 'Adele',
    genre: 'Soul / Pop',
    sourceLanguage: 'English',
    defaultTarget: 'Spanish',
    tempo: 'Moderate (105 BPM)',
    description: 'Idiomatic expressions of betrayal, metaphorical fire, and rhythmically driving emotional cadence.',
    lyrics: `There's a fire starting in my heart
Reaching a fever pitch and it's bringing me out the dark
Finally I can see you crystal clear
Go 'head and sell me out and I'll lay your ship bare
See how I'll leave with every piece of you
Don't underestimate the things that I will do

The scars of your love remind me of us
They keep me thinking that we almost had it all
The scars of your love, they leave me breathless
I can't help feeling
We could have had it all
Rolling in the deep
You had my heart inside of your hand
And you played it to the beat`
  },
  {
    id: 'hotel-california',
    title: 'Hotel California',
    artist: 'Eagles',
    genre: 'Classic Rock / Folk',
    sourceLanguage: 'English',
    defaultTarget: 'French',
    tempo: 'Laid-back (75 BPM)',
    description: 'Surreal metaphorical desert imagery, idiomatic phrases of illusion and entrapment.',
    lyrics: `On a dark desert highway, cool wind in my hair
Warm smell of colitas, rising up through the air
Up ahead in the distance, I saw a shimmering light
My head grew heavy and my sight grew dim
I had to stop for the night

There she stood in the doorway; I heard the mission bell
And I was thinking to myself:
"This could be Heaven or this could be Hell"
Then she lit up a candle and she showed me the way
There were voices down the corridor
I thought I heard them say:
Welcome to the Hotel California
Such a lovely place, such a lovely face`
  },
  {
    id: 'la-vie-en-rose',
    title: 'La Vie En Rose',
    artist: 'Édith Piaf',
    genre: 'French Chanson / Waltz',
    sourceLanguage: 'French',
    defaultTarget: 'English',
    tempo: 'Slow Waltz (88 BPM)',
    description: 'Quintessential romantic French idioms expressing seeing life through rose-tinted glasses.',
    lyrics: `Des yeux qui font baisser les miens
Un rire qui se perd sur sa bouche
Voilà le portrait sans retouche
De l'homme auquel j'appartiens

Quand il me prend dans ses bras
Il me parle tout bas
Je vois la vie en rose
Il me dit des mots d'amour
Des mots de tous les jours
Et ça me fait quelque chose
Il est entré dans mon cœur
Une part de bonheur
Dont je connais la cause`
  },
  {
    id: 'lose-yourself',
    title: 'Lose Yourself',
    artist: 'Eminem',
    genre: 'Hip-Hop / Rap',
    sourceLanguage: 'English',
    defaultTarget: 'German',
    tempo: 'Driving (86 BPM)',
    description: 'High-density internal rhymes, idiomatic vernacular, urgency, and physical performance anxiety.',
    lyrics: `His palms are sweaty, knees weak, arms are heavy
There's vomit on his sweater already, mom's spaghetti
He's nervous, but on the surface he looks calm and ready
To drop bombs, but he keeps on forgetting
What he wrote down, the whole crowd goes so loud
He opens his mouth, but the words won't come out
He's choking, how? Everybody's joking now
The clock's run out, time's up, over, blaow
Snap back to reality, ope there goes gravity`
  },
  {
    id: 'first-love',
    title: 'First Love',
    artist: 'Hikaru Utada',
    genre: 'J-Pop / Ballad',
    sourceLanguage: 'Japanese',
    defaultTarget: 'English',
    tempo: 'Lyrical Ballad (90 BPM)',
    description: 'Sensory nostalgia, bittersweet heartbreak, and subtle Japanese poetic sentimentality.',
    lyrics: `最後のキスは
タバコの flavor がした
苦くて切ない香り
明日の今頃には
あなたはどこにいるんだろう
誰を想ってるんだろう

You are always gonna be my love
いつか誰かとまた恋に落ちても
I'll remember to love
You taught me how
You are always gonna be the one
今はまだ悲しい love song
新しい歌 歌えるまで`
  },
  {
    id: 'besame-mucho',
    title: 'Bésame Mucho',
    artist: 'Consuelo Velázquez',
    genre: 'Bolero / Latin',
    sourceLanguage: 'Spanish',
    defaultTarget: 'Italian',
    tempo: 'Slow Bolero (72 BPM)',
    description: 'Dramatic passionate Latin bolero phrasing with intense poetic yearning and anticipation of parting.',
    lyrics: `Bésame, bésame mucho
Como si fuera esta noche la última vez
Bésame, bésame mucho
Que tengo miedo a perderte, perderte después

Quiero tenerte muy cerca
Mirarme en tus ojos, verte junto a mí
Piensa que tal vez mañana
Yo ya estaré lejos, muy lejos de ti`
  }
];

export const TARGET_LANGUAGES = [
  { code: 'es', name: 'Spanish', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'fr', name: 'French', nativeName: 'Français' },
  { code: 'de', name: 'German', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
  { code: 'ja', name: 'Japanese', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', nativeName: '한국어' },
  { code: 'zh', name: 'Mandarin Chinese', nativeName: '中文' },
  { code: 'ru', name: 'Russian', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'nl', name: 'Dutch', nativeName: 'Nederlands' },
  { code: 'sv', name: 'Swedish', nativeName: 'Svenska' },
  { code: 'tr', name: 'Turkish', nativeName: 'Türkçe' },
  { code: 'el', name: 'Greek', nativeName: 'Ελληνικά' },
];

export const GENRE_OPTIONS = [
  'Soul / R&B',
  'Pop / Dance',
  'Classic Rock / Folk',
  'Hip-Hop / Rap',
  'Acoustic / Ballad',
  'Indie / Alternative',
  'Latin / Bolero',
  'Jazz / Chanson',
  'Electronic / Synthpop',
  'Other / Unspecified'
];

export const TEMPO_OPTIONS = [
  'Slow / Ballad (60-80 BPM)',
  'Moderate / Lyrical (80-105 BPM)',
  'Driving / Upbeat (105-130 BPM)',
  'Fast / Energetic (130+ BPM)',
  'Variable / Rhythmic Rubato'
];
