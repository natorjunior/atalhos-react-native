// Camada de service: apresentação de código (highlight) e embed do Expo Snack.
// Não acessa dados diretamente — trabalha só com o que recebe por parâmetro.
window.App = window.App || {};
window.App.services = window.App.services || {};

window.App.services.CodeHighlightService = (function () {
  const BASH_KEYWORDS = /\b(npx|npm|cd|install|run|start|init)\b/g;
  const JS_KEYWORDS = /\b(import|export|default|from|const|let|var|function|return|new|async|await|true|false|null)\b/g;

  function escapeHtml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function highlightKeywords(escapedChunk, lang) {
    const keywordRegex = lang === "bash" ? BASH_KEYWORDS : JS_KEYWORDS;
    return escapedChunk.replace(keywordRegex, '<span class="tok-keyword">$1</span>');
  }

  function highlight(code, lang) {
    const tokenPattern =
      lang === "bash"
        ? /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(--?[\w-]+)/gm
        : /(\/\/.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`)|(<\/?[A-Za-z][\w.]*)|(\{|\})/gm;

    let result = "";
    let lastIndex = 0;
    let match;

    while ((match = tokenPattern.exec(code)) !== null) {
      result += highlightKeywords(escapeHtml(code.slice(lastIndex, match.index)), lang);

      const [full, comment, string, tagOrFlag, brace] = match;
      if (comment) {
        result += `<span class="tok-comment">${escapeHtml(comment)}</span>`;
      } else if (string) {
        result += `<span class="tok-string">${escapeHtml(string)}</span>`;
      } else if (tagOrFlag) {
        const cls = lang === "bash" ? "tok-flag" : "tok-tag";
        result += `<span class="${cls}">${escapeHtml(tagOrFlag)}</span>`;
      } else if (brace) {
        result += `<span class="tok-punct">${escapeHtml(brace)}</span>`;
      }

      lastIndex = match.index + full.length;
    }

    result += highlightKeywords(escapeHtml(code.slice(lastIndex)), lang);
    return result;
  }

  return { escapeHtml, highlight };
})();

window.App.services.SnackEmbedService = (function () {
  // O script escaneia o DOM ao carregar; reinjetá-lo faz ele encontrar novos embeds.
  function loadEmbedScript() {
    document.getElementById("snack-embed-script")?.remove();
    const script = document.createElement("script");
    script.id = "snack-embed-script";
    script.async = true;
    script.src = "https://snack.expo.dev/embed.js";
    document.body.appendChild(script);
  }

  return { loadEmbedScript };
})();
