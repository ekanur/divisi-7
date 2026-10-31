/**
 * DIVISI 7 (Seven-Layer Corps) - Audio, Multi-Mood BGM & Voice Narration Engine
 * - BGM Moods:
 *   1. 'relaxed' (Scene 1 & 2, atau Scene 5 jika belum lulus): Nuansa santai, hangat & tenang
 *   2. 'tense'   (Scene 3 & 4): Nuansa menegangkan detektif siber / ujian & investigasi
 *   3. 'victory' (Scene 5 jika lulus): Nuansa kemenangan megah & heroik
 * - Voice Narration (Text-to-Speech Bahasa Indonesia):
 *   Membacakan teks dialog Agen FG secara otomatis di awal scene & saat karakter Agen FG diklik.
 */
class Divisi7Audio {
  constructor() {
    this.ctx = null;
    this.muted = false;
    this.currentMood = 'relaxed'; // 'relaxed' | 'tense' | 'victory'
    this.bgmInterval = null;
    this.vehicleInterval = null;
    this.vehicleInitialTimer = null;
    this.bgmStep = 0;
    this.lastSpokenText = '';
    this.lastVoiceOptions = { tone: 'welcoming' };
    this.idVoice = null;
    this.activeUtterance = null;
    this.activeAudioEl = null;
    this.speakDelayTimer = null;
    this.retryAutoplayTimer = null;
    this.pendingUnlockCallback = null;

    this.initSpeechVoices();
    this.setupAutoUnlockListeners();
  }

  setupAutoUnlockListeners() {
    const tryUnlock = () => {
      this.init();
      if (this.pendingUnlockCallback) {
        const cb = this.pendingUnlockCallback;
        this.pendingUnlockCallback = null;
        cb();
      }
    };
    ['pointerdown', 'mousedown', 'keydown', 'touchstart', 'click'].forEach((evtName) => {
      window.addEventListener(evtName, tryUnlock, { capture: true, passive: true });
    });
  }

  stopCurrentVoice() {
    this.pendingUnlockCallback = null;
    if (this.speakDelayTimer) {
      clearTimeout(this.speakDelayTimer);
      this.speakDelayTimer = null;
    }
    if (this.retryAutoplayTimer) {
      clearTimeout(this.retryAutoplayTimer);
      this.retryAutoplayTimer = null;
    }
    if (this.activeAudioEl) {
      try {
        this.activeAudioEl.onended = null;
        this.activeAudioEl.onerror = null;
        this.activeAudioEl.pause();
        this.activeAudioEl.currentTime = 0;
      } catch (e) {}
      this.activeAudioEl = null;
    }
    if ('speechSynthesis' in window) {
      try {
        if (window.speechSynthesis.speaking || window.speechSynthesis.pending) {
          window.speechSynthesis.cancel();
        }
      } catch (e) {}
    }
    const avatarBox = document.getElementById('consistentFgCharacter');
    if (avatarBox) avatarBox.classList.remove('speaking');
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  pickIndonesianVoice() {
    if (!('speechSynthesis' in window)) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || !voices.length) return null;

    const isId = (v) =>
      (v.lang && (v.lang.toLowerCase().includes('id-id') || v.lang.toLowerCase().startsWith('id'))) ||
      (v.name && v.name.toLowerCase().includes('indonesia'));

    const isFemaleName = (name) => /gadis|female|wanita|perempuan|damayanti|google/i.test(name || '');

    const idVoices = voices.filter(isId);

    // Prioritaskan Suara Perempuan Bahasa Indonesia yang ramah & natural (Gadis / Google Bahasa Indonesia)
    this.idVoice =
      idVoices.find((v) => isFemaleName(v.name) && v.name.toLowerCase().includes('natural')) ||
      idVoices.find((v) => isFemaleName(v.name)) ||
      idVoices.find((v) => v.name && v.name.toLowerCase().includes('natural')) ||
      idVoices[0] ||
      voices.find((v) => v.lang && v.lang.toLowerCase().includes('ms')) ||
      voices[0];

    return this.idVoice;
  }

  initSpeechVoices() {
    if (!('speechSynthesis' in window)) return;
    this.pickIndonesianVoice();
    window.speechSynthesis.onvoiceschanged = () => {
      this.pickIndonesianVoice();
    };
  }

