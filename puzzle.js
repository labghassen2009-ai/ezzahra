/* ============================================================
   PUZZLE EZZAHRA — configuration
   ============================================================
   Pour activer le classement partagé (visible par tout le monde,
   pas juste sur cet appareil) :
   1. Créez un Google Form avec 4 champs, dans cet ordre exact :
      Nom, Pays, Niveau, Temps (secondes)
   2. Reliez-le à un Google Sheet, publiez cet onglet sur le web
      au format CSV (Fichier > Partager > Publier sur le web).
   3. Repérez les entry.XXXXXXXXX de chaque champ (mode aperçu du
      formulaire, clic droit > Inspecter sur chaque champ).
   4. Renseignez les 6 constantes ci-dessous.
   ============================================================ */
const PUZZLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/YOUR_PUZZLE_FORM_ID/formResponse';
const PUZZLE_ENTRY_NAME = 'entry.111111111';
const PUZZLE_ENTRY_COUNTRY = 'entry.222222222';
const PUZZLE_ENTRY_LEVEL = 'entry.333333333';
const PUZZLE_ENTRY_TIME = 'entry.444444444';
const PUZZLE_SHEET_CSV_URL = 'PASTE_YOUR_PUBLISHED_SHEET_CSV_LINK_HERE';

const COUNTRY_ISO = {
  "France": "fr",
  "Tunisie": "tn",
  "Algérie": "dz",
  "Maroc": "ma",
  "Libye": "ly",
  "Égypte": "eg",
  "Mauritanie": "mr",
  "Soudan": "sd",
  "Belgique": "be",
  "Suisse": "ch",
  "Luxembourg": "lu",
  "Allemagne": "de",
  "Espagne": "es",
  "Italie": "it",
  "Portugal": "pt",
  "Royaume-Uni": "gb",
  "Irlande": "ie",
  "Pays-Bas": "nl",
  "Autriche": "at",
  "Pologne": "pl",
  "Roumanie": "ro",
  "Grèce": "gr",
  "Suède": "se",
  "Norvège": "no",
  "Danemark": "dk",
  "Finlande": "fi",
  "Islande": "is",
  "Tchéquie": "cz",
  "Slovaquie": "sk",
  "Hongrie": "hu",
  "Bulgarie": "bg",
  "Croatie": "hr",
  "Serbie": "rs",
  "Ukraine": "ua",
  "Russie": "ru",
  "Biélorussie": "by",
  "Malte": "mt",
  "Chypre": "cy",
  "Albanie": "al",
  "Bosnie-Herzégovine": "ba",
  "Macédoine du Nord": "mk",
  "Monténégro": "me",
  "Slovénie": "si",
  "Estonie": "ee",
  "Lettonie": "lv",
  "Lituanie": "lt",
  "Moldavie": "md",
  "Monaco": "mc",
  "Andorre": "ad",
  "Sénégal": "sn",
  "Côte d'Ivoire": "ci",
  "Mali": "ml",
  "Cameroun": "cm",
  "Niger": "ne",
  "Tchad": "td",
  "Guinée": "gn",
  "Burkina Faso": "bf",
  "Togo": "tg",
  "Bénin": "bj",
  "RD Congo": "cd",
  "Congo": "cg",
  "Gabon": "ga",
  "Madagascar": "mg",
  "Comores": "km",
  "Djibouti": "dj",
  "Ghana": "gh",
  "Nigeria": "ng",
  "Kenya": "ke",
  "Éthiopie": "et",
  "Afrique du Sud": "za",
  "Rwanda": "rw",
  "Cap-Vert": "cv",
  "Guinée équatoriale": "gq",
  "Maurice": "mu",
  "Seychelles": "sc",
  "Turquie": "tr",
  "Liban": "lb",
  "Syrie": "sy",
  "Arabie saoudite": "sa",
  "Émirats arabes unis": "ae",
  "Qatar": "qa",
  "Koweït": "kw",
  "Oman": "om",
  "Bahreïn": "bh",
  "Irak": "iq",
  "Jordanie": "jo",
  "Palestine": "ps",
  "Yémen": "ye",
  "Iran": "ir",
  "Israël": "il",
  "États-Unis": "us",
  "Canada": "ca",
  "Mexique": "mx",
  "Brésil": "br",
  "Argentine": "ar",
  "Chili": "cl",
  "Colombie": "co",
  "Pérou": "pe",
  "Venezuela": "ve",
  "Cuba": "cu",
  "Haïti": "ht",
  "République dominicaine": "do",
  "Chine": "cn",
  "Japon": "jp",
  "Corée du Sud": "kr",
  "Inde": "in",
  "Pakistan": "pk",
  "Bangladesh": "bd",
  "Indonésie": "id",
  "Malaisie": "my",
  "Singapour": "sg",
  "Thaïlande": "th",
  "Vietnam": "vn",
  "Philippines": "ph",
  "Afghanistan": "af",
  "Kazakhstan": "kz",
  "Australie": "au",
  "Nouvelle-Zélande": "nz"
};

