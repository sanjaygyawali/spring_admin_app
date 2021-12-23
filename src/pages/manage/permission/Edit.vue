<template>
  <q-page>
    <permissions-form :editMode="true" />
  </q-page>
</template>

<script>
import PermissionsForm from "components/organisms/forms/PermissionsForm.vue";

export default {
  components: {
    PermissionsForm
  }
};
</script>

<style></style>
