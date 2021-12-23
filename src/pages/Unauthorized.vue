<template>
  <q-page class="column flex-center">
    <div class="text-h5 q-mb-md">
      Sorry, you do not have access to this page.
    </div>
    <q-btn
      unelevated
      color="secondary"
      label="Go Back"
      @click="$router.go(-1)"
    />
  </q-page>
</template>

<script>
export default {
  name: "PageIndex"
};
</script>
