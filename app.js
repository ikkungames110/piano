const keySelect = document.querySelector("#key-select");
const signatureText = document.querySelector("#signature-text");
const selectedKeyTitle = document.querySelector("#selected-key");
const noteLine = document.querySelector("#note-line");
const solfegeButtons = document.querySelector("#solfege-buttons");
const keyboard = document.querySelector("#keyboard");
const playAscending = document.querySelector("#play-ascending");
const playDescending = document.querySelector("#play-descending");
const playAscendingLoop = document.querySelector("#play-ascending-loop");
const playDescendingLoop = document.querySelector("#play-descending-loop");
const playAlternatingLoop = document.querySelector("#play-alternating-loop");

const MAJOR_SOLFEGE = ["ド", "レ", "ミ", "ファ", "ソ", "ラ", "シ", "ド"];
const MINOR_SOLFEGE = ["ラ", "シ", "ド", "レ", "ミ", "ファ", "ソ", "ラ"];
const MAJOR_INTERVALS = [0, 2, 4, 5, 7, 9, 11, 12];
const MINOR_INTERVALS = [0, 2, 3, 5, 7, 8, 10, 12];
const LETTERS = ["C", "D", "E", "F", "G", "A", "B"];
const LETTER_TO_PC = {
  C: 0,
  D: 2,
  E: 4,
  F: 5,
  G: 7,
  A: 9,
  B: 11,
};
const NOTE_TO_PC = {
  C: 0,
  "B#": 0,
  "C#": 1,
  Db: 1,
  D: 2,
  "D#": 3,
  Eb: 3,
  E: 4,
  Fb: 4,
  "E#": 5,
  F: 5,
  "F#": 6,
  Gb: 6,
  G: 7,
  "G#": 8,
  Ab: 8,
  A: 9,
  "A#": 10,
  Bb: 10,
  B: 11,
  Cb: 11,
};
const DISPLAY_ACCIDENTALS = {
  "#": "♯",
  b: "♭",
};
const ORGAN_INSTRUMENT = {
  attack: 0.015,
  decay: 0.08,
  sustain: 0.82,
  release: 0.24,
  legatoSustain: 0.88,
  legatoRelease: 0.3,
  volume: 0.24,
  filterFrequency: 2200,
  filterQ: 0.7,
  partials: [
    { type: "sine", ratio: 1, gain: 0.88 },
    { type: "sine", ratio: 2, gain: 0.42 },
    { type: "square", ratio: 1, gain: 0.12 },
  ],
};

const KEYS = [
  { mode: "major", tonic: "C", accidentals: 0, accidental: "natural" },
  { mode: "major", tonic: "G", accidentals: 1, accidental: "sharp" },
  { mode: "major", tonic: "D", accidentals: 2, accidental: "sharp" },
  { mode: "major", tonic: "A", accidentals: 3, accidental: "sharp" },
  { mode: "major", tonic: "E", accidentals: 4, accidental: "sharp" },
  { mode: "major", tonic: "B", accidentals: 5, accidental: "sharp" },
  { mode: "major", tonic: "F#", accidentals: 6, accidental: "sharp" },
  { mode: "major", tonic: "C#", accidentals: 7, accidental: "sharp" },
  { mode: "major", tonic: "F", accidentals: 1, accidental: "flat" },
  { mode: "major", tonic: "Bb", accidentals: 2, accidental: "flat" },
  { mode: "major", tonic: "Eb", accidentals: 3, accidental: "flat" },
  { mode: "major", tonic: "Ab", accidentals: 4, accidental: "flat" },
  { mode: "major", tonic: "Db", accidentals: 5, accidental: "flat" },
  { mode: "major", tonic: "Gb", accidentals: 6, accidental: "flat" },
  { mode: "major", tonic: "Cb", accidentals: 7, accidental: "flat" },
  { mode: "minor", tonic: "A", accidentals: 0, accidental: "natural" },
  { mode: "minor", tonic: "E", accidentals: 1, accidental: "sharp" },
  { mode: "minor", tonic: "B", accidentals: 2, accidental: "sharp" },
  { mode: "minor", tonic: "F#", accidentals: 3, accidental: "sharp" },
  { mode: "minor", tonic: "C#", accidentals: 4, accidental: "sharp" },
  { mode: "minor", tonic: "G#", accidentals: 5, accidental: "sharp" },
  { mode: "minor", tonic: "D#", accidentals: 6, accidental: "sharp" },
  { mode: "minor", tonic: "A#", accidentals: 7, accidental: "sharp" },
  { mode: "minor", tonic: "D", accidentals: 1, accidental: "flat" },
  { mode: "minor", tonic: "G", accidentals: 2, accidental: "flat" },
  { mode: "minor", tonic: "C", accidentals: 3, accidental: "flat" },
  { mode: "minor", tonic: "F", accidentals: 4, accidental: "flat" },
  { mode: "minor", tonic: "Bb", accidentals: 5, accidental: "flat" },
  { mode: "minor", tonic: "Eb", accidentals: 6, accidental: "flat" },
  { mode: "minor", tonic: "Ab", accidentals: 7, accidental: "flat" },
];

