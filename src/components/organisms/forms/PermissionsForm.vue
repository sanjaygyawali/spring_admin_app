<template>
  <q-card class="q-pa-md container">
    <title-container :title="`${editMode ? 'Edit' : 'Register'} Permission`"/>
    <r-form
      :mode="mode"
      @success="handleSuccess"
      @error="handleError"
      :schema="schema"
      :post="schema.api"
      id="permissions_form"
      v-model="form"
      ref="permissionsForm"
      :title="`${editMode ? 'Edit' : 'Register'} Permission`"
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
        api: "/collection/permissions",
        redirectTo: "/manage/permission",
        redirectToOnCancel: "/manage/permission",
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
          },
          {
            id: "label",
            component: "QInput",
            label: "Label",
            span: 6,
            outlined: true,
            placeholder: "Label",
            dense: true
          },
          {
            id: "description",
            component: "QInput",
            type: "textarea",
            label: "Description",
            span: 12,
            outlined: true,
            placeholder: "Description",
            dense: true
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