const LEVELS = [
  { level: 1, size: 3, label: 'Facile' },
  { level: 2, size: 4, label: 'Moyen' },
  { level: 3, size: 5, label: 'Moyen +' },
  { level: 4, size: 6, label: 'Difficile' },
  { level: 5, size: 8, label: 'Expert' },
];

/* ---------------- Player identity gate ---------------- */
const playerGate = document.getElementById('playerGate');
if (playerGate) {
  const playerForm = document.getElementById('playerForm');
  const nameInput = document.getElementById('p-name');
  const countryValue = document.getElementById('pCountryValue');
  const countryBtn = document.getElementById('pCountryBtn');
  const feedback = document.getElementById('playerGateFeedback');

  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    feedback.textContent = '';
    feedback.className = 'form-feedback';

    const name = nameInput.value.trim();
    if (!name) {
      feedback.textContent = 'Merci d\'indiquer votre nom.';
      feedback.classList.add('is-error');
      nameInput.focus();
      return;
    }
    if (!countryValue.value) {
      countryBtn.classList.add('has-error');
      feedback.textContent = 'Merci de sélectionner votre pays.';
      feedback.classList.add('is-error');
      return;
    }

    localStorage.setItem('ezzahra_puzzle_name', name);
    localStorage.setItem('ezzahra_puzzle_country', countryValue.value);

    playerGate.style.transition = 'opacity 0.35s ease';
    playerGate.style.opacity = '0';
    document.body.classList.remove('gate-active');
    setTimeout(() => { playerGate.style.display = 'none'; }, 350);
  });
}

/* ---------------- Sound effects (Web Audio, no external files) ---------------- */
let audioCtx = null;
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function isMuted() {
  return localStorage.getItem('ezzahra_puzzle_muted') === '1';
}
function playTone(freq, startOffset, duration, volume) {
  if (isMuted()) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    const t0 = ctx.currentTime + startOffset;
    gain.gain.setValueAtTime(0, t0);
    gain.gain.linearRampToValueAtTime(volume, t0 + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  } catch (err) { /* audio not available, ignore */ }
}
function playSwapSound() { playTone(520, 0, 0.09, 0.06); }
function playWinSound() {
  playTone(523, 0, 0.16, 0.08);
  playTone(659, 0.14, 0.16, 0.08);
  playTone(784, 0.28, 0.3, 0.09);
}

const soundBtn = document.getElementById('soundBtn');
const soundIconOn = document.getElementById('soundIconOn');
const soundIconOff = document.getElementById('soundIconOff');
function updateSoundIcon() {
  const muted = isMuted();
  soundIconOn.style.display = muted ? 'none' : 'block';
  soundIconOff.style.display = muted ? 'block' : 'none';
}
if (soundBtn) {
  updateSoundIcon();
  soundBtn.addEventListener('click', () => {
    localStorage.setItem('ezzahra_puzzle_muted', isMuted() ? '0' : '1');
    updateSoundIcon();
  });
}

