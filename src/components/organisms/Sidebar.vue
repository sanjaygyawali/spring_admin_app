<template>
  <q-list class="sidebar">
    <template v-for="item in schema">
      <q-item
        v-if="item.type === 'item' && checkPermission(`menu_read_${item.id}`)"
        :key="item.label"
        clickable
        :to="item.url"
        class="sidebar-item"
        active-class="active"
      >
        <q-item-section avatar>
          <q-icon :name="item.icon"></q-icon>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ item.label }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-expansion-item
        v-else-if="checkPermission(`menu_read_${item.id}`)"
        :key="item.label"
        :label="item.label"
        :group="item.group"
        :icon="item.icon"
        :default-opened="item.opened"
        class="sidebar-expansion-item"
        active-class="active"
      >
        <template v-for="subItem in item.schema">
          <q-item
            v-if="
              subItem.type == 'item' &&
                checkPermission(`menu_read_${subItem.id}`)
            "
            :header-inset-level="0.5"
            :key="subItem.label"
            clickable
            :to="subItem.url"
            active-class="active"
          >
            <q-item-section avatar v-if="item.icon">
              <q-icon :name="subItem.icon"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ subItem.label }}</q-item-label>
            </q-item-section>
          </q-item>
          <q-expansion-item
            v-else-if="checkPermission(`menu_read_${subItem.id}`)"
            :header-inset-level="0.5"
            :key="subItem.label"
            :label="subItem.label"
            :group="subItem.group"
            :icon="subItem.icon"
            :default-opened="subItem.opened || false"
            class="sidebar-expansion-item"
            active-class="active"
          >
            <template v-for="subItem1 in subItem.schema">
              <q-item
                v-if="checkPermission(subItem1.id)"
                :header-inset-level="1"
                :key="subItem1.label"
                clickable
                :to="subItem1.url"
                active-class="active"
              >
                <q-item-section avatar v-if="item.icon">
                  <q-icon :name="subItem1.icon"></q-icon>
                </q-item-section>
                <q-item-section>
                  <q-item-label>{{ subItem1.label }}</q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-expansion-item>
        </template>
      </q-expansion-item>
      <!-- <q-separator :key="'sb_sep_' + index" /> -->
    </template>
  </q-list>
</template>

<script>
export default {
  props: {
    schema: {
      type: [Array, Object],
      required: true
    }
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
    }
  }
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
