const store = {
  get(key, fallback) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); } catch (e) { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }
};

const main = document.getElementById("main");
const nav = document.getElementById("nav");
const side = document.getElementById("side");
const scrim = document.getElementById("scrim");
const LETTERS = ["A", "B", "C", "D"];

// Şıkları her soru için sabit ama karışık sırada göstermek (doğru cevap hep aynı harfte olmasın).
function seededOrder(n, seed) {
  const idx = [...Array(n).keys()];
  let s = seed;
  for (let i = n - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280;
    const j = Math.floor((s / 233280) * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

function route() {
  const h = location.hash.replace("#", "") || "home";
  closeMenu();
  if (h.startsWith("hafta-")) renderWeek(Number(h.split("-")[1]));
  else if (h.startsWith("deneme-")) renderTest(Number(h.split("-")[1]));
  else if (h === "denemeler") renderTestList();
  else renderHome();
  renderNav(h);
  window.scrollTo(0, 0);
}

function renderNav(current) {
  const done = store.get("ag-done", []);
  const best = store.get("ag-best", {});
  let html = `<button data-go="home" class="${current === "home" ? "active" : ""}"><span class="num">⌂</span>Ana sayfa</button>`;
  html += `<div class="nav-group">Haftalar</div>`;
  for (const w of WEEKS) {
    const id = "hafta-" + w.id;
    html += `<button data-go="${id}" class="${current === id ? "active" : ""}"><span class="num">${w.id}</span><span>${w.title}</span>${done.includes(w.id) ? '<span class="done-dot">✓</span>' : ""}</button>`;
  }
  html += `<div class="nav-group">Vize denemeleri</div>`;
  html += `<button data-go="denemeler" class="${current === "denemeler" ? "active" : ""}"><span class="num">≡</span>Tüm denemeler</button>`;
  TESTS.forEach((t, i) => {
    const id = "deneme-" + (i + 1);
    const b = best[i + 1];
    html += `<button data-go="${id}" class="${current === id ? "active" : ""}"><span class="num">D${i + 1}</span><span>${t.title}</span>${b !== undefined ? `<span class="done-dot">${b}/${t.questions.length}</span>` : ""}</button>`;
  });
  nav.innerHTML = html;
}

function renderHome() {
  const done = store.get("ag-done", []);
  main.innerHTML = `
    <div class="eyebrow">BSM 451 · Sakarya Üniversitesi · Dr. Öğr. Üyesi Musa Balta</div>
    <h1>Ağ Programlama vize rehberi</h1>
    <p class="lead">1–5. haftaların özetleri, başlık yapıları, derste verilen C kodlarının bayt bayt açıklaması ve sonunda ${TESTS.length} vize denemesi. Her haftayı bitirince "Bu haftayı tamamladım" de; ilerlemen bu tarayıcıda saklanır.</p>
    <div class="card"><b>İlerleme:</b> ${done.length} / ${WEEKS.length} hafta tamamlandı</div>
    <h2>Haftalar</h2>
    <div class="week-grid">
      ${WEEKS.map(w => `
        <button class="week-card" data-go="hafta-${w.id}">
          <div class="wk">HAFTA ${w.id} ${done.includes(w.id) ? "· ✓" : ""}</div>
          <div class="tt">${w.title}</div>
          <div class="ds">${w.short}</div>
        </button>`).join("")}
    </div>
    <h2>Önerilen çalışma planı</h2>
    <ol>
      <li>Her haftanın özetini oku; başlık tablolarını (Ethernet, ARP, IP, ICMP, TCP, UDP) kâğıda alan alan çiz.</li>
      <li>"Elle örnek" kutularındaki fragmantasyon, checksum ve sıra/onay numarası hesaplarını kendin çöz.</li>
      <li>2. ve 3. haftadaki C kodlarının bayt tablolarını incele: hangi bayt hangi alana yazılıyor?</li>
      <li>Deneme 1–2 kavramları, Deneme 3 başlık ve bayt sorularını, Deneme 4 hesapları, Deneme 5 genel provayı ölçer.</li>
    </ol>
    <div class="box tip"><span class="label">Sınavda en çok karıştırılanlar</span>
      EtherType ARP 0x0806, IP 0x0800 · ARP opcode 1 istek, 2 cevap · IP başlığı 20–60 bayt, offset 8 baytlık birim · M biti son parçada 0 · ICMP echo istek 8, cevap 0 · TCP başlığı 20–60 bayt, UDP 8 bayt · SYN ve FIN 1 sıra numarası tüketir · ACK = beklenen sonraki bayt · listen/accept yalnızca TCP sunucusunda · sendto/recvfrom UDP'de · ağ bayt sırası her zaman big-endian.
    </div>
    <p><button class="btn primary" data-go="hafta-1">1. haftadan başla →</button> <button class="btn" data-go="denemeler">Denemelere git</button></p>
  `;
}

function renderWeek(id) {
  const w = WEEKS.find(x => x.id === id);
  if (!w) return renderHome();
  const done = store.get("ag-done", []);
  const isDone = done.includes(id);
  const prev = WEEKS.find(x => x.id === id - 1);
  const next = WEEKS.find(x => x.id === id + 1);
  main.innerHTML = `
    <div class="eyebrow">Hafta ${w.id}</div>
    <h1>${w.title}</h1>
    <div class="box key"><span class="label">🧩 Haftanın ilkesi</span>${w.principle}</div>
    ${w.body}
    <button class="btn ${isDone ? "" : "primary"} mark-done" id="markDone">${isDone ? "✓ Tamamlandı (geri al)" : "Bu haftayı tamamladım"}</button>
    <div class="pager">
      ${prev ? `<button class="btn" data-go="hafta-${prev.id}">← Hafta ${prev.id}</button>` : "<span></span>"}
      ${next ? `<button class="btn primary" data-go="hafta-${next.id}">Hafta ${next.id} →</button>` : `<button class="btn primary" data-go="denemeler">Vize denemelerine geç →</button>`}
    </div>
  `;
  document.getElementById("markDone").onclick = () => {
    const d = store.get("ag-done", []);
    store.set("ag-done", d.includes(id) ? d.filter(x => x !== id) : [...d, id]);
    renderWeek(id);
    renderNav("hafta-" + id);
  };
}

function renderTestList() {
  const best = store.get("ag-best", {});
  main.innerHTML = `
    <div class="eyebrow">Vize denemeleri</div>
    <h1>${TESTS.length} deneme, ${TESTS.reduce((s, t) => s + t.questions.length, 0)} soru</h1>
    <p class="lead">Her deneme 1–5. haftaları karışık sorar. Şıkka tıkladığın anda doğru cevap ve açıklaması görünür.</p>
    <div class="test-list">
      ${TESTS.map((t, i) => `
        <div class="test-row">
          <button class="btn" data-go="deneme-${i + 1}"><b>${t.title}</b> — <span class="quiz-meta">${t.desc}</span></button>
          <span class="best">${best[i + 1] !== undefined ? "En iyi: " + best[i + 1] + "/" + t.questions.length : "—"}</span>
        </div>`).join("")}
    </div>
  `;
}

function renderTest(n) {
  const t = TESTS[n - 1];
  if (!t) return renderTestList();
  const answers = {};
  const total = t.questions.length;

  main.innerHTML = `
    <div class="eyebrow">Vize denemesi ${n}</div>
    <h1>${t.title}</h1>
    <p class="quiz-meta">${t.desc} · ${total} soru · Her soruda tek doğru cevap var.</p>
    <div class="score-bar">
      <span class="pill" id="progress">0 / ${total} cevaplandı</span>
      <span class="pill" id="score">Doğru: 0</span>
      <button class="btn" id="resetBtn">Baştan başla</button>
    </div>
    <div id="qs"></div>
    <div id="result"></div>
    <div class="pager">
      ${n > 1 ? `<button class="btn" data-go="deneme-${n - 1}">← Deneme ${n - 1}</button>` : `<button class="btn" data-go="denemeler">← Tüm denemeler</button>`}
      ${n < TESTS.length ? `<button class="btn primary" data-go="deneme-${n + 1}">Deneme ${n + 1} →</button>` : `<button class="btn" data-go="denemeler">Tüm denemeler</button>`}
    </div>
  `;

  const qs = document.getElementById("qs");
  t.questions.forEach((q, qi) => {
    const order = seededOrder(q.o.length, n * 100 + qi + 7);
    const el = document.createElement("div");
    el.className = "q";
    el.innerHTML = `
      <div class="q-head"><span class="q-num">${qi + 1}.</span><span class="q-text">${q.q}</span><span class="q-week">Hafta ${q.w}</span></div>
      <div class="opts">${order.map((oi, pos) => `<button class="opt" data-oi="${oi}"><span class="letter">${LETTERS[pos]})</span><span>${q.o[oi]}</span></button>`).join("")}</div>
      <div class="explain" hidden></div>
    `;
    el.querySelectorAll(".opt").forEach(btn => {
      btn.onclick = () => {
        if (answers[qi] !== undefined) return;
        const chosen = Number(btn.dataset.oi);
        answers[qi] = chosen;
        el.querySelectorAll(".opt").forEach(b => {
          b.disabled = true;
          const oi = Number(b.dataset.oi);
          if (oi === q.a) b.classList.add("correct");
          else if (oi === chosen) b.classList.add("wrong");
        });
        const ex = el.querySelector(".explain");
        ex.hidden = false;
        ex.innerHTML = `<b>${chosen === q.a ? "✓ Doğru." : "✗ Yanlış."}</b> ${q.e}`;
        update();
      };
    });
    qs.appendChild(el);
  });

  function update() {
    const answered = Object.keys(answers).length;
    const correct = Object.entries(answers).filter(([qi, a]) => t.questions[qi].a === a).length;
    document.getElementById("progress").textContent = `${answered} / ${total} cevaplandı`;
    document.getElementById("score").textContent = `Doğru: ${correct}`;
    if (answered === total) {
      const best = store.get("ag-best", {});
      if (best[n] === undefined || correct > best[n]) { best[n] = correct; store.set("ag-best", best); }
      const wrongWeeks = [...new Set(t.questions.filter((q, i) => answers[i] !== q.a).map(q => q.w))].sort();
      document.getElementById("result").innerHTML = `
        <div class="card result">
          <div class="big">${correct} / ${total}</div>
          <div>Puan: ${Math.round((correct / total) * 100)}</div>
          ${wrongWeeks.length ? `<p>Tekrar etmen önerilen haftalar: ${wrongWeeks.map(w => `<a href="#hafta-${w}">Hafta ${w}</a>`).join(" · ")}</p>` : "<p>Hepsi doğru, tebrikler! 🎉</p>"}
        </div>`;
      renderNav("deneme-" + n);
    }
  }

  document.getElementById("resetBtn").onclick = () => renderTest(n);
}

document.addEventListener("click", e => {
  const go = e.target.closest("[data-go]");
  if (go) { e.preventDefault(); location.hash = go.dataset.go; }
});

function closeMenu() { side.classList.remove("open"); scrim.classList.remove("show"); }
document.getElementById("menuBtn").onclick = () => { side.classList.add("open"); scrim.classList.add("show"); };
scrim.onclick = closeMenu;

document.getElementById("themeBtn").onclick = () => {
  const root = document.documentElement;
  const isDark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = isDark ? "light" : "dark";
  store.set("vm-theme", root.dataset.theme);
};

window.addEventListener("hashchange", route);
route();