const KEYBOARD_WHITE = [
  "B2",
  "C3",
  "D3",
  "E3",
  "F3",
  "G3",
  "A3",
  "B3",
  "C4",
  "D4",
  "E4",
  "F4",
  "G4",
  "A4",
  "B4",
  "C5",
];

const KEYBOARD_BLACK = [
  { note: "C#3", afterWhiteIndex: 0 },
  { note: "D#3", afterWhiteIndex: 1 },
  { note: "F#3", afterWhiteIndex: 3 },
  { note: "G#3", afterWhiteIndex: 4 },
  { note: "A#3", afterWhiteIndex: 5 },
  { note: "C#4", afterWhiteIndex: 7 },
  { note: "D#4", afterWhiteIndex: 8 },
  { note: "F#4", afterWhiteIndex: 10 },
  { note: "G#4", afterWhiteIndex: 11 },
  { note: "A#4", afterWhiteIndex: 12 },
];

const ASCENDING_ORDER = [0, 1, 2, 3, 4, 5, 6, 7];
const DESCENDING_ORDER = [7, 6, 5, 4, 3, 2, 1, 0];
const ALTERNATING_ORDER = [...ASCENDING_ORDER, ...DESCENDING_ORDER];
const SEQUENCE_STEP_MS = 620;
const SEQUENCE_NOTE_DURATION = 0.92;

let audioContext;
let activeKey = KEYS[0];
let activeNotes = [];
let scheduledTimers = [];
const sequenceAudio = document.querySelector("#sequence-audio");
const playbackStatus = document.querySelector("#playback-status");
const sequenceButtons = [playAscending, playDescending, playAscendingLoop, playDescendingLoop, playAlternatingLoop];
let sequenceSources = new Map();
let preparationVersion = 0;
let playbackVersion = 0;
let playingOrder = null;
let highlightFrame;
let activeLoopMode = null;

