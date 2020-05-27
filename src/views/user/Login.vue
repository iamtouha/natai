<template>
  <div class="container-fluid h-100 signUpTreeImageFix">
    <div class="row bgLightBlue">
      <div class="col-md-6 d-flex align-items-end height100">
        <img
          src="/img/undraw_biking_kc4f.svg"
          alt="Tree swing image"
          style="transform :scale(-1,1);"
          class="w-100"
        />
      </div>
      <div class="offset-md-1 col-md-4 signUpContent my-3">
        <div class="card">
          <div class="card-body shadow rounded">
            <h2 class="text-center textBlue">Login</h2>
            <hr class="w-50 mx-auto bgLightBlue" />
            <form @submit.prevent="signin">
              <div class="form-group">
                <label for="email">
                  <i class="fas fa-envelope textBlue"></i> Email
                </label>
                <input
                  type="text"
                  v-model="cred.email"
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
                  type="password"
                  v-model="cred.password"
                  class="form-control"
                  id="password"
                  required
                />
                <small class="text-danger">{{ errorMsg }}</small>
              </div>
              <div class="form-group d-flex justify-content-center">
                <input
                  type="submit"
                  value="Login Now"
                  class="btn btn-primary w-50"
                />
              </div>
              <div class="form-group d-block">
                <div class="row">
                  <div class="col-6">
                    <input type="checkbox" name="rememberMe" id="rememberMe" />
                    <label for="rememberMe" class="textBlue">Remember me</label>
                  </div>
                  <div class="col-6">
                    <span class="text-right d-block">
                      <a href="#">Forgot password?</a>
                    </span>
                  </div>
                </div>
              </div>
            </form>
            <h6 class="text-center pb-3">
              Don't have an account.
              <router-link to="/signup" tag="a">Sign Up now</router-link>
            </h6>
            <hr />
            <div class="text-center py-2">
              <h5 class="textBlue lead">Login with social account</h5>
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
export default class Login extends AuthMixin {
  loading = false;
  cred = {
    email: "",
    password: ""
  };
  errorMsg = "";
  async signin() {
    try {
      await auth.signInWithEmailAndPassword(
        this.cred.email,
        this.cred.password
      );
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
