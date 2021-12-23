<template>
  <q-page>
    <users-form :editMode="true" />
  </q-page>
</template>

<script>
import UsersForm from "components/organisms/forms/UsersForm.vue";

export default {
  components: {
    UsersForm
  }
};
</script>

<style></style>
