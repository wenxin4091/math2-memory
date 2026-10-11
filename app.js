(() => {
  const STORE_KEY = "math2-seven-v1";
  const SETTINGS_KEY = "math2-seven-settings-v1";
  const DAY = 24 * 60 * 60 * 1000;
  const BOX_WAIT = [0, DAY, 3 * DAY];

  const IS_WECHAT = /MicroMessenger/i.test(navigator.userAgent || "");
  function loadSettings() {
    try {
      return Object.assign({ hideCount: 1 }, JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}"));
    } catch {
      return { hideCount: 1 };
    }
  }
  function saveSettings(patch) {
    const s = Object.assign(loadSettings(), patch);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(s));
    return s;
  }
  const state = {
    screen: "home",
    moduleId: null,
    mode: "sheet",
    idx: 0,
    level: 0,
    opened: [],
    hideCount: loadSettings().hideCount || 1,
    queue: [],
    panel: null,
    draftText: "",
    toast: "",
  };

  function syncViewport() {
    const vv = window.visualViewport;
    const h = vv ? vv.height : window.innerHeight;
    document.documentElement.style.setProperty("--app-h", h + "px");
    if (vv) {
      const gap = window.innerHeight - vv.offsetTop - vv.height;
      document.documentElement.style.setProperty("--vv-bottom", Math.max(0, gap) + "px");
    }
  }
  syncViewport();
  window.addEventListener("resize", syncViewport);
  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", syncViewport);
    window.visualViewport.addEventListener("scroll", syncViewport);
  }

  function modules() {
    return window.MATH2_DATA.modules;
  }
  function allCards() {
    const out = [];
    for (const m of modules()) {
      for (const c of m.cards) out.push({ moduleId: m.id, card: c });
    }
    return out;
  }
  function findModule(id) {
    return modules().find((m) => m.id === id);
  }
  function findCard(moduleId, cardId) {
    const m = findModule(moduleId);
    return m && m.cards.find((c) => c.id === cardId);
  }

  /* 考频与难度档：freq 2-5（★），tier 1低 2中 3高 */
  const TIER_NAMES = { 1: "低档 · 必须秒写", 2: "中档 · 大题主力", 3: "高档 · 压轴冲刺" };
  function freqOf(card) {
    return Number((card && card.freq) || 0);
  }
  function tierOf(card) {
    return Number((card && card.tier) || 0);
  }
  function sortByFreq(list) {
    return list
      .map((c, i) => ({ c, i }))
      .sort((a, b) => freqOf(b.c) - freqOf(a.c) || a.i - b.i)
      .map((x) => x.c);
  }
  function badgeHtml(card) {
    const f = freqOf(card);
    if (!f) return "";
    const t = tierOf(card);
    const label = t ? ["", "低", "中", "高"][t] + " · " : "";
    return `<span class="freq-badge tier-${t || 0}">${label}★${f}</span>`;
  }

  /* 聚合章（公式全表）：汇集全部考研模块卡片，不复制数据，进度共享 */
  function masterPairs() {
    const out = [];
    for (const m of modules()) {
      if (m.virtual || m.id === "mschool") continue;
      for (const c of m.cards) out.push({ moduleId: m.id, card: c });
    }
    return out;
  }
  function pairsOf(m) {
    return m.virtual ? masterPairs() : m.cards.map((c) => ({ moduleId: m.id, card: c }));
  }
  function cardsOf(m) {
    return m.virtual ? masterPairs().map((p) => p.card) : m.cards;
  }
  function sortPairsByFreq(list) {
    return list
      .map((p, i) => ({ p, i }))
      .sort((a, b) => freqOf(b.p.card) - freqOf(a.p.card) || a.i - b.i)
      .map((x) => x.p);
  }

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
    } catch {
      return {};
    }
  }
  function saveProgress(p) {
    localStorage.setItem(STORE_KEY, JSON.stringify(p));
  }
  function cardKey(moduleId, cardId) {
    return moduleId + ":" + cardId;
  }
  function getStat(moduleId, cardId) {
    const p = loadProgress();
    return p[cardKey(moduleId, cardId)] || { box: 0, due: 0, seen: false };
  }
  function setStat(moduleId, cardId, patch) {
    const p = loadProgress();
    const k = cardKey(moduleId, cardId);
    p[k] = Object.assign({ box: 0, due: 0, seen: false }, p[k], patch);
    saveProgress(p);
  }
  function rate(moduleId, cardId, box) {
    setStat(moduleId, cardId, {
      box,
      seen: true,
      due: Date.now() + BOX_WAIT[box],
    });
  }

  function moduleStats(id) {
    const m = findModule(id);
    const pairs = pairsOf(m);
    const total = pairs.length;
    let known = 0;
    let due = 0;
    const now = Date.now();
    for (const p of pairs) {
      const s = getStat(p.moduleId, p.card.id);
      if (s.seen && s.box === 2) known += 1;
      if (s.seen && s.due <= now) due += 1;
    }
    return { total, known, due, pct: total ? Math.round((known / total) * 100) : 0 };
  }
  function dueList() {
    const now = Date.now();
    return allCards().filter(({ moduleId, card }) => {
      const s = getStat(moduleId, card.id);
      return s.seen && s.due <= now;
    });
  }
  function unseenList() {
    return allCards().filter(({ moduleId, card }) => !getStat(moduleId, card.id).seen);
  }
  function todayCount() {
    const due = dueList();
    if (due.length) return due.length;
    return Math.min(7, unseenList().length);
  }

  function tex(src, display) {
    if (!window.katex || !src) return src || "";
    try {
      return katex.renderToString(src, { displayMode: !!display, throwOnError: false });
    } catch {
      return src;
    }
  }
  function holeCount(card) {
    return (card && card.holes && card.holes.length) || 0;
  }
  function activeHide(card) {
    const n = holeCount(card);
    if (!n) return 0;
    return Math.min(Math.max(1, state.hideCount), n);
  }
  function clozeComplete(card) {
    if (!card || card.kind !== "cloze") return state.level >= 1;
    const n = activeHide(card);
    if (!n) return state.level >= 1;
    if (state.level >= 1) return true;
    for (let i = 1; i <= n; i++) {
      if (!state.opened.includes(i)) return false;
    }
    return true;
  }
  function resetCloze() {
    state.level = 0;
    state.opened = [];
    state.toast = "";
  }
  function renderMaskLine(line, card, done) {
    const nHide = activeHide(card);
    const parts = String(line).split(/(\{\{\d+\}\})/g);
    const inner = parts
      .map((part) => {
        if (!part) return "";
        const m = part.match(/^\{\{(\d+)\}\}$/);
        if (!m) return `<span class="cloze-tex">${tex(part, false)}</span>`;
        const idx = Number(m[1]);
        const ans = card.holes[idx - 1];
        if (!ans) return "";
        const hide = idx <= nHide;
        const open = done || state.opened.includes(idx);
        if (!hide || open) {
          return `<span class="hole-ans">${tex(ans, false)}</span>`;
        }
        return `<button class="hole" type="button" data-act="hole" data-i="${idx}">第${idx}空</button>`;
      })
      .join("");
    return `<div class="cloze-line">${inner}</div>`;
  }
  function renderClozeBody(card) {
    const done = clozeComplete(card);
    const lines = card.mask && card.mask.length ? card.mask : null;
    if (!lines) {
      return done ? blocks(card.reveal) : `<div class="blank">先想公式，再揭晓</div>`;
    }
    return `<div class="cloze-stack">${lines.map((ln) => renderMaskLine(ln, card, done)).join("")}</div>`;
  }
  function renderDiffBar(card) {
    if (!card || card.kind !== "cloze" || !holeCount(card)) return "";
    const n = holeCount(card);
    const cur = activeHide(card);
    const half = Math.max(1, Math.ceil(n / 2));
    const four = Math.min(4, n);
    const quick = [];
    quick.push(`<button type="button" data-act="hide-n" data-n="1" class="${cur === 1 ? "active" : ""}">1空</button>`);
    if (n >= 4) {
      quick.push(`<button type="button" data-act="hide-n" data-n="${four}" class="${cur === four ? "active" : ""}">4空</button>`);
    }
    if (n > 2 && half !== 1 && half !== four && half !== n) {
      quick.push(`<button type="button" data-act="hide-n" data-n="${half}" class="${cur === half ? "active" : ""}">半挖</button>`);
    }
    if (n > 1) {
      quick.push(`<button type="button" data-act="hide-n" data-n="${n}" class="${cur === n ? "active" : ""}">全挖</button>`);
    }
    return `<div class="diff-bar">
      <span class="diff-edge">易</span>
      <button type="button" class="diff-step" data-act="hide-dec"${cur <= 1 ? " disabled" : ""}>−</button>
      <span class="diff-count">挖 ${cur} / ${n}</span>
      <button type="button" class="diff-step" data-act="hide-inc"${cur >= n ? " disabled" : ""}>+</button>
      <span class="diff-edge">难</span>
    </div>
    <div class="diff-quick">${quick.join("")}</div>
    <p class="diff-caption">先少挖，熟了用 + 或「4空 / 全挖」加空</p>`;
  }
  function blocks(arr) {
    return (arr || [])
      .map((b) => `<div class="math">${tex(b.tex, b.display !== false)}</div>`)
      .join("");
  }
  function notes(list) {
    if (!list || !list.length) return "";
    return `<ul class="notes">${list.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>`;
  }
  function esc(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function goHome() {
    state.screen = "home";
    state.moduleId = null;
    state.panel = null;
    render();
  }
  function openModule(id, mode) {
    state.screen = "module";
    state.moduleId = id;
    state.mode = mode || "sheet";
    state.idx = 0;
    resetCloze();
    state.panel = null;
    render();
  }
  function startToday() {
    const due = dueList();
    let q = due;
    if (!q.length) {
      const byMod = {};
      for (const item of unseenList()) {
        if (!byMod[item.moduleId]) byMod[item.moduleId] = item;
      }
      q = Object.values(byMod);
      if (!q.length) q = unseenList().slice(0, 7);
    }
    state.screen = "today";
    state.queue = q;
    state.idx = 0;
    resetCloze();
    state.panel = null;
    render();
  }

  function currentDrill() {
    if (state.screen === "today") {
      const item = state.queue[state.idx];
      if (!item) return null;
      return { moduleId: item.moduleId, card: item.card, total: state.queue.length };
    }
    const m = findModule(state.moduleId);
    if (!m) return null;
    const kind = state.mode === "quiz" ? "example" : "cloze";
    const sorted = sortPairsByFreq(pairsOf(m).filter((p) => p.card.kind === kind));
    const item = sorted[state.idx];
    if (!item) return null;
    return { moduleId: item.moduleId, card: item.card, total: sorted.length };
  }

  function maxLevel(card) {
    return card.kind === "example" ? 3 : 1;
  }

  function afterRate() {
    const cur = currentDrill();
    if (!cur) return;
    if (state.screen === "today") {
      if (state.idx + 1 >= state.queue.length) {
        state.idx = state.queue.length;
      } else {
        state.idx += 1;
        resetCloze();
      }
    } else {
      const next = state.idx + 1;
      if (next < cur.total) {
        state.idx = next;
        resetCloze();
      } else {
        state.idx = 0;
        resetCloze();
        state.toast = "本组过完一遍，可继续或换模块";
      }
    }
    render();
  }

  function renderTop(extra) {
    const n = todayCount();
    return `
      <header class="topbar">
        <button class="icon-btn" data-act="home" title="首页">⌂</button>
        <div class="brand">
          <strong>${esc(MATH2_DATA.title)}</strong>
          <span>${esc(MATH2_DATA.subtitle)}</span>
        </div>
        <div class="grow"></div>
        ${extra || ""}
        <button class="today-chip" data-act="today">今日 <em>${n}</em></button>
        <button class="icon-btn" data-act="menu" title="设置">⋯</button>
      </header>`;
  }

  function renderHome() {
    const cards = modules()
      .map((m) => {
        const s = moduleStats(m.id);
        return `
          <button class="mod-card${m.soft ? " mod-soft" : ""}" data-act="mod" data-id="${m.id}">
            <div class="no">${esc(m.no)} · ${esc(m.exam)}</div>
            <h3>${esc(m.name)}</h3>
            <p class="blurb">${esc(m.blurb)}</p>
            <div class="bar"><i style="--p:${s.pct}%"></i></div>
            <div class="meta"><span>会了 ${s.known}/${s.total}</span><span>${s.pct}%</span></div>
          </button>`;
      })
      .join("");
    return `
      ${renderTop()}
      <div class="wrap">
        <div class="hero">
          <h1>十件套</h1>
          <p>速查公式 · 挖空背诵 · 例题自测。徽章里 ★ 是考频，低/中/高是难度档；进度存在这台手机的浏览器里。</p>
          <div class="skip-note">数二不考：${esc(MATH2_DATA.skip)}</div>
          ${IS_WECHAT ? `<p class="wechat-tip">点右上角 ··· 收藏，下次从收藏打开。清微信缓存会丢进度，重要进度请在「设置」里复制出来。</p>` : ""}
        </div>
        <div class="cta-row">
          <button class="btn btn-gold" data-act="today">开始今日复习</button>
          <button class="btn btn-ghost" data-act="mod" data-id="limit">从极限进入</button>
        </div>
        <div class="grid-7">${cards}</div>
      </div>`;
  }

  function sideHtml(activeId) {
    return `<nav class="side">${modules()
      .map((m) => {
        const s = moduleStats(m.id);
        return `<button data-act="mod" data-id="${m.id}" class="${m.id === activeId ? "active" : ""}">
          <span>${esc(m.no)} ${esc(m.name)}</span><span>${s.known}/${s.total}</span>
        </button>`;
      })
      .join("")}</nav>`;
  }

  function modeSeg() {
    const items = [
      ["sheet", "速查"],
      ["cloze", "挖空"],
      ["quiz", "例题"],
    ];
    return `<div class="seg">${items
      .map(
        ([id, label]) =>
          `<button data-act="mode" data-mode="${id}" class="${state.mode === id ? "active" : ""}">${label}</button>`
      )
      .join("")}</div>`;
  }

  function sheetCardHtml(c) {
    if (c.kind === "cloze") {
      return `<section class="sheet-block">
        <h3>${esc(c.title)}${badgeHtml(c)}</h3>
        ${c.hint ? `<p class="muted">${esc(c.hint)}</p>` : ""}
        ${blocks(c.reveal)}
        ${notes(c.notes)}
        ${c.warning ? `<div class="warn">${esc(c.warning)}</div>` : ""}
      </section>`;
    }
    return `<section class="sheet-block">
      <h3>例 · ${esc(c.title)}${badgeHtml(c)}</h3>
      <details class="ex-box" open>
        <summary>题干与答案</summary>
        <div class="math">${tex(c.problem, true)}</div>
        <p class="muted">思路：${esc(c.idea)}</p>
        ${c.steps.map((s) => `<div class="step">${tex(s.tex, true)}</div>`).join("")}
        <div class="answer-line">答案 ${tex(c.answer, false)}</div>
      </details>
    </section>`;
  }

  function renderSheet(m) {
    const all = cardsOf(m);
    const anyTier = all.some((c) => tierOf(c));
    if (!anyTier) return `<div class="panel">${all.map(sheetCardHtml).join("")}</div>`;
    const sorted = all
      .map((c, i) => ({ c, i }))
      .sort((a, b) => tierOf(a.c) - tierOf(b.c) || freqOf(b.c) - freqOf(a.c) || a.i - b.i)
      .map((x) => x.c);
    let html = "";
    let lastTier = null;
    for (const c of sorted) {
      const t = tierOf(c);
      if (t !== lastTier) {
        html += `<h2 class="tier-head tier-${t || 0}">${TIER_NAMES[t] || "其他"}</h2>`;
        lastTier = t;
      }
      html += sheetCardHtml(c);
    }
    return `<div class="panel">${html}</div>`;
  }

  function renderDrillView(titlePrefix) {
    const cur = currentDrill();
    if (!cur || !cur.card) {
      return `<div class="panel done">
        <h2>今日已清完</h2>
        <p class="muted">没有到期卡片。可以进模块加练，或等间隔重复再来。</p>
        <div class="cta-row" style="justify-content:center">
          <button class="btn btn-gold" data-act="home">回首页</button>
        </div>
      </div>`;
    }
    const { card, moduleId, total } = cur;
    const m = findModule(moduleId);
    const lv = state.level;
    const full = card.kind === "cloze" ? clozeComplete(card) : lv >= maxLevel(card);
    let body = "";
    if (card.kind === "cloze") {
      body = `
        ${renderDiffBar(card)}
        <p class="muted">${esc(card.hint || "")}</p>
        ${renderClozeBody(card)}
        ${full ? notes(card.notes) : ""}
        ${full && card.warning ? `<div class="warn">${esc(card.warning)}</div>` : ""}`;
    } else {
      body = `
        <div class="problem">${tex(card.problem, true)}</div>
        ${lv >= 1 ? `<p class="muted">思路：${esc(card.idea)}</p>` : ""}
        ${lv >= 2 ? `<div class="reveal-stack">${card.steps.map((s) => `<div class="step">${tex(s.tex, true)}</div>`).join("")}</div>` : ""}
        ${lv >= 3 ? `<div class="answer-line">答案 ${tex(card.answer, false)}</div>` : ""}`;
    }
    const nextLabel =
      card.kind === "cloze"
        ? "揭晓空缺"
        : ["看思路", "看步骤", "看答案"][lv] || "";
    const actions = full
      ? `<div class="actions rate">
          <button class="btn btn-rose" data-act="rate" data-box="0">不会</button>
          <button class="btn btn-warn" data-act="rate" data-box="1">模糊</button>
          <button class="btn btn-ok" data-act="rate" data-box="2">会了</button>
        </div>
        <p class="kbd">电脑快捷键：<kbd>空格</kbd> 揭晓 · <kbd>1</kbd> 不会 · <kbd>2</kbd> 模糊 · <kbd>3</kbd> 会了</p>`
      : `<div class="actions">
          <button class="btn btn-gold" data-act="reveal">${nextLabel}</button>
        </div>`;
    return `<div class="panel">
      <div class="drill-head">
        <h2>${esc(card.title)}${badgeHtml(card)}</h2>
        <span class="pill">${esc(m.name)} · ${state.idx + 1}/${total}</span>
      </div>
      ${body}
      ${actions}
      ${state.toast ? `<p class="muted">${esc(state.toast)}</p>` : ""}
    </div>`;
  }

  function renderModule() {
    const m = findModule(state.moduleId);
    if (!m) return renderHome();
    const inner = state.mode === "sheet" ? renderSheet(m) : renderDrillView();
    return `
      ${renderTop()}
      <div class="wrap">
        <div class="layout has-side">
          ${sideHtml(m.id)}
          <div class="main-col">
            <div class="hero" style="padding-top:0">
              <h1 style="font-size:24px">${esc(m.no)}、${esc(m.name)}</h1>
              <p>${esc(m.exam)} · ${esc(m.blurb)}</p>
            </div>
            ${modeSeg()}
            ${inner}
          </div>
        </div>
      </div>`;
  }

  function renderToday() {
    return `
      ${renderTop()}
      <div class="wrap">
        <div class="hero">
          <h1>今日复习</h1>
          <p>到期卡片优先；第一次会每模块抽 1 张入门。</p>
        </div>
        ${renderDrillView()}
      </div>`;
  }

  function renderMenu() {
    if (!state.panel) return "";
    if (state.panel === "export") {
      return `<div class="modal-bg" data-act="close-menu">
        <div class="modal" data-stop="1">
          <h3>复制进度</h3>
          <p class="muted">微信里不能直接下载文件。全选复制下面内容，发给自己或备忘录。</p>
          <textarea class="copy-box" id="progress-box" readonly>${esc(state.draftText)}</textarea>
          <div class="row" style="margin-top:10px">
            <button class="btn btn-gold" data-act="copy-progress">复制</button>
            <button class="btn btn-ghost" data-act="close-menu">关闭</button>
          </div>
          ${state.toast ? `<p class="muted">${esc(state.toast)}</p>` : ""}
        </div>
      </div>`;
    }
    if (state.panel === "import") {
      return `<div class="modal-bg" data-act="close-menu">
        <div class="modal" data-stop="1">
          <h3>粘贴进度</h3>
          <p class="muted">把以前复制的 JSON 粘贴进来。</p>
          <textarea class="copy-box" id="import-box" placeholder="{ ... }">${esc(state.draftText)}</textarea>
          <div class="row" style="margin-top:10px">
            <button class="btn btn-gold" data-act="apply-import">导入</button>
            <button class="btn btn-ghost" data-act="close-menu">取消</button>
          </div>
        </div>
      </div>`;
    }
    return `<div class="modal-bg" data-act="close-menu">
      <div class="modal" data-stop="1">
        <h3>进度</h3>
        <p class="muted">${IS_WECHAT ? "进度存在微信里。换手机或清缓存会丢失，可先复制出来。" : "记忆箱存在本机。换浏览器或清缓存会丢失，可先导出。"}</p>
        <div class="row">
          <button class="btn btn-ghost" data-act="export">复制进度</button>
          <button class="btn btn-ghost" data-act="import">粘贴导入</button>
          <button class="btn btn-rose" data-act="reset">清空进度</button>
        </div>
      </div>
    </div>`;
  }

  function renderBottom() {
    const tab = state.screen;
    return `<nav class="bottom">
      <button data-act="home" class="${tab === "home" ? "active" : ""}"><span class="dot"></span>模块</button>
      <button data-act="today" class="${tab === "today" ? "active" : ""}"><span class="dot"></span>今日</button>
      <button data-act="menu" class=""><span class="dot"></span>设置</button>
    </nav>`;
  }

  function render() {
    const root = document.getElementById("app");
    let html = "";
    if (state.screen === "home") html = renderHome();
    else if (state.screen === "today") html = renderToday();
    else html = renderModule();
    root.innerHTML = html + renderMenu() + renderBottom();
  }

  function copyText(text) {
    const done = () => {
      state.toast = "已复制";
      render();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done).catch(() => fallbackCopy(text, done));
    } else {
      fallbackCopy(text, done);
    }
  }
  function fallbackCopy(text, done) {
    const box = document.getElementById("progress-box") || document.createElement("textarea");
    if (!box.id) {
      box.value = text;
      document.body.appendChild(box);
    }
    box.focus();
    box.select();
    try {
      document.execCommand("copy");
      done();
    } catch {
      state.toast = "请长按文本手动复制";
      render();
    }
  }

  function exportProgress() {
    state.panel = "export";
    state.draftText = JSON.stringify(loadProgress(), null, 2);
    state.toast = "";
    render();
    setTimeout(() => {
      const box = document.getElementById("progress-box");
      if (box) {
        box.focus();
        box.select();
      }
    }, 50);
  }
  function importProgress() {
    state.panel = "import";
    state.draftText = "";
    render();
  }
  function applyImport() {
    const box = document.getElementById("import-box");
    const raw = (box && box.value) || state.draftText || "";
    try {
      const obj = JSON.parse(raw);
      saveProgress(obj);
      state.panel = null;
      render();
    } catch {
      alert("不是有效进度，请检查粘贴内容");
    }
  }

  document.addEventListener("click", (e) => {
    const bg = e.target.closest(".modal-bg");
    if (bg && !e.target.closest("[data-stop]")) {
      state.panel = null;
      render();
      return;
    }
    const el = e.target.closest("[data-act]");
    if (!el) return;
    const act = el.dataset.act;
    if (act === "home") goHome();
    else if (act === "today") startToday();
    else if (act === "mod") openModule(el.dataset.id, state.screen === "module" ? state.mode : "sheet");
    else if (act === "mode") {
      state.mode = el.dataset.mode;
      state.idx = 0;
      resetCloze();
      render();
    } else if (act === "hide-n") {
      state.hideCount = Number(el.dataset.n);
      saveSettings({ hideCount: state.hideCount });
      resetCloze();
      render();
    } else if (act === "hide-dec" || act === "hide-inc") {
      const cur = currentDrill();
      if (!cur || cur.card.kind !== "cloze") return;
      const n = holeCount(cur.card);
      const now = activeHide(cur.card);
      const next = act === "hide-inc" ? Math.min(n, now + 1) : Math.max(1, now - 1);
      state.hideCount = next;
      saveSettings({ hideCount: next });
      resetCloze();
      render();
    } else if (act === "hole") {
      const i = Number(el.dataset.i);
      if (!state.opened.includes(i)) state.opened.push(i);
      render();
    } else if (act === "reveal") {
      const cur = currentDrill();
      if (cur) {
        if (cur.card.kind === "cloze") {
          state.level = 1;
          const n = activeHide(cur.card);
          state.opened = Array.from({ length: n }, (_, k) => k + 1);
        } else {
          state.level = Math.min(state.level + 1, maxLevel(cur.card));
        }
      }
      render();
    } else if (act === "rate") {
      const cur = currentDrill();
      if (!cur) return;
      rate(cur.moduleId, cur.card.id, Number(el.dataset.box));
      state.toast = "";
      afterRate();
    } else if (act === "menu") {
      state.panel = state.panel === "menu" ? null : "menu";
      render();
    } else if (act === "close-menu") {
      state.panel = null;
      render();
    } else if (act === "export") exportProgress();
    else if (act === "import") importProgress();
    else if (act === "copy-progress") copyText(state.draftText);
    else if (act === "apply-import") applyImport();
    else if (act === "reset") {
      if (confirm("清空本机全部记忆进度？")) {
        localStorage.removeItem(STORE_KEY);
        state.panel = null;
        render();
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (state.screen === "home" || (state.screen === "module" && state.mode === "sheet")) return;
    if (e.target.closest("input, textarea")) return;
    const cur = currentDrill();
    if (!cur) return;
    if (e.code === "Space") {
      e.preventDefault();
      if (cur.card.kind === "cloze") {
        if (!clozeComplete(cur.card)) {
          state.level = 1;
          const n = activeHide(cur.card);
          state.opened = Array.from({ length: n }, (_, k) => k + 1);
          render();
        }
      } else if (state.level < maxLevel(cur.card)) {
        state.level += 1;
        render();
      }
    } else if (
      (cur.card.kind === "cloze" ? clozeComplete(cur.card) : state.level >= maxLevel(cur.card)) &&
      ["1", "2", "3"].includes(e.key)
    ) {
      rate(cur.moduleId, cur.card.id, Number(e.key) - 1);
      afterRate();
    }
  });

  function loadScript(src) {
    return new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = reject;
      document.head.appendChild(s);
    });
  }
  async function ensureKatex() {
    if (window.katex) return;
    const srcs = [
      "https://cdn.bootcdn.net/ajax/libs/KaTeX/0.16.9/katex.min.js",
      "https://unpkg.com/katex@0.16.9/dist/katex.min.js",
      "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js",
    ];
    for (const src of srcs) {
      try {
        await loadScript(src);
        if (window.katex) return;
      } catch (_) {}
    }
  }
  async function boot() {
    await ensureKatex();
    let n = 0;
    while ((!window.katex || !window.MATH2_DATA) && n < 80) {
      await new Promise((r) => setTimeout(r, 50));
      n += 1;
    }
    render();
  }
  boot();
})();