  formatIndonesianPronunciation(text) {
    // Pastikan seluruh singkatan, angka, dan istilah dibaca fasih dalam pelafalan Bahasa Indonesia
    return text
      .replace(/\[|\]/g, '')
      .replace(/->/g, ' menuju ')
      .replace(/DIVISI\s*7/gi, 'Divisi Tujuh')
      .replace(/\bFG\b/gi, 'Ef Ge')
      .replace(/\bOSI\b/g, 'O Es I')
      .replace(/\bTKJ\b/g, 'Te Ka Je')
      .replace(/\bRPL\b/g, 'Er Pe El')
      .replace(/\bSIJA\b/g, 'Si Ja')
      .replace(/\bPPLG\b/g, 'Pe Pe El Ge')
      .replace(/\bIT\b/g, 'Teknologi Informasi')
      .replace(/L7/g, 'Lapisan Tujuh')
      .replace(/L6/g, 'Lapisan Enam')
      .replace(/L5/g, 'Lapisan Lima')
      .replace(/L4/g, 'Lapisan Empat')
      .replace(/L3/g, 'Lapisan Tiga')
      .replace(/L2/g, 'Lapisan Dua')
      .replace(/L1/g, 'Lapisan Satu')
      .replace(/Layer\s*7/gi, 'Lapisan Tujuh')
      .replace(/Layer\s*6/gi, 'Lapisan Enam')
      .replace(/Layer\s*5/gi, 'Lapisan Lima')
      .replace(/Layer\s*4/gi, 'Lapisan Empat')
      .replace(/Layer\s*3/gi, 'Lapisan Tiga')
      .replace(/Layer\s*2/gi, 'Lapisan Dua')
      .replace(/Layer\s*1/gi, 'Lapisan Satu');
  }

