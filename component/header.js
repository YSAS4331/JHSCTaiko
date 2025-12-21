const { $, on } = window.modules;

class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header>
        <img src="https://i.imgur.com/8sDOFfu.jpeg" class="icon" style="height: 90%;">
        <div id="headerRight">
          <button id="setting">
            <i class="fa-solid fa-gear"></i>
          </button>
          <button id="theme">
            <i class="fa-solid fa-sun"></i>
          </button>
        </div>
      </header>
    `;
    // header テーマボタン
const themeBtn = $('#theme');
let themeNum = 0;

const themeTexts = ["sun", "moon", "desktop"]; 

on('click', () => {
  themeBtn.classList.remove('change');

  themeNum = (themeNum + 1) % themeTexts.length;

  const mode = themeTexts[themeNum];
  $('i', themeBtn).className = `fa-solid fa-${mode}`;

  applyTheme(mode);

  themeBtn.classList.add('change');
}, themeBtn);


// -------------------------
// テーマ適用関数
// -------------------------
function applyTheme(mode) {
  const html = $('html');

  if (mode !== "desktop") {
    html.classList.toggle('dark', mode === "moon");
  } else {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    html.classList.toggle('dark', prefersDark);
  }

  // ✅ どのモードでも保存
  localStorage.setItem('theme', mode);
}


// -------------------------
// OSテーマ変更時の自動追従
// -------------------------
const media = window.matchMedia('(prefers-color-scheme: dark)');

media.addEventListener('change', e => {
  if (themeTexts[themeNum] === "desktop") {
    $('html').classList.toggle('dark', e.matches);
  }
});


// -------------------------
// 初期ロード
// -------------------------
const saved = localStorage.getItem('theme');
if (saved) {
  themeNum = themeTexts.indexOf(saved);

  // アイコン同期
  $('i', themeBtn).className = `fa-solid fa-${saved}`;

  applyTheme(saved);
}
  }
}

customElements.define('com-header', Header);
