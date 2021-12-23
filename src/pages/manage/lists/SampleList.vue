<template>
  <q-page>
    <title-container title="Sample List" />
    <r-list
      :schemaColumns="columns"
      :schemaGrid="columns"
      :title="title"
      api="/collection/products"
      :rows="dummyData"
      :loading="loading"
      slug="/manage/product"
      :actions="tableActions"
    />
  </q-page>
</template>

<script>
import RList from "components/organisms/RList.vue";

const dummyData = [
  {
    id: 1,
    name: "Sujan Chaulagai",
    dob: "1995/12/11",
    gender: "Male",
    contact: "9861325412",
    email: "suajn.chaulagai@gmail.com",
    actions: ""
  },
  {
    name: "Janak Singh",
    dob: "1998/10/25",
    gender: "Male",
    contact: "986135412",
    email: "janak@gmail.com"
  },
  {
    name: "Sumitra Nepal",
    dob: "1985/02/15",
    gender: "Female",
    contact: "9861325412",
    email: "suajn.chaulagai@gmail.com"
  },
  {
    name: "Diwas Shrestha",
    dob: "1999/12/11",
    gender: "Male",
    contact: "9861325234",
    email: "diwas.sh@gmail.com"
  },
  {
    name: "Siyona Maharjan",
    dob: "200/02/12",
    gender: "Female",
    contact: "986052412",
    email: "siyona@gmail.com"
  },
  {
    name: "Fiyona Shrestha",
    dob: "1995/10/08",
    gender: "Female",
    contact: "9845125412",
    email: "fiyona@gmail.com"
  }
];

export default {
  components: { RList },
  data() {
    return {
      loading: false,
      title: "Sample List Table",
      dummyData,
      columns: [
        {
          name: "name",
          label: "Name",
          field: "name",
          sortable: true
        },
        {
          name: "dob",
          label: "Date of Birth",
          field: "dob",
          sortable: true
        },
        {
          name: "gender",
          label: "Gender",
          field: "gender",
          sortable: true
        },
        {
          name: "contact",
          label: "Contact",
          field: "contact",
          sortable: true
        },
        {
          name: "email",
          label: "Email",
          field: "email",
          sortable: true
        },
        {
          name: "actions",
          label: "Actions"
        }
      ],
      tableActions: [
        { type: "view", label: "View Detail" },

        { type: "delete", label: "Delete" }
      ]
    };
  }
};
</script>

<style></style>
