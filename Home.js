(async () => {
  const { $,$$ } = window.modules;
  const res = await fetch('./videos.json');
  const datas = await res.json();

  const popular = [...datas].sort((a, b) => {
    const scoreA = a.likeCount * 100 + a.viewCount;
    const scoreB = b.likeCount * 100 + b.viewCount;
    return scoreB - scoreA;
  }).slice(0, 10);

  const likeCountHtml = popular.map(video => {
    return `
      <div class="listItem">
        <a href="${video.url}">${video.title}</a>
        <div class="like">${video.likeCount}</div>
        <div class="view">${video.viewCount}</div>
      </div>
    `;
  }).join('');

  $('#likeCount').innerHTML = likeCountHtml;
  $$('#likeCount > .listItem').forEach(el => window.observer.observe(el));
})();