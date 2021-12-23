<template>
  <q-page>
    <q-card class="q-pa-md">
      <title-container title="Roles List" showAddButton slug="manage/role"/>
      <r-list
        :schemaColumns="columns"
        :schemaGrid="columns"
        api="/collection/roles"
        :loading="loading"
        slug="/manage/role"
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
          name: "name",
          label: "Name",
          field: "name",
          sortable: true,
          align: "left"
        },
        {
          name: "actions",
          label: "Actions",
          align: "center"
          // actionOptions: [
          //   {
          //     visible: () => true,
          //     label: "Manage Permissions",
          //     handler: (_this, props) => {
          //       this.$router.push(`/manage/role/${props.id}/permission`);
          //     }
          //   }
          // ]
        }
      ],
      tableActions: [{ type: "delete", label: "Delete" }]
    };
  }
};
</script>

<style></style>
