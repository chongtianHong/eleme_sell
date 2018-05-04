<template>
  <div id="app">
    <v-header></v-header>
    <div class="header">
      I am header!
    </div>
    <div class="tab">
      I am tab!
    </div>
    <div class="content">
      I am content!
    </div>
    <!-- <router-view/> -->
  </div>
</template>

<script>
import header from './components/header/header.vue';
export default {
  name: 'App',
  components: {
    'v-header': header
  }
};
</script>

<style>

</style>
