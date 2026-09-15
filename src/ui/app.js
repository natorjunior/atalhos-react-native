// Camada de UI: só manipula o DOM e delega toda a lógica para os services.
(function () {
  const snippetsService = window.App.services.SnippetsService;
  const highlightService = window.App.services.CodeHighlightService;
  const snackEmbedService = window.App.services.SnackEmbedService;

  const searchInput = document.getElementById("search-input");
  const categoriesEl = document.getElementById("categories");
  const listEl = document.getElementById("cards-list");
  const emptyStateEl = document.getElementById("empty-state");
  const toastEl = document.getElementById("toast");

  let activeCategory = "Todos";
  let query = "";
  let toastTimeout;

  function renderCategories() {
    const categories = snippetsService.getCategories();
    categoriesEl.innerHTML = categories
      .map(
        (cat) => `
        <button class="chip ${cat === activeCategory ? "active" : ""}" data-category="${cat}">
          ${cat}
        </button>`
      )
      .join("");

    categoriesEl.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        activeCategory = chip.dataset.category;
        renderCategories();
        renderCards();
      });
    });
  }

  function renderCards() {
    const filtered = snippetsService.search({ category: activeCategory, query });

    emptyStateEl.hidden = filtered.length !== 0;
    listEl.hidden = filtered.length === 0;

    listEl.innerHTML = filtered
      .map((s) => {
        const snackId = snippetsService.getSnackId(s.id);
        return `
        <article class="item">
          <div class="item-header">
            <h2 class="item-title">${s.title}</h2>
            <span class="item-category">${s.category}</span>
          </div>
          <div class="code-window">
            <div class="code-window-header">
              <span class="code-dots"><i></i><i></i><i></i></span>
              <span class="code-lang">${s.lang}</span>
              <button class="copy-btn" data-id="${s.id}">Copiar</button>
            </div>
            <pre class="code-block"><code>${highlightService.highlight(s.code, s.lang)}</code></pre>
            <div class="snack-row">
              <input
                class="snack-input"
                type="text"
                data-id="${s.id}"
                placeholder="ID do Snack (ex: @usuario/nome-do-snack)"
                value="${highlightService.escapeHtml(snackId)}"
              >
              <button class="snack-toggle" data-id="${s.id}" ${snackId ? "" : "disabled"}>
                Mostrar preview
              </button>
            </div>
            <div class="snack-embed" data-id="${s.id}" hidden>
              <div
                class="snack-embed-target"
                data-snack-id="${highlightService.escapeHtml(snackId)}"
                data-snack-platform="web"
                data-snack-preview="true"
                data-snack-theme="light"
              ></div>
            </div>
          </div>
        </article>`;
      })
      .join("");

    listEl.querySelectorAll(".copy-btn").forEach((btn) => {
      btn.addEventListener("click", () => handleCopy(btn));
    });

    listEl.querySelectorAll(".snack-input").forEach((input) => {
      input.addEventListener("change", () => handleSnackSave(input));
    });

    listEl.querySelectorAll(".snack-toggle").forEach((btn) => {
      btn.addEventListener("click", () => handleSnackToggle(btn));
    });
  }

  function handleSnackSave(input) {
    const { id } = input.dataset;
    const snackId = snippetsService.saveSnackId(id, input.value);
    input.value = snackId;

    const embedTarget = listEl.querySelector(`.snack-embed[data-id="${id}"] .snack-embed-target`);
    const toggleBtn = listEl.querySelector(`.snack-toggle[data-id="${id}"]`);
    if (embedTarget) embedTarget.dataset.snackId = snackId;
    if (toggleBtn) toggleBtn.disabled = !snackId;
  }

  function handleSnackToggle(btn) {
    const { id } = btn.dataset;
    const embedRow = listEl.querySelector(`.snack-embed[data-id="${id}"]`);
    if (!embedRow) return;

    const showing = embedRow.hidden;
    embedRow.hidden = !showing;
    btn.textContent = showing ? "Ocultar preview" : "Mostrar preview";

    if (showing) snackEmbedService.loadEmbedScript();
  }

  async function handleCopy(btn) {
    const snippet = snippetsService.search({}).find((s) => s.id === btn.dataset.id);
    if (!snippet) return;

    try {
      await navigator.clipboard.writeText(snippet.code);
    } catch (err) {
      // fallback para navegadores/contextos sem permissão de clipboard
      const textarea = document.createElement("textarea");
      textarea.value = snippet.code;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }

    const original = btn.textContent;
    btn.textContent = "Copiado!";
    btn.classList.add("copied");
    showToast();

    setTimeout(() => {
      btn.textContent = original;
      btn.classList.remove("copied");
    }, 1500);
  }

  function showToast() {
    clearTimeout(toastTimeout);
    toastEl.classList.add("show");
    toastTimeout = setTimeout(() => toastEl.classList.remove("show"), 1500);
  }

  searchInput.addEventListener("input", (e) => {
    query = e.target.value;
    renderCards();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "/" && document.activeElement !== searchInput) {
      e.preventDefault();
      searchInput.focus();
    }
  });

  renderCategories();
  renderCards();
})();
