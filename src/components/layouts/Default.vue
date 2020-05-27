<template>
  <div class="wrapper">
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
