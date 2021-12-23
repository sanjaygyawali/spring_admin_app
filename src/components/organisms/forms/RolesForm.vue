<template>
  <q-card class="q-pa-md container">
    <title-container :title="`${editMode ? 'Edit' : 'Register'} Role`"/>
    <r-form
      :mode="mode"
      @success="handleSuccess"
      @error="handleError"
      :schema="schema"
      :post="schema.api"
      id="roles_form"
      v-model="form"
      ref="rolesForm"
      :title="`${editMode ? 'Edit' : 'Register'} Role`"
      :editMode="editMode"
    />
  </q-card>
</template>

<script>
export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      schema: {
        api: "/collection/roles",
        redirectTo: "/manage/role",
        redirectToOnCancel: "/manage/role",
        columnCount: 12,
        successMessage: "Successfull",
        schema: [
          {
            id: "name",
            component: "QInput",
            label: "Name",
            span: 6,
            outlined: true,
            placeholder: "Name",
            dense: true,
            required: true
          }
        ]
      },
      mode: "edit",
      form: {}
    };
  },
  methods: {
    handleSuccess(data) {},
    handleError(data) {}
  },
  created() {}
};
</script>

<style></style>
