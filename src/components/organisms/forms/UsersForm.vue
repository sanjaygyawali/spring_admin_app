<template>
  <q-card class="q-pa-md">
    <title-container :title="`${editMode ? 'Edit' : 'Register'} User`"/>
    <r-form
      :mode="mode"
      @success="handleSuccess"
      @error="handleError"
      :schema="schema"
      :post="schema.api"
      id="users_form"
      v-model="form"
      ref="usersForm"
      title="Register User"
      :editMode="editMode"
      :fetchUrl="schema.fetchUrl"
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
        api: "/collection/users",
        redirectTo: "/manage/user",
        fetchUrl: "",
        redirectToOnCancel: "/manage/user",
        columnCount: 12,
        successMessage: "Successfull",
        schema: [
          {
            id: "first_name",
            component: "QInput",
            label: "First Name",
            span: 6,
            outlined: true,
            placeholder: "First Name",
            dense: true,
            required: true
          },
          {
            id: "last_name",
            component: "QInput",
            label: "Last Name",
            span: 6,
            outlined: true,
            placeholder: "Last Name",
            dense: true,
            required: true
          },
          {
            id: "email",
            component: "QInput",
            label: "Email",
            rules: [
              val =>
                /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(val) ||
                "Please enter a valid email"
            ],
            type: "email",
            span: 6,
            outlined: true,
            placeholder: "example@mail.com",
            dense: true,
            required: true
          },
          {
            id: "username",
            component: "QInput",
            label: "Username",
            span: 6,
            outlined: true,
            placeholder: "Username",
            dense: true,
            required: true,
            autocomplete: "off"
          },
          {
            id: "role",
            component: "r-select",
            tableName: "roles",
            label: "Role",
            span: 6,
            placeholder: "Roles",
            dense: true,
            multiple: true,
            required: true
          },
          {
            id: "password",
            component: "QInput",
            label: "Password",
            type: "password",
            span: 6,
            outlined: true,
            // showCondition: (_, { formData }) => {
            //   if (this.editMode) {
            //     return false;
            //   } else {
            //     return true;
            //   }
            // },
            placeholder: "Password",
            dense: true,
            required: true
          },
          {
            id: "status",
            component: "QToggle",
            label: "Status",
            span: 6,
            placeholder: "Status",
            dense: true,
            required: true,
            autocomplete: "off"
          },
          {
            id: "active",
            component: "QToggle",
            label: "Active",
            span: 6,
            placeholder: "Active",
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
  created() {
    this.schema.fetchUrl = `/v1/users/${this.$route.params.id}`;
  }
};
</script>

<style></style>
