<template>
  <q-layout view="lHh Lpr lFf" class="public-layout">
    <q-page-container class="public-page-container">
      <div class="header-container">
        <div class="main-content">
          <router-view/>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: "MainLayout",
  data() {
    return {};
  },
  methods: {
    checkActive(key) {
      if (this.$route.path == key) {
        return "public-active";
      }
    }
  }
};
</script>

<style>
.public-layout {
  background: rgb(240, 245, 248);
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
}
.header-banner {
  background: rgba(0, 0, 0, 0.7);
  padding: 20px 0;
  /* min-height: 125px; */
}
</style>

<style lang="scss">
.main-link {
  margin-bottom: 0;
  padding-left: 0;
  li {
    list-style-type: none;
    display: inline-block;
    font-size: 16px;
    text-transform: uppercase;
    font-family: Roboto;
    padding: 8px 16px;
    a {
      color: #fff !important;
      text-decoration: none;
    }
  }
}
.main-content {
  // min-height: calc(100vh - 200px);
}
.footer {
  background-color: whitesmoke;
  padding: 20px;
  margin-top: 50px;
}

.public-nav {
  // border: 1px solid #e2e2e2;
  background-color: #091c2b;
}
.banner-text {
  font-size: 25px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  font-weight: 600;
}
.sub-banner-text {
  font-size: 18px;
  color: #fff;
  text-transform: uppercase;
  text-shadow: 2px 4px 3px rgba(0, 0, 0, 0.3);
  font-weight: 600;
  margin-bottom: 0;
}
.public-active {
  background-color: #38964e;
  a {
    color: #fff !important;
  }
}
.main-container {
  background-color: #f4f6f9;
}
</style>
