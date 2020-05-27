<template>
  <div class="container-fluid h-100 signUpTreeImageFix">
    <div class="row bgLightBlue">
      <div class="col-md-6 d-flex align-items-end height100">
        <img src="/img/Tree_swing.svg" alt="Tree swing image" class="w-100" />
      </div>
      <div class="offset-md-1 col-md-4 signUpContent my-3">
        <div class="card">
          <div class="card-body shadow rounded">
            <h2 class="text-center textBlue">Create Account</h2>
            <hr class="w-50 mx-auto bgLightBlue" />
            <form @submit.prevent="signup">
              <div class="form-group">
                <label for="name">
                  <i class="fas fa-user textBlue"></i> Name
                </label>
                <input
                  v-model="cred.name"
                  type="text"
                  class="form-control"
                  id="name"
                  required
                />
              </div>
              <div class="form-group">
                <label for="email">
                  <i class="fas fa-envelope textBlue"></i> Email
                </label>
                <input
                  v-model="cred.email"
                  type="text"
                  class="form-control"
                  id="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">
                  <i class="fas fa-lock textBlue"></i> Password
                </label>
                <input
                  v-model="cred.password"
                  type="text"
                  class="form-control"
                  id="password"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password2">
                  <i class="fas fa-lock textBlue"></i> Retype Password
                </label>
                <input
                  v-model="cred.password2"
                  type="text"
                  class="form-control"
                  id="password2"
                  required
                />
                <small class="text-danger">{{ errorMsg }}</small>
              </div>
              <div class="form-group d-flex justify-content-center">
                <input
                  type="submit"
                  value="Sign Up"
                  class="btn btn-primary w-50"
                />
              </div>
            </form>
            <div class="text-center pt-2">
              <h5 class="textBlue lead">Sign up with social account</h5>
              <div class="d-flex justify-content-center">
                <button
                  class="btn btn-rounded text-primary"
                  @click.stop="loginWith('fb')"
                >
                  <i class="fab fa-facebook sizeSocialIcon"></i>
                </button>
                <button
                  class="btn btn-rounded text-primary"
                  @click.stop="loginWith('google')"
                >
                  <i class="fab fa-google sizeSocialIcon"></i>
                </button>
              </div>
            </div>
            <hr />
            <h6 class="text-center py-3">
              Already have an account.
              <router-link to="/login" tag="a">Login now</router-link>
            </h6>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component } from "vue-property-decorator";
import { auth } from "@/Firebase";
import AuthMixin from "@/mixins/authMixins";

@Component
export default class Signup extends AuthMixin {
  cred = {
    displayName: "",
    email: "",
    password: "",
    password2: ""
  };
  errorMsg = "";
  async signup() {
    try {
      const { email, password, displayName, password2 } = this.cred;
      if (password !== password2) throw Error("Passwords do not match.");
      await auth.createUserWithEmailAndPassword(email, password);
      await auth.currentUser?.updateProfile({ displayName });
      this.$router.push("/");
    } catch (error) {
      this.errorMsg = error.message;
    }
  }
  async loginWith(type: string) {
    try {
      if (type == "fb") {
        await this.loginWithFb();
      } else {
        await this.loginWithGoogle();
      }
    } catch (error) {
      this.errorMsg = error.message;
    }
  }
}
</script>
