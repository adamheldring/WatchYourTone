// WATCH YOUR TONE – CONSTANS

// Detects and swithches server url depending on if live or local environment
export const WYT_SERVER_URL = process.env.NODE_ENV === "production" ? "https://watchyourtone.herokuapp.com" : "http://localhost:8080"

// Creates default empty SYNTH MATRIX for sequenser
export const EMPTY_SYNTH_MATRIX = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
]

// Creates default empty DRUM MATRIX for sequenser
export const EMPTY_DRUM_MATRIX = [
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, false, false, false, false, false, false, false, false]
]

// NOISE SYNTH SETTINGS OBJECT – Adam's snare drum sound
export const SNARE_DRUM_SETTINGS = {
  noise: {
    type: "white"
  },
  envelope: {
    attack: 0.001,
    decay: 0.15,
    sustain: 0.05,
    release: 0.2
  }
}

// METAL SYNTH SETTINGS OBJECT – Adam's hi-hat cymbal drum sound
export const HIHAT_DRUM_SETTINGS = {
  frequency: 200,
  envelope: {
    attack: 0.001,
    decay: 0.05,
    release: 0.05
  },
  harmonicity: 5.1,
  modulationIndex: 32,
  resonance: 4000,
  octaves: 1.5
}

// SYNTH NOTES - C major scale
export const SYNTH_NOTES = ["C5", "B4", "A4", "G4", "F4", "E4", "D4", "C4"]

// DEFAULT SEQUENSER BPM
export const DEFAULT_BPM = 140

// DEFAULT SYNTH WAVEFORM
export const DEFAULT_WAVEFORM = "triangle"

export const DEFAULT_SONG_TITLE = "New masterpiece"

export const DEFAULT_COMPOSER = "You"
