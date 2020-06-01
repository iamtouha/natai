import { VuexModule, Module, Mutation, Action } from "vuex-module-decorators";
import { Profile, Signature } from "@/models";
import { auth, db } from "@/Firebase";

@Module
export default class User extends VuexModule {
  user: Profile = {
    displayName: "",
    email: "",
    uid: "",
    photoURL: "",
    institute: "",
    about: ""
  };
  // getters
  get profile() {
    return this.user;
  }
  get signature(): Signature {
    const { uid, displayName, photoURL } = this.user;
    return { uid, displayName, photoURL };
  }
  // mutations
  @Mutation
  SET_USER_INFO(payload: Profile) {
    this.user = { ...this.user, ...payload };
  }
  @Mutation
  SET_USER_INFO_ADD(payload: Profile) {
    const { institute, about } = payload;
    this.user.institute = institute;
    this.user.about = about;
  }
  @Mutation
  REMOVE_USER_INFO() {
    this.user = {
      displayName: "",
      email: "",
      uid: "",
      photoURL: "",
      institute: "",
      about: ""
    };
  }
  // actions
  @Action
  async fetchUser() {
    try {
      if (auth.currentUser) {
        const { displayName, uid, photoURL, email } = auth.currentUser;
        this.context.commit("SET_USER_INFO", {
          displayName,
          uid,
          photoURL,
          email
        });
        const userDoc = db.doc("users/" + uid).onSnapshot(
          doc => {
            if (doc.exists) {
              this.context.commit("SET_USER_INFO_ADD", doc.data());
              userDoc();
            }
          },
          error => error
        );
      }
    } catch (error) {
      return error;
    }
  }
  @Action
  async signout() {
    try {
      await auth.signOut();
      this.context.commit("REMOVE_USER_INFO");
    } catch (error) {
      return error;
    }
  }
}
