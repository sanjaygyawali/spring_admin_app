<template>
  <q-list class="sidebar">
    <template v-for="item in schema">
      <q-expansion-item
        v-if="item.schema.length"
        :key="item.name"
        :label="item.name"
        :group="item.name"
        :icon="item.icon"
        :default-opened="false"
        class="sidebar-expansion-item"
        active-class="active"
      >
        <template v-for="subItem in item.schema">
          <q-item
            :header-inset-level="0.5"
            :key="subItem.name"
            clickable
            :to="subItem.url"
            active-class="active"
          >
            <q-item-section avatar v-if="item.icon">
              <q-icon :name="subItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ subItem.name }}</q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </q-expansion-item>
      <q-item
        v-else
        :key="item.name"
        clickable
        :to="item.url"
        class="sidebar-item"
        active-class="active"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.name }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-list>
</template>

<script>
export default {
  props: {
    schema: {
      type: [Array, Object],
      required: true,
    },
  },
  methods: {
    checkPermission(slug) {
      if (this.$gates.hasRole("super_admin")) {
        return true;
      }
      return this.$gates.hasPermission(slug);
      // const permissions = this.$store.state.user.user.permissions;
      // const status = permissions.find(item => item.name == slug);
      // console.log(status);
      // if (status) {
      //   return true;
      // }
      // return;
    },
  },
};
</script>

<style lang="scss">
.sidebar-item,
.sidebar-expansion-item {
  /* margin: 5px 15px; */
  /* border-radius: 5px; */
}

.sidebar-item,
.sidebar-expansion-item {
  font-size: 16px;
  color: white;
}

.sidebar-item .q-item__label,
.sidebar-expansion-item .q-item__label {
  font-weight: 400 !important;
}

.sidebar-item .q-item__section--side > .q-icon,
.sidebar-expansion-item .q-item__section--side > .q-icon {
  font-size: 20px;
}
.sidebar-expansion-item .q-item__section--side,
.sidebar-item .q-item__section--side {
  color: #08b9a8;
}
.q-separator--horizontal {
  opacity: 0.5;
}
.sidebar-expansion-item .q-item {
  border-radius: 5px;
}

.sidebar .q-expansion-item__content {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.65);
}
.active {
  color: #08b9a8;
  background-color: #08233e;
  border-right: 4px solid #ff9800;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}
.sidebar {
  .q-item__section--avatar {
    min-width: 30px;
  }
}
</style>