function displayNoteName(noteName) {
  return noteName.replace(/#/g, DISPLAY_ACCIDENTALS["#"]).replace(/b/g, DISPLAY_ACCIDENTALS.b);
}

function labelForKey(key) {
  const modeLabel = key.mode === "major" ? "メジャー" : "マイナー";
  return `${displayNoteName(key.tonic)}${modeLabel}スケール`;
}

function signatureLabel(key) {
  if (key.accidental === "natural") {
    return "#0 / ♭0";
  }

  return key.accidental === "sharp" ? `#${key.accidentals}個` : `♭${key.accidentals}個`;
}

function optionLabel(key) {
  return `${labelForKey(key)}（${signatureLabel(key)}）`;
}

function noteParts(noteWithOctave) {
  const match = noteWithOctave.match(/^([A-G](?:#|b)?)(-?\d+)$/);
  return {
    name: match[1],
    octave: Number(match[2]),
  };
}

function noteToMidi(noteWithOctave) {
  const { name, octave } = noteParts(noteWithOctave);
  return (octave + 1) * 12 + NOTE_TO_PC[name];
}

function midiToFrequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function parseNoteName(noteName) {
  const match = noteName.match(/^([A-G])(#|b)?$/);
  return {
    letter: match[1],
    accidental: match[2] ?? "",
  };
}

function accidentalOffset(noteName) {
  const { accidental } = parseNoteName(noteName);
  if (accidental === "#") return 1;
  if (accidental === "b") return -1;
  return 0;
}

function normalizeAccidentalOffset(offset) {
  let normalized = offset;
  while (normalized > 6) normalized -= 12;
  while (normalized < -6) normalized += 12;
  return normalized;
}

function accidentalText(offset) {
  if (offset === 0) return "";
  if (offset > 0) return "#".repeat(offset);
  return "b".repeat(Math.abs(offset));
}

function spellPitch(midi, tonic, degreeIndex, interval) {
  const { letter: tonicLetter } = parseNoteName(tonic);
  const tonicLetterIndex = LETTERS.indexOf(tonicLetter);
  const letter = LETTERS[(tonicLetterIndex + degreeIndex) % LETTERS.length];
  const naturalPc = LETTER_TO_PC[letter];
  const targetPc = ((NOTE_TO_PC[tonic] + interval) % 12 + 12) % 12;
  const accidental = normalizeAccidentalOffset(targetPc - naturalPc);
  const noteName = `${letter}${accidentalText(accidental)}`;
  const octave = (midi - naturalPc - accidental) / 12 - 1;

  return `${displayNoteName(noteName)}${octave}`;
}

function buildScale(key) {
  const intervals = key.mode === "major" ? MAJOR_INTERVALS : MINOR_INTERVALS;
  const { letter } = parseNoteName(key.tonic);
  const baseMidi = (3 + 1) * 12 + LETTER_TO_PC[letter] + accidentalOffset(key.tonic);

  return intervals.map((interval, degreeIndex) => {
    const midi = baseMidi + interval;
    return {
      midi,
      frequency: midiToFrequency(midi),
      note: spellPitch(midi, key.tonic, degreeIndex, interval),
      pitchClass: ((midi % 12) + 12) % 12,
    };
  });
}

function ensureAudioContext() {
  if (!audioContext) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    audioContext = new AudioContextClass();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function scheduleEnvelope(gain, now, duration, instrument, articulation) {
  const attack = Math.max(0.004, instrument.attack);
  const decay = Math.max(0.01, instrument.decay);
  const release =
    articulation === "legato" ? (instrument.legatoRelease ?? instrument.release) : instrument.release;
  const sustain =
    articulation === "legato" ? (instrument.legatoSustain ?? instrument.sustain) : instrument.sustain;
  const peak = instrument.volume;
  const sustainLevel = Math.max(0.0001, peak * sustain);
  const attackEnd = now + attack;
  const decayEnd = attackEnd + decay;
  const releaseStart = Math.max(decayEnd, now + duration - release);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak, attackEnd);
  gain.gain.exponentialRampToValueAtTime(sustainLevel, decayEnd);
  gain.gain.setValueAtTime(sustainLevel, releaseStart);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
}

function playTone(scaleNote, duration = 0.58, articulation = "normal") {
  ensureAudioContext();

  scheduleTone(audioContext, scaleNote, audioContext.currentTime, duration, articulation);
}

function scheduleTone(context, scaleNote, now, duration, articulation) {
  const instrument = ORGAN_INSTRUMENT;
  const masterGain = context.createGain();
  const filter = context.createBiquadFilter();

  filter.type = "lowpass";
  filter.frequency.setValueAtTime(instrument.filterFrequency, now);
  filter.Q.setValueAtTime(instrument.filterQ, now);
  scheduleEnvelope(masterGain, now, duration, instrument, articulation);

  filter.connect(masterGain);
  masterGain.connect(context.destination);

  instrument.partials.forEach((partial) => {
    const oscillator = context.createOscillator();
    const partialGain = context.createGain();

    oscillator.type = partial.type;
    oscillator.frequency.setValueAtTime(scaleNote.frequency * partial.ratio, now);
    oscillator.detune.setValueAtTime(partial.detune ?? 0, now);
    partialGain.gain.setValueAtTime(partial.gain, now);

    oscillator.connect(partialGain);
    partialGain.connect(filter);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.06);
  });
}

function setPlayingIndex(index) {
  document.querySelectorAll("[data-degree]").forEach((element) => {
    element.classList.toggle("is-playing", Number(element.dataset.degree) === index);
  });

  document.querySelectorAll("[data-midi]").forEach((element) => {
    element.classList.toggle("is-playing", Number(element.dataset.midi) === activeNotes[index]?.midi);
  });
}

function clearPlaying() {
  setPlayingIndex(-1);
}

function updateLoopControls() {
  [
    [playAscendingLoop, "ascending"],
    [playDescendingLoop, "descending"],
    [playAlternatingLoop, "alternating"],
  ].forEach(([button, mode]) => {
    const isActive = activeLoopMode === mode;
    button.classList.toggle("is-looping", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
}

function stopLoop() {
  playbackVersion += 1;
  sequenceAudio.pause();
  sequenceAudio.removeAttribute("src");
  sequenceAudio.load();
  playingOrder = null;
  cancelAnimationFrame(highlightFrame);
  activeLoopMode = null;
  updateLoopControls();
  clearPlaying();
}

function clearScheduledTimers() {
  scheduledTimers.forEach((timer) => window.clearTimeout(timer));
  scheduledTimers = [];
  stopLoop();
}

function playDegree(index) {
  clearScheduledTimers();
  const note = activeNotes[index];
  if (!note) return;

  setPlayingIndex(index);
  playTone(note);
  scheduledTimers.push(window.setTimeout(clearPlaying, 620));
}

// Render the whole phrase so background playback never depends on JS timers.
function waveUrl(samples, sampleRate) {
  const bytes = new ArrayBuffer(44 + samples.length * 2);
  const view = new DataView(bytes);
  const writeText = (offset, value) => {
    for (let i = 0; i < value.length; i += 1) view.setUint8(offset + i, value.charCodeAt(i));
  };
  writeText(0, "RIFF");
  view.setUint32(4, bytes.byteLength - 8, true);
  writeText(8, "WAVEfmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, 1, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * 2, true);
  view.setUint16(32, 2, true);
  view.setUint16(34, 16, true);
  writeText(36, "data");
  view.setUint32(40, samples.length * 2, true);
  samples.forEach((sample, index) => {
    const value = Math.max(-1, Math.min(1, sample));
    view.setInt16(44 + index * 2, Math.round(value * (value < 0 ? 32768 : 32767)), true);
  });
  return URL.createObjectURL(new Blob([bytes], { type: "audio/wav" }));
}

async function prepareSequences() {
  const version = ++preparationVersion;
  sequenceButtons.forEach((button) => { button.disabled = true; });
  playbackStatus.textContent = "音声を準備しています…";
  sequenceSources.forEach((url) => URL.revokeObjectURL(url));
  sequenceSources = new Map();
  const sources = new Map();
  const notes = activeNotes;
  try {
    const OfflineContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
    const sampleRate = 44100;
    for (const order of [ASCENDING_ORDER, DESCENDING_ORDER, ALTERNATING_ORDER]) {
      const cycleFrames = Math.round(order.length * SEQUENCE_STEP_MS / 1000 * sampleRate);
      const context = new OfflineContext(1, cycleFrames + Math.ceil(SEQUENCE_NOTE_DURATION * sampleRate), sampleRate);
      order.forEach((degree, index) => {
        scheduleTone(context, notes[degree], index * SEQUENCE_STEP_MS / 1000, SEQUENCE_NOTE_DURATION, "legato");
      });
      const buffer = await context.startRendering();
      if (version !== preparationVersion) break;
      const samples = buffer.getChannelData(0);
      if (order !== ALTERNATING_ORDER) sources.set(order.join(","), waveUrl(samples, sampleRate));
      const loopSamples = samples.slice(0, cycleFrames);
      // Carry the release of the last note across the loop boundary.
      for (let i = cycleFrames; i < samples.length; i += 1) loopSamples[i - cycleFrames] += samples[i];
      sources.set(`${order.join(",")}:loop`, waveUrl(loopSamples, sampleRate));
    }
    if (version !== preparationVersion) {
      sources.forEach((url) => URL.revokeObjectURL(url));
      return;
    }
    sequenceSources = sources;
    sequenceButtons.forEach((button) => { button.disabled = false; });
    playbackStatus.textContent = "再生開始後は、別のアプリや画面ロック中も再生を続けられます（端末・ブラウザによります）。";
  } catch (error) {
    sources.forEach((url) => URL.revokeObjectURL(url));
    if (version === preparationVersion) playbackStatus.textContent = "音声を準備できませんでした。ページを再読み込みしてください。";
    console.error(error);
  }
}

function syncPlaybackHighlight() {
  cancelAnimationFrame(highlightFrame);
  if (!playingOrder) return;
  if (sequenceAudio.paused || sequenceAudio.ended) {
    clearPlaying();
    return;
  }
  const step = Math.floor(sequenceAudio.currentTime * 1000 / SEQUENCE_STEP_MS);
  const index = sequenceAudio.loop ? step % playingOrder.length : Math.min(step, playingOrder.length - 1);
  setPlayingIndex(playingOrder[index]);
  if (!document.hidden) highlightFrame = requestAnimationFrame(syncPlaybackHighlight);
}

function playSequence(order, loopMode = null) {
  const source = sequenceSources.get(`${order.join(",")}${loopMode ? ":loop" : ""}`);
  if (!source) return;
  clearScheduledTimers();
  const version = playbackVersion;
  playingOrder = order;
  activeLoopMode = loopMode;
  updateLoopControls();
  sequenceAudio.src = source;
  sequenceAudio.loop = Boolean(loopMode);
  if ("mediaSession" in navigator && "MediaMetadata" in window) {
    navigator.mediaSession.metadata = new MediaMetadata({ title: labelForKey(activeKey), artist: "移動ド キープレイヤー" });
  }
  // Call play directly in the click handler to retain mobile user activation.
  sequenceAudio.play().catch((error) => {
    if (version !== playbackVersion) return;
    stopLoop();
    playbackStatus.textContent = "再生できませんでした。もう一度再生ボタンを押してください。";
    console.error(error);
  });
}

function playLoopSequence(mode, order) {
  if (activeLoopMode === mode) {
    clearScheduledTimers();
    return;
  }
  playSequence(order, mode);
}

sequenceAudio.addEventListener("play", syncPlaybackHighlight);
sequenceAudio.addEventListener("pause", syncPlaybackHighlight);
sequenceAudio.addEventListener("seeked", syncPlaybackHighlight);
sequenceAudio.addEventListener("ended", () => {
  activeLoopMode = null;
  updateLoopControls();
  syncPlaybackHighlight();
});
sequenceAudio.addEventListener("error", () => {
  if (!playingOrder) return;
  stopLoop();
  playbackStatus.textContent = "音声を再生できませんでした。もう一度再生ボタンを押してください。";
});
document.addEventListener("visibilitychange", syncPlaybackHighlight);

function renderOptions() {
  const groups = [
    ["major", "メジャースケール"],
    ["minor", "マイナースケール"],
  ];

  groups.forEach(([mode, label]) => {
    const group = document.createElement("optgroup");
    group.label = label;

    KEYS.forEach((key, index) => {
      if (key.mode !== mode) return;

      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = optionLabel(key);
      group.append(option);
    });

    keySelect.append(group);
  });
}

function renderSolfegeButtons() {
  solfegeButtons.innerHTML = "";
  const solfege = activeKey.mode === "minor" ? MINOR_SOLFEGE : MAJOR_SOLFEGE;

  solfege.forEach((degree, index) => {
    const button = document.createElement("button");
    button.className = "solfege-button";
    button.type = "button";
    button.dataset.degree = String(index);
    button.setAttribute("aria-label", `${degree} ${activeNotes[index].note}`);
    button.innerHTML = `
      <span class="degree">${degree}</span>
      <span class="note">${activeNotes[index].note}</span>
    `;
    button.addEventListener("click", () => playDegree(index));
    solfegeButtons.append(button);
  });
}

function keyboardLabel(noteWithOctave) {
  const { name, octave } = noteParts(noteWithOctave);
  return `${name}${octave}`;
}

function renderKeyboard() {
  keyboard.innerHTML = "";
  const scaleMidis = new Set(activeNotes.map((note) => note.midi));

  KEYBOARD_WHITE.forEach((note) => {
    const midi = noteToMidi(note);
    const key = document.createElement("div");
    key.className = "white-key";
    key.dataset.midi = String(midi);
    key.textContent = keyboardLabel(note);
    key.classList.toggle("is-scale", scaleMidis.has(midi));
    keyboard.append(key);
  });

  const keyboardStyles = window.getComputedStyle(keyboard);
  const whiteKeyWidth = Number.parseFloat(keyboardStyles.getPropertyValue("--white-key-width"));
  const blackKeyWidth = Number.parseFloat(keyboardStyles.getPropertyValue("--black-key-width"));
  const paddingLeft = Number.parseFloat(keyboardStyles.paddingLeft);

  KEYBOARD_BLACK.forEach(({ note, afterWhiteIndex }) => {
    const midi = noteToMidi(note);
    const key = document.createElement("div");

    key.className = "black-key";
    key.dataset.midi = String(midi);
    key.classList.toggle("is-scale", scaleMidis.has(midi));
    key.style.left = `${paddingLeft + (afterWhiteIndex + 2) * whiteKeyWidth - blackKeyWidth / 2}px`;
    key.textContent = displayNoteName(note);
    keyboard.append(key);
  });
}

function render() {
  clearScheduledTimers();
  activeKey = KEYS[Number(keySelect.value)];
  activeNotes = buildScale(activeKey);
  selectedKeyTitle.textContent = labelForKey(activeKey);
  signatureText.textContent = signatureLabel(activeKey);
  noteLine.textContent = activeNotes.map((scaleNote) => scaleNote.note).join(" ");
  renderSolfegeButtons();
  renderKeyboard();
  prepareSequences();
}

renderOptions();
keySelect.value = "0";
render();

keySelect.addEventListener("change", render);
playAscending.addEventListener("click", () => playSequence(ASCENDING_ORDER));
playDescending.addEventListener("click", () => playSequence(DESCENDING_ORDER));
playAscendingLoop.addEventListener("click", () => playLoopSequence("ascending", ASCENDING_ORDER));
playDescendingLoop.addEventListener("click", () => playLoopSequence("descending", DESCENDING_ORDER));
playAlternatingLoop.addEventListener("click", () => playLoopSequence("alternating", ALTERNATING_ORDER));
window.addEventListener("resize", renderKeyboard);
