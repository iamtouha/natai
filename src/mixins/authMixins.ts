import { Vue, Component } from "vue-property-decorator";
import { auth } from "@/Firebase";
import firebase from "firebase";
@Component
export default class AuthMixin extends Vue {
  async loginWithFb() {
    const provider = new firebase.auth.FacebookAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.$router.push("/");
  }
  async loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
    this.$router.push("/");
  }
}
