<template>
  <div class="d-block">
    <form class="container p-0">
      <fieldset class="fieldset">
        <div class="form-group">
          <label class="col-md-12 col-sm-3 col-xs-12 control-label"
            >Full Name</label
          >
          <div class="col-md-12 col-sm-9 col-xs-12">
            <input
              v-model="updateFields.displayName"
              type="text"
              class="form-control"
            />

            <small v-if="!nameValid" class="text-danger w-100"
              >Maximum 32 characters and minimum 5 characters</small
            >
            <small v-else class="text-secondary"
              >Your name will be visible publically with your article.</small
            >
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-12 col-sm-9 col-xs-12">
            <b-form-file
              v-model="updateFields.image"
              accept="image/jpeg, image/png, image/gif"
              :state="photoValid"
              placeholder="Choose Profile image or drop it here..."
              drop-placeholder="Drop file here..."
            ></b-form-file>
            <small v-if="!photoValid" class="text-danger w-100"
              >Maximum 512 kb</small
            >
            <small v-else class="text-secondary"
              >Your image will be visible publically on your profile.</small
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-12 col-sm-3 col-xs-12 control-label"
            >Institution</label
          >
          <div class="col-md-12 col-sm-9 col-xs-12">
            <input
              v-model="updateFields.institute"
              type="text"
              class="form-control"
              value
            />
            <small class="text-secondary"
              >You can build a community with the institution.</small
            >
          </div>
        </div>
        <div class="form-group">
          <label class="col-md-12 col-sm-3 col-xs-12 control-label"
            >About</label
          >
          <div class="col-md-12 col-sm-9 col-xs-12">
            <textarea
              v-model="updateFields.about"
              name="bio"
              cols="30"
              rows="5"
              class="form-control"
            ></textarea>
            <small class="text-secondary">Describe brifly about yourself</small>
          </div>
        </div>
      </fieldset>

      <hr />
      <div class="form-group">
        <div class="col-12 py-0 text-right">
          <b-btn
            @click="$bvModal.hide('editProfile')"
            class="mr-2"
            variant="secondary"
            >Close</b-btn
          >
          <b-btn
            :disabled="loading || !photoValid || !nameValid"
            @click="updateUser"
            variant="primary"
          >
            {{ loading ? "updating" : "Update Profile" }}
            <i v-if="loading" class="fas fa-spinner"></i>
          </b-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { auth, db, storage } from "@/Firebase";
import { Profile } from "@/models";

export default Vue.extend({
  name: "UpdateProfile",
  data: () => ({
    validImage: false,
    loading: false,
    updateFields: {
      image: (null as unknown) as File,
      displayName: "",
      about: "",
      institute: ""
    }
  }),
  computed: {
    user(): Profile {
      return this.$store.getters.profile;
    },
    photoValid() {
      if (this.updateFields.image)
        return this.updateFields.image.size < 512 * 1024;
      return true;
    },
    nameValid() {
      const name: string = this.updateFields.displayName;
      return (
        name.length < 32 &&
        name.length > 5 &&
        !(this as any).isEmptyOrSpaces(name)
      );
    }
  },
  created() {
    const { displayName, institute, about } = this.user;
    this.updateFields = { ...this.updateFields, displayName, institute, about };
  },
  methods: {
    isEmptyOrSpaces(str: string) {
      return str === null || str.match(/^ *$/) !== null;
    },
    updateUser: async function() {
      try {
        let photoURL!: string;
        this.loading = true;
        const promises = [];
        const { institute, image, displayName, about } = this.updateFields;

        if (image) {
          const fileExtension = image.name.split(".").pop();

          const snapshot = await storage
            .ref()
            .child(`users/${auth.currentUser?.uid}.${fileExtension}`)
            .put(image);
          photoURL = await snapshot.ref.getDownloadURL();
          promises.unshift(
            auth.currentUser?.updateProfile({ displayName, photoURL })
          );
        } else if (displayName !== this.user.displayName) {
          promises.unshift(auth.currentUser?.updateProfile({ displayName }));
        }
        const ref = db.doc("users/" + auth.currentUser?.uid);
        promises.unshift(
          photoURL
            ? ref.update({ institute, about, displayName, photoURL })
            : ref.update({ institute, about, displayName })
        );
        const resp = await Promise.all(promises);
        this.$bvModal.hide("editProfile");
      } catch (error) {
        alert(error.message);
      }
      this.loading = false;
    }
  }
});
</script>
