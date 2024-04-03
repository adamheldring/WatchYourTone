// WATCH YOUR TONE – CONSTANS

// Detects and swithches server url depending on if live or local environment
export const WYT_SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://watchyourtone.onrender.com/"
    : "http://localhost:8080";

// Creates default empty SYNTH MATRIX for sequenser
export const EMPTY_SYNTH_MATRIX = () => [
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
];

// Creates default empty DRUM MATRIX for sequenser
export const EMPTY_DRUM_MATRIX = () => [
  new Array(16).fill(false),
  new Array(16).fill(false),
  new Array(16).fill(false),
];

// NOISE SYNTH SETTINGS OBJECT – Adam's snare drum sound
export const SNARE_DRUM_SETTINGS = {
  noise: {
    type: "white",
  },
  envelope: {
    attack: 0.001,
    decay: 0.15,
    sustain: 0.05,
    release: 0.2,
  },
};

// METAL SYNTH SETTINGS OBJECT – Adam's hi-hat cymbal drum sound
export const HIHAT_DRUM_SETTINGS = {
  frequency: 200,
  envelope: {
    attack: 0.001,
    decay: 0.05,
    release: 0.05,
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5,
};

// SYNTH NOTES - C major scale
export const SYNTH_NOTES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"];

// DEFAULT SEQUENSER BPM
export const DEFAULT_BPM = 140;

// DEFAULT SYNTH WAVEFORM
export const DEFAULT_WAVEFORM = "triangle";

export const DEFAULT_SONG_TITLE = "untitled";

export const DEFAULT_COMPOSER = "unknown";

export const DRUM_ICONS = [
  "./assets/kick-100-inv.png",
  "./assets/snare-100-inv.png",
  "./assets/hihat-100-inv.png",
];

// TURQUOISE TO PINK
// 16 STEP COLOR GRADIENT YELLOW TO ORANGE FOR TRANSPORT BAR
export const COLOR_GRADIENT = [
  "6BFFE9",
  "74F5EA",
  "7DECEB",
  "86E3ED",
  "8FDAEE",
  "98D1F0",
  "A1C8F1",
  "AABFF2",
  "B3B5F4",
  "BCACF5",
  "C5A3F7",
  "CE9AF8",
  "D791F9",
  "E088FB",
  "E97FFC",
  "F276FE",
];

// YELLOW TO ORANGE
// 16 STEP COLOR GRADIENT FOR TRANSPORT BAR
// export const COLOR_GRADIENT = [
//   "FFF96B", "FEF264", "FDEB5E", "FDE468",
//   "FCDD52", "FBD64C", "FBCF46", "FAC840",
//   "F9C139", "F9BA33", "F8B32D", "F7AC27",
//   "F7A521", "F69E1B", "F59715", "F5910F"
// ]
