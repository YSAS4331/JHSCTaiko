const mod = window.modules;

const search = mod.$('#search');
const searchBar = mod.$('#searchBar');

mod.chain(search)
  .on('focus', () => mod.add(searchBar, 'active'))
  .on('blur', () => mod.rmv(searchBar, 'active'))
  .on('keydown', e => {
    if (e.key !== 'Enter') return;
    // 検索結果画面へ
  });

// 記事のアニメーション
let animQueue = [];
let intervalID = null;

const animClass = () => {
  if (animQueue.length === 0) {
    clearInterval(intervalID);
    intervalID = null;
    return;
  }

  const { el } = animQueue.shift();
  requestAnimationFrame(() => mod.add(el, 'active'));
};

const pushQueue = (el, bool) => {
  if (bool) {
    animQueue.push({ el, bool });
  
    if (!intervalID) {
      intervalID = setInterval(animClass, 50);
    }
  } else {
    mod.rmv(el, 'active');
  }
};

window.observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    pushQueue(e.target, e.isIntersecting);
  });
}, { threshold: 0.2 });

mod.$$('.listItem').forEach(el => observer.observe(el));

// header テーマボタン
const themeBtn = mod.$('#theme');
let themeNum = 0;

const themeTexts = ["sun", "moon", "desktop"]; 
// sun = light, moon = dark, desktop = OS設定

mod.on('click', () => {
  themeBtn.classList.remove('change');

  // 次のテーマへ
  themeNum = (themeNum + 1) % themeTexts.length;

  // アイコン変更
  mod.$('i', themeBtn).className = `fa-solid fa-${themeTexts[themeNum]}`;

  // テーマ適用
  applyTheme(themeTexts[themeNum]);

  themeBtn.classList.add('change');
}, themeBtn);


// -------------------------
// テーマ適用関数
// -------------------------
function applyTheme(mode) {
  const html = mod.$('html', document);

  if (mode !== "desktop") {
    // sun / moon のときだけ toggle を使う
    html.classList.toggle('dark', mode === "moon");
    return;
  }

  // desktop = OS設定に従う
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.classList.toggle('dark', prefersDark);
}


// -------------------------
// OSテーマ変更時の自動追従
// -------------------------
const media = window.matchMedia('(prefers-color-scheme: dark)');

media.addEventListener('change', e => {
  // desktop モードのときだけ反映
  if (themeTexts[themeNum] === "desktop") {
    applyTheme("desktop");
  }
});
