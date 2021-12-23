export default $axios => resource => ({
  index() {
    return $axios.$get(`/v1/${resource}`);
  },
  create(payload) {
    return $axios.$post(`/v1/${resource}`, payload);
  },

  show(id) {
    return $axios.$get(`/v1/${resource}/${id}`);
  },

  update(payload, id) {
    return $axios.$put(`/v1/${resource}/${id}`, payload);
  },

  delete(id) {
    return $axios.$delete(`/v1/${resource}/${id}`);
  }
});
