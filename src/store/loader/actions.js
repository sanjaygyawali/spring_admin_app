export function setLoading({ state, commit }) {
  commit("setLoading", true);
}

export function removeLoading({ state, commit }) {
  commit("setLoading", false);
}
