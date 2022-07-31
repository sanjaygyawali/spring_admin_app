export default ($axios) => (resource) => ({
  async index() {
    return $axios.$get(`/${resource}/`);
  },
  async create(payload) {
    return $axios.post(`/${resource}/`, payload);
  },

  async show(id) {
    return $axios.$get(`/${resource}/${id}/`);
  },

  async update(payload, id) {
    return $axios.put(`/${resource}/${id}/`, payload);
  },

  async delete(id) {
    return $axios.$delete(`/${resource}/${id}/`);
  },
});
