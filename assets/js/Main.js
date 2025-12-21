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
