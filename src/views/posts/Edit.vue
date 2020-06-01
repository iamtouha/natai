<template>
  <div class="d-block bgLightBlue py-4">
    <section class="container bg-white card card-body shadow shadow-sm">
      <p class="font-weight-lighter text-center bg-light py-2 mb-4 h3">
        <strong>Edit Article</strong>
      </p>
      <form @submit.prevent="editArticle" class="container">
        <fieldset class="fieldset">
          <div class="form-group">
            <quillEditor :options="{ theme: 'snow' }" v-model="body" />
          </div>
        </fieldset>
        <div class="form-group">
          <div class="text-left">
            <b-btn :disabled="loading" type="submit" variant="primary">
              {{ loading ? "Updationg" : "Submit" }}
              <i v-if="loading" class="fas fa-spinner"></i>
            </b-btn>
            <b-btn class="ml-2" to="/dashboard" variant="secondary"
              >cancel</b-btn
            >
          </div>
          <small class="text-danger">{{ error }}</small>
        </div>
      </form>
    </section>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import axios from "axios";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";

const { quillEditor } = require("vue-quill-editor"); // eslint-disable-line
import firebase, { storage, db, auth } from "@/Firebase";
@Component({
  components: {
    quillEditor
  }
})
export default class ClassName extends Vue {
  error = "";
  body = "";
  loading = false;
  //   computed
  get id(): string {
    return this.$route.params.id;
  }

  //   hooks
  created() {
    this.getArticle()
      .then(() => {
        this.getArticleBody();
      })
      .catch(err => (this.error = err.message));
  }
  //   methods
  async editArticle() {
    try {
      this.loading = true;
      const ref = storage.ref().child("articles/" + this.id);
      const file = new Blob([this.body], { type: "text/plain" });
      const q1 = db.doc("articles/" + this.id).update({
        updated: firebase.firestore.FieldValue.serverTimestamp()
      });
      const q2 = ref.put(file);
      await Promise.all([q1, q2]);
      this.$router.push("/article/" + this.id);
    } catch (error) {
      this.error = error.message;
    }
  }
  async getArticle() {
    try {
      const doc = await db.doc("articles/" + this.id).get();
      if (auth.currentUser?.uid !== (doc.data() as any).user.uid) {
        this.$router.push("/");
      }
    } catch (error) {
      this.error = error.message;
      return error;
    }
  }
  async getArticleBody() {
    const ref = storage.ref().child("articles/" + this.id);
    const url: string = await ref.getDownloadURL();
    axios
      .get(url, { responseType: "blob" })
      .then(resp => {
        const reader = new FileReader();
        reader.addEventListener("loadend", e => {
          const result = (e as any).currentTarget.result;
          this.body = result;
        });
        reader.readAsText(resp.data);
      })
      .catch(err => (this.error = err.message));
  }
}
</script>
