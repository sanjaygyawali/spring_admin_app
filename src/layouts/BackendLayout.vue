<template>
  <q-layout view="lHh lpR fFf">
    <q-header class="bg-white text-primary">
      <q-toolbar class="q-px-md">
        <q-btn dense flat round icon="menu" @click="miniState = !miniState"/>
        <q-toolbar-title>
          <!-- Zanzibar Petroleum -->
        </q-toolbar-title>

        <q-btn-dropdown unelevated color="secondary" :label="username" flat>
          <q-list>
            <q-item clickable v-close-popup @click="logoutBtnHandler">
              <q-item-section side>
                <q-icon size="sm" color="secondary" name="las la-sign-out-alt"></q-icon>
              </q-item-section>
              <q-item-section>
                <q-item-label class="text-uppercase">Logout</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
      <div class="loading-bar">
        <q-linear-progress
          v-if="appLoading"
          indeterminate
          color="primary"
          class="q-px-md"
          size="4px"
        />
      </div>
    </q-header>

    <q-drawer
      v-model="drawer"
      show-if-above
      persistent
      :mini="!drawer || miniState"
      @click.capture="drawerClick"
      :width="250"
      :breakpoint="800"
      bordered
      content-class="bg-dark admin-drawer"
    >
      <div class="row q-py-sm justify-center">
        <q-avatar style size="md">
          <img src="https://www.rasello.com/images/rasellologo.png">
        </q-avatar>
      </div>
      <q-scroll-area class="fit" :visible="false">
        <Sidebar :schema="schema"/>
      </q-scroll-area>
    </q-drawer>

    <q-page-container class="page-container q-pb-md">
      <router-view></router-view>
    </q-page-container>
  </q-layout>
</template>

<script>
import Sidebar from "components/organisms/Sidebar.vue";
import MenuSchema from "../store/BackendMenu";
import { mapState } from "vuex";

export default {
  components: {
    Sidebar
  },
  data() {
    return {
      left: false,
      drawer: false,
      miniState: false,
      schema: MenuSchema,
      pageTitle: "",
      loading: false,
      roles: []
    };
  },
  created() {
    this.assignRoles();
  },
  methods: {
    assignRoles() {
      // TODO: move this role setting to auth middleware
      //  auth middleware needs to be extended from the base plugin.
      let user = this.$store.state.user;
      let roles = user.user.roles;
      let permissions = user.user.permissions;
      this.$gates.setRoles(roles.map(role => role.name));
      this.$gates.setPermissions(
        permissions.map(permission => permission.name)
      );
    },
    drawerClick(e) {
      if (this.miniState) {
        this.miniState = false;
        e.stopPropagation();
      }
    },
    async logoutBtnHandler() {
      this.loading = true;
      this.$loader.setLoading();
      try {
        await this.authService.logout();
      } catch (err) {
      } finally {
        this.$router.push("/");
      }
      this.loading = false;
      this.$loader.setLoading(false);
    },
    profileBtnHandler() {
      this.$router.push("/admin/user/profile");
    },
    notificationBtnHandler() {
      return;
    }
  },
  mounted() {
    this.pageTitle = this.$route.meta.name;
  },
  computed: {
    ...mapState({ appLoading: state => state.loader.loading }),
    username() {
      return (
        this.$store.state.user.user.first_name +
        " " +
        this.$store.state.user.user.last_name
      );
    }
  },
  watch: {
    $route(to, from) {
      if (this.$route.meta && this.$route.meta.name) {
        this.pageTitle = this.$route.meta.name;
      }
    }
  }
};
</script>

<style>
.page-container {
  background-color: rgb(240, 245, 248);
  box-sizing: border-box !important;
}

.admin-drawer {
  overflow: auto;
}
.admin-drawer::-webkit-scrollbar {
  display: none;
}
.q-drawer {
  height: 100vh !important;
  position: fixed;
}
.q-header {
  box-shadow: 3px 3px 3px #eee;
}
.loading-bar {
  min-height: 4px;
}
</style>
