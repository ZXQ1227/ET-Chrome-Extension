(() => {
  if (window.__ET_EXTENSION_LOADED__) return;
  window.__ET_EXTENSION_LOADED__ = true;

  const host = document.createElement('div');
  host.id = 'et-extension-host';
  host.style.cssText = 'all:initial;position:fixed;z-index:2147483647;inset:0;pointer-events:none;';
  document.documentElement.appendChild(host);
  const shadow = host.attachShadow({mode:'open'});

  const style = document.createElement('style');
  style.textContent = `
    *{box-sizing:border-box}
    .et-icon{position:fixed;display:none;pointer-events:auto;width:36px;height:36px;min-width:36px;min-height:36px;
      padding:0;margin:0;border:0;border-radius:11px;appearance:none;-webkit-appearance:none;
      display:flex;align-items:center;justify-content:center;box-sizing:border-box;
      color:#fff;font-family:Inter,Arial,sans-serif;font-size:15px;font-weight:700;line-height:1;
      letter-spacing:-.5px;text-align:center;white-space:nowrap;cursor:pointer;
      background:linear-gradient(135deg,#5847f5,#05a9d8);box-shadow:0 5px 18px #1d2b4a55;z-index:3}
    .et-card{position:fixed;display:none;pointer-events:auto;width: min(430px,calc(100vw - 24px));background:#f8f9fc;
      color:#172033;border:1px solid #dce2ed;border-radius:16px;box-shadow:0 18px 60px #10182845;
      font:14px/1.5 Inter,-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;overflow:hidden;z-index:4}
    .et-top{height:58px;display:flex;align-items:center;gap:10px;padding:0 14px;border-bottom:1px solid #dce2ed}
    .et-logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(135deg,#5847f5,#05a9d8);color:white;
      display:grid;place-items:center;font-weight:800;font-size:14px}
    .et-lang{font-weight:650;color:#64748b;white-space:nowrap}
    .et-swap{border:0;background:transparent;color:#64748b;font-size:20px;cursor:pointer;padding:2px}
    .et-select{height:36px;min-width:130px;flex:1;border:1px solid #c7d2fe;border-radius:10px;background:#f1f3ff;
      color:#5145e8;font-weight:650;padding:0 10px;font-size:14px}
    .et-tool{border:0;background:transparent;color:#64748b;font-size:19px;cursor:pointer;padding:3px}
    .et-body{padding:22px 20px 18px;min-height:170px}
    .et-source{font-size:13px;color:#8993a6;margin-bottom:9px;white-space:pre-wrap;overflow-wrap:anywhere}
    .et-result{font-size:22px;line-height:1.45;color:#172033;white-space:pre-wrap;overflow-wrap:anywhere}
    .et-phonetic{font-size:15px;color:#6558ed;font-style:italic;margin-top:8px}
    .et-divider{border-top:1px dashed #d6deeb;margin:18px 0 12px}
    .et-defs{display:flex;flex-direction:column;gap:8px}
    .et-defrow{display:flex;gap:10px;align-items:flex-start;color:#64748b;font-size:14px}
    .et-pos{flex:none;border:1px solid #c7d2fe;color:#5145e8;background:#f1f3ff;border-radius:7px;padding:2px 8px;font-weight:650}
    .et-foot{border-top:1px solid #dce2ed;padding:12px 14px;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
    .et-pron{border:1px solid #dce3ef;background:#fff;border-radius:10px;padding:9px 12px;color:#172033;
      font-size:13px;font-weight:650;cursor:pointer;display:flex;align-items:center;gap:7px}
    .et-pron:hover{border-color:#a5b4fc;background:#f5f6ff}
    .et-pron .flag{font-size:16px}
    .et-status{font-size:11px;color:#8490a3;margin-left:auto}
    .et-error{font-size:13px;color:#b42318}
    .et-loading{color:#7b8496;font-size:14px}
    .et-note{font-size:11px;color:#8490a3;margin:-4px 0 9px}
    .et-retry{margin-left:8px;border:1px solid #c7d2fe;background:#f1f3ff;color:#5145e8;border-radius:8px;
      padding:3px 11px;font-size:12px;font-weight:650;cursor:pointer;font-family:inherit;vertical-align:middle}
    .et-retry:hover{background:#e6e9ff;border-color:#a5b4fc}
    .et-card button:focus-visible,.et-card select:focus-visible,.et-icon:focus-visible{outline:2px solid #7667f7;outline-offset:2px}
    @media(max-width:480px){.et-card{width:calc(100vw - 20px)}.et-top{gap:7px;padding:0 10px}.et-select{min-width:95px}.et-body{padding:17px 15px}}
  `;
  shadow.appendChild(style);

  const icon = document.createElement('button');
  icon.className = 'et-icon';
  icon.textContent = 'ET';
  icon.title = 'Translate selection';
  icon.setAttribute('aria-label','Translate selected text');
  shadow.appendChild(icon);

  const card = document.createElement('section');
  card.className = 'et-card';
  card.innerHTML = `
    <div class="et-top">
      <div class="et-logo">ET</div>
      <span class="et-lang">EN</span>
      <button class="et-swap" title="Swap languages" aria-label="Swap languages">⇄</button>
      <select class="et-select" aria-label="Translation language">
        <option value="zh-CN">Chinese</option><option value="ja">Japanese</option>
        <option value="ko">Korean</option><option value="fr">French</option>
        <option value="de">German</option><option value="es">Spanish</option>
      </select>
      <button class="et-tool" data-action="save" title="Save word" aria-label="Save">☆</button>
      <button class="et-tool" data-action="pin" title="Keep popup open" aria-label="Pin">📌</button>
      <button class="et-tool" data-action="close" title="Close" aria-label="Close">×</button>
    </div>
    <div class="et-body">
      <div class="et-source"></div>
      <div class="et-note"></div>
      <div class="et-result"><span class="et-loading">Translating…</span></div>
      <div class="et-phonetic"></div>
      <div class="et-divider"></div>
      <div class="et-defs"></div>
    </div>
    <div class="et-foot">
      <button class="et-pron" data-voice="en-GB"><span class="flag">🇬🇧</span> British</button>
      <button class="et-pron" data-voice="en-US"><span class="flag">🇺🇸</span> American</button>
      <span class="et-status">Read original text</span>
    </div>`;
  shadow.appendChild(card);

  const $ = s => card.querySelector(s);
  let selectedText = '';
  let selectionRect = null;
  let pinned = false;
  let targetLang = 'zh-CN';
  let lastSelection = '';

  // Translation requests are best-effort against a public endpoint: bound them
  // in time, keep them out of the query-string length limit, and remember what
  // we already fetched. Without the timeout a stalled request leaves the card
  // on "Translating…" forever.
  const CACHE_PREFIX = 'et.tc.';
  const CACHE_INDEX = 'et.tc.index';
  const CACHE_LIMIT = 400;
  const CACHE_TTL = 30 * 24 * 60 * 60 * 1000;
  const REQUEST_TIMEOUT = 8000;
  const MAX_QUERY_CHARS = 1800;

  let translateSeq = 0;
  let activeRequest = null;

  function hash(text) {
    let h = 0x811c9dc5;
    for (let i = 0; i < text.length; i++) {
      h ^= text.charCodeAt(i);
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(36);
  }

  // chrome.storage disappears if the extension is reloaded mid-page; a cache
  // miss is always safe, so swallow those failures instead of breaking the UI.
  async function cacheGet(key) {
    try {
      const k = CACHE_PREFIX + key;
      const got = await chrome.storage.local.get(k);
      const row = got && got[k];
      if (!row || typeof row.text !== 'string') return null;
      if (Date.now() - row.at > CACHE_TTL) { chrome.storage.local.remove(k); return null; }
      return row.text;
    } catch (_) {
      return null;
    }
  }

  async function cacheSet(key, text) {
    try {
      const k = CACHE_PREFIX + key;
      const got = await chrome.storage.local.get(CACHE_INDEX);
      let index = Array.isArray(got && got[CACHE_INDEX]) ? got[CACHE_INDEX] : [];
      index = index.filter(row => row && row[0] !== k);
      index.push([k, Date.now()]);
      const evicted = index.length > CACHE_LIMIT ? index.splice(0, index.length - CACHE_LIMIT) : [];
      await chrome.storage.local.set({ [k]: { text, at: Date.now() }, [CACHE_INDEX]: index });
      if (evicted.length) await chrome.storage.local.remove(evicted.map(row => row[0]));
    } catch (_) {}
  }

  function requestError(code, detail) {
    const error = new Error(detail);
    error.code = code;
    return error;
  }

  // Map a failure to something the reader can act on. The old catch-all
  // "Translation failed" told the user nothing about whether retrying helps.
  function messageFor(error) {
    switch (error && error.code) {
      case 'rate': return 'The translation service is rate limiting requests. Try again in a minute.';
      case 'timeout': return 'Translation timed out. Try again, or select a shorter passage.';
      case 'shape': return 'The translation service returned an unexpected response.';
      case 'empty': return 'The translation service returned an empty result.';
      default: return 'Translation failed. Check your connection and try again.';
    }
  }

  function hideAll() {
    if (pinned) return;
    icon.style.display = 'none';
    card.style.display = 'none';
  }
  function place(el, x, y, width=36, height=36) {
    const pad = 10;
    const left = Math.max(pad, Math.min(x, innerWidth - width - pad));
    const top = Math.max(pad, Math.min(y, innerHeight - height - pad));
    el.style.left = `${left}px`; el.style.top = `${top}px`;
  }
  function onSelection() {
    if (pinned) return;
    const sel = window.getSelection();
    const txt = sel ? sel.toString().trim() : '';
    if (!txt || txt.length > 2500) { icon.style.display='none'; return; }
    selectedText = txt;
    lastSelection = txt;
    const range = sel.getRangeAt(0);
    selectionRect = range.getBoundingClientRect();
    // getClientRects() gives one rect per visual line; the last one is where
    // the selection actually ends. Use it so multi-line selections anchor the
    // icon to the end of the last line, not the top-right of the whole block.
    const rects = range.getClientRects();
    const endRect = rects.length ? rects[rects.length - 1] : selectionRect;
    placeSelectionIcon(endRect);
    icon.style.display = 'grid';
    card.style.display = 'none';
  }
  // Position the ET icon at the right side of where the selection ends:
  // 1. Preferred: immediately to the right of the end rect, on the same line.
  // 2. No room on the right: drop just below the end of the selection,
  //    right-aligned with it (never up and to the right, never over the text).
  // 3. place() still clamps everything inside the viewport as a last resort.
  function placeSelectionIcon(rect) {
    const pad = 10, gap = 8, size = 36;
    const fitsRight = rect.right + gap + size <= innerWidth - pad;
    if (fitsRight) {
      place(icon, rect.right + gap, rect.top);
      return;
    }
    place(icon, Math.max(pad, rect.right - size), rect.bottom + gap);
  }
  document.addEventListener('mouseup', e => {
    if (e.composedPath().includes(host)) return;
    setTimeout(onSelection, 20);
  });
  document.addEventListener('keyup', e => {
    if (['Shift','ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Control','Meta'].includes(e.key)) setTimeout(onSelection, 20);
  });
  document.addEventListener('mousedown', e => {
    if (!e.composedPath().includes(host) && card.style.display === 'block' && !pinned) {
      // Allow a new selection to replace the current result.
    }
  });

  icon.addEventListener('click', async () => {
    if (!selectedText) return;
    icon.style.display='none';
    const anchor = selectionRect || {left:innerWidth/2, bottom:innerHeight/2, top:innerHeight/2};
    const cardX = Math.max(10, Math.min(anchor.left, innerWidth - 440));
    let cardY = anchor.bottom + 12;
    if (cardY + 340 > innerHeight) cardY = Math.max(10, anchor.top - 352);
    place(card, cardX, cardY, Math.min(430, innerWidth-20), 320);
    card.style.display='block';
    $('.et-source').textContent = selectedText;
    $('.et-result').innerHTML = '<span class="et-loading">Translating…</span>';
    $('.et-phonetic').textContent = '';
    $('.et-defs').innerHTML = '';
    $('.et-status').textContent = 'Read original text';
    await translate(selectedText, targetLang);
    if (/^[a-zA-Z][a-zA-Z\s'-]{0,60}$/.test(selectedText)) await lookupWord(selectedText);
  });

  async function translate(text, lang) {
    const result = $('.et-result');
    const note = $('.et-note');
    const query = text.slice(0, MAX_QUERY_CHARS);
    note.textContent = text.length > MAX_QUERY_CHARS
      ? `Showing the first ${MAX_QUERY_CHARS} characters.`
      : '';

    const key = `${lang}:${hash(query)}`;
    const cached = await cacheGet(key);
    if (cached) {
      if (lang !== targetLang) return;
      result.textContent = cached;
      $('.et-status').textContent = 'Cached result';
      return;
    }

    // Any newer request wins: drop the in-flight one so a late response can
    // never overwrite the language the user just switched to.
    const seq = ++translateSeq;
    if (activeRequest) activeRequest.abort();
    const controller = new AbortController();
    activeRequest = controller;
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    result.innerHTML = '<span class="et-loading">Translating…</span>';
    try {
      const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${encodeURIComponent(lang)}&dt=t&q=${encodeURIComponent(query)}`;
      const res = await fetch(url, { signal: controller.signal, credentials: 'omit' });
      if (!res.ok) throw requestError(res.status === 429 ? 'rate' : 'network', `HTTP ${res.status}`);
      let data;
      try {
        data = await res.json();
      } catch (_) {
        // Some failure modes answer with a consent/challenge page, not JSON.
        throw requestError('shape', 'response was not JSON');
      }
      if (!Array.isArray(data) || !Array.isArray(data[0])) throw requestError('shape', 'unexpected response shape');
      const translated = data[0].map(seg => (Array.isArray(seg) ? seg[0] : '')).filter(Boolean).join('');
      if (!translated) throw requestError('empty', 'no translation returned');
      if (seq !== translateSeq) return;
      result.textContent = translated;
      $('.et-status').textContent = 'Read original text';
      await cacheSet(key, translated);
    } catch (e) {
      if (seq !== translateSeq) return;
      const code = e && e.name === 'AbortError' ? 'timeout' : (e && e.code) || 'network';
      result.innerHTML = `<span class="et-error">${escapeHtml(messageFor({ code }))}</span>` +
        '<button class="et-retry" type="button">Retry</button>';
    } finally {
      clearTimeout(timer);
      if (activeRequest === controller) activeRequest = null;
    }
  }

  async function lookupWord(word) {
    try {
      const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
      if (!res.ok) return;
      const data = await res.json();
      const entry = data[0];
      const phonetic = entry.phonetics?.find(p => p.text)?.text || '';
      if (phonetic) $('.et-phonetic').textContent = phonetic;
      const defs = [];
      for (const meaning of (entry.meanings || []).slice(0,3)) {
        const definition = meaning.definitions?.[0]?.definition;
        if (definition) defs.push({pos:meaning.partOfSpeech || 'Meaning', definition});
      }
      $('.et-defs').innerHTML = defs.map(d => `<div class="et-defrow"><span class="et-pos">${escapeHtml(d.pos)}</span><span>${escapeHtml(d.definition)}</span></div>`).join('');
    } catch (_) {}
  }
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  }

  $('.et-select').addEventListener('change', async e => {
    targetLang = e.target.value;
    if (selectedText) {
      $('.et-result').textContent = 'Translating…';
      await translate(selectedText, targetLang);
    }
  });
  $('.et-swap').addEventListener('click', () => {
    targetLang = targetLang === 'zh-CN' ? 'ja' : 'zh-CN';
    $('.et-select').value = targetLang;
    if (selectedText) translate(selectedText, targetLang);
  });
  card.querySelector('[data-action="close"]').addEventListener('click', () => {
    pinned = false; card.style.display='none';
  });
  card.querySelector('[data-action="pin"]').addEventListener('click', e => {
    pinned = !pinned; e.currentTarget.style.opacity = pinned ? '1' : '.65';
    e.currentTarget.title = pinned ? 'Unpin popup' : 'Keep popup open';
  });
  card.querySelector('[data-action="save"]').addEventListener('click', async e => {
    const {savedWords=[]} = await chrome.storage.local.get('savedWords');
    if (!savedWords.includes(selectedText)) savedWords.push(selectedText);
    await chrome.storage.local.set({savedWords});
    e.currentTarget.textContent = '★';
    $('.et-status').textContent = 'Saved to your word list';
  });
  card.querySelectorAll('[data-voice]').forEach(btn => btn.addEventListener('click', () => {
    const locale = btn.dataset.voice;
    const synth = window.speechSynthesis;
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(selectedText);
    utterance.lang = locale;
    const voices = synth.getVoices();
    const matching = voices.filter(v => v.lang.toLowerCase().startsWith(locale.toLowerCase()));
    if (matching.length) utterance.voice = matching[0];
    utterance.rate = 0.92;
    synth.speak(utterance);
    $('.et-status').textContent = locale === 'en-GB' ? 'Playing British pronunciation' : 'Playing American pronunciation';
  }));

  // Retry after a failure: re-run the current selection in the current language
  // without making the reader re-select the text.
  card.addEventListener('click', e => {
    const button = e.target && e.target.closest ? e.target.closest('.et-retry') : null;
    if (!button) return;
    const text = selectedText || lastSelection;
    if (!text) return;
    button.disabled = true;
    translate(text, targetLang);
  });

  document.addEventListener('click', e => {
    if (e.composedPath().includes(host)) return;
    if (!pinned) { card.style.display='none'; icon.style.display='none'; }
  });
  window.addEventListener('scroll', () => { if (!pinned) { icon.style.display='none'; card.style.display='none'; } }, true);
  window.addEventListener('resize', () => { if (!pinned) hideAll(); });
})();
