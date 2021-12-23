<template>
  <q-page>
    <q-card class="q-pa-md">
      <title-container title="Permissions List" showAddButton slug="manage/permission"/>
      <r-list
        :schemaColumns="columns"
        :schemaGrid="columns"
        api="/collection/permissions"
        :loading="loading"
        slug="/manage/permission"
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
          name: "label",
          label: "Label",
          field: "label",
          sortable: true,
          align: "left"
        },
        {
          name: "description",
          label: "Description",
          field: "description",
          sortable: true,
          align: "left",
          style: "max-width: 200px; overflow: hidden; text-overflow: ellipses;"
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