  speakVoice(text, options = {}) {
    this.lastSpokenText = text;
    this.lastVoiceOptions = options;
    const onEndCallback = typeof options.onEnd === 'function' ? options.onEnd : null;
    const audioFile = options && options.audioFile ? options.audioFile : null;

    this.stopCurrentVoice();

    if (this.muted || !text) {
      if (onEndCallback) {
        const readTimeMs = Math.max(2500, (text ? text.length : 30) * 65);
        this.speakDelayTimer = setTimeout(onEndCallback, readTimeMs);
      }
      return;
    }

    const avatarBox = document.getElementById('consistentFgCharacter');

    // Jika tersedia file audio MP3 suara Bahasa Indonesia, putar file audio tersebut terlebih dahulu
    if (audioFile) {
      try {
        const audio = new Audio(audioFile);
        audio.preload = 'auto';
        audio.volume = 1.0;
        audio.playbackRate = options.playbackRate || 1.0;
        this.activeAudioEl = audio;

        let finished = false;
        const finishAudio = () => {
          if (finished) return;
          finished = true;
          if (this.activeAudioEl === audio) this.activeAudioEl = null;
          if (avatarBox) avatarBox.classList.remove('speaking');
          if (onEndCallback) onEndCallback();
        };

        audio.onplay = () => {
          this.pendingUnlockCallback = null;
          if (avatarBox) avatarBox.classList.add('speaking');
        };
        audio.onended = () => {
          finishAudio();
        };
        audio.onerror = () => {
          // Jika file audio gagal dimuat, fallback ke Web Speech API
          this.activeAudioEl = null;
          this.speakWithWebSpeech(text, options, onEndCallback);
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            this.activeAudioEl = null;
            // Browser memblokir autoplay sebelum ada interaksi pengguna (NotAllowedError).
            // Simpan di pendingUnlockCallback agar begitu pengguna menyentuh/klik layar di mana saja, suara langsung berbunyi.
            this.pendingUnlockCallback = () => {
              if (!this.muted) {
                this.speakVoice(text, options);
              }
            };
          });
        }
        return;
      } catch (e) {
        // Lanjut ke Web Speech API jika Audio gagal
      }
    }

    this.speakWithWebSpeech(text, options, onEndCallback);
  }

  speakWithWebSpeech(text, options = {}, onEndCallback = null) {
    if (!('speechSynthesis' in window)) {
      if (onEndCallback) {
        this.speakDelayTimer = setTimeout(onEndCallback, Math.max(2500, text.length * 65));
      }
      return;
    }

    const avatarBox = document.getElementById('consistentFgCharacter');

    const startUtterance = () => {
      try {
        const cleanText = this.formatIndonesianPronunciation(text);
        const utter = new SpeechSynthesisUtterance(cleanText);
        this.activeUtterance = utter;

        utter.lang = 'id-ID';
        this.pickIndonesianVoice();
        if (this.idVoice) {
          utter.voice = this.idVoice;
        }

        utter.pitch = 1.06;
        utter.rate = 1.02;
        utter.volume = 1.0;

        let finished = false;
        let fallbackTimer = null;

        const finishOnce = () => {
          if (finished) return;
          finished = true;
          if (fallbackTimer) clearTimeout(fallbackTimer);
          if (avatarBox) avatarBox.classList.remove('speaking');
          if (onEndCallback) onEndCallback();
        };

        utter.onstart = () => {
          this.pendingUnlockCallback = null;
          if (avatarBox) avatarBox.classList.add('speaking');
          const estimatedMs = Math.max(3000, cleanText.length * 80);
          fallbackTimer = setTimeout(() => {
            finishOnce();
          }, estimatedMs);
        };

        utter.onend = () => {
          finishOnce();
        };

        utter.onerror = (evt) => {
          if (fallbackTimer) clearTimeout(fallbackTimer);
          if (avatarBox) avatarBox.classList.remove('speaking');
          const errType = evt && evt.error ? String(evt.error) : '';
          if (errType === 'canceled' || errType === 'interrupted') {
            return;
          }
          if (errType === 'not-allowed' || errType === 'audio-busy') {
            this.pendingUnlockCallback = () => {
              if (!this.muted && this.lastSpokenText === text) {
                this.speakVoice(text, options);
              }
            };
            this.retryAutoplayTimer = setTimeout(() => {
              if (!this.muted && this.lastSpokenText === text) {
                this.speakVoice(text, options);
              }
            }, 500);
            return;
          }
          finishOnce();
        };

        window.speechSynthesis.resume();
        window.speechSynthesis.speak(utter);
      } catch (e) {
        if (onEndCallback) {
          this.speakDelayTimer = setTimeout(onEndCallback, Math.max(2500, text.length * 65));
        }
      }
    };

    this.speakDelayTimer = setTimeout(startUtterance, 50);
  }

  repeatLastVoice() {
    this.init();
    this.playClick();
    if (this.lastSpokenText) {
      this.speakVoice(this.lastSpokenText, this.lastVoiceOptions);
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    if (this.muted) {
      this.stopBGM();
      this.stopCurrentVoice();
    } else {
      this.init();
      this.startBGM(this.currentMood);
      this.playClick();
      if (this.lastSpokenText) this.speakVoice(this.lastSpokenText, this.lastVoiceOptions);
    }
    return this.muted;
  }

  playTone(freq, type = 'sine', duration = 0.12, vol = 0.06, slideTo = null) {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    if (slideTo) {
      osc.frequency.exponentialRampToValueAtTime(slideTo, now + duration);
    }

    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + duration);
  }

  /* ==========================================================================
     MULTI-MOOD BGM COMPOSER:
     - 'relaxed' (Scene 1 & 2, atau Scene 5 belum lulus): Santai, Mayor Pentatonik lembut
     - 'tense'   (Scene 3 & 4): Menegangkan, Minor Ostinato cepat & detak jantung siber
     - 'victory' (Scene 5 Lulus): Kemenangan megah, Chord Fanfare Mayor
     ========================================================================== */
  setMood(mood) {
    if (this.currentMood === mood && this.bgmInterval) return;
    this.currentMood = mood;
    this.bgmStep = 0;
    if (!this.muted) {
      this.startBGM(mood);
    }
  }

  startBGM(mood = this.currentMood) {
    this.stopBGM();
    this.currentMood = mood;
    if (this.muted) return;
    this.init();

    if (mood === 'relaxed') {
      // Nuansa Santai (Scene 1 & 2): Lofi/Ambient Major Pentatonic hangat & kalem
      const calmChords = [261.63, 329.63, 392.0, 329.63, 293.66, 349.23, 392.0, 440.0];
      const calmBass = [130.81, 130.81, 146.83, 146.83, 164.81, 164.81, 130.81, 146.83];
      this.bgmInterval = setInterval(() => {
        if (this.muted || !this.ctx) return;
        const idx = this.bgmStep % calmChords.length;
        // Soft warm pad
        this.playTone(calmChords[idx], 'sine', 0.65, 0.022);
        if (this.bgmStep % 2 === 0) {
          this.playTone(calmBass[idx], 'triangle', 0.8, 0.018);
        }
        this.bgmStep++;
      }, 680);
    } else if (mood === 'tense') {
      // Nuansa Menegangkan (Scene 3 & 4): Minor Suspense Pulse & Low Heartbeat
      const tenseBass = [110.0, 110.0, 116.54, 110.0, 130.81, 123.47, 110.0, 103.83];
      const tenseLead = [220.0, 261.63, 246.94, 220.0, 293.66, 261.63, 246.94, 207.65];
      this.bgmInterval = setInterval(() => {
        if (this.muted || !this.ctx) return;
        const idx = this.bgmStep % tenseBass.length;
        // Driving minor pulse
        this.playTone(tenseBass[idx], 'sawtooth', 0.24, 0.026);
        if (this.bgmStep % 2 === 1) {
          this.playTone(tenseLead[idx], 'triangle', 0.22, 0.02);
        }
        // Subtle radar tick every 4 beats
        if (this.bgmStep % 4 === 0) {
          this.playTone(880, 'sine', 0.05, 0.015);
        }
        this.bgmStep++;
      }, 340);
    } else if (mood === 'victory') {
      // Nuansa Kemenangan (Scene 5 Lulus): Heroic Major Arpeggio & Golden Fanfare
      const vicMelody = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 880.0, 1046.5];
      const vicBass = [130.81, 164.81, 196.0, 261.63, 174.61, 220.0, 196.0, 261.63];
      this.bgmInterval = setInterval(() => {
        if (this.muted || !this.ctx) return;
        const idx = this.bgmStep % vicMelody.length;
        this.playTone(vicMelody[idx], 'triangle', 0.42, 0.032);
        this.playTone(vicBass[idx], 'sine', 0.5, 0.025);
        this.bgmStep++;
      }, 460);
    }

    // Suara kendaraan melintas di luar jendela dengan waktu jeda random antara 0.4 detik s.d 10 detik pada semua scene
    this.scheduleNextPassingVehicle();
  }

  scheduleNextPassingVehicle() {
    if (this.vehicleInitialTimer) {
      clearTimeout(this.vehicleInitialTimer);
      this.vehicleInitialTimer = null;
    }
    const randomDelayMs = 400 + Math.floor(Math.random() * 9601); // 400 ms (0.4 detik) s.d 10000 ms (10 detik)
    this.vehicleInitialTimer = setTimeout(() => {
      if (this.muted || !this.bgmInterval) return;
      this.playPassingVehicle();
      this.scheduleNextPassingVehicle();
    }, randomDelayMs);
  }

  stopBGM() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
    if (this.vehicleInterval) {
      clearInterval(this.vehicleInterval);
      this.vehicleInterval = null;
    }
    if (this.vehicleInitialTimer) {
      clearTimeout(this.vehicleInitialTimer);
      this.vehicleInitialTimer = null;
    }
  }

  playPassingVehicle() {
    if (this.muted) return;
    this.init();
    if (!this.ctx) return;

    try {
      const now = this.ctx.currentTime;
      const duration = 2.8;

      // 1. Road/Tire & Wind Whoosh Noise (Doppler Bandpass Sweep)
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.04 * white) / 1.04;
        lastOut = output[i];
        output[i] *= 2.5;
      }

      const noiseSrc = this.ctx.createBufferSource();
      noiseSrc.buffer = noiseBuffer;

      const bandpass = this.ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.Q.setValueAtTime(1.4, now);
      bandpass.frequency.setValueAtTime(240, now);
      bandpass.frequency.exponentialRampToValueAtTime(680, now + duration * 0.46);
      bandpass.frequency.exponentialRampToValueAtTime(190, now + duration);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.0008, now);
      noiseGain.gain.exponentialRampToValueAtTime(0.055, now + duration * 0.46);
      noiseGain.gain.exponentialRampToValueAtTime(0.0008, now + duration);

      // 2. Subtle Low Engine Hum with Doppler Pitch Drop
      const engineOsc = this.ctx.createOscillator();
      engineOsc.type = 'sawtooth';
      engineOsc.frequency.setValueAtTime(118, now);
      engineOsc.frequency.linearRampToValueAtTime(132, now + duration * 0.44);
      engineOsc.frequency.exponentialRampToValueAtTime(82, now + duration);

      const engineFilter = this.ctx.createBiquadFilter();
      engineFilter.type = 'lowpass';
      engineFilter.frequency.setValueAtTime(210, now);

      const engineGain = this.ctx.createGain();
      engineGain.gain.setValueAtTime(0.0005, now);
      engineGain.gain.exponentialRampToValueAtTime(0.022, now + duration * 0.46);
      engineGain.gain.exponentialRampToValueAtTime(0.0005, now + duration);

      // Stereo panning from left to right if supported
      let destinationNode = this.ctx.destination;
      if (typeof this.ctx.createStereoPanner === 'function') {
        const panner = this.ctx.createStereoPanner();
        panner.pan.setValueAtTime(-0.85, now);
        panner.pan.linearRampToValueAtTime(0.85, now + duration);
        panner.connect(this.ctx.destination);
        destinationNode = panner;
      }

      noiseSrc.connect(bandpass);
      bandpass.connect(noiseGain);
      noiseGain.connect(destinationNode);

      engineOsc.connect(engineFilter);
      engineFilter.connect(engineGain);
      engineGain.connect(destinationNode);

      noiseSrc.start(now);
      noiseSrc.stop(now + duration);
      engineOsc.start(now);
      engineOsc.stop(now + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(880, 'triangle', 0.05, 0.06, 1320);
  }

  playTypewriter() {
    const pitch = 600 + Math.random() * 140;
    this.playTone(pitch, 'sine', 0.02, 0.015);
  }

  playCipherSpin() {
    for (let i = 0; i < 6; i++) {
      setTimeout(() => {
        this.playTone(400 + i * 110, 'sawtooth', 0.045, 0.045);
      }, i * 45);
    }
  }

  playScan() {
    this.playTone(320, 'sine', 0.2, 0.07, 960);
    setTimeout(() => this.playTone(960, 'triangle', 0.12, 0.04, 640), 110);
  }

  playWrapHeader() {
    this.playTone(260, 'triangle', 0.09, 0.08, 520);
    setTimeout(() => this.playTone(587.33, 'sine', 0.14, 0.07, 880), 80);
  }

  playUnwrapHeader() {
    this.playTone(880, 'sine', 0.09, 0.07, 520);
    setTimeout(() => this.playTone(520, 'triangle', 0.14, 0.06, 330), 80);
  }

  playSnap() {
    this.playTone(520, 'triangle', 0.05, 0.08, 1040);
  }

  playError() {
    this.playTone(190, 'sawtooth', 0.18, 0.09, 130);
    setTimeout(() => this.playTone(150, 'sawtooth', 0.25, 0.09, 110), 150);
  }

  playRadioStatic() {
    for (let i = 0; i < 4; i++) {
      setTimeout(() => {
        this.playTone(900 + Math.random() * 600, 'square', 0.04, 0.035);
      }, i * 50);
    }
  }

  playSuccess() {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => {
      setTimeout(() => this.playTone(n, 'triangle', 0.22, 0.08), idx * 90);
    });
  }

  playFanfare() {
    const chord = [
      { f: 440, d: 0.15, t: 0 },
      { f: 554.37, d: 0.15, t: 130 },
      { f: 659.25, d: 0.15, t: 260 },
      { f: 880, d: 0.45, t: 390 },
      { f: 659.25, d: 0.15, t: 620 },
      { f: 880, d: 0.65, t: 770 }
    ];
    chord.forEach((n) => {
      setTimeout(() => this.playTone(n.f, 'triangle', n.d, 0.1), n.t);
    });
  }
}

window.sfx = new Divisi7Audio();
