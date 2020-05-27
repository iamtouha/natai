<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand textBlue50" href="#">BlogCMS</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon text-dark"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link tag="a" to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./dashboard.html">Dashboard</a>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
            >Categories</a
          >
          <div class="dropdown-menu" aria-labelledby="navbarDropdown">
            <a class="dropdown-item" href="#">Bangla</a>
            <a class="dropdown-item" href="#">English</a>
            <a class="dropdown-item" href="#">Poem</a>
            <a class="dropdown-item" href="#">Story</a>
          </div>
        </li>
      </ul>
      <form class="form-inline my-2 my-lg-0">
        <input
          class="form-control bg-light mr-sm-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
        />
        <button
          class="btn btn-outline-dark my-2 my-sm-0 px-5 px-md-2"
          type="submit"
        >
          Search
        </button>
      </form>
      <router-link
        v-if="!user"
        tag="a"
        to="/login"
        class="btn btn-primary mx-md-3 px-md-4 px-5"
        >Login</router-link
      >
    </div>
  </nav>
</template>
<script lang="ts">
import Vue from "vue";
import { auth } from "@/Firebase";

export default Vue.extend({
  data: () => ({
    user: null as firebase.User | null
  }),
  created() {
    this.user = auth.currentUser;
  },
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
