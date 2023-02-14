<template>
  <div id="wrapper">
    <NavBar />
    <!-- <div class="is-loading-bar has-text-centered" v-bind:class="{ 'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring"></div>
    </div> -->

    <section class="section">
      <router-view :key="$route.path"></router-view >
    </section>

    <footer class="footer">
      <p class="has-text-centered">Copyright (c) 2023</p>
    </footer>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import '@/css/app_styles.scss';

export default {
  name: "App",
  components: {
    NavBar,
  },
  beforeCreate() {
    document.title = 'Blogger'
  },
};
</script>
