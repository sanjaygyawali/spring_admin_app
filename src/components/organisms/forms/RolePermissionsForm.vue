<template>
  <q-card class="q-pa-md">
    <div class="tabs-container">
      <q-splitter v-if="roles.length" v-model="splitterModel" style="height: 100%;">
        <template v-slot:before>
          <p class="q-mb-md text-uppercase text-weight-bold">Roles</p>
          <q-tabs
            v-model="selectedRole"
            vertical
            @input="handleRoleChange"
            class="roles-permission-tab"
            elevated
            style="margin-right: 10px;"
          >
            <q-tab
              v-for="(role, index) in roles"
              :name="role.id"
              class="text-uppercase text-left side-tabs"
              :label="role.name"
              :key="'rt_' + index"
            />
          </q-tabs>
        </template>

        <template v-slot:after>
          <q-card class="panel-card">
            <q-tabs
              v-model="selectedCategory"
              dense
              class="text-grey-9 bg-white inner-tabs roles-permission-tab"
              active-color="secondary"
              indicator-color="primary"
              align="left"
              narrow-indicator
            >
              <q-tab
                v-for="(cat, indx) in permissionCategories"
                :key="'pct_' + indx"
                :label="cat.label"
                :name="cat.name"
              />
            </q-tabs>

            <q-separator/>

            <q-tab-panels v-model="selectedCategory" animated>
              <q-tab-panel name="crud" class="q-pa-none">
                <!-- <div class="text-bold text-body1 text-uppercase q-mb-sm">
                  {{ roleTitle }}
                </div>-->
                <q-markup-table
                  class="permissions-table"
                  style="height:385px"
                  v-if="
                    permissionsFetched && Object.keys(crudPermissions).length
                  "
                >
                  <tr class="header-row">
                    <th></th>
                    <th
                      v-for="(item, indx) in crudPermissionTypes"
                      :key="'pt_' + indx"
                      class="text-uppercase"
                    >{{ item }}</th>
                  </tr>
                  <tr v-for="(modulee, idx) in modules" :key="'module_' + idx">
                    <td class="table-cell">{{ modulee.label || modulee.permission_name }}</td>
                    <td
                      v-for="n in crudPermissionTypes.length"
                      :key="'pt2_' + n"
                      class="text-center table-cell"
                    >
                      <!-- v-model="form[modulee.name][permissionTypes[n-1]]" -->
                      <!-- :true-value="`${permissionTypes[n-1]}_${modulee.name}`" -->
                      <q-toggle
                        color="primary"
                        size="xs"
                        v-model="
                          crudPermissions[
                            `${crudPermissionTypes[n - 1]}_${modulee.name}`
                          ].status
                        "
                        @input="
                          handleToggle(
                            $event,
                            `${crudPermissionTypes[n - 1]}_${modulee.name}`
                          )
                        "
                        :disabled="loading"
                      ></q-toggle>
                    </td>
                  </tr>
                </q-markup-table>
              </q-tab-panel>

              <q-tab-panel name="menu">
                <!-- <div class="text-bold text-body1 text-uppercase q-mb-sm">
                  {{ roleTitle }}
                </div>-->
                <q-list
                  style="height:350px"
                  dense
                  padding
                  v-if="
                    permissionsFetched && Object.keys(menuPermissions).length
                  "
                >
                  <q-item
                    v-for="(menuPermission, idx) in menuPermissions"
                    :key="'menu_' + idx"
                    tag="label"
                    v-ripple
                    dense
                    :disabled="loading"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{
                        menuPermission.label || menuPermission.name
                        }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle
                        color="primary"
                        v-model="menuPermission.status"
                        val="false"
                        size="xs"
                        @input="handleToggle($event, menuPermission.name)"
                        :disabled="loading"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>

              <q-tab-panel name="misc">
                <!-- <div class="text-bold text-body1 text-uppercase q-mb-sm">
                  {{ roleTitle }}
                </div>-->
                <q-list
                  style="height:350px"
                  padding
                  v-if="
                    permissionsFetched && Object.keys(miscPermissions).length
                  "
                >
                  <q-item
                    v-for="(miscPermission, idx) in miscPermissions"
                    :key="'menu_' + idx"
                    tag="label"
                    v-ripple
                    dense
                    :disable="loading"
                  >
                    <q-item-section>
                      <q-item-label>
                        {{
                        miscPermission.label || miscPermission.name
                        }}
                      </q-item-label>
                    </q-item-section>
                    <q-item-section side>
                      <q-toggle
                        color="primary"
                        v-model="miscPermission.status"
                        val="false"
                        size="xs"
                        @input="handleToggle($event, miscPermission.name)"
                        :disabled="loading"
                      />
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-tab-panel>
            </q-tab-panels>
          </q-card>
        </template>
      </q-splitter>
    </div>
  </q-card>
</template>

<script>
import menu from "../../../store/BackendMenu";

