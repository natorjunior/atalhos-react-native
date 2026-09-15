// Camada de service: regras de negócio sobre os atalhos (busca, filtros, categorias).
window.App = window.App || {};
window.App.services = window.App.services || {};

window.App.services.SnippetsService = (function () {
  const repository = window.App.repositories.SnippetsRepository;

  function getCategories() {
    const categories = new Set(repository.getAll().map((s) => s.category));
    return ["Todos", ...categories];
  }

  function matchesQuery(snippet, term) {
    if (!term) return true;
    const haystack = [snippet.title, snippet.category, snippet.description, ...snippet.tags]
      .join(" ")
      .toLowerCase();
    return haystack.includes(term);
  }

  function search({ category = "Todos", query = "" } = {}) {
    const term = query.trim().toLowerCase();
    return repository.getAll().filter((snippet) => {
      const inCategory = category === "Todos" || snippet.category === category;
      return inCategory && matchesQuery(snippet, term);
    });
  }

  function getSnackId(snippetId) {
    return repository.getSnackId(snippetId);
  }

  function saveSnackId(snippetId, rawValue) {
    const sanitized = sanitizeSnackId(rawValue.trim());
    repository.saveSnackId(snippetId, sanitized);
    return sanitized;
  }

  // Aceita tanto o id puro (ex: @user/nome) quanto uma URL completa do snack.expo.dev.
  function sanitizeSnackId(value) {
    const withoutUrl = value.replace(/^https?:\/\/snack\.expo\.dev\//i, "").split("?")[0];
    return /^@?[\w.-]+(\/[\w.-]+)?$/.test(withoutUrl) ? withoutUrl : "";
  }

  return { getCategories, search, getSnackId, saveSnackId, sanitizeSnackId };
})();
