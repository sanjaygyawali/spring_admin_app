<template>
  <q-page>
    <roles-form :editMode="true" />
  </q-page>
</template>

<script>
import RolesForm from "components/organisms/forms/RolesForm.vue";

export default {
  components: {
    RolesForm
  }
};
</script>

<style></style>
