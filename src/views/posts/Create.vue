<template>
  <div class="d-block bgLightBlue py-4">
    <section class="container bg-white card card-body shadow shadow-sm">
      <p class="font-weight-lighter text-center bg-light py-2 mb-4 h3">
        <strong>New Article</strong>
      </p>
      <form @submit.prevent="creteArticle" class="container">
        <fieldset class="fieldset">
          <div class="form-group">
            <label class="control-label">Title</label>
            <input
              type="text"
              class="form-control"
              v-model="article.title"
              required
            />
            <small class="text-secondary">
              Title of the article represents what your article is all about.
            </small>
          </div>
          <div class="form-row">
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label">Category</label>
                <select
                  v-model="article.category"
                  class="custom-select"
                  required
                >
                  <option selected value disabled>Select Category</option>
                  <option
                    v-for="category in categories"
                    :key="category"
                    :value="category"
                    >{{ category }}</option
                  >
                </select>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label for="articleCover">Article Cover</label>
                <b-form-file
                  id="articleCover"
                  v-model="cover"
                  accept="image/jpeg, image/png, image/gif"
                  :state="photoValid"
                  placeholder="Choose Article cover or drop it here..."
                  drop-placeholder="Drop Image here..."
                ></b-form-file>
                <small v-if="!photoValid && cover" class="text-danger w-100"
                  >Maximum 512 kb</small
                >
              </div>
            </div>
          </div>

          <div class="form-group">
            <label class="control-label">Article body</label>
            <quillEditor :options="{ theme: 'snow' }" v-model="body" />
          </div>
          <div class="form-group">
            <label class="control-label">Tags</label>
            <b-form-tags
              input-id="tags-basic"
              v-model="article.tags"
              class="mb-2"
            ></b-form-tags>
            <small class="text-secondary">Type a new tag and press enter</small>
          </div>
        </fieldset>
        <hr />
        <div class="form-group">
          <div class="text-left">
            <b-btn
              :disabled="Boolean(progress)"
              type="submit"
              variant="primary"
            >
              {{ progress ? "processing" : "Submit" }}
              <i v-if="progress" class="fas fa-spinner"></i>
            </b-btn>
          </div>
          <small class="text-danger">{{ error }}</small>
        </div>
      </form>
      <b-progress
        v-if="progress"
        height="5px"
        :value="progress"
        :max="1"
        animated
      ></b-progress>
    </section>
  </div>
</template>
<script lang="ts">
/* eslint-disable */
import Vue from "vue";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
const { quillEditor } = require("vue-quill-editor");
import firebase, { db, storage } from "@/Firebase";
import { Signature, Article } from "@/models";

export default Vue.extend({
  components: {
    quillEditor
  },
  data: () => ({
    loading: false,
    article: {
      title: "",
      category: "",
      tags: []
    },
    body: "",

    error: "",
    cover: (null as unknown) as File,
    progress: 0,
    categories: [
      "Literature",
      "Art",
      "Sports",
      "Education",
      "Technology",
      "Lifestyle"
    ]
  }),
  computed: {
    photoValid() {
      if (this.cover) return this.cover.size < 512 * 1024;
      return true;
    },
    signature(): Signature {
      return this.$store.getters.signature;
    }
  },
  methods: {
    creteArticle: async function() {
      this.loading = true;
      this.progress = 1 / 5;
      try {
        const id: string = (this as any).slugify();
        const docRef = db.doc("articles/" + id);
        const exists = (await docRef.get()).exists;
        if (exists) {
          throw new Error("Article with same title already Exists!");
          this.progress = 0;
        }
        const { title, tags, category } = this.article;
        const file = new Blob([this.body], { type: "text/plain" });
        const storageRef = storage.ref().child("articles/" + id);
        const promises1 = [];
        promises1.push(storageRef.put(file));
        if (this.cover && (this as any).photoValid) {
          const coverRef = storage
            .ref()
            .child(`covers/${id}.${this.cover.name.split(".").pop()}`);
          promises1.push(coverRef.put(this.cover));
        }
        this.progress = 2 / 5;
        const [bodySnap, coverSnap] = await Promise.all(promises1);
        const promises2 = [
          bodySnap.ref.getDownloadURL(),
          coverSnap ? coverSnap.ref.getDownloadURL() : null
        ];
        this.progress = 3 / 5;
        const [body, cover] = await Promise.all(promises2);
        const keywords = title.split(" ");
        this.progress = 4 / 5;

        await docRef.set({
          keywords,
          category,
          body,
          cover,
          title,
          tags,
          user: (this as any).signature,
          preview: (this as any).preview(),
          active: true,
          comments: [],
          shares: [],
          views: [],
          created: firebase.firestore.FieldValue.serverTimestamp(),
          updated: null
        });
        this.progress = 1;
        this.$router.push("/article/" + id);
      } catch (error) {
        this.error = error.message;
      }
      this.progress = 0;
      this.loading = false;
    },
    preview() {
      const el = document.createElement("span");
      el.innerHTML = this.body;
      return el.textContent;
    },
    slugify() {
      const a =
        "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
      const b =
        "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
      const p = new RegExp(a.split("").join("|"), "g");
      return this.article.title
        .toString()
        .toLowerCase()
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special characters
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
        .replace(/^-+/, "") // Trim - from start of text
        .replace(/-+$/, ""); // eslint-disable-line
    }
  }
});
</script>