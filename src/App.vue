<template>
  <div id="app">
    <component :is="layout">
      <router-view :key="$route.name"></router-view>
    </component>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import AuthLayout from "@/components/layouts/Auth.vue";
import DefaultLayout from "@/components/layouts/Default.vue";
export default Vue.extend({
  name: "App",
  components: { AuthLayout, DefaultLayout },
  computed: {
    layout() {
      return (this.$route.meta.layout || "Default") + "Layout";
    }
  }
});
</script>
<style lang="scss"></style>