/* ---------------- Image availability check ---------------- */
let puzzleImageOk = true;
(function checkPuzzleImage() {
  const img = new Image();
  img.onerror = () => {
    puzzleImageOk = false;
    const warning = document.getElementById('imageWarning');
    if (warning) warning.style.display = 'block';
  };
  img.src = 'puzzle-ezzahra.jpg';
})();

/* ---------------- Level select ---------------- */
const levelSection = document.getElementById('levelSection');
const gameSection = document.getElementById('gameSection');
const levelGrid = document.getElementById('levelGrid');

function getUnlockedLevel() {
  return parseInt(localStorage.getItem('ezzahra_puzzle_unlocked') || '1', 10);
}
function getBestTime(level) {
  const v = localStorage.getItem('ezzahra_puzzle_best_' + level);
  return v ? parseInt(v, 10) : null;
}
function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return m + ':' + s;
}

function renderLevelGrid() {
  const unlocked = getUnlockedLevel();
  levelGrid.querySelectorAll('.level-card').forEach(card => {
    const lvl = parseInt(card.dataset.level, 10);
    card.classList.toggle('is-locked', lvl > unlocked);
    const best = getBestTime(lvl);
    card.classList.toggle('is-completed', !!best);
    const bestEl = card.querySelector('.level-best');
    bestEl.textContent = best ? 'Meilleur temps : ' + formatTime(best) : '';
  });
}
renderLevelGrid();

levelGrid.addEventListener('click', (e) => {
  const card = e.target.closest('.level-card');
  if (!card || card.classList.contains('is-locked')) return;
  startLevel(parseInt(card.dataset.level, 10));
});

document.getElementById('backToLevels').addEventListener('click', () => {
  stopTimer();
  gameSection.classList.remove('is-active');
  levelSection.style.display = '';
  renderLevelGrid();
});

/* ---------------- Game state ---------------- */
let currentLevel = 1;
let currentSize = 3;
let moves = 0;
let seconds = 0;
let timerInterval = null;
const board = document.getElementById('puzzleBoard');
const preview = document.getElementById('puzzlePreview');
const timerEl = document.getElementById('gameTimer');
const movesEl = document.getElementById('gameMoves');

function startTimer() {
  stopTimer();
  seconds = 0;
  timerEl.textContent = '00:00';
  timerInterval = setInterval(() => {
    seconds++;
    timerEl.textContent = formatTime(seconds);
  }, 1000);
}
function stopTimer() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = null;
}

function shuffledIndices(n) {
  const arr = Array.from({ length: n }, (_, i) => i);
  do {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  } while (arr.every((v, i) => v === i)); // avoid an already-solved shuffle
  return arr;
}

function buildBoard(size) {
  board.innerHTML = '';
  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  const pieces = shuffledIndices(size * size);

  pieces.forEach((pieceIndex) => {
    const piece = document.createElement('div');
    piece.className = 'puzzle-piece';
    piece.dataset.piece = pieceIndex;
    const row = Math.floor(pieceIndex / size);
    const col = pieceIndex % size;
    piece.style.backgroundSize = `${size * 100}% ${size * 100}%`;
    piece.style.backgroundPosition = size > 1
      ? `${(col / (size - 1)) * 100}% ${(row / (size - 1)) * 100}%`
      : '0% 0%';
    board.appendChild(piece);
  });

  wireDragEvents(size);
}