export default {
  props: {
    editMode: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      loading: false,
      roles: [],
      crudPermissionTypes: [],
      permissionsWithId: [],
      permissionCategories: [
        {
          name: "crud",
          label: "CRUD"
        },
        {
          name: "menu",
          label: "Menu"
        },
        {
          name: "misc",
          label: "Miscellaneous"
        }
      ],
      modules: [],
      selectedRole: null,
      selectedCategory: "crud",
      splitterModel: 20,
      mode: "edit",
      crudPermissions: {},
      menuPermissions: {},
      miscPermissions: {},
      permissionsFetched: false,
      menu
    };
  },
  methods: {
    handleSuccess(data) {},
    handleError(data) {},
    async initData() {
      await this.fetchRoles();
      await this.fetchModules();
      await this.fetchPermissions();
    },
    async fetchRoles() {
      this.loading = true;
      this.$loader.setLoading();
      try {
        const res = await this.$axios.get("/v1/roles");
        this.roles = res.data;
        if (res.data.length) {
          this.selectedRole = res.data[0].id;
        }
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error",
          caption: "Cannot fetch roles"
        });
      } finally {
        this.loading = false;
        this.$loader.setLoading(false);
      }
    },
    async fetchModules() {
      this.loading = true;
      this.$loader.setLoading();
      try {
        const res = await this.$axios.get(`/v1/modules`);
        this.modules = res.data.modules;
        this.crudPermissionTypes = res.data.crudPermissionTypes;
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error",
          caption: "Cannot fetch modules"
        });
      } finally {
        this.loading = false;
        this.$loader.setLoading(false);
      }
    },

    async formSubmit() {
      this.loading = true;
      this.$loader.setLoading();
      try {
        const res = await this.$axios.post("/collection/role_permission");
        this.roles = res.data;
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error",
          caption: "Cannot update permissions"
        });
      } finally {
        this.loading = false;
        this.$loader.setLoading(false);
      }
    },
    async fetchPermissions() {
      this.loading = true;
      this.$loader.setLoading();
      this.permissionsFetched = false;
      try {
        const res = await this.$axios.$get("/v1/permissions", {
          role_id: this.selectedRole
        });
        this.crudPermissions = res.data.crudPermissions;
        this.menuPermissions = res.data.menuPermissions;
        this.miscPermissions = res.data.miscPermissions;
        this.permissionsFetched = true;
      } catch (err) {
        this.$q.notify({
          type: "negative",
          message: "Error",
          caption: "Cannot fetch permissions"
        });
      } finally {
        this.loading = false;
        this.$loader.setLoading(false);
      }
    },
    async handleToggle(val, slug) {
      this.loading = true;
      this.$loader.setLoading();
      const prefix = slug.split("_")[0];
      let permission = null;
      if (this.crudPermissionTypes.includes(prefix)) {
        permission = this.crudPermissions[slug];
      } else if (["menu"].includes(prefix)) {
        permission = this.menuPermissions[slug];
      } else {
        permission = this.miscPermissions[slug];
      }
      try {
        let res = null;
        if (val) {
          res = await this.$axios.post("/collection/role_permission", {
            role_id: this.selectedRole,
            permission_id: permission.id
          });
          this.$q.notify({
            type: "positive",
            message: "Succeessfull",
            caption: "Permission Granted"
          });
        } else {
          res = await this.$axios.$delete("/v1/role_permission", {
            permission_id: permission.id,
            role_id: this.selectedRole
          });
          this.$q.notify({
            type: "positive",
            message: "Succeessfull",
            caption: "Permission Revoked"
          });
        }
      } catch (err) {
        permission.status = !permission.status;
        this.$q.notify({
          type: "negative",
          message: "Error",
          caption: "Cannot update permissions"
        });
      } finally {
        this.loading = false;
        this.$loader.setLoading(false);
        // this.fetchPermissions();
      }
    },
    handleRoleChange() {
      this.fetchPermissions();
    }
  },
  computed: {
    roleTitle() {
      const role = this.roles.find(item => item.id == this.selectedRole);
      if (!role) {
        return "";
      }
      return role.name;
    }
  },
  created() {
    this.initData();
  }
};
</script>

<style lang="scss">
.tabs-container {
  border: 1px solid #e2e2e2 !important;
  border-radius: 10px;
  background-color: #ededed;
  padding: 10px;
  // height: 450px;
}
.q-tab > .q-tab__content,
.q-tab > .q-tab__content > div {
  width: 100%;
  font-size: 12px;
}
.q-tab.q-tab--active {
  background: $primary;
  color: white;
  border: 1px solid $primary;
  border-right: none;
  border-radius: 5px;
}
.q-tab__indicator {
  display: none;
}
.q-splitter__panel.q-splitter__before {
  // height: 396px;
  /* min-width: 200px;  */
}
.q-splitter__separator {
  display: none;
}
.permissions-table {
  border: solid 1px rgba(0, 0, 0, 0.12);
  height: 350px;
}
// tr {
//   border-bottom: 1px solid red;
// }

.header-row > th {
  background: #fff;
  position: -webkit-sticky !important;
  border-bottom: 1px solid #e2e2e2;

  position: sticky !important;
  top: 0;
  z-index: 9;
}
.table-cell {
  padding: 4px 8px !important;
}
.panel-card {
  // height: 520px;
}
.inner-tabs {
  position: sticky !important;
}
.panel-card .q-tab.q-tab--active {
  background: $primary;
  color: white !important;
  border: 1px solid $primary;
  border-bottom: none;
  border-radius: 5px;
}
.panel-card .q-tabs {
  position: -webkit-sticky !important;
  position: sticky !important;
  top: 0;
  z-index: 1;
  // border-bottom: solid 1px rgba(0, 0, 0, 0.12);
}
.roles-permission-tab {
  background-color: #ededed !important;
  padding-bottom: 10px;
  .q-tab {
    min-height: 35px;
  }
}
</style>
