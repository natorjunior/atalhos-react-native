// Camada de repository: única responsável por acessar as fontes de dados
// (o array estático de atalhos e o localStorage). Nenhuma regra de negócio aqui.
window.App = window.App || {};
window.App.repositories = window.App.repositories || {};

window.App.repositories.SnippetsRepository = (function () {
  const SNACK_KEY_PREFIX = "snack-id:";

  function getAll() {
    return window.App.data.SNIPPETS;
  }

  function findById(id) {
    return getAll().find((snippet) => snippet.id === id) || null;
  }

  function getSnackId(snippetId) {
    return localStorage.getItem(SNACK_KEY_PREFIX + snippetId) || "";
  }

  function saveSnackId(snippetId, snackId) {
    const key = SNACK_KEY_PREFIX + snippetId;
    if (snackId) {
      localStorage.setItem(key, snackId);
    } else {
      localStorage.removeItem(key);
    }
  }

  return { getAll, findById, getSnackId, saveSnackId };
})();
