<template>
  <q-page>
    <q-card class="q-pa-md">
      <title-container title="Assign Permissions">
        <template slot="actions">
          <q-btn
            color="primary"
            unelevated
            size="12px"
            label="Dump Roles &amp; Permissions"
            outline
            @click="dumpRolesAndPermissions"
            :loading="dumpLoading"
          />
          <q-btn
            color="primary"
            class="q-ml-sm"
            unelevated
            outline
            size="12px"
            label="Seed Roles &amp; Permissions"
            @click="seedRolesAndPermissions"
            :loading="seedLoading"
          />
        </template>
      </title-container>
      <role-permissions-form/>
    </q-card>
  </q-page>
</template>

<script>
import RolePermissionsForm from "components/organisms/forms/RolePermissionsForm.vue";
export default {
  components: { RolePermissionsForm },
  data() {
    return {
      dumpLoading: false,
      seedLoading: false
    };
  },
  methods: {
    dumpRolesAndPermissions() {
      this.$q
        .dialog({
          title: "Create dump?",
          message: "Are you sure you want to dump roles and permissions.",
          cancel: true
        })
        .onOk(() => {
          this.handleDump();
        });
    },
    handleDump() {
      try {
        this.dumpLoading = true;
        this.$loader.setLoading();
        const res = this.$axios.post("/v1/dump_role_permission");
        this.$q.notify({
          type: "positive",
          message: "Successfully Dumped"
        });
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error Occured",
          caption: "Cannot dump. Please try again later"
        });
      } finally {
        this.dumpLoading = true;
        this.$loader.setLoading(false);
      }
    },
    seedRolesAndPermissions() {
      this.$q
        .dialog({
          title: "Seed data?",
          message: "Are you sure you want to seed roles and permissions.",
          cancel: true
        })
        .onOk(() => {
          this.handleSeed();
        });
    },
    handleSeed() {
      try {
        this.seedLoading = true;
        this.$loader.setLoading();
        const res = this.$axios.post("/v1/seed_role_permission");
        this.$q.notify({
          type: "positive",
          message: "Successfully Seeded"
        });
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error Occured",
          caption: "Cannot seed. Please try again later"
        });
      } finally {
        this.seedLoading = false;
        this.$loader.setLoading(false);
      }
    }
  }
};
</script>

<style></style>
