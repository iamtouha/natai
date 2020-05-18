<template>
  <div class="wrapper">
    <button @click="logout">signout</button>
    <slot></slot>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { auth } from "@/Firebase";
export default Vue.extend({
  name: "Default",
  methods: {
    async logout() {
      try {
        await auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        alert(error.message);
      }
    }
  }
});
</script>
