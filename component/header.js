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
  }
}

customElements.define('com-header', Header);