function startLevel(level) {
  const def = LEVELS.find(l => l.level === level);
  if (!def) return;
  currentLevel = level;
  currentSize = def.size;
  moves = 0;
  movesEl.textContent = '0';
  levelSection.style.display = 'none';
  gameSection.classList.add('is-active');
  preview.classList.remove('is-visible');

  if (!puzzleImageOk) {
    board.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;text-align:center;padding:1.5rem;background:var(--paper-dim);color:var(--ink-soft);font-size:0.85rem;line-height:1.6;">
      L'image du puzzle ne se charge pas.<br><br>
      Vérifiez que le fichier <code>puzzle-ezzahra.jpg</code> existe bien à côté de <code>puzzle.html</code>, avec exactement ce nom (pas de « (1) » ajouté par un second téléchargement du même fichier).
    </div>`;
    board.style.gridTemplateColumns = '1fr';
    return;
  }

  buildBoard(def.size);
  startTimer();
}

/* ---------------- Drag & drop (pointer events, works on touch + mouse) ---------------- */
let dragSrc = null;

function wireDragEvents(size) {
  const pieces = board.querySelectorAll('.puzzle-piece');
  pieces.forEach(piece => {
    piece.addEventListener('pointerdown', (e) => {
      dragSrc = piece;
      piece.classList.add('is-dragging');
      piece.setPointerCapture(e.pointerId);
    });
    piece.addEventListener('pointerup', (e) => {
      piece.releasePointerCapture(e.pointerId);
      const target = document.elementFromPoint(e.clientX, e.clientY);
      const dropPiece = target ? target.closest('.puzzle-piece') : null;
      if (dragSrc) dragSrc.classList.remove('is-dragging');
      if (dropPiece && dragSrc && dropPiece !== dragSrc) {
        swapPieces(dragSrc, dropPiece, size);
      }
      dragSrc = null;
    });
  });
}

function swapPieces(a, b, size) {
  const aPiece = a.dataset.piece, aPos = a.style.backgroundPosition;
  const bPiece = b.dataset.piece, bPos = b.style.backgroundPosition;
  a.dataset.piece = bPiece; a.style.backgroundPosition = bPos;
  b.dataset.piece = aPiece; b.style.backgroundPosition = aPos;
  moves++;
  movesEl.textContent = moves;
  playSwapSound();
  checkWin(size);
}

function checkWin(size) {
  const pieces = board.querySelectorAll('.puzzle-piece');
  let solved = true;
  pieces.forEach((p, i) => {
    if (parseInt(p.dataset.piece, 10) !== i) solved = false;
  });
  if (solved) onWin();
}

/* ---------------- Toolbar actions ---------------- */
document.getElementById('previewBtn').addEventListener('click', () => {
  preview.classList.toggle('is-visible');
});
document.getElementById('shuffleBtn').addEventListener('click', () => {
  moves = 0;
  movesEl.textContent = '0';
  buildBoard(currentSize);
  startTimer();
});

/* ---------------- Win handling ---------------- */
const winModal = document.getElementById('winModal');
const winCard = document.getElementById('winCard');
const winStats = document.getElementById('winStats');
const nextLevelBtn = document.getElementById('nextLevelBtn');

function spawnConfetti() {
  const colors = ['#E3A536', '#0E3A52', '#C1432A', '#FBF8F1'];
  for (let i = 0; i < 26; i++) {
    const c = document.createElement('span');
    c.className = 'confetti-piece';
    c.style.left = Math.random() * 100 + '%';
    c.style.background = colors[Math.floor(Math.random() * colors.length)];
    c.style.animationDuration = (1.2 + Math.random() * 1.2) + 's';
    c.style.animationDelay = (Math.random() * 0.3) + 's';
    winCard.appendChild(c);
    setTimeout(() => c.remove(), 3000);
  }
}

function onWin() {
  stopTimer();

  const best = getBestTime(currentLevel);
  if (!best || seconds < best) {
    localStorage.setItem('ezzahra_puzzle_best_' + currentLevel, String(seconds));
  }
  const unlocked = getUnlockedLevel();
  if (currentLevel === unlocked && currentLevel < LEVELS.length) {
    localStorage.setItem('ezzahra_puzzle_unlocked', String(currentLevel + 1));
  }

  winStats.textContent = `Niveau ${currentLevel} terminé en ${formatTime(seconds)} avec ${moves} coups.`;
  winModal.classList.add('is-open');
  spawnConfetti();
  playWinSound();

  const hasNext = currentLevel < LEVELS.length;
  nextLevelBtn.style.display = hasNext ? 'block' : 'none';

  submitScore(currentLevel, seconds);
}

document.getElementById('shareScoreBtn').addEventListener('click', async () => {
  const name = localStorage.getItem('ezzahra_puzzle_name') || 'Un joueur';
  const text = `${name} a terminé le niveau ${currentLevel} du puzzle Ezzahra en ${formatTime(seconds)} ! 🧩 Venez essayer :`;
  const url = window.location.origin + window.location.pathname;
  if (navigator.share) {
    try { await navigator.share({ title: 'Puzzle Ezzahra', text, url }); } catch (err) { /* user cancelled */ }
  } else {
    try {
      await navigator.clipboard.writeText(text + ' ' + url);
      const btn = document.getElementById('shareScoreBtn');
      const original = btn.textContent;
      btn.textContent = 'Copié !';
      setTimeout(() => { btn.textContent = original; }, 1800);
    } catch (err) { /* clipboard unavailable, ignore */ }
  }
});

nextLevelBtn.addEventListener('click', () => {
  winModal.classList.remove('is-open');
  if (currentLevel < LEVELS.length) startLevel(currentLevel + 1);
});
document.getElementById('closeWinBtn').addEventListener('click', () => {
  winModal.classList.remove('is-open');
  gameSection.classList.remove('is-active');
  levelSection.style.display = '';
  renderLevelGrid();
});

/* ---------------- Submit score to Google Form ---------------- */
async function submitScore(level, secs) {
  if (PUZZLE_FORM_ACTION_URL.indexOf('YOUR_PUZZLE_FORM_ID') !== -1) return;
  const name = localStorage.getItem('ezzahra_puzzle_name') || '';
  const country = localStorage.getItem('ezzahra_puzzle_country') || '';
  const data = new FormData();
  data.append(PUZZLE_ENTRY_NAME, name);
  data.append(PUZZLE_ENTRY_COUNTRY, country);
  data.append(PUZZLE_ENTRY_LEVEL, String(level));
  data.append(PUZZLE_ENTRY_TIME, String(secs));
  try {
    await fetch(PUZZLE_FORM_ACTION_URL, { method: 'POST', mode: 'no-cors', body: data });
  } catch (err) { /* fail silently, don't block the player */ }
}

/* ---------------- CSV parsing (leaderboard + country stats) ---------------- */
function parseCSV(text) {
  const rows = [];
  let row = [], field = '', inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') { inQuotes = false; }
      else { field += c; }
    } else {
      if (c === '"') inQuotes = true;
      else if (c === ',') { row.push(field); field = ''; }
      else if (c === '\n' || c === '\r') {
        if (field.length || row.length) { row.push(field); rows.push(row); }
        field = ''; row = [];
        if (c === '\r' && text[i + 1] === '\n') i++;
      } else field += c;
    }
  }
  if (field.length || row.length) { row.push(field); rows.push(row); }
  return rows;
}

async function loadLeaderboardAndStats() {
  const lbList = document.getElementById('lbList');
  const lbEmpty = document.getElementById('lbEmpty');
  const lbError = document.getElementById('lbError');
  const pcSummary = document.getElementById('pcStatsSummary');
  const pcList = document.getElementById('pcStatList');
  const pcEmpty = document.getElementById('pcStatsEmpty');

  if (!PUZZLE_SHEET_CSV_URL || PUZZLE_SHEET_CSV_URL.indexOf('PASTE_YOUR') === 0) {
    lbError.style.display = 'block';
    pcEmpty.style.display = 'block';
    return;
  }

  try {
    const res = await fetch(PUZZLE_SHEET_CSV_URL);
    if (!res.ok) throw new Error('fetch failed');
    const text = await res.text();
    const rows = parseCSV(text).filter(r => r.length && r.some(c => c.trim() !== ''));
    if (rows.length < 2) { lbEmpty.style.display = 'block'; pcEmpty.style.display = 'block'; return; }

    const header = rows[0].map(h => h.trim());
    const iName = header.indexOf('Nom');
    const iCountry = header.indexOf('Pays');
    const iLevel = header.indexOf('Niveau');
    const iTime = header.indexOf('Temps (secondes)');

    const entries = [];
    for (let r = 1; r < rows.length; r++) {
      const row = rows[r];
      const name = (row[iName] || '').trim();
      const country = (row[iCountry] || '').trim();
      const level = parseInt(row[iLevel], 10);
      const secs = parseInt(row[iTime], 10);
      if (!name || !country || isNaN(level) || isNaN(secs)) continue;
      entries.push({ name, country, level, secs });
    }

    if (!entries.length) { lbEmpty.style.display = 'block'; pcEmpty.style.display = 'block'; return; }

    // --- Leaderboard: highest level first, then fastest time ---
    const sorted = [...entries].sort((a, b) => b.level - a.level || a.secs - b.secs);
    const top5 = sorted.slice(0, 5);
    top5.forEach((entry, i) => {
      const iso = COUNTRY_ISO[entry.country];
      const row = document.createElement('div');
      row.className = 'lb-row reveal';
      row.innerHTML = `
        <span class="lb-rank">${i + 1}</span>
        ${iso ? `<img class="lb-flag" src="https://flagcdn.com/24x18/${iso}.png" alt="">` : ''}
        <span class="lb-name">${entry.name}</span>
        <span class="lb-level">Niveau ${entry.level}</span>
        <span class="lb-time">${formatTime(entry.secs)}</span>
      `;
      lbList.appendChild(row);
    });

    // --- Country stats: one entry per player (their best run) ---
    const byPlayer = {};
    entries.forEach(e => {
      const key = e.name + '|' + e.country;
      if (!byPlayer[key] || e.level > byPlayer[key].level) byPlayer[key] = e;
    });
    const counts = {};
    let total = 0;
    Object.values(byPlayer).forEach(e => {
      counts[e.country] = (counts[e.country] || 0) + 1;
      total++;
    });
    const countrySorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);

    document.getElementById('pcStatTotal').textContent = total;
    document.getElementById('pcStatCountries').textContent = countrySorted.length;
    document.getElementById('pcStatTop').textContent = countrySorted[0][0];
    pcSummary.style.display = 'flex';

    countrySorted.forEach(([country, count]) => {
      const pct = ((count / total) * 100).toFixed(1);
      const iso = COUNTRY_ISO[country];
      const row = document.createElement('div');
      row.className = 'stat-row reveal';
      row.innerHTML = `
        <span class="stat-flag">${iso ? `<img src="https://flagcdn.com/24x18/${iso}.png" alt="" style="width:24px;height:18px;border-radius:2px;">` : '🏳️'}</span>
        <div class="stat-main">
          <div class="stat-top"><span class="stat-country">${country}</span><span class="stat-pct">${pct}%</span></div>
          <div class="stat-track"><div class="stat-fill" data-pct="${pct}"></div></div>
        </div>
        <span class="stat-count">${count}</span>
      `;
      pcList.appendChild(row);
    });

    const allRows = document.querySelectorAll('.lb-row, .stat-row');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver((es) => {
        es.forEach(en => {
          if (en.isIntersecting) {
            en.target.classList.add('is-visible');
            const fill = en.target.querySelector('.stat-fill');
            if (fill) requestAnimationFrame(() => { fill.style.width = fill.dataset.pct + '%'; });
            obs.unobserve(en.target);
          }
        });
      }, { threshold: 0.15 });
      allRows.forEach(r => obs.observe(r));
    } else {
      allRows.forEach(r => {
        r.classList.add('is-visible');
        const fill = r.querySelector('.stat-fill');
        if (fill) fill.style.width = fill.dataset.pct + '%';
      });
    }
  } catch (err) {
    lbError.style.display = 'block';
    pcEmpty.style.display = 'block';
  }
}

loadLeaderboardAndStats();
