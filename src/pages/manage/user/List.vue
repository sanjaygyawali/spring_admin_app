<template>
  <q-page>
    <q-card class="q-pa-md">
      <title-container title="Users List" showAddButton slug="manage/user"/>
      <r-list
        :schemaColumns="columns"
        :schemaGrid="columns"
        api="http://localhost:3000/users"
        :loading="loading"
        slug="/manage/user"
        :actions="tableActions"
      />
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      columns: [
        {
          name: "id",
          label: "ID",
          field: "id",
          sortable: true,
          align: "left"
        },
        {
          name: "first_name",
          label: "First Name",
          field: "first_name",
          sortable: true,
          align: "left"
        },
        {
          name: "Last Name",
          label: "last_name",
          field: "Last Name",
          sortable: true,
          align: "left"
        },
        {
          name: "username",
          label: "UserName",
          field: "username",
          sortable: true,
          align: "left"
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          sortable: true,
          align: "left"
        },
        {
          name: "role",
          label: "Role",
          isBadge: true,
          field: "role",
          sortable: true,
          align: "left"
        },
        {
          name: "status",
          label: "Status",
          field: "status",
          format: val => (val ? "Active" : "Inactive"),
          isBadge: true,
          sortable: true,
          align: "left"
        },
        {
          name: "active",
          label: "Active",
          field: "active",
          format: val => (val ? "Active" : "Inactive"),
          isBadge: true,
          sortable: true,
          align: "left"
        },
        {
          name: "actions",
          label: "Actions",
          align: "center"
        }
      ],
      tableActions: [{ type: "delete", label: "Delete" }]
    };
  }
};
</script>

<style></style>
