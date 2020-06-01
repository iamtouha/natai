<template>
  <div style="display:contents;">
    <NavBar></NavBar>
    <slot></slot>
    <Footer></Footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
const NavBar = () => import("@/components/Navbar.vue");
const Footer = () => import("@/components/Footer.vue");
export default Vue.extend({
  name: "Default",
  components: { NavBar, Footer }
});
</script>
